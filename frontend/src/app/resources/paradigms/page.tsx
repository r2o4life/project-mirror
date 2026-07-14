import Link from "next/link";

export default function ParadigmsPage() {
  const paradigms = [
    {
      id: "APPLE_STYLE_BENTO_GRID",
      name: "Apple Style Bento Grid",
      description: "A rigid, heavy-cornered grid system used to group conceptual capabilities into distinct, digestible cells. Used primarily for landing pages and high-level feature overviews.",
      visual: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '16px', background: 'var(--surface)', borderRadius: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '40px', gridColumn: 'span 2' }} />
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '60px' }} />
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '60px' }} />
        </div>
      )
    },
    {
      id: "STRIPE_STYLE_MEGA_FLYOUT",
      name: "Stripe Style Mega Flyout",
      description: "A spacious, multi-column dropdown or header layout used to present dense navigation or introductory thesis text without overwhelming the user.",
      visual: (
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '12px', width: '60%', borderRadius: '4px' }} />
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', width: '100%', borderRadius: '4px' }} />
            <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', width: '80%', borderRadius: '4px' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
             <div style={{ background: 'var(--primary)', height: '24px', width: '100%', borderRadius: '4px' }} />
          </div>
        </div>
      )
    },
    {
      id: "LINEAR_STYLE_COMMAND_K_MATRIX",
      name: "Linear Style Command-K Matrix",
      description: "A dense, keyboard-optimized layout prioritizing data input and rapid configuration over visual breathing room. Used for forms, API documentation, and configuration hubs.",
      visual: (
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', height: '20px', borderRadius: '4px', border: '1px solid var(--border)' }} />
          <div style={{ background: 'transparent', height: '20px', borderRadius: '4px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '40%', height: '8px', background: 'var(--primary)', borderRadius: '2px', marginLeft: '8px' }} />
          </div>
          <div style={{ background: 'transparent', height: '20px', borderRadius: '4px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '60%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginLeft: '8px' }} />
          </div>
        </div>
      )
    },
    {
      id: "VERCEL_STYLE_DEPLOYMENT_TELEMETRY",
      name: "Vercel Style Deployment Telemetry",
      description: "A brutally utilitarian table or log output used to communicate live status, performance metrics, and chronological progression. Relies heavily on monospace fonts and strict color coding.",
      visual: (
        <div style={{ padding: '16px', background: '#0d1117', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace' }}>
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
        <div style={{ padding: '16px', background: 'var(--surface)', borderRadius: '8px', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--success)', opacity: 0.8, borderRadius: '2px' }} />
            <div style={{ width: '12px', height: '12px', background: 'var(--success)', opacity: 0.3, borderRadius: '2px' }} />
            <div style={{ width: '12px', height: '12px', background: 'var(--danger)', opacity: 1, borderRadius: '2px' }} />
          </div>
          <div style={{ width: '24px', height: '2px', background: 'linear-gradient(90deg, var(--border), var(--primary))' }} />
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      <header style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
          Global Web Paradigm Engine
        </h1>
        <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Project Mirror enforces a strict architectural design system. We do not use Tailwind utility classes for layout generation. Instead, we rely on semantic, defined paradigms that map structural intent to visual execution.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {paradigms.map(paradigm => (
          <div key={paradigm.id} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 2fr', 
            gap: '32px', 
            padding: '32px', 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '12px',
            alignItems: 'center'
          }}>
            <div>
              {paradigm.visual}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                {paradigm.id}
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--foreground)' }}>
                {paradigm.name}
              </h2>
              <p style={{ color: '#8b949e', margin: 0, lineHeight: 1.6 }}>
                {paradigm.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
