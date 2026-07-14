import Link from "next/link";

export default function ExploreSpawnPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Conceptual Thesis: Spawn Engine
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Rather than allowing proprietary corporations to dictate technological gatekeeping, Project Mirror democratizes the capability to build equivalents. 
            We provide the collective architecture required to systematically challenge software monopolies through open, community-driven development.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', height: '100%' }}>
          <Link href="/spawn" style={{
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
            Execute Inception Sequence ↗
          </Link>
        </div>
      </header>

      {/* STRIPE_STYLE_MEGA_FLYOUT / Text Columns for Lenses */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Sociological Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Democratized Architecture</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            Historically, launching a viable competitor to a monopoly required massive capital and gated infrastructure. Project Mirror addresses the Sociological stake by defying proprietary gatekeeping. It turns the complex process of architecting an alternative into a single, benchmark-driven action, decentralizing software ownership and returning access to the collective.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Growth Stake
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--foreground)', margin: 0 }}>Exponential Network Effects</h2>
          <p style={{ color: '#8b949e', lineHeight: 1.6 }}>
            By standardizing the inception of new projects—automating the setup of repositories, licenses, and community portals—we achieve exponential network effects. Every new project spawned natively expands the search and contribution surface area for the entire ecosystem, compounding the global alternative tech stack rather than siloing it.
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>Autonomous Project Inception</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--surface)' }}>
            
            <div style={{ 
              display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px', padding: '24px', 
              borderBottom: '1px solid var(--border)', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>Deployment Pipeline</span>
                <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>Abstract representation of the instant project instantiation process.</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <div style={{ width: '100%', height: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Genesis</span>
                </div>
                
                <div style={{ width: '24px', height: '2px', background: 'var(--border)' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <div style={{ width: '100%', height: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80%', background: 'var(--success)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provision</span>
                </div>

                <div style={{ width: '24px', height: '2px', background: 'var(--border)' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <div style={{ width: '100%', height: '8px', background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '20%', background: '#8b949e', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deploy</span>
                </div>
              </div>

            </div>

            <div style={{ 
              display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px', padding: '24px', 
              alignItems: 'center'
            }}>
              <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                Onboarding Automation
              </div>
              <div style={{ color: '#8b949e', fontSize: '0.95rem' }}>
                Minimizing onboarding friction for new projects by standardizing initial templates, roadmaps, and community links. The structural foundation is generated instantly.
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
