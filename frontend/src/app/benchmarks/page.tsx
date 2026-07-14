import { createClient } from '@/utils/supabase/server';

async function fetchBenchmarksData(token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('http://127.0.0.1:8000/api/core/benchmarks/', {
      headers,
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

// Helper function to provide a conceptual description of feature parity
function getParityDescription(score: number): string {
  if (score >= 90) return "Near-complete";
  if (score >= 70) return "Strong alignment";
  if (score >= 50) return "Moderate alignment";
  return "Foundational";
}

// Helper to get a color for the score for visual density
function getParityColor(score: number): string {
  if (score >= 90) return "var(--success)";
  if (score >= 70) return "orange";
  if (score >= 50) return "#ff8c00"; // Dark orange
  return "var(--danger)";
}

export default async function Benchmarks() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const products = await fetchBenchmarksData(session?.access_token);

  // System metrics
  const totalProprietaryProducts = products.length;
  const totalTrackedAlternatives = products.reduce((acc: number, p: any) => acc + (p.alternatives?.length || 0), 0);

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header aligned with SYNTACTIC Granular Precision */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
            Competitive Benchmarks
          </h1>
          <p style={{ color: '#8b949e', marginTop: '8px', fontSize: '0.9rem' }}>
            High-density tracking of open-source parity against proprietary monopolies.
          </p>
        </div>
        
        {/* LINEAR_STYLE_COMMAND_K_MATRIX: System Telemetry Stats */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.8rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proprietary Monopolies</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>{totalProprietaryProducts}</span>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.8rem', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Open Alternatives</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{totalTrackedAlternatives}</span>
          </div>
        </div>
      </header>

      {/* High-Density Columnar Schema (VERCEL_STYLE_DEPLOYMENT_TELEMETRY) */}
      <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', background: 'rgba(22, 27, 34, 0.5)' }}>
        
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', 
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
          <div>Proprietary Target</div>
          <div>Open-Source Rival</div>
          <div>Parity Score</div>
          <div>Telemetry (30d)</div>
          <div style={{ textAlign: 'right' }}>Status</div>
        </div>

        {products.length === 0 ? (
           <div style={{ padding: '48px', textAlign: 'center', color: '#8b949e', fontSize: '0.9rem' }}>
             No benchmark relationships currently defined.
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {products.map((p: any) => (
              <div key={p.id} style={{ display: 'contents' }}>
                {p.alternatives && p.alternatives.length > 0 ? (
                  p.alternatives.map((alt: any, i: number) => (
                    <div key={alt.id} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', 
                      gap: '16px', 
                      padding: '16px 24px', 
                      borderBottom: '1px solid var(--border)',
                      alignItems: 'center',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                    }}>
                      
                      {/* Target */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{p.name}</span>
                        <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>{p.category}</span>
                      </div>

                      {/* Rival */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{alt.name}</span>
                        <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>{getParityDescription(alt.feature_parity_score)}</span>
                      </div>

                      {/* Parity Score */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          background: getParityColor(alt.feature_parity_score),
                          boxShadow: `0 0 8px ${getParityColor(alt.feature_parity_score)}`
                        }} />
                        <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{alt.feature_parity_score}%</span>
                      </div>

                      {/* Chronological Velocity (Mock Telemetry) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: alt.feature_parity_score > 70 ? 'var(--success)' : 'orange', fontWeight: 600, fontSize: '0.9rem' }}>
                          {alt.feature_parity_score > 70 ? '↑ +5%' : '↑ +2%'}
                        </span>
                        <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>30d</span>
                      </div>

                      {/* Operational Status */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          background: 'rgba(255,255,255,0.1)', 
                          borderRadius: '6px', 
                          color: '#e0e0e0', 
                          fontSize: '0.8rem', 
                          fontWeight: 500 
                        }}>
                          {alt.feature_parity_score >= 90 ? 'Deployment Ready' : 'In Progress'}
                        </span>
                      </div>

                    </div>
                  ))
                ) : (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 3fr', 
                    gap: '16px', 
                    padding: '16px 24px', 
                    borderBottom: '1px solid var(--border)',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{p.name}</span>
                      <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>{p.category}</span>
                    </div>
                    <div style={{ color: '#8b949e', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      No viable alternative tracked. Opportunity identified.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}