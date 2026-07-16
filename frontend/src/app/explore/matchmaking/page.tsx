import Link from "next/link";

export default function ExploreMatchmakingPage() {
  return (
    <div style={{ 
      padding: '64px 48px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '64px' 
    }}>
      
      {/* 
        Blueprint: STRIPE_STYLE_MEGA_FLYOUT
        Pillars: ONTOLOGY (LATERAL_DISCOVERY), SENSORIAL (CONCEPTUAL_COMPACTION)
        Implementation DNA: Clean, spacious container groupings with highly descriptive link subtext.
        Interactions purely exploratory; avoids raw data streams.
      */}
      <header style={{ 
        borderBottom: '1px solid var(--border)', 
        paddingBottom: '32px', 
        display: 'flex', 
        gap: '48px', 
        alignItems: 'flex-start' 
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: 'var(--foreground)', 
            margin: 0 
          }}>
            Conceptual Thesis: Matchmaking
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', // Consistent variable for secondary text
            marginTop: '16px', 
            fontSize: '1.1rem', 
            lineHeight: 1.6 
          }}>
            Macroeconomic instability has commoditized traditional tech roles, leaving vast pools of elite engineering talent underutilized. 
            Project Mirror captures this shift, unlocking a structured mechanism for developers to invest their labor directly into alternative digital infrastructure.
          </p>
        </div>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          justifyContent: 'center', 
          height: '100%' 
        }}>
          {/* LATERAL_DISCOVERY: Descriptive, exploratory link. KINETICS: PASSIVE_CONSUMPTION. */}
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

      {/* 
        Blueprint: STRIPE_STYLE_MEGA_FLYOUT (for informational grouping)
        Pillars: ONTOLOGY (LATERAL_DISCOVERY - setting context), SENSORIAL (CONCEPTUAL_COMPACTION)
        Implementation DNA: Clean, spacious container groupings with highly descriptive text.
        KINETICS: PASSIVE_CONSUMPTION (purely informational).
      */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            color: 'var(--primary)', 
            fontWeight: 600, 
            fontSize: '0.85rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            The Economic Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Unlocking Labor Equity</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The current tech market suffers from a profound mismatch between unutilized developer talent and static software development ecosystems. Project Mirror addresses the Economic stake by unlocking a structured mechanism for developers to invest their labor directly into alternative digital infrastructure, transforming unutilized time into global software utility. It decouples engineering contribution from traditional corporate gatekeeping.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            color: 'var(--primary)', 
            fontWeight: 600, 
            fontSize: '0.85rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            Switching Costs
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>The Proof-of-Work Ledger</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Once an engineer establishes a verifiable, compound contribution history within this centralized matrix, migrating to an isolated, flat directory incurs a prohibitive loss of professional equity. Project Mirror acts as a resume builder that is inherently tied to the market graph, establishing high switching costs through community trust and operational velocity.
          </p>
        </div>
      </section>

      {/* 
        Blueprint: APPLE_STYLE_BENTO_GRID
        Pillars: SENSORIAL (CONCEPTUAL_COMPACTION), EPISTEMOLOGY (ATEMPORAL_PERMANENCE)
        Implementation DNA: Uneven layout matrix grid. Each block: singular macro icon, bold headline, short narrative sentence.
        Absolute ATEMPORAL_PERMANENCE: forbidding dynamic metrics, timers, or real-time counters.
      */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>The Resume Builder & Engine</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          gridAutoRows: 'minmax(250px, auto)' // Ensures blocks have a minimum height for visual impact
        }}>
          
          {/* Bento Grid Item 1: Skill-to-Gap Matchmaking */}
          <div style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            gridColumn: 'span 2' // Uneven layout matrix grid for visual hierarchy
          }}>
            {/* Singular Macro Icon */}
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '8px' 
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10M7 7l10 10"/>
              </svg>
            </div>
            
            {/* Bold Headline */}
            <h3 style={{ 
              fontSize: '1.5rem', 
              margin: 0, 
              color: 'var(--foreground)', 
              fontWeight: 700 
            }}>
              Skill-to-Gap Matchmaking
            </h3>
            {/* Short Narrative Sentence */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6, 
              margin: '8px 0 0 0' 
            }}>
              Abstract representation of routing unutilized developer nodes to critical codebase gaps.
            </p>
            
            {/* ATEMPORAL_PERMANENCE: Static CSS visualization (not dynamic data) */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '32px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              marginTop: 'auto' 
            }}>
              
              <div style={{ position: 'absolute', top: '50%', left: '100px', right: '100px', height: '2px', background: 'var(--border)', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: '25%', left: '100px', right: '100px', height: '2px', background: 'var(--border)', opacity: 0.3, transform: 'rotate(15deg)', zIndex: 0 }} />
              <div style={{ position: 'absolute', top: '75%', left: '100px', right: '100px', height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--success))', zIndex: 0, boxShadow: '0 0 8px var(--primary)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 1 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)' }} />
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(163,113,247,0.2)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)' }} />
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

          {/* Bento Grid Item 2: Verifiable Ledger */}
          <div style={{ 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Singular Macro Icon */}
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: 'var(--accent-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>

            {/* Bold Headline */}
            <h3 style={{ 
              fontSize: '1.5rem', 
              margin: 0, 
              color: 'var(--foreground)', 
              fontWeight: 700 
            }}>
              Verifiable Ledger
            </h3>
            {/* Short Narrative Sentence */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.6, 
              margin: 0, 
              flex: 1 
            }}>
              Accumulating a verifiable history of developer contributions to serve as an immutable portfolio vector.
            </p>
            {/* ATEMPORAL_PERMANENCE: Static tags for conceptual compaction */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
              <span style={{ 
                background: 'var(--surface-dark)', // Consistent variable for background
                padding: '6px 12px', 
                borderRadius: '4px', 
                fontSize: '0.85rem', 
                color: 'var(--foreground)' 
              }}>ARCHIVE Proof-of-Work</span>
              <span style={{ 
                background: 'var(--surface-dark)', 
                padding: '6px 12px', 
                borderRadius: '4px', 
                fontSize: '0.85rem', 
                color: 'var(--foreground)' 
              }}>READ Recommendations</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}