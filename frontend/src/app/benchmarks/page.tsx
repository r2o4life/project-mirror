import { createClient } from '@/utils/supabase/server';

async function fetchBenchmarksData(token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('http://127.0.0.1:8000/api/core/benchmarks/', {
      headers,
      // CRITICAL: Changed cache strategy to enforce ATEMPORAL_PERMANENCE.
      // Data is treated as historical/static, revalidated weekly.
      next: { revalidate: 3600 * 24 * 7 } // Revalidate every 7 days
    });

    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

// Helper function to provide a conceptual description of feature parity
function getParityDescription(score: number): string {
  if (score >= 90) return "Near-complete feature parity achieved.";
  if (score >= 70) return "Strong alignment with core features.";
  if (score >= 50) return "Moderate feature alignment identified.";
  return "Foundational feature set established.";
}

// Helper to get a color for the score for visual density
function getParityColor(score: number): string {
  if (score >= 90) return "var(--success)";
  if (score >= 70) return "var(--warning)"; // Standardized to use CSS variable
  if (score >= 50) return "var(--orange)"; // Assuming a custom orange CSS variable
  return "var(--danger)";
}

export default async function Benchmarks() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const products = await fetchBenchmarksData(session?.access_token);

  // System metrics - these are now static, conceptual aggregates for bento blocks
  const totalProprietaryProducts = products.length;
  const totalTrackedAlternatives = products.reduce((acc: number, p: any) => acc + (p.alternatives?.length || 0), 0);

  // Prepare data for APPLE_STYLE_BENTO_GRID blocks
  const bentoBlocks: any[] = [];

  // Add summary blocks first, aligning with "High-impact macro grouping of disparate value propositions."
  // These are smaller blocks for conceptual compaction.
  bentoBlocks.push({
    type: 'summary',
    title: 'Proprietary Monopolies',
    value: totalProprietaryProducts,
    description: 'Total proprietary products currently tracked.',
    color: 'var(--foreground)',
    gridColumn: 'span 1', // Small block
    gridRow: 'span 1'
  });

  bentoBlocks.push({
    type: 'summary',
    title: 'Open Alternatives',
    value: totalTrackedAlternatives,
    description: 'Total open-source alternatives identified.',
    color: 'var(--success)',
    gridColumn: 'span 1', // Small block
    gridRow: 'span 1'
  });

  // Counter for applying a structured uneven layout pattern to benchmark/opportunity blocks
  let benchmarkOpportunityCounter = 0;

  // Add benchmark and opportunity blocks, applying the "uneven layout matrix grid"
  products.forEach((p: any) => {
    if (p.alternatives && p.alternatives.length > 0) {
      p.alternatives.forEach((alt: any) => {
        let gridColumn = 'span 2'; // Default large block
        let gridRow = 'span 1';

        // Apply a deliberate uneven layout pattern for visual interest and LATERAL_DISCOVERY
        if (benchmarkOpportunityCounter % 4 === 0) { // Every 4th block (0, 4, 8...)
          gridColumn = 'span 3'; // Extra wide block for high impact
        } else if (benchmarkOpportunityCounter % 4 === 1) { // Every 4th block (1, 5, 9...)
          gridColumn = 'span 2';
          gridRow = 'span 2'; // Taller block for varied density
        }
        // Other blocks (2, 3, 6, 7...) remain default 'span 2'

        bentoBlocks.push({
          type: 'benchmark',
          proprietaryName: p.name,
          proprietaryCategory: p.category,
          alternativeName: alt.name,
          parityScore: alt.feature_parity_score,
          description: getParityDescription(alt.feature_parity_score),
          status: alt.feature_parity_score >= 90 ? 'Deployment Ready' : 'In Progress',
          gridColumn,
          gridRow
        });
        benchmarkOpportunityCounter++;
      });
    } else {
      let gridColumn = 'span 2'; // Default large block
      let gridRow = 'span 1';

      // Apply the same uneven layout pattern for consistency
      if (benchmarkOpportunityCounter % 4 === 0) {
        gridColumn = 'span 3';
      } else if (benchmarkOpportunityCounter % 4 === 1) {
        gridColumn = 'span 2';
        gridRow = 'span 2';
      }

      bentoBlocks.push({
        type: 'opportunity',
        proprietaryName: p.name,
        proprietaryCategory: p.category,
        gridColumn,
        gridRow
      });
      benchmarkOpportunityCounter++;
    }
  });

  return (
    <div style={{
      padding: '64px 48px',
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>

      {/* Header - concise and static, aligning with ISOLATED_NODE and CONCEPTUAL_COMPACTION */}
      <header style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
          Competitive Benchmarks
        </h1>
        <p style={{ color: '#8b949e', marginTop: '12px', fontSize: '1.1rem', lineHeight: '1.6' }}>
          A conceptual overview of open-source feature parity against proprietary solutions.
          All metrics are historical snapshots, reflecting a specific point in time, ensuring <strong style={{ color: 'var(--primary)' }}>ATEMPORAL_PERMANENCE</strong>.
        </p>
      </header>

      {/* APPLE_STYLE_BENTO_GRID implementation */}
      <div style={{
        display: 'grid',
        // CRITICAL: Uneven layout matrix grid for high-impact macro grouping, favoring LATERAL_DISCOVERY
        gridTemplateColumns: 'repeat(4, 1fr)', // Base 4-column grid
        gridAutoRows: 'minmax(180px, auto)', // Minimum row height for bento feel
        gap: '20px',
        alignItems: 'stretch', // Ensure items stretch to fill grid area
      }}>
        {bentoBlocks.map((block, index) => {
          const isSummary = block.type === 'summary';
          const isOpportunity = block.type === 'opportunity';
          const isBenchmark = block.type === 'benchmark';

          return (
            <div
              key={index}
              style={{
                gridColumn: block.gridColumn, // Use pre-calculated span for uneven layout
                gridRow: block.gridRow,       // Use pre-calculated span for uneven layout
                background: 'rgba(22, 27, 34, 0.7)', // Darker background for bento blocks
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden',
                // PASSIVE_CONSUMPTION: No dynamic interactions or complex hover states
              }}
            >
              {isSummary && (
                <>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#8b949e',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 500
                  }}>
                    {block.title}
                  </div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: block.color,
                    lineHeight: 1
                  }}>
                    {block.value}
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#8b949e',
                    marginTop: '8px'
                  }}>
                    {block.description}
                  </p>
                </>
              )}

              {isBenchmark && (
                <>
                  {/* Macro Icon / Visual Element for CONCEPTUAL_COMPACTION */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: getParityColor(block.parityScore),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--background)',
                      boxShadow: `0 0 15px ${getParityColor(block.parityScore)}40`
                    }}>
                      {block.alternativeName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        margin: 0
                      }}>
                        {block.alternativeName}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#8b949e',
                        margin: '4px 0 0 0'
                      }}>
                        vs. {block.proprietaryName} ({block.proprietaryCategory})
                      </p>
                    </div>
                  </div>

                  {/* Short Narrative Sentence for ATEMPORAL_PERMANENCE */}
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--foreground)',
                    lineHeight: '1.5',
                    flexGrow: 1
                  }}>
                    {block.description}
                  </p>

                  {/* Key Metric & Status (Static, not dynamic) */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: getParityColor(block.parityScore),
                        lineHeight: 1
                      }}>
                        {block.parityScore}%
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        color: '#8b949e',
                        fontWeight: 500
                      }}>
                        Parity
                      </span>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#e0e0e0',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}>
                      {block.status}
                    </span>
                  </div>
                </>
              )}

              {isOpportunity && (
                <>
                  {/* Macro Icon for CONCEPTUAL_COMPACTION */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    color: 'var(--background)',
                    marginBottom: '12px',
                    boxShadow: '0 0 15px var(--danger)40'
                  }}>
                    💡
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--danger)',
                    margin: 0
                  }}>
                    Opportunity: {block.proprietaryName}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--foreground)',
                    lineHeight: '1.5',
                    flexGrow: 1
                  }}>
                    No viable open-source alternative currently tracked for this proprietary solution ({block.proprietaryCategory}).
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#8b949e',
                    marginTop: '16px'
                  }}>
                    Consider this a strategic area for open-source development.
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}