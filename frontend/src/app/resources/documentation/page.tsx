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

      {/* 
        BLUEPRINT: APPLE_STYLE_BENTO_GRID
        UX PILLARS:
        - ONTOLOGY (LATERAL_DISCOVERY): Each block is a clickable link for navigation.
        - EPISTEMOLOGY (ATEMPORAL_PERMANENCE): All content is static and descriptive.
        - KINETICS (PASSIVE_CONSUMPTION): Subtle hover effects provide non-disruptive feedback.
        - SENSORIAL (CONCEPTUAL_COMPACTION): High-impact macro grouping with clear icons, bold headlines, and concise narratives.
        - TELEOLOGY (ISOLATED_NODE): Each feature description is self-contained.
      */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        gridAutoRows: 'minmax(250px, auto)' // Ensures consistent minimum height for conceptual compaction
      }}>
        
        {/* Feature A - Competitive Benchmarking Matrix */}
        <a 
          href="/docs/competitive-benchmarking" // LATERAL_DISCOVERY route
          style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            gridColumn: 'span 2', // Uneven layout matrix grid
            textDecoration: 'none', 
            color: 'inherit', 
            cursor: 'pointer', 
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
          }}
          aria-label="Learn more about Competitive Benchmarking Matrix"
        >
          <div style={{ fontSize: '2.5rem' }}>📊</div> {/* Singular macro icon */}
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Competitive Benchmarking Matrix</h2> {/* Bold headline */}
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Big Tech Matchup Board</h3> {/* Supporting tagline */}
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}> {/* Short narrative sentence */}
            A comparison dashboard that lists popular paid software and shows how well open-source alternatives stack up against them. 
            The system pairs an open-source project directly to the paid tool it replaces, and measures how close the open alternative is to copying all of the paid tool's key features.
          </p>
        </a>

        {/* Feature B - Developer Matchmaking */}
        <a 
          href="/docs/developer-matchmaking" // LATERAL_DISCOVERY route
          style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
          }}
          aria-label="Learn more about Developer Matchmaking"
        >
          <div style={{ fontSize: '2.5rem' }}>⚡</div> {/* Singular macro icon */}
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Developer Matchmaking</h2> {/* Bold headline */}
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Resume Builder</h3> {/* Supporting tagline */}
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}> {/* Short narrative sentence */}
            A hub that matches developers' skills with the projects that need them most, while building a verifiable resume of their work. 
            Analyzes your skills and automatically suggests the exact code tasks you can solve.
          </p>
        </a>

        {/* Feature C - Autonomous Project Inception */}
        <a 
          href="/docs/project-inception" // LATERAL_DISCOVERY route
          style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
          }}
          aria-label="Learn more about Autonomous Project Inception"
        >
          <div style={{ fontSize: '2.5rem' }}>🧬</div> {/* Singular macro icon */}
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Autonomous Project Inception</h2> {/* Bold headline */}
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>The Launchpad</h3> {/* Supporting tagline */}
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}> {/* Short narrative sentence */}
            A startup wizard that makes it fast and easy to launch a brand new open-source alternative to an existing paid tool. 
            Automatically sets up standard folders, open-source licenses, roadmaps, and community guidelines.
          </p>
        </a>

        {/* Feature D - Governance & Trust Infrastructure */}
        <a 
          href="/docs/governance-trust" // LATERAL_DISCOVERY route
          style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            gridColumn: 'span 2', // Uneven layout matrix grid
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
          }}
          aria-label="Learn more about Governance & Trust Infrastructure"
        >
          <div style={{ fontSize: '2.5rem' }}>🛡️</div> {/* Singular macro icon */}
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>Governance & Trust Infrastructure</h2> {/* Bold headline */}
          <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)' }}>Project Safety & Pulse Monitoring</h3> {/* Supporting tagline */}
          <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0 }}> {/* Short narrative sentence */}
            The quality-control and security system that keeps projects legally clean, secure, and active. 
            Verifies who wrote incoming code (avoiding copy-paste legal problems) and analyzes whether a project is highly active or slowly dying.
          </p>
        </a>

      </div>

    </div>
  );
}