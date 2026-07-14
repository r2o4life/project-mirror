import Link from "next/link";

export default function ExploreBenchmarksPage() {
  const heatmapCells = Array.from({ length: 50 }).map((_, i) => {
    const isGap = i % 7 === 0 || i % 13 === 0;
    const isCritical = i === 14 || i === 27;
    return (
      <div 
        key={i} 
        style={{
          aspectRatio: '1',
          background: isCritical ? 'var(--danger)' : (isGap ? '#8b949e' : 'var(--success)'),
          opacity: isCritical ? 1 : (isGap ? 0.3 : Math.max(0.4, Math.random())),
          borderRadius: '2px'
        }}
      />
    );
  });

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* STRIPE_STYLE_MEGA_FLYOUT text layout */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Conceptual Thesis: Benchmarks
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            The historical model of uncoordinated, siloed open-source development is structurally inefficient. 
            Project Mirror replaces fragmented exploration with a structured, market-aligned index where open projects are explicitly defined by their relationship to existing industry solutions.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', height: '100%' }}>
          <Link href="/benchmarks" style={{
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
            Analyze Proprietary Monopolies ↗
          </Link>
        </div>
      </header>

      {/* STRIPE_STYLE_MEGA_FLYOUT / Text Columns for Lenses */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Modernization Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Establishing Product-Market Fit</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            Standard code repositories function as passive utilities, requiring high-friction discovery to map open software to market needs. Project Mirror addresses the modernization stake by acting as a directly competitive matrix. It inherently maps the global software landscape by positioning open-source projects as direct counterweights to specific proprietary offerings, providing instant contextual clarity regarding where developer labor is most critically required.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Engagement Dynamics
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Forcing Parity Reactions</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            By publicly tracking development parity (features, performance, scaling) between open-source alternatives and target proprietary platforms, we create a quantifiable pressure mechanism. This tracking forces proprietary monopolies to react to open alternatives, shifting the power dynamic from corporate gatekeeping to community-driven commoditization.
          </p>
        </div>
      </section>

      {/* APPLE_STYLE_BENTO_GRID with CSS_PRIMITIVE_DATA_VISUALIZATION */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>The Big Tech Matchup Board</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          gridAutoRows: 'minmax(250px, auto)'
        }}>
          
          <div style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            gridColumn: 'span 2'
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)' }}>Parity Heatmap</h3>
              <p style={{ color: '#8b949e', lineHeight: 1.6, margin: '8px 0 0 0' }}>
                Abstract visualization of feature parity between an open-source project and its proprietary target.
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(10, 1fr)', 
              gap: '4px',
              padding: '16px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}>
              {heatmapCells}
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '2px' }} />
                <span style={{ color: '#8b949e' }}>Feature Parity Reached</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', background: '#8b949e', opacity: 0.3, borderRadius: '2px' }} />
                <span style={{ color: '#8b949e' }}>Feature Missing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--danger)', borderRadius: '2px' }} />
                <span style={{ color: '#8b949e' }}>Critical Architectural Gap</span>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--foreground)' }}>Capabilities</h3>
            <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0, flex: 1 }}>
              Instantly track and benchmark open-source initiatives against proprietary targets.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--foreground)' }}>CREATE Proprietary Profiles</span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--foreground)' }}>UPDATE Parity Statuses</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
