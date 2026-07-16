import Link from "next/link";

export default function ExploreGovernancePage() {
  const governancePillars = [
    { 
      icon: '📜', // Conceptual icon for Code Provenance
      label: "Code Provenance Verification", 
      description: "Ensuring the verifiable origin and integrity of all code contributions. This foundational layer tracks CLAs and project origins to prevent legal liabilities.",
      status: "Active" // Static descriptor, not a dynamic status
    },
    { 
      icon: '🌱', // Conceptual icon for Project Health
      label: "Project Health Analytics", 
      description: "Monitoring the vitality of projects through key indicators like developer velocity and community growth. This ensures sustained ecosystem health.",
      status: "Tracking" // Static descriptor
    }
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* Header: ISOLATED_NODE & PASSIVE_CONSUMPTION */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Conceptual Thesis: Governance
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            As software supply chains and license integrity face unprecedented scrutiny, Project Mirror positions itself as a transparent governance framework. 
            By tracking explicit developer commitments and project origins, it establishes a reliable infrastructure for distributed project ownership.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', height: '100%' }}>
          {/* Link for LATERAL_DISCOVERY, but still within ISOLATED_NODE context */}
          <Link href="/dashboard" style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: '1rem',
            display: 'block'
          }}>
            Review Trust Analytics ↗
          </Link>
        </div>
      </header>

      {/* STRIPE_STYLE_MEGA_FLYOUT inspired section: LATERAL_DISCOVERY & CONCEPTUAL_COMPACTION */}
      {/* Utilizes clean, spacious container groupings with highly descriptive subtext */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Governance Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Securing the Supply Chain</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            As software supply chains, license integrity, and project stewardship face unprecedented scrutiny, Project Mirror addresses the Governance stake by acting as a transparent validation framework. It prevents "copy-paste" legal liabilities by enforcing strict code provenance and explicitly tracking project origins, mitigating the risks that plague uncoordinated open-source contributions.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Project Stewardship
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Tracking Ecosystem Health</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            Ecosystem stewards require a persistent talent acquisition layer to ensure project longevity. By compiling dense analytics—measuring developer velocity, community growth, and active pull request closure rates—Project Mirror guarantees that alternative frameworks remain healthy, viable competitors rather than abandoned directories.
          </p>
        </div>
      </section>

      {/* APPLE_STYLE_BENTO_GRID inspired section: ATEMPORAL_PERMANENCE & CONCEPTUAL_COMPACTION */}
      {/* High-impact macro grouping of disparate value propositions, no dynamic metrics */}
      <section>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', marginBottom: '32px' }}>Mirror's Governance Framework</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
          gridAutoRows: 'minmax(180px, auto)', // Ensure minimum height for conceptual blocks
          gap: '24px' 
        }}>
          {governancePillars.map((pillar, i) => (
            <div 
              key={pillar.label} 
              style={{ 
                background: 'rgba(22, 27, 34, 0.5)', 
                border: '1px solid var(--border)', 
                borderRadius: '12px', 
                padding: '32px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                // Example of uneven layout for Bento Grid feel
                gridColumn: i === 0 ? 'span 1' : 'span 1', 
                gridRow: i === 0 ? 'span 1' : 'span 1',
              }}
            >
              {/* Singular Macro Icon */}
              <div style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '8px' }}>
                {pillar.icon}
              </div>
              {/* Bold Headline */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                {pillar.label}
              </h3>
              {/* Short Narrative Sentence */}
              <p style={{ color: '#8b949e', fontSize: '1rem', lineHeight: 1.5, flexGrow: 1 }}>
                {pillar.description}
              </p>
              {/* Static descriptor, not a dynamic metric */}
              <div style={{ 
                alignSelf: 'flex-start', 
                padding: '6px 12px', 
                borderRadius: '6px', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                background: pillar.status === 'Active' ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.15)',
                color: pillar.status === 'Active' ? 'var(--success)' : 'var(--warning)'
              }}>
                Status: {pillar.status}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}