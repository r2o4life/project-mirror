export default function ArchitecturePage() {
  const stakes = [
    { key: "Governance", stake: "Code provenance, licensing, & project trust", impact: "High", metric: "100% CLA Verification" },
    { key: "Economics", stake: "Unlocking unutilized engineering labor equity", impact: "High", metric: "$0 Barrier to Entry" },
    { key: "Modernization", stake: "Shifting from siloed repos to a market graph", impact: "Critical", metric: "Market-Indexed Repos" },
    { key: "Sociology", stake: "Decentralizing software ownership & access", impact: "Medium", metric: "Global Contributor Pools" },
    { key: "Growth", stake: "Compounding a global alternative tech stack", impact: "Critical", metric: "Exponential Network Effects" }
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* STRIPE_STYLE_MEGA_FLYOUT inspired text headers (Spacious, Lateral) */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Architecture Specs
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            The systemic macro-stakes of transforming software contributions and open-source democratization.
            Project Mirror replaces fragmented exploration with a structured, market-aligned index.
          </p>
        </div>
        <div style={{ flex: 1, background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--primary)', fontSize: '1.1rem' }}>The Product-Market Fit</h3>
          <p style={{ margin: 0, color: '#8b949e', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Widespread workforce restructuring and corporate gatekeeping have left massive talent pools seeking alternative avenues. 
            Project Mirror captures this shift, providing an intentional framework for autonomous production.
          </p>
        </div>
      </header>

      {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY table for the G.E.M.S.G Stakes */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>The G.E.M.S.G. Stakes</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(22, 27, 34, 0.5)' }}>
          
          {/* Table Header */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 2fr 1fr 1fr', 
            gap: '16px', 
            padding: '12px 24px', 
            background: 'var(--surface)', 
            borderBottom: '1px solid var(--border)',
            fontSize: '0.8rem',
            color: '#8b949e',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>
            <div>Pillar</div>
            <div>Core Stake</div>
            <div>Impact Level</div>
            <div>Key Metric</div>
          </div>

          {/* Table Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {stakes.map((item, i) => (
              <div key={item.key} style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 2fr 1fr 1fr', 
                gap: '16px', 
                padding: '16px 24px', 
                borderBottom: '1px solid var(--border)',
                alignItems: 'center',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
              }}>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                  {item.key}
                </div>
                <div style={{ color: 'var(--foreground)' }}>
                  {item.stake}
                </div>
                <div>
                  <span style={{ 
                    padding: '4px 8px', 
                    background: item.impact === 'Critical' ? 'rgba(255,0,0,0.1)' : 'rgba(255,255,255,0.1)', 
                    color: item.impact === 'Critical' ? 'var(--danger)' : '#e0e0e0', 
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {item.impact}
                  </span>
                </div>
                <div style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {item.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
