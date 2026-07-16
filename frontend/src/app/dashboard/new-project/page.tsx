"use client";

import React, { useState, useEffect } from 'react';

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [targetMonopolies, setTargetMonopolies] = useState('');
  const [architecturePattern, setArchitecturePattern] = useState('Event-Driven Microservices');
  const [isLoading, setIsLoading] = useState(false);

  // EPISTEMOLOGY: Chronological Velocity - Baseline Trajectories & Relative Time-Horizon Deltas
  const [lastDraftSave, setLastDraftSave] = useState<Date | null>(null);
  const [firstDraftSave, setFirstDraftSave] = useState<Date | null>(null); // New state for baseline
  const [timeSinceLastSave, setTimeSinceLastSave] = useState<number | null>(null);
  const [timeSinceFirstSave, setTimeSinceFirstSave] = useState<number | null>(null); // New state for baseline delta

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // EPISTEMOLOGY: Chronological Velocity - Update time since last save and first save
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lastDraftSave || firstDraftSave) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        if (lastDraftSave) {
          setTimeSinceLastSave(Math.floor((now - lastDraftSave.getTime()) / 1000));
        }
        if (firstDraftSave) {
          setTimeSinceFirstSave(Math.floor((now - firstDraftSave.getTime()) / 1000));
        }
      }, 1000);
    } else {
      setTimeSinceLastSave(null);
      setTimeSinceFirstSave(null);
    }
    return () => clearInterval(interval);
  }, [lastDraftSave, firstDraftSave]); // Dependencies include firstDraftSave

  // Simulate API call for saving a draft
  const handleSaveDraft = async () => {
    setIsLoading(true);
    // In a real application, this would be an API call to save partial form data
    await new Promise(resolve => setTimeout(resolve, 800));
    const now = new Date();
    setLastDraftSave(now);
    if (!firstDraftSave) { // Set first save timestamp only once
      setFirstDraftSave(now);
    }
    console.log('Draft Saved:', { projectName, targetMonopolies, architecturePattern });
    setIsLoading(false);
  };

  // Simulate API call for spawning a project instance
  const handleSpawnProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName) return; // Basic client-side validation

    setIsLoading(true);
    setSubmissionSuccess(false); // Reset success state
    // In a real application, this would be an API call to create the project
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Project Spawned:', { projectName, targetMonopolies, architecturePattern });
    setIsLoading(false);
    setSubmissionSuccess(true);
    // Optionally clear form or redirect after success
    // setProjectName('');
    // setTargetMonopolies('');
    // setArchitecturePattern('Event-Driven Microservices');
    // setLastDraftSave(null);
    // setFirstDraftSave(null);
  };

  // [D] Delete: Initiate cancel flow
  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  // [D] Delete: Confirm and execute cancel
  const confirmCancel = () => {
    console.log('Project creation cancelled. All unsaved progress discarded.');
    setShowCancelConfirm(false);
    // Reset form state to simulate navigating away or starting fresh
    setProjectName('');
    setTargetMonopolies('');
    setArchitecturePattern('Event-Driven Microservices');
    setLastDraftSave(null);
    setFirstDraftSave(null); // Reset first save
    setTimeSinceFirstSave(null); // Reset time since first save
    setSubmissionSuccess(false);
    // In a real app, this would be router.push('/dashboard') or similar
  };

  // [D] Delete: Dismiss cancel dialog
  const dismissCancel = () => {
    setShowCancelConfirm(false);
  };

  const isSpawnDisabled = isLoading || !projectName;
  const isSaveDraftDisabled = isLoading || !projectName;

  return (
    <div className="new-project-container" style={{
      padding: '48px 32px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif',
      color: '#e0e0e0',
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* TELEOLOGY: Enforce strict teleological momentum - hide lateral navigation */}
      {/* ONTOLOGY: Targeted Routing - The primary focus is this creation flow */}
      <div className="header-section" style={{ width: '100%', marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5em', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
          Initiate Structural Contribution
        </h1>
        <p style={{ fontSize: '1.1em', color: '#a0a0a0' }}>
          Define the parameters for a new architectural project instance.
        </p>
      </div>

      <form onSubmit={handleSpawnProject} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '600px',
        padding: '32px',
        background: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid #333',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}>
        {/* SENSORIAL: Granular Precision - Compact, well-defined input fields */}
        {/* KINETICS: Operational Command - Clear input areas */}
        <div className="form-field-group">
          <label htmlFor="projectName" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9em', color: '#b0b0b0', fontWeight: '600' }}>
            Project Name <span style={{ color: 'var(--primary, #0070f3)', fontSize: '0.8em', marginLeft: '8px' }}>[Required]</span>
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="e.g., Quantum Ledger Fabric"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px',
              background: '#2a2a2a',
              border: '1px solid #444',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '1em',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '--tw-ring-color': 'var(--primary, #0070f3)', // Custom property for focus ring
            } as React.CSSProperties} // Type assertion for custom properties
          />
        </div>

        <div className="form-field-group">
          <label htmlFor="targetMonopolies" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9em', color: '#b0b0b0', fontWeight: '600' }}>
            Target Proprietary Monopolies <span style={{ color: '#777', fontSize: '0.8em', marginLeft: '8px' }}>[Optional, comma-separated]</span>
          </label>
          <input
            id="targetMonopolies"
            type="text"
            placeholder="e.g., Jira, Slack, Salesforce"
            value={targetMonopolies}
            onChange={(e) => setTargetMonopolies(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              background: '#2a2a2a',
              border: '1px solid #444',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '1em',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '--tw-ring-color': 'var(--primary, #0070f3)',
            } as React.CSSProperties}
          />
        </div>

        <div className="form-field-group">
          <label htmlFor="architecturePattern" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9em', color: '#b0b0b0', fontWeight: '600' }}>
            Core Architecture Pattern <span style={{ color: 'var(--primary, #0070f3)', fontSize: '0.8em', marginLeft: '8px' }}>[Required]</span>
          </label>
          <select
            id="architecturePattern"
            value={architecturePattern}
            onChange={(e) => setArchitecturePattern(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px',
              background: '#2a2a2a',
              border: '1px solid #444',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '1em',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              appearance: 'none', // Hide default arrow
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23b0b0b0'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '20px',
              '--tw-ring-color': 'var(--primary, #0070f3)',
            } as React.CSSProperties}
          >
            <option value="Event-Driven Microservices">Event-Driven Microservices</option>
            <option value="Monolithic Server-Side Rendered">Monolithic Server-Side Rendered</option>
            <option value="Distributed Peer-to-Peer">Distributed Peer-to-Peer</option>
          </select>
        </div>

        {/* KINETICS: Operational Command - Action buttons with clear states */}
        {/* SENSORIAL: Granular Precision - Visual feedback on actions */}
        <div className="action-buttons" style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '32px' }}>
          {/* [D] Delete: Cancel button */}
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '16px 24px',
              background: 'none',
              border: '1px solid #666',
              color: '#b0b0b0',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '1em',
              transition: 'background-color 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s',
              opacity: isLoading ? 0.7 : 1,
            } as React.CSSProperties}
          >
            Cancel
          </button>

          {/* [U] Update / [A] Archive: Save Draft button */}
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaveDraftDisabled}
            style={{
              flex: 1,
              padding: '16px 24px',
              background: '#3a3a3a',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: isSaveDraftDisabled ? 'not-allowed' : 'pointer',
              fontSize: '1em',
              transition: 'background-color 0.2s, opacity 0.2s',
              opacity: isSaveDraftDisabled ? 0.7 : 1,
            } as React.CSSProperties}
          >
            {isLoading && lastDraftSave === null ? 'Saving Draft...' : 'Save Draft'}
          </button>

          <button
            type="submit"
            disabled={isSpawnDisabled}
            style={{
              flex: 2, // Make primary action more prominent
              padding: '16px 24px',
              background: 'var(--primary, #0070f3)', // Use CSS variable or fallback
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: isSpawnDisabled ? 'not-allowed' : 'pointer',
              fontSize: '1em',
              transition: 'background-color 0.2s, opacity 0.2s',
              opacity: isSpawnDisabled ? 0.7 : 1,
            } as React.CSSProperties}
          >
            {isLoading && submissionSuccess === false ? 'Spawning Instance...' : 'Spawn Project Instance'}
          </button>
        </div>

        {/* EPISTEMOLOGY: Chronological Velocity - Last Draft Save & First Draft Save timestamps */}
        {/* SENSORIAL: Granular Precision - Dense, stacked temporal information */}
        {(lastDraftSave || firstDraftSave) && (
          <div style={{
            fontSize: '0.85em',
            color: '#888',
            textAlign: 'right',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column', // Stack them for density
            alignItems: 'flex-end',
            gap: '4px', // Smaller gap between lines
          }}>
            {lastDraftSave && (
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#555' }}>Last saved:</span>
                <span style={{ color: '#b0b0b0', fontWeight: '600' }}>
                  {timeSinceLastSave !== null ? `${timeSinceLastSave}s ago` : 'Just now'}
                </span>
                <span style={{ fontSize: '0.75em', color: '#666' }}>({lastDraftSave.toLocaleTimeString()})</span>
              </p>
            )}
            {firstDraftSave && firstDraftSave.getTime() !== lastDraftSave?.getTime() && ( // Only show if different from last save
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#555' }}>First activity:</span>
                <span style={{ color: '#b0b0b0', fontWeight: '600' }}>
                  {timeSinceFirstSave !== null ? `${Math.floor(timeSinceFirstSave / 60)}m ${timeSinceFirstSave % 60}s ago` : 'Just now'}
                </span>
                <span style={{ fontSize: '0.75em', color: '#666' }}>({firstDraftSave.toLocaleTimeString()})</span>
              </p>
            )}
          </div>
        )}

        {/* [A] Archive: Post-submission acknowledgment */}
        {submissionSuccess && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#1e3a2a', // Dark green for success
            border: '1px solid #285a3a',
            borderRadius: '8px',
            color: '#c6f6d5',
            fontSize: '0.95em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '1.2em' }}>✅</span>
            <span>
              Project instance "<strong style={{ color: '#fff' }}>{projectName || 'Unnamed Project'}</strong>" spawned successfully.
              <br />
              <a href="/dashboard/projects/recent" style={{ color: 'var(--primary, #0070f3)', textDecoration: 'underline', marginLeft: '4px' }}>
                View recent deployments
              </a>
              <span style={{ color: '#888', marginLeft: '8px' }}> (Archival triggered)</span>
            </span>
          </div>
        )}
      </form>

      {/* KINETICS: Operational Command - Confirmation Dialog for Cancel */}
      {/* SENSORIAL: Granular Precision - Modal overlay for critical action */}
      {showCancelConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '32px',
            borderRadius: '12px',
            border: '1px solid #333',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '16px' }}>Discard Project Creation?</h3>
            <p style={{ color: '#b0b0b0', marginBottom: '24px' }}>
              Are you sure you want to cancel? All unsaved progress will be lost.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={dismissCancel}
                style={{
                  padding: '12px 24px',
                  background: '#3a3a3a',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.95em',
                  transition: 'background-color 0.2s',
                } as React.CSSProperties}
              >
                Keep Editing
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: '12px 24px',
                  background: '#dc2626', // Red for destructive action
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.95em',
                  transition: 'background-color 0.2s',
                } as React.CSSProperties}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}