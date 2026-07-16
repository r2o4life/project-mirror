import Link from "next/link";

export default function ParadigmsPage() {
  const paradigms = [
    {
      id: "APPLE_STYLE_BENTO_GRID",
      name: "Apple Style Bento Grid",
      description: "A rigid, heavy-cornered grid system used to group conceptual capabilities into distinct, digestible cells. Used primarily for landing pages and high-level feature overviews.",
      visual: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', minHeight: '80px', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '6px', height: '30px', gridColumn: 'span 2' }} />
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '40px' }} />
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '40px' }} />
        </div>
      )
    },
    {
      id: "STRIPE_STYLE_MEGA_FLYOUT",
      name: "Stripe Style Mega Flyout",
      description: "A spacious, multi-column dropdown or header layout used to present dense navigation or introductory thesis text without overwhelming the user.",
      visual: (
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', gap: '12px', minHeight: '80px', alignItems: 'center' }}>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '10px', width: '70%', borderRadius: '3px' }} />
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '7px', width: '100%', borderRadius: '3px' }} />
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '7px', width: '85%', borderRadius: '3px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
             <div style={{ background: 'var(--primary)', height: '20px', width: '100%', borderRadius: '3px' }} />
          </div>
        </div>
      )
    },
    {
      id: "LINEAR_STYLE_COMMAND_K_MATRIX",
      name: "Linear Style Command-K Matrix",
      description: "A dense, keyboard-optimized layout prioritizing data input and rapid configuration over visual breathing room. Used for forms, API documentation, and configuration hubs.",
      visual: (
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '80px', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', height: '18px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{ background: 'transparent', height: '18px', borderRadius: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '40%', height: '7px', background: 'var(--primary)', borderRadius: '2px', marginLeft: '8px' }} />
          </div>
          <div style={{ background: 'transparent', height: '18px', borderRadius: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '60%', height: '7px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginLeft: '8px' }} />
          </div>
        </div>
      )
    },
    {
      id: "VERCEL_STYLE_DEPLOYMENT_TELEMETRY",
      name: "Vercel Style Deployment Telemetry",
      description: "A brutally utilitarian table or log output used to communicate live status, performance metrics, and chronological progression. Relies heavily on monospace fonts and strict color coding.",
      visual: (
        <div style={{ padding: '16px', background: '#0d1117', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', minHeight: '80px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 8px var(--success)' }} />
            <div style={{ height: '6px', width: '80%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '6px', height: '6px', background: '#8b949e', borderRadius: '50%' }} />
            <div style={{ height: '6px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          </div>
        </div>
      )
    },
    {
      id: "CSS_PRIMITIVE_DATA_VISUALIZATION",
      name: "CSS Primitive Data Visualization",
      description: "A strict mandate to avoid emojis or literal image assets for abstract concepts. Relies exclusively on HTML structure and CSS properties (Grid, Flexbox, Opacity, Gradients) to dynamically render semantic representations like heatmaps, node connections, and deployment pipelines.",
      visual: (
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            <div style={{ width: '10px', height: '10px', background: 'var(--success)', opacity: 0.8, borderRadius: '2px' }} />
            <div style={{ width: '10px', height: '10px', background: 'var(--success)', opacity: 0.3, borderRadius: '2px' }} />
            <div style={{ width: '10px', height: '10px', background: 'var(--danger)', opacity: 1, borderRadius: '2px' }} />
          </div>
          <div style={{ width: '20px', height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), var(--primary))' }} />
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--primary)' }} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
          Global Web Paradigm Engine
        </h1>
        <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Project Mirror enforces a strict architectural design system. We do not use Tailwind utility classes for layout generation. Instead, we rely on semantic, defined paradigms that map structural intent to visual execution.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {paradigms.map((paradigm, index) => (
          <Link 
            key={paradigm.id} 
            href={`/paradigms/${paradigm.id.toLowerCase()}`} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              padding: '24px', 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '12px',
              textDecoration: 'none', 
              color: 'inherit', 
              // Apply gridColumn for the first item to create unevenness
              ...(index === 0 && paradigms.length > 1 && { gridColumn: '1 / -1' }), 
            }}
          >
            <div style={{ flexShrink: 0 }}>
              {paradigm.visual}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {paradigm.id.replace(/_/g, ' ')}
              </div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--foreground)', fontWeight: 700 }}>
                {paradigm.name}
              </h2>
              <p style={{ color: '#8b949e', margin: 0, lineHeight: 1.5, fontSize: '0.95rem' }}>
                {paradigm.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}