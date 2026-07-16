'use client';

export default function APIReferencePage() {
  const allEndpoints = [
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

  // Group endpoints by their primary path segment to facilitate LATERAL_DISCOVERY and CONCEPTUAL_COMPACTION
  const groupedEndpoints = allEndpoints.reduce((acc, endpoint) => {
    const segment = endpoint.path.split('/')[2]; // e.g., 'benchmarks', 'matchmaking'
    if (!acc[segment]) {
      acc[segment] = [];
    }
    acc[segment].push(endpoint);
    return acc;
  }, {});

  // Define structured groups with titles and descriptions for enhanced LATERAL_DISCOVERY
  const endpointGroups = [
    {
      key: "benchmarks",
      title: "Benchmarks",
      description: "Tools for evaluating software profiles and performance against defined criteria.",
      endpoints: groupedEndpoints.benchmarks || []
    },
    {
      key: "matchmaking",
      title: "Matchmaking",
      description: "Connecting contributors with open-source opportunities and skill-based recommendations.",
      endpoints: groupedEndpoints.matchmaking || []
    },
    {
      key: "spawn",
      title: "Spawn",
      description: "Capabilities for initiating and managing new open-source projects.",
      endpoints: groupedEndpoints.spawn || []
    },
    {
      key: "governance",
      title: "Governance",
      description: "Mechanisms for tracking contributions, approvals, and repository health.",
      endpoints: groupedEndpoints.governance || []
    },
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
          API Reference
        </h1>
        <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '0.9rem' }}>
          Low-level functional mapping and database operations for Project Mirror capabilities.
        </p>
      </header>

      {/* Search Mockup - Retained as disabled to enforce PASSIVE_CONSUMPTION */}
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

      {/* Grouped Endpoints List - Aligns with STRIPE_STYLE_MEGA_FLYOUT for spacious groupings and APPLE_STYLE_BENTO_GRID for macro grouping */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}> {/* Increased gap for clear separation between conceptual groups */}
        {endpointGroups.map((group) => (
          <div key={group.key} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}> {/* Container for each conceptual group */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
              {group.title}
            </h2>
            <p style={{ color: '#8b949e', fontSize: '0.9rem', marginBottom: '8px' }}>
              {group.description}
            </p>

            <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--surface)' }}>
              {group.endpoints.map((endpoint, i) => {
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
                    padding: '16px', // Increased padding for a more spacious feel (CONCEPTUAL_COMPACTION)
                    borderBottom: i === group.endpoints.length - 1 ? 'none' : '1px solid var(--border)',
                    alignItems: 'center',
                    // Removed interactive styles (cursor: 'pointer', onMouseOver, onMouseOut) to enforce PASSIVE_CONSUMPTION
                  }}>
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
        ))}
      </div>
    </div>
  );
}