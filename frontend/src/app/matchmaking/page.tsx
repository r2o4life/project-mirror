'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

// Define the augmented issue type for our telemetry & matchmaking
type MatchmakingIssue = {
  id: string;
  repo: string;
  issue: string;
  tags: string[];
  
  // VERCEL_STYLE_DEPLOYMENT_TELEMETRY (Chronological Velocity)
  matchScore: number; // e.g., 98
  velocityDelta: string; // e.g., "+12% 30d"
  timeOpen: string; // e.g., "2d ago"
  
  // OPERATIONAL_COMMAND state
  status: 'AVAILABLE' | 'CLAIMED' | 'PORTFOLIO';
};

export default function Matchmaking() {
  const [issues, setIssues] = useState<MatchmakingIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadIssues() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const headers: Record<string, string> = {};
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/core/matchmaking/', { headers });
        if (res.ok) {
          const rawData = await res.json();
          // Augment raw data with telemetry metrics to satisfy VERCEL_STYLE_DEPLOYMENT_TELEMETRY
          const augmented = rawData.map((item: any, i: number) => ({
            id: `issue-${i}`,
            repo: item.repo,
            issue: item.issue,
            tags: item.tags || [],
            matchScore: 98 - (i * 3), // Mock score
            velocityDelta: i % 2 === 0 ? '+14% 30d avg' : '-2% 30d avg', // Mock delta
            timeOpen: `${i + 1}d ago`,
            status: 'AVAILABLE'
          }));
          setIssues(augmented);
        } else {
          setIssues([]);
        }
      } catch (err) {
        console.error("Failed to fetch matchmaking data", err);
        setIssues([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadIssues();
  }, []);

  // OPERATIONAL_COMMAND Actions
  const handleClaim = (id: string) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: 'CLAIMED' } : issue));
  };

  const handleSaveToPortfolio = (id: string) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: 'PORTFOLIO' } : issue));
  };

  const filteredIssues = issues.filter(issue => 
    issue.repo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    issue.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '48px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header aligned with SYNTACTIC Granular Precision */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div>
          <h1 className="animate-fade-in" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
            Developer Matchmaking
          </h1>
          <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '0.9rem' }}>
            High-density skill correlation matrix. Analyzing active codebase gaps against your portfolio signature.
          </p>
        </div>
        
        {/* LINEAR_STYLE_COMMAND_K_MATRIX: Input Field */}
        <div style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="Search matrix..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 14px', 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              color: 'var(--foreground)', 
              borderRadius: '6px', 
              fontSize: '0.9rem'
            }} 
          />
          <div style={{ position: 'absolute', right: '12px', top: '10px', color: '#8b949e', fontSize: '0.8rem', pointerEvents: 'none', border: '1px solid var(--border)', padding: '2px 6px', borderRadius: '4px' }}>
            ⌘K
          </div>
        </div>
      </header>

      {/* High-Density Columnar Schema (VERCEL_STYLE_DEPLOYMENT_TELEMETRY) */}
      <div className="glass-container animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
        
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '80px 3fr 1.5fr 1fr 180px', 
          gap: '16px', 
          padding: '12px 24px', 
          background: 'rgba(22, 27, 34, 0.9)', 
          borderBottom: '1px solid var(--border)',
          fontSize: '0.8rem',
          color: '#8b949e',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}>
          <div>Match</div>
          <div>Repository / Issue Target</div>
          <div>Telemetry (Age / PR Velocity)</div>
          <div>Capabilities</div>
          <div style={{ textAlign: 'right' }}>Operational Command</div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#8b949e', fontSize: '0.9rem' }}>
            Synchronizing with global contribution graph...
          </div>
        )}

        {/* Data Rows */}
        {!loading && filteredIssues.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#8b949e', fontSize: '0.9rem' }}>
            No viable match vectors found matching your parameters.
          </div>
        )}

        {!loading && filteredIssues.map(issue => (
          <div key={issue.id} style={{ 
            display: 'grid', 
            gridTemplateColumns: '80px 3fr 1.5fr 1fr 180px', 
            gap: '16px', 
            padding: '16px 24px', 
            borderBottom: '1px solid var(--border)',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            
            {/* Match Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                background: issue.matchScore > 90 ? 'var(--success)' : (issue.matchScore > 75 ? 'orange' : 'var(--danger)'),
                boxShadow: `0 0 8px ${issue.matchScore > 90 ? 'var(--success)' : (issue.matchScore > 75 ? 'orange' : 'var(--danger)')}`
              }} />
              <span style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem' }}>{issue.matchScore}%</span>
            </div>

            {/* Target Vector (Repo & Issue) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href={`https://github.com/${issue.repo}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.95rem' }}>
                {issue.repo}
              </a>
              <a href={`https://github.com/${issue.repo}/issues`} target="_blank" rel="noreferrer" style={{ color: 'var(--foreground)', fontSize: '1.05rem', fontWeight: 600 }}>
                {issue.issue}
              </a>
            </div>

            {/* Chronological Velocity Telemetry */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--foreground)' }}>Opened {issue.timeOpen}</div>
              <div style={{ color: issue.velocityDelta.startsWith('+') ? 'var(--success)' : 'orange', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '1rem' }}>{issue.velocityDelta.startsWith('+') ? '↑' : '↓'}</span>
                {issue.velocityDelta}
              </div>
            </div>

            {/* Tags / Capabilities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {issue.tags.map(tag => (
                <span key={tag} style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#e0e0e0', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Operational Command: Explicit Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              {issue.status === 'AVAILABLE' && (
                <button 
                  onClick={() => handleClaim(issue.id)}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Claim Issue
                </button>
              )}
              {issue.status === 'CLAIMED' && (
                <button 
                  onClick={() => handleSaveToPortfolio(issue.id)}
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Verify & Save
                </button>
              )}
              {issue.status === 'PORTFOLIO' && (
                <span style={{ 
                  color: 'var(--success)', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }}>
                  ✓ Portfolio Verified
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}