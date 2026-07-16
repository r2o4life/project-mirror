'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

// Define the augmented issue type for our telemetry & matchmaking
// EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] - Temporal aspects like velocityDelta and timeOpen are explicitly removed.
type MatchmakingIssue = {
  id: string;
  repo: string;
  issue: string;
  tags: string[];
  
  // VERCEL_STYLE_DEPLOYMENT_TELEMETRY (Chronological Velocity) - REMOVED TEMPORAL ASPECTS for ATEMPORAL_PERMANENCE
  matchScore: number; // e.g., 98 (This is a static metric, compliant with ATEMPORAL_PERMANENCE)
  // velocityDelta: string; // Removed: Temporal metric
  // timeOpen: string; // Removed: Temporal metric
  
  // OPERATIONAL_COMMAND state - Status kept as ATEMPORAL_PERMANENCE, actions removed for PASSIVE_CONSUMPTION
  status: 'AVAILABLE' | 'CLAIMED' | 'PORTFOLIO'; // Status is static, displayed passively.
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
          // Augment raw data with telemetry metrics, removing temporal aspects for ATEMPORAL_PERMANENCE
          const augmented = rawData.map((item: any, i: number) => ({
            id: `issue-${i}`,
            repo: item.repo,
            issue: item.issue,
            tags: item.tags || [],
            matchScore: 98 - (i * 3), // Mock score (static) - Compliant with ATEMPORAL_PERMANENCE
            status: 'AVAILABLE' // Default status, displayed statically - Compliant with ATEMPORAL_PERMANENCE
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

  // OPERATIONAL_COMMAND Actions - Removed due to KINETICS: [PASSIVE_CONSUMPTION]
  // The original component correctly removed these interactive elements.
  // const handleClaim = (id: string) => { ... };
  // const handleSaveToPortfolio = (id: string) => { ... };

  const filteredIssues = issues.filter(issue => 
    issue.repo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    issue.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) // Enhanced search for ONTOLOGY: [LATERAL_DISCOVERY]
  );

  return (
    // TELEOLOGY: [ISOLATED_NODE] - The component provides a complete, self-contained experience.
    <div style={{ 
      padding: '48px', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '48px', // Increased gap for spaciousness (STRIPE_STYLE_MEGA_FLYOUT influence on SENSORIAL)
      fontFamily: 'Inter, sans-serif' // Modern font for SENSORIAL: [CONCEPTUAL_COMPACTION]
    }}>
      
      {/* Header aligned with STRIPE_STYLE_MEGA_FLYOUT for spaciousness and clear information hierarchy */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        paddingBottom: '24px', 
        borderBottom: '1px solid var(--border)',
        gap: '24px',
        flexWrap: 'wrap' 
      }}>
        <div>
          <h1 className="animate-fade-in" style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: 'var(--foreground)', 
            margin: 0,
            letterSpacing: '-0.02em' 
          }}>
            Developer Matchmaking
          </h1>
          <p style={{ 
            color: 'var(--accents-5)', 
            marginTop: '12px', 
            fontSize: '1.1rem', 
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            High-density skill correlation matrix. Analyzing active codebase gaps against your portfolio signature.
            Discover opportunities for impactful contributions. {/* ONTOLOGY: [LATERAL_DISCOVERY] - Descriptive text */}
          </p>
        </div>
        
        {/* LINEAR_STYLE_COMMAND_K_MATRIX: Input Field for search, supporting ONTOLOGY: [LATERAL_DISCOVERY] */}
        <div style={{ position: 'relative', width: '300px', minWidth: '200px' }}>
          <input 
            type="text" 
            placeholder="Search issues, repos, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              background: 'var(--accents-1)', 
              border: '1px solid var(--border)', 
              color: 'var(--foreground)', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }} 
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
          <div style={{ 
            position: 'absolute', 
            right: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--accents-4)', 
            fontSize: '0.8rem', 
            pointerEvents: 'none', 
            border: '1px solid var(--accents-3)', 
            padding: '4px 8px', 
            borderRadius: '6px', 
            background: 'var(--accents-2)',
            fontWeight: 500
          }}>
            ⌘K
          </div>
        </div>
      </header>

      {/* APPLE_STYLE_BENTO_GRID for Matchmaking Issues (SENSORIAL: [CONCEPTUAL_COMPACTION], EPISTEMOLOGY: [ATEMPORAL_PERMANENCE]) */}
      <div className="glass-container animate-fade-in" style={{ 
        padding: '0', 
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Uneven layout matrix grid
        gridAutoRows: 'minmax(180px, auto)', // Ensures minimum height, allows content to dictate more
        gap: '24px', 
        alignItems: 'stretch', 
      }}>
        
        {/* Loading State - EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] (static message) */}
        {loading && (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '64px', 
            textAlign: 'center', 
            color: 'var(--accents-5)', 
            fontSize: '1.1rem',
            background: 'var(--surface)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Synchronizing with global contribution graph...
          </div>
        )}

        {/* Empty State - EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] (static message) */}
        {!loading && filteredIssues.length === 0 && (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '64px', 
            textAlign: 'center', 
            color: 'var(--accents-5)', 
            fontSize: '1.1rem',
            background: 'var(--surface)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            No viable match vectors found matching your parameters.
          </div>
        )}

        {/* Data Rows - Each div represents a "block" in the APPLE_STYLE_BENTO_GRID */}
        {!loading && filteredIssues.map(issue => (
          <div 
            key={issue.id} 
            style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer', // Indicates LATERAL_DISCOVERY potential
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            // KINETICS: [PASSIVE_CONSUMPTION] - Hover effects are purely visual feedback, not state-changing interactions.
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Macro Icon & Match Score (SENSORIAL: [CONCEPTUAL_COMPACTION], EPISTEMOLOGY: [ATEMPORAL_PERMANENCE]) */}
            {/* This serves as the "singular macro icon" and part of the "bold headline" for the value proposition. */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: 'var(--primary)', 
              marginBottom: '8px' 
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
              <span style={{ 
                fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', 
                fontWeight: 700, 
                color: issue.matchScore > 90 ? 'var(--success)' : (issue.matchScore > 75 ? 'var(--warning)' : 'var(--danger)'),
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}>
                {issue.matchScore}% Match {/* Static score, ATEMPORAL_PERMANENCE */}
              </span>
            </div>

            {/* Bold Headline (Issue) - ONTOLOGY: [LATERAL_DISCOVERY] & SENSORIAL: [CONCEPTUAL_COMPACTION] */}
            {/* This is the "bold headline" for the specific opportunity. */}
            <a 
              href={`https://github.com/${issue.repo}/issues`} 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                color: 'var(--foreground)', 
                fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)', 
                fontWeight: 700, 
                lineHeight: '1.3',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}
            >
              {issue.issue}
            </a>

            {/* Short Narrative Sentence (Repo) - ONTOLOGY: [LATERAL_DISCOVERY] & SENSORIAL: [CONCEPTUAL_COMPACTION] */}
            {/* This provides the "short narrative sentence" context. */}
            <a 
              href={`https://github.com/${issue.repo}`} 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                color: 'var(--accents-6)', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accents-6)'}
            >
              {issue.repo}
            </a>

            {/* Tags / Capabilities - SENSORIAL: [CONCEPTUAL_COMPACTION] & ONTOLOGY: [LATERAL_DISCOVERY] */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
              {issue.tags.map(tag => (
                <span key={tag} style={{ 
                  background: 'var(--accents-2)', 
                  color: 'var(--accents-7)', 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: '1px solid var(--accents-3)'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Status Badge - EPISTEMOLOGY: [ATEMPORAL_PERMANENCE], KINETICS: [PASSIVE_CONSUMPTION], SENSORIAL: [CONCEPTUAL_COMPACTION] */}
            {/* This is a static display of status, not an interactive element. */}
            <div style={{ 
              position: 'absolute', 
              top: '24px', 
              right: '24px', 
              padding: 'clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)', 
              borderRadius: '20px', 
              fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', 
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: issue.status === 'AVAILABLE' ? 'rgba(0,128,255,0.1)' : 
                          issue.status === 'CLAIMED' ? 'rgba(255,165,0,0.1)' : 
                          'rgba(0,128,0,0.1)',
              color: issue.status === 'AVAILABLE' ? 'var(--primary)' : 
                     issue.status === 'CLAIMED' ? 'var(--warning)' : 
                     'var(--success)',
              border: `1px solid ${issue.status === 'AVAILABLE' ? 'var(--primary)' : 
                                  issue.status === 'CLAIMED' ? 'var(--warning)' : 
                                  'var(--success)'}`
            }}>
              {issue.status}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}