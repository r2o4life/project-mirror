import Link from "next/link";

export default function ExploreGovernancePage() {
  const metrics = [
    { label: "Code Provenance Verification", value: "Active", baseline: "Tracking CLAs, and project origins." },
    { label: "Project Health Analytics", value: "Tracking", baseline: "Developer velocity, community growth." }
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
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

      {/* STRIPE_STYLE_MEGA_FLYOUT / Text Columns for Lenses */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Governance Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Securing the Supply Chain</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            As software supply chains, license integrity, and project stewardship face unprecedented scrutiny, Project Mirror addresses the Governance stake by acting as a transparent validation framework. It prevents "copy-paste" legal liabilities by enforcing strict code provenance and explicitly tracking project origins, mitigating the risks that plague uncoordinated open-source contributions.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Project Stewardship
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Tracking Ecosystem Health</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            Ecosystem stewards require a persistent talent acquisition layer to ensure project longevity. By compiling dense analytics—measuring developer velocity, community growth, and active pull request closure rates—Project Mirror guarantees that alternative frameworks remain healthy, viable competitors rather than abandoned directories.
          </p>
        </div>
      </section>

      {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY with CSS_PRIMITIVE_DATA_VISUALIZATION */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>Trust Infrastructure</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(22, 27, 34, 0.5)' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 2fr', 
            gap: '16px', 
            padding: '24px', 
            background: 'var(--surface)', 
            borderBottom: '1px solid var(--border)',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>Ledger Activity Log</span>
              <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>Visual representation of continuous provenance verification pulses.</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#0d1117', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', overflow: 'hidden' }}>
              {Array.from({ length: 15 }).map((_, i) => {
                const isSuccess = Math.random() > 0.15;
                return (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '4px', background: '#8b949e', opacity: 0.3, borderRadius: '2px' }} />
                    <div style={{ 
                      flex: 1, 
                      height: '4px', 
                      background: isSuccess ? 'var(--success)' : 'var(--danger)', 
                      opacity: isSuccess ? Math.max(0.2, Math.random()) : 0.8,
                      borderRadius: '2px',
                      boxShadow: !isSuccess ? '0 0 4px var(--danger)' : 'none'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {metrics.map((metric, i) => (
              <div key={metric.label} style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr 2fr', 
                gap: '16px', 
                padding: '16px 24px', 
                borderBottom: i === metrics.length - 1 ? 'none' : '1px solid var(--border)',
                alignItems: 'center',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)'
                  }} />
                  <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{metric.label}</span>
                </div>
                <div style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.95rem' }}>
                  {metric.value}
                </div>
                <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>
                  {metric.baseline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
