import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', position: 'relative' }}>
      
      <main style={{ zIndex: 10, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Atemporal Permanence: Bold, timeless manifesto heading */}
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '24px' }}>
            The Structural <br/>
            <span style={{ background: 'linear-gradient(90deg, var(--primary), var(--success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Contribution Engine.
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#8b949e', fontWeight: 500, lineHeight: 1.6 }}>
            Decoupling engineering labor from proprietary lock-in. Match your skills, benchmark monopolies, and spawn open alternatives.
          </p>
        </div>

        {/* APPLE_STYLE_BENTO_GRID: Flat, structural layout matrix */}
        <div style={{ 
          width: '100%', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px', 
          gridAutoRows: '280px' 
        }}>
          
          {/* Bento Cell 1: Benchmarks */}
          <Link href="/explore/benchmarks" style={{ 
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            position: 'relative', 
            overflow: 'hidden', 
            textDecoration: 'none' 
          }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '4px', alignItems: 'flex-end', height: '48px', opacity: 0.2 }}>
              <div style={{ width: '12px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '48px', background: 'var(--success)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '32px', background: '#ffffff', borderRadius: '2px' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Competitive Benchmarks</h2>
              <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
                Explore the global market graph. Compare open-source alternatives directly against proprietary monopolies.
              </p>
            </div>
          </Link>

          {/* Bento Cell 2: Matchmaking */}
          <Link href="/explore/matchmaking" style={{ 
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            position: 'relative', 
            overflow: 'hidden', 
            textDecoration: 'none' 
          }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '8px', height: '48px', opacity: 0.2 }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--primary)' }} />
              <div style={{ width: '24px', height: '2px', background: '#ffffff' }} />
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--success)' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Matchmaking</h2>
              <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
                Frictionless skill mapping to immediate codebase gaps.
              </p>
            </div>
          </Link>

          {/* Bento Cell 3: Autonomous Inception */}
          <Link href="/explore/spawn" style={{ 
            background: 'rgba(163, 113, 247, 0.05)',
            border: '1px solid rgba(163, 113, 247, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            position: 'relative', 
            overflow: 'hidden', 
            textDecoration: 'none'
          }}>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', height: '48px', opacity: 0.2 }}>
              <div style={{ width: '40px', height: '6px', background: 'var(--primary)', borderRadius: '3px' }} />
              <div style={{ width: '28px', height: '6px', background: '#ffffff', borderRadius: '3px' }} />
              <div style={{ width: '48px', height: '6px', background: 'var(--success)', borderRadius: '3px' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Autonomous Inception</h2>
              <p style={{ color: 'var(--primary)', fontSize: '1.05rem', margin: 0 }}>
                Instantiate a new codebase rivaling proprietary tools with one click.
              </p>
            </div>
          </Link>

          {/* Bento Cell 4: Governance */}
          <Link href="/explore/governance" style={{ 
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            position: 'relative', 
            overflow: 'hidden', 
            textDecoration: 'none' 
          }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', width: '48px', height: '48px', opacity: 0.2 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '4px solid var(--primary)', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', top: '16px', left: '8px', width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Governance & Health</h2>
              <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
                High-fidelity tracking of project licensing, PR velocity, and distributed operational command.
              </p>
            </div>
          </Link>
          
        </div>

        {/* G.E.M.S.G. Stakes Summary Bar */}
        <div style={{ width: '100%', marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '16px 32px',
            display: 'flex',
            gap: '32px',
            color: '#8b949e',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>
            <span>Governance</span>
            <span>Economics</span>
            <span>Modernization</span>
            <span>Sociology</span>
            <span>Growth</span>
          </div>
        </div>

      </main>
    </div>
  );
}
