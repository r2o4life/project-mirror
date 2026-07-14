'use client';

export default function APIReferencePage() {
  const endpoints = [
    { method: 'CREATE', path: '/api/benchmarks/targets', desc: 'Provision proprietary software profiles and benchmarking criteria.' },
    { method: 'READ', path: '/api/benchmarks/matrix', desc: 'Fetch benchmarking matrix data and feature checklist comparisons.' },
    { method: 'UPDATE', path: '/api/benchmarks/parity', desc: 'Patch feature parity statuses (e.g., In Progress, Completed).' },
    { method: 'CREATE', path: '/api/matchmaking/profiles', desc: 'Register new contributor profile and skill sets.' },
    { method: 'READ', path: '/api/matchmaking/recommendations', desc: 'Compute matchmaking recommendations against open issue lists.' },
    { method: 'CREATE', path: '/api/spawn/projects', desc: 'Instantiate brand new open-source alternative mapped to a benchmark.' },
    { method: 'PURGE', path: '/api/spawn/projects/{id}', desc: 'Permanently delete projects flagged as malicious or severe violations.' },
    { method: 'CREATE', path: '/api/governance/cla', desc: 'Register contribution logs and CLA approvals.' },
    { method: 'READ', path: '/api/governance/health', desc: 'Fetch repository health reports and contributor density statistics.' },
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
          API Reference
        </h1>
        <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '0.9rem' }}>
          Low-level functional mapping and database operations for Project Mirror capabilities.
        </p>
      </header>

      {/* LINEAR_STYLE_COMMAND_K_MATRIX */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Search Mockup */}
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '8px', 
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ color: '#8b949e' }}>⌘K</span>
          <input 
            type="text" 
            placeholder="Search API endpoints..." 
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--foreground)',
              width: '100%',
              fontSize: '1rem'
            }}
            disabled
          />
        </div>

        {/* Endpoints List */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--surface)' }}>
          {endpoints.map((endpoint, i) => {
            let methodColor = '#8b949e';
            if (endpoint.method === 'CREATE') methodColor = 'var(--success)';
            if (endpoint.method === 'READ') methodColor = '#58a6ff';
            if (endpoint.method === 'UPDATE') methodColor = '#d2a8ff';
            if (endpoint.method === 'PURGE' || endpoint.method === 'DELETE') methodColor = 'var(--danger)';

            return (
              <div key={i} style={{ 
                display: 'grid', 
                gridTemplateColumns: '100px 300px 1fr', 
                gap: '16px', 
                padding: '12px 16px', 
                borderBottom: i === endpoints.length - 1 ? 'none' : '1px solid var(--border)',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: methodColor, fontWeight: 600, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {endpoint.method}
                </div>
                <div style={{ color: 'var(--foreground)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {endpoint.path}
                </div>
                <div style={{ color: '#8b949e', fontSize: '0.85rem' }}>
                  {endpoint.desc}
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
