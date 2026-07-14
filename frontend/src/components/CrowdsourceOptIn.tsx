'use client'

import { useState } from 'react'

interface CrowdsourceOptInProps {
  platformName: string;
  description: string;
  thresholdGoal: number;
  initialCommitments: number;
}

export default function CrowdsourceOptIn({ platformName, description, thresholdGoal, initialCommitments }: CrowdsourceOptInProps) {
  const [email, setEmail] = useState('');
  const [commitments, setCommitments] = useState(initialCommitments);
  const [hasCommitted, setHasCommitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || hasCommitted) return;

    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCommitments(prev => prev + 1);
    setHasCommitted(true);
    setIsSubmitting(false);
  };

  const progressPercentage = Math.min((commitments / thresholdGoal) * 100, 100);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '48px', alignItems: 'start' }}>
      
      {/* LINEAR_STYLE_COMMAND_K_MATRIX: Dense input terminal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <header>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            {platformName} Consensus
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {description}
          </p>
          <p style={{ color: 'var(--primary)', marginTop: '8px', fontSize: '0.95rem', fontWeight: 600 }}>
            We only provision infrastructure when the community demands it.
          </p>
        </header>

        <form onSubmit={handleCommit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            background: 'var(--surface)', 
            border: hasCommitted ? '1px solid var(--success)' : '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <label htmlFor="emailInput" style={{ color: '#8b949e', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Commitment Node Authentication
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                id="emailInput"
                type="email" 
                placeholder="developer@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={hasCommitted || isSubmitting}
                required
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  width: '100%',
                  fontSize: '1rem',
                  outline: 'none',
                  padding: '8px 0'
                }}
              />
              <button 
                type="submit"
                disabled={hasCommitted || isSubmitting || !email}
                style={{
                  padding: '8px 24px',
                  background: hasCommitted ? 'var(--success)' : (isSubmitting ? 'var(--surface)' : 'var(--primary)'),
                  color: hasCommitted ? 'var(--surface)' : 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (hasCommitted || isSubmitting || !email) ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s'
                }}
              >
                {isSubmitting ? 'Verifying...' : hasCommitted ? 'Committed' : 'Commit ⌘Enter'}
              </button>
            </div>
            {hasCommitted && (
              <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontFamily: 'monospace', marginTop: '8px' }}>
                &gt; Identity verified. Consensus log updated.
              </div>
            )}
          </div>
        </form>
      </div>

      {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY: Trajectory tracking */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>
          Deployment Trajectory
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ color: 'var(--foreground)', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                {commitments}
              </span>
              <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>
                / {thresholdGoal} required
              </span>
            </div>
            
            {/* Progress Bar */}
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ 
                height: '100%', 
                width: `${progressPercentage}%`, 
                background: progressPercentage >= 100 ? 'var(--success)' : 'var(--primary)',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ color: '#8b949e', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                &gt; Initialization proposed
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
              <span style={{ color: 'var(--foreground)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                &gt; Gathering developer consensus...
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: progressPercentage >= 100 ? 1 : 0.3 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: progressPercentage >= 100 ? 'var(--success)' : '#8b949e' }} />
              <span style={{ color: progressPercentage >= 100 ? 'var(--success)' : '#8b949e', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                &gt; Threshold met. Provisioning {platformName}.
              </span>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
