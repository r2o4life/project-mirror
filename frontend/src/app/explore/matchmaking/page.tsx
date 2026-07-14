import Link from "next/link";

export default function ExploreMatchmakingPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* STRIPE_STYLE_MEGA_FLYOUT text layout */}
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Conceptual Thesis: Matchmaking
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Macroeconomic instability has commoditized traditional tech roles, leaving vast pools of elite engineering talent underutilized. 
            Project Mirror captures this shift, unlocking a structured mechanism for developers to invest their labor directly into alternative digital infrastructure.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', height: '100%' }}>
          <Link href="/matchmaking" style={{
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
            Find Codebase Gaps ↗
          </Link>
        </div>
      </header>

      {/* STRIPE_STYLE_MEGA_FLYOUT / Text Columns for Lenses */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Economic Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Unlocking Labor Equity</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            The current tech market suffers from a profound mismatch between unutilized developer talent and static software development ecosystems. Project Mirror addresses the Economic stake by unlocking a structured mechanism for developers to invest their labor directly into alternative digital infrastructure, transforming unutilized time into global software utility. It decouples engineering contribution from traditional corporate gatekeeping.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Switching Costs
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>The Proof-of-Work Ledger</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            Once an engineer establishes a verifiable, compound contribution history within this centralized matrix, migrating to an isolated, flat directory incurs a prohibitive loss of professional equity. Project Mirror acts as a resume builder that is inherently tied to the market graph, establishing high switching costs through community trust and operational velocity.
          </p>
        </div>
      </section>

      {/* APPLE_STYLE_BENTO_GRID with CSS_PRIMITIVE_DATA_VISUALIZATION */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>The Resume Builder & Engine</h2>
        
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
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)' }}>Skill-to-Gap Matchmaking</h3>
              <p style={{ color: '#8b949e', lineHeight: 1.6, margin: '8px 0 0 0' }}>
                Abstract representation of routing unutilized developer nodes to critical codebase gaps.
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '32px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              
              <div style={{ position: 'absolute', top: '50%', left: '100px', right: '100px', height: '2px', background: 'var(--border)', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: '25%', left: '100px', right: '100px', height: '2px', background: 'var(--border)', opacity: 0.3, transform: 'rotate(15deg)', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: '75%', left: '100px', right: '100px', height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--success))', zIndex: 0, boxShadow: '0 0 8px var(--primary)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b949e' }} />
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(163,113,247,0.2)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b949e' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--surface)', border: '2px solid var(--border)' }} />
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--surface)', border: '2px solid var(--border)' }} />
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--surface)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(34,197,94,0.2)' }}>
                  <div style={{ width: '24px', height: '4px', background: 'var(--success)', borderRadius: '2px' }} />
                </div>
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
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--foreground)' }}>Verifiable Ledger</h3>
            <p style={{ color: '#8b949e', lineHeight: 1.6, margin: 0, flex: 1 }}>
              Accumulating a verifiable history of developer contributions to serve as an immutable portfolio vector.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--foreground)' }}>ARCHIVE Proof-of-Work</span>
              <span style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--foreground)' }}>READ Recommendations</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
