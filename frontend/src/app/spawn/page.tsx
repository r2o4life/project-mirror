'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

// --- UX Taxonomy Pillars & Blueprints ---
// 1. ONTOLOGY (Routing): [TARGETED_ROUTING] - Implied by clear sequential steps and final action.
// 2. EPISTEMOLOGY (Information Design): [CHRONOLOGICAL_VELOCITY] - VERCEL_STYLE_DEPLOYMENT_TELEMETRY
// 3. KINETICS (Interaction Design): [OPERATIONAL_COMMAND] - LINEAR_STYLE_COMMAND_K_MATRIX, SHOPIFY_STYLE_LINEAR_CHECKOUT
// 4. SENSORIAL (Visual Design & Density): [GRANULAR_PRECISION] - LINEAR_STYLE_COMMAND_K_MATRIX, VERCEL_STYLE_DEPLOYMENT_TELEMETRY
// 5. TELEOLOGY (Macro-Flow): [SEQUENTIAL_ORCHESTRATION] - SHOPIFY_STYLE_LINEAR_CHECKOUT

type SpawnStatus = 'IDLE' | 'AUTHENTICATING' | 'VALIDATING_INPUTS' | 'INITIATING_SPAWN' | 'CREATING_REPOSITORY' | 'CONFIGURING_PROJECT' | 'COMPLETE' | 'FAILED' | 'CANCELED';
type FormStep = 'PROJECT_DETAILS' | 'CONFIGURATION' | 'REVIEW' | 'INITIATE_PROCESS';

const SPAWN_STEPS: SpawnStatus[] = [
  'VALIDATING_INPUTS',
  'AUTHENTICATING',
  'INITIATING_SPAWN',
  'CREATING_REPOSITORY',
  'CONFIGURING_PROJECT',
];

const FORM_STEPS: FormStep[] = ['PROJECT_DETAILS', 'CONFIGURATION', 'REVIEW', 'INITIATE_PROCESS'];

export default function Spawn() {
  // --- Core Spawn Process State ---
  const [spawnStatus, setSpawnStatus] = useState<SpawnStatus>('IDLE')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [repositoryUrl, setRepositoryUrl] = useState<string | null>(null)
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]); // For VERCEL_STYLE_DEPLOYMENT_TELEMETRY

  // --- Form Input State ---
  const [targetProduct, setTargetProduct] = useState('')
  const [openSourceName, setOpenSourceName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [template, setTemplate] = useState('default-template')

  // --- Sequential Orchestration State (SHOPIFY_STYLE_LINEAR_CHECKOUT) ---
  const [currentFormStep, setCurrentFormStep] = useState<FormStep>('PROJECT_DETAILS');

  // --- Derived States ---
  const isProcessingSpawn = spawnStatus !== 'IDLE' && spawnStatus !== 'COMPLETE' && spawnStatus !== 'FAILED' && spawnStatus !== 'CANCELED';
  const isComplete = spawnStatus === 'COMPLETE';
  const isFailed = spawnStatus === 'FAILED';
  const isCanceled = spawnStatus === 'CANCELED';
  const isFormLocked = isProcessingSpawn || isComplete || isFailed || isCanceled;

  // --- Telemetry Logging Function ---
  const addTelemetryLog = (msg: string, type: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' = 'INFO') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setTelemetryLog((prev) => [...prev, `[${timestamp}] [${type}] ${msg}`]);
  };

  // --- Sequential Form Navigation Handlers (SHOPIFY_STYLE_LINEAR_CHECKOUT) ---
  const handleNextFormStep = (e: React.FormEvent<HTMLFormElement> | null) => {
    e?.preventDefault(); // Prevent default form submission if called from a form
    const currentIndex = FORM_STEPS.indexOf(currentFormStep);
    if (currentIndex < FORM_STEPS.length - 1) {
      // Validate current step before proceeding
      if (currentFormStep === 'PROJECT_DETAILS' && (!targetProduct || !openSourceName || !projectDescription)) {
        setError('All primary project parameters are required.');
        addTelemetryLog('Validation failed: Missing project details.', 'ERROR');
        return;
      }
      setError(''); // Clear previous errors
      setCurrentFormStep(FORM_STEPS[currentIndex + 1]);
      addTelemetryLog(`Navigated to form step: ${FORM_STEPS[currentIndex + 1]}`);
    } else if (currentFormStep === 'INITIATE_PROCESS') {
      // This is the final step, initiate the actual spawn process
      handleSpawn();
    }
  };

  const handlePreviousFormStep = () => {
    const currentIndex = FORM_STEPS.indexOf(currentFormStep);
    if (currentIndex > 0) {
      setCurrentFormStep(FORM_STEPS[currentIndex - 1]);
      addTelemetryLog(`Navigated back to form step: ${FORM_STEPS[currentIndex - 1]}`);
    }
  };

  // --- Main Spawn Logic (triggered by final form step) ---
  const handleSpawn = async () => {
    setSpawnStatus('VALIDATING_INPUTS')
    setProgress(10)
    setMessage('')
    setError('')
    setRepositoryUrl(null)
    setTelemetryLog([]); // Clear log for new spawn attempt
    addTelemetryLog('Initiating spawn sequence...');

    if (!targetProduct || !openSourceName || !projectDescription) {
      setError('All primary project parameters are required for initialization.')
      setSpawnStatus('FAILED')
      setProgress(0)
      addTelemetryLog('Validation failed: Missing critical project parameters.', 'ERROR');
      return
    }

    setSpawnStatus('AUTHENTICATING')
    setProgress(20)
    addTelemetryLog('Authenticating user session...');
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.access_token) {
      setError('Authentication required: You must be logged in to initiate a project spawn.')
      setSpawnStatus('FAILED')
      setProgress(0)
      addTelemetryLog('Authentication failed: No active session.', 'ERROR');
      return
    }
    addTelemetryLog('Authentication successful.');

    setSpawnStatus('INITIATING_SPAWN')
    setProgress(40)
    addTelemetryLog('Initiating project spawn API call...');

    try {
      const steps = [
        { status: 'CREATING_REPOSITORY', progress: 60, delay: 1000 },
        { status: 'CONFIGURING_PROJECT', progress: 80, delay: 1500 },
      ];

      for (const step of steps) {
        setSpawnStatus(step.status as SpawnStatus);
        setProgress(step.progress);
        addTelemetryLog(`Executing step: ${step.status}...`);
        await new Promise(resolve => setTimeout(resolve, step.delay));
      }

      const res = await fetch('http://127.0.0.1:8000/api/core/spawn/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          target_product_name: targetProduct,
          proposed_name: openSourceName,
          description: projectDescription,
          github_token: 'dummy-token', // Placeholder
          visibility: visibility,
          template_name: template,
        })
      })

      const data = await res.json()

      if (res.ok) {
        setRepositoryUrl(data.repository_url)
        setMessage(`Project '${openSourceName}' successfully initialized.`)
        setSpawnStatus('COMPLETE')
        setProgress(100)
        addTelemetryLog(`Project '${openSourceName}' successfully initialized.`, 'SUCCESS');
        addTelemetryLog(`Repository URL: ${data.repository_url}`, 'INFO');
      } else {
        setError(data.error || 'Failed to spawn project. Review server logs for detailed diagnostics.')
        setSpawnStatus('FAILED')
        setProgress(0)
        addTelemetryLog(`Spawn failed: ${data.error || 'Unknown server error.'}`, 'ERROR');
      }
    } catch (err: any) {
      setError('Network or server connection error. Verify connectivity and retry operation.')
      setSpawnStatus('FAILED')
      setProgress(0)
      addTelemetryLog(`Network or server error: ${err.message}`, 'ERROR');
    }
  }

  const handleCancel = () => {
    setSpawnStatus('CANCELED');
    setProgress(0);
    setMessage('Spawn operation proactively canceled by user.');
    setError('');
    addTelemetryLog('Spawn operation proactively canceled by user.', 'WARN');
  };

  // --- Styles (GRANULAR_PRECISION, LINEAR_STYLE_COMMAND_K_MATRIX, VERCEL_STYLE_DEPLOYMENT_TELEMETRY) ---
  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    width: '100%',
    background: 'var(--input-background)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--foreground)',
    fontSize: '0.85rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'var(--font-mono), monospace',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
    fontWeight: 500,
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
  };

  const dangerButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'transparent',
    color: 'var(--danger)',
    border: '1px solid var(--danger)',
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'var(--surface-dim)',
    color: 'var(--text-dim)',
    border: '1px solid var(--border-dim)',
    cursor: 'not-allowed',
  };

  const progressBarStyle: React.CSSProperties = {
    height: '4px',
    background: 'var(--border)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '8px',
  };

  const progressBarFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    background: 'var(--primary)',
    transition: 'width 0.5s ease-in-out',
    borderRadius: '2px',
  };

  // --- Render Logic ---
  const renderFormStep = () => {
    switch (currentFormStep) {
      case 'PROJECT_DETAILS':
        return (
          <form onSubmit={handleNextFormStep} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="targetProduct" style={labelStyle}>Target Proprietary Product</label>
                <input
                  id="targetProduct"
                  name="targetProduct"
                  type="text"
                  placeholder="e.g. Linear, Figma, Notion"
                  required
                  value={targetProduct}
                  onChange={(e) => setTargetProduct(e.target.value)}
                  disabled={isFormLocked}
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="openSourceName" style={labelStyle}>Proposed Open Source Name</label>
                <input
                  id="openSourceName"
                  name="openSourceName"
                  type="text"
                  placeholder="e.g. OpenLinear, FigJamOSS"
                  required
                  value={openSourceName}
                  onChange={(e) => setOpenSourceName(e.target.value)}
                  disabled={isFormLocked}
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="projectDescription" style={labelStyle}>Mission Description</label>
                <input
                  id="projectDescription"
                  name="projectDescription"
                  type="text"
                  placeholder={`A community-driven alternative to...`}
                  required
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  disabled={isFormLocked}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button
                type="submit"
                disabled={isFormLocked}
                style={isFormLocked ? disabledButtonStyle : primaryButtonStyle}
              >
                Next Step <span style={{ opacity: 0.6, fontSize: '0.75em' }}>⌘Enter</span>
              </button>
            </div>
          </form>
        );
      case 'CONFIGURATION':
        return (
          <form onSubmit={handleNextFormStep} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label htmlFor="template" style={labelStyle}>Repository Template</label>
                <select
                  id="template"
                  name="template"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  disabled={isFormLocked}
                  style={inputStyle}
                >
                  <option value="default-template">Standard OSS</option>
                  <option value="web-app-template">Web Application</option>
                  <option value="api-service-template">API Service</option>
                </select>
              </div>
              <div>
                <label htmlFor="visibility" style={labelStyle}>Visibility Constraint</label>
                <select
                  id="visibility"
                  name="visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                  disabled={isFormLocked}
                  style={inputStyle}
                >
                  <option value="public">Public Domain</option>
                  <option value="private">Private Fork</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={handlePreviousFormStep}
                disabled={isFormLocked}
                style={isFormLocked ? disabledButtonStyle : secondaryButtonStyle}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isFormLocked}
                style={isFormLocked ? disabledButtonStyle : primaryButtonStyle}
              >
                Review <span style={{ opacity: 0.6, fontSize: '0.75em' }}>⌘Enter</span>
              </button>
            </div>
          </form>
        );
      case 'REVIEW':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--surface-dim)', borderRadius: '6px', padding: '20px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--foreground)', marginBottom: '12px', borderBottom: '1px dashed var(--border-dim)', paddingBottom: '8px' }}>
                Project Summary
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 16px', fontSize: '0.85rem' }}>
                <span style={labelStyle}>Target Product:</span> <span style={{ color: 'var(--foreground)' }}>{targetProduct}</span>
                <span style={labelStyle}>Open Source Name:</span> <span style={{ color: 'var(--foreground)' }}>{openSourceName}</span>
                <span style={labelStyle}>Description:</span> <span style={{ color: 'var(--foreground)' }}>{projectDescription}</span>
                <span style={labelStyle}>Template:</span> <span style={{ color: 'var(--foreground)' }}>{template}</span>
                <span style={labelStyle}>Visibility:</span> <span style={{ color: 'var(--foreground)' }}>{visibility}</span>
              </div>
            </div>
            {error && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontFamily: 'var(--font-mono), monospace', background: 'var(--danger-alpha)', padding: '12px', borderRadius: '6px', border: '1px solid var(--danger)' }}>
                ERR: {error}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={handlePreviousFormStep}
                disabled={isFormLocked}
                style={isFormLocked ? disabledButtonStyle : secondaryButtonStyle}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleNextFormStep(null)} // No form submission, just advance step
                disabled={isFormLocked}
                style={isFormLocked ? disabledButtonStyle : primaryButtonStyle}
              >
                Confirm & Initiate <span style={{ opacity: 0.6, fontSize: '0.75em' }}>⌘Enter</span>
              </button>
            </div>
          </div>
        );
      case 'INITIATE_PROCESS':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            {isProcessingSpawn ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>
                  Initiating Spawn Sequence...
                </div>
                <div style={{ width: '100%', maxWidth: '300px', ...progressBarStyle }}>
                  <div style={progressBarFillStyle} />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Current Status: <span style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono), monospace' }}>{spawnStatus}</span>
                </p>
              </div>
            ) : isComplete ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2.5rem', lineHeight: 1, color: 'var(--success)' }}>✓</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--success)', margin: 0 }}>
                  Spawn Complete!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  {message}
                </p>
                {repositoryUrl && (
                  <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" style={{ ...primaryButtonStyle, textDecoration: 'none', width: 'auto' }}>
                    View Repository <span style={{ opacity: 0.6, fontSize: '0.75em' }}>↗</span>
                  </a>
                )}
              </div>
            ) : isFailed || isCanceled ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2.5rem', lineHeight: 1, color: 'var(--danger)' }}>✕</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--danger)', margin: 0 }}>
                  Operation {isFailed ? 'Failed' : 'Canceled'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  {error || message}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentFormStep('PROJECT_DETAILS');
                    setSpawnStatus('IDLE');
                    setError('');
                    setMessage('');
                    setProgress(0);
                    setTelemetryLog([]);
                  }}
                  style={primaryButtonStyle}
                >
                  Retry Spawn
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                  Ready to Spawn
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Click 'Execute Spawn' to begin the provisioning process.
                </p>
                <button
                  type="button"
                  onClick={handleSpawn}
                  disabled={isFormLocked}
                  style={isFormLocked ? disabledButtonStyle : primaryButtonStyle}
                >
                  Execute Spawn <span style={{ opacity: 0.6, fontSize: '0.75em' }}>⌘Enter</span>
                </button>
              </div>
            )}
            {isProcessingSpawn && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={dangerButtonStyle}
                >
                  Abort Sequence
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      '--background': '#0a0a0a',
      '--foreground': '#e0e0e0',
      '--surface': '#1a1a1a',
      '--surface-dim': '#121212',
      '--border': '#333',
      '--border-dim': '#222',
      '--primary': '#0070f3',
      '--primary-alpha': 'rgba(0, 112, 243, 0.2)',
      '--success': '#00c985',
      '--danger': '#ff4d4f',
      '--danger-alpha': 'rgba(255, 77, 79, 0.1)',
      '--text-muted': '#8b949e',
      '--text-dim': '#555',
      '--input-background': '#121212',
      '--font-mono': 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      padding: '48px 32px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      background: 'var(--background)',
      color: 'var(--foreground)',
      minHeight: '100vh',
    } as React.CSSProperties}>

      {/* Header aligned with SYNTACTIC Granular Precision */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
          Spawn Competitor
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.95rem' }}>
          Execute high-density configuration commands to provision new repository architecture.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '48px' }}>

        {/* LINEAR_STYLE_COMMAND_K_MATRIX: Dense Configuration Form (Sequential Orchestration) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-dim)', paddingBottom: '16px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
              Configuration Sequence
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
              {FORM_STEPS.map((step, index) => (
                <span key={step} style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  background: index === FORM_STEPS.indexOf(currentFormStep) ? 'var(--primary-alpha)' : 'transparent',
                  color: index === FORM_STEPS.indexOf(currentFormStep) ? 'var(--primary)' : 'var(--text-muted)',
                  border: index === FORM_STEPS.indexOf(currentFormStep) ? '1px solid var(--primary)' : '1px solid var(--border-dim)',
                  fontWeight: index === FORM_STEPS.indexOf(currentFormStep) ? 600 : 400,
                }}>
                  {index + 1}. {step.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
          {renderFormStep()}
        </div>

        {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY: Operation Trajectory Log */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '0.8rem',
          lineHeight: 1.5,
        }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', borderBottom: '1px solid var(--border-dim)', paddingBottom: '12px' }}>
            Deployment Telemetry
          </h3>

          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '400px', marginBottom: '20px', paddingRight: '8px' }}>
            {telemetryLog.map((logEntry, index) => {
              let color = 'var(--text-muted)';
              if (logEntry.includes('[ERROR]')) color = 'var(--danger)';
              else if (logEntry.includes('[WARN]')) color = '#ffc107'; // Yellow for warnings
              else if (logEntry.includes('[SUCCESS]')) color = 'var(--success)';
              else if (logEntry.includes('[INFO]')) color = 'var(--foreground)';

              return (
                <div key={index} style={{ color: color, whiteSpace: 'pre-wrap' }}>
                  {logEntry}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Process Status
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SPAWN_STEPS.map((step, index) => {
                const currentStatusIndex = SPAWN_STEPS.indexOf(spawnStatus);
                const stepIndex = index;
                const isCurrent = step === spawnStatus;
                const isCompletedStep = currentStatusIndex > stepIndex || (isComplete && stepIndex < SPAWN_STEPS.length);
                const isFailedOrCanceledBeforeThis = (isFailed || isCanceled) && currentStatusIndex < stepIndex;

                let stepColor = 'var(--text-dim)';
                let indicator = '○'; // Pending
                if (isCompletedStep) {
                  stepColor = 'var(--success)';
                  indicator = '●'; // Completed
                } else if (isCurrent) {
                  stepColor = 'var(--primary)';
                  indicator = '▶'; // Active
                } else if (isFailedOrCanceledBeforeThis) {
                  stepColor = 'var(--danger)';
                  indicator = '✕'; // Failed/Canceled
                }

                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isFailedOrCanceledBeforeThis ? 0.4 : 1 }}>
                    <span style={{ color: stepColor, fontSize: '0.9rem', width: '1em', textAlign: 'center' }}>
                      {indicator}
                    </span>
                    <span style={{ color: stepColor, fontSize: '0.85rem' }}>
                      {step.replace(/_/g, ' ')}
                    </span>
                    {isCurrent && (
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                        color: 'var(--primary)',
                        background: 'var(--primary-alpha)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        animation: 'pulse 1.5s infinite ease-out',
                      }}>
                        {progress}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {(isComplete || error || message) && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--border-dim)' }}>
                {error ? (
                  <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>
                    ERROR: {error}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: 'var(--success)', fontSize: '0.85rem' }}>
                      STATUS: {message}
                    </div>
                    {repositoryUrl && (
                      <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View Repository <span style={{ fontSize: '0.7em' }}>↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Global CSS for pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(0, 112, 243, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 112, 243, 0); }
        }
      `}</style>
    </div>
  )
}