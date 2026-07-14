export default function DocumentationPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
          Platform Documentation
        </h1>
        <p style={{ color: '#8b949e', marginTop: '12px', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>
          Project Mirror is an infrastructure-level intervention designed to solve structural contribution barriers. 
          Here is the Layman's Breakdown of the core ecosystem capabilities.
        </p>
      </header>

      {/* APPLE_STYLE_BENTO_GRID: High-impact macro grouping */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        gridAutoRows: 'minmax(250px, auto)'
      }}>
        
        {/* Feature A */}
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '16px', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          gridColumn: 'span 2'
        }}>
          <div style={{ fontSize: '2.5rem' }}>📊</div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Competitive Benchmarking Matrix</h2>
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Big Tech Matchup Board</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}>
            A comparison dashboard that lists popular paid software and shows how well open-source alternatives stack up against them. 
            The system pairs an open-source project directly to the paid tool it replaces, and measures how close the open alternative is to copying all of the paid tool's key features.
          </p>
        </div>

        {/* Feature B */}
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '16px', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Developer Matchmaking</h2>
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Resume Builder</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}>
            A hub that matches developers' skills with the projects that need them most, while building a verifiable resume of their work. 
            Analyzes your skills and automatically suggests the exact code tasks you can solve.
          </p>
        </div>

        {/* Feature C */}
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '16px', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ fontSize: '2.5rem' }}>🧬</div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Autonomous Project Inception</h2>
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Launchpad</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}>
            A startup wizard that makes it fast and easy to launch a brand new open-source alternative to an existing paid tool. 
            Automatically sets up standard folders, open-source licenses, roadmaps, and community guidelines.
          </p>
        </div>

        {/* Feature D */}
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '16px', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          gridColumn: 'span 2'
        }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Governance & Trust Infrastructure</h2>
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>Project Safety & Pulse Monitoring</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}>
            The quality-control and security system that keeps projects legally clean, secure, and active. 
            Verifies who wrote incoming code (avoiding copy-paste legal problems) and analyzes whether a project is highly active or slowly dying.
          </p>
        </div>

      </div>

    </div>
  );
}
