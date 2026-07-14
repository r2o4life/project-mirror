'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type SpawnStatus = 'IDLE' | 'AUTHENTICATING' | 'VALIDATING_INPUTS' | 'INITIATING_SPAWN' | 'CREATING_REPOSITORY' | 'CONFIGURING_PROJECT' | 'COMPLETE' | 'FAILED' | 'CANCELED';

const SPAWN_STEPS: SpawnStatus[] = [
  'VALIDATING_INPUTS',
  'AUTHENTICATING',
  'INITIATING_SPAWN',
  'CREATING_REPOSITORY',
  'CONFIGURING_PROJECT',
];

export default function Spawn() {
  const [spawnStatus, setSpawnStatus] = useState<SpawnStatus>('IDLE')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [repositoryUrl, setRepositoryUrl] = useState<string | null>(null)

  const [targetProduct, setTargetProduct] = useState('')
  const [openSourceName, setOpenSourceName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [template, setTemplate] = useState('default-template')

  const handleSpawn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSpawnStatus('VALIDATING_INPUTS')
    setProgress(10)
    setMessage('')
    setError('')
    setRepositoryUrl(null)

    if (!targetProduct || !openSourceName || !projectDescription) {
      setError('All primary project parameters are required for initialization.')
      setSpawnStatus('FAILED')
      setProgress(0)
      return
    }

    setSpawnStatus('AUTHENTICATING')
    setProgress(20)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.access_token) {
      setError('Authentication required: You must be logged in to initiate a project spawn.')
      setSpawnStatus('FAILED')
      setProgress(0)
      return
    }

    setSpawnStatus('INITIATING_SPAWN')
    setProgress(40)

    try {
      const steps = [
        { status: 'CREATING_REPOSITORY', progress: 60, delay: 1000 },
        { status: 'CONFIGURING_PROJECT', progress: 80, delay: 1500 },
      ];

      for (const step of steps) {
        setSpawnStatus(step.status as SpawnStatus);
        setProgress(step.progress);
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
          github_token: 'dummy-token', 
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
      } else {
        setError(data.error || 'Failed to spawn project. Review server logs for detailed diagnostics.')
        setSpawnStatus('FAILED')
        setProgress(0)
      }
    } catch (err) {
      setError('Network or server connection error. Verify connectivity and retry operation.')
      setSpawnStatus('FAILED')
      setProgress(0)
    }
  }

  const handleCancel = () => {
    setSpawnStatus('CANCELED');
    setProgress(0);
    setMessage('Spawn operation proactively canceled by user.');
    setError('');
  };

  const isProcessing = spawnStatus !== 'IDLE' && spawnStatus !== 'COMPLETE' && spawnStatus !== 'FAILED' && spawnStatus !== 'CANCELED';
  const isComplete = spawnStatus === 'COMPLETE';
  const isFailed = spawnStatus === 'FAILED';
  const isCanceled = spawnStatus === 'CANCELED';

  const inputStyle = {
    padding: '8px 12px',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: 'var(--foreground)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    color: '#8b949e',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '4px'
  };

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header aligned with SYNTACTIC Granular Precision */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
          Spawn Competitor
        </h1>
        <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '0.9rem' }}>
          Execute high-density configuration commands to provision new repository architecture.
        </p>
      </header>

      {/* LINEAR_STYLE_COMMAND_K_MATRIX: Dense Configuration Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '48px' }}>
        
        <form onSubmit={handleSpawn} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
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
                disabled={isProcessing || isComplete}
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
                disabled={isProcessing || isComplete}
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
                disabled={isProcessing || isComplete}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label htmlFor="template" style={labelStyle}>Repository Template</label>
              <select
                id="template"
                name="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                disabled={isProcessing || isComplete}
                style={{ ...inputStyle, paddingLeft: 0 }}
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
                disabled={isProcessing || isComplete}
                style={{ ...inputStyle, paddingLeft: 0 }}
              >
                <option value="public">Public Domain</option>
                <option value="private">Private Fork</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              disabled={isProcessing || isComplete}
              type="submit"
              style={{
                padding: '10px 24px',
                background: (isProcessing || isComplete) ? 'var(--surface)' : 'var(--primary)',
                color: (isProcessing || isComplete) ? '#8b949e' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: (isProcessing || isComplete) ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              {isProcessing ? `Executing...` : isComplete ? 'Initialized' : 'Execute Spawn ⌘Enter'}
            </button>
            {isProcessing && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '10px 24px',
                  background: 'transparent',
                  color: 'var(--danger)',
                  border: '1px solid var(--danger)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                Abort Sequence
              </button>
            )}
          </div>
        </form>

        {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY: Operation Trajectory Log */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            Deployment Telemetry
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {SPAWN_STEPS.map((step, index) => {
              const currentStatusIndex = SPAWN_STEPS.indexOf(spawnStatus);
              const stepIndex = index;
              const isCurrent = step === spawnStatus;
              const isCompletedStep = currentStatusIndex > stepIndex || isComplete;
              const isFailedOrCanceledBeforeThis = (isFailed || isCanceled) && currentStatusIndex < stepIndex;

              let stepColor = '#8b949e';
              if (isCompletedStep) stepColor = 'var(--success)';
              else if (isCurrent) stepColor = 'var(--primary)';
              else if (isFailedOrCanceledBeforeThis) stepColor = 'var(--danger)';

              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: isFailedOrCanceledBeforeThis ? 0.3 : 1 }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: stepColor,
                    boxShadow: isCurrent ? `0 0 8px ${stepColor}` : 'none'
                  }} />
                  <span style={{ color: stepColor, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    &gt; {step}
                  </span>
                </div>
              );
            })}
          </div>

          {(isComplete || error) && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              {error ? (
                <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  ERR: {error}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    OK: {message}
                  </div>
                  {repositoryUrl && (
                    <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none' }}>
                      &rarr; View Output Log
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}