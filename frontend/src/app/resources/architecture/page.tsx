"use client";

export default function ArchitecturePage() {
  const stakes = [
    { key: "Governance", stake: "Code provenance, licensing, & project trust", impact: "High", metric: "100% CLA Verification" },
    { key: "Economics", stake: "Unlocking unutilized engineering labor equity", impact: "High", metric: "$0 Barrier to Entry" },
    { key: "Modernization", stake: "Shifting from siloed repos to a market graph", impact: "Critical", metric: "Market-Indexed Repos" },
    { key: "Sociology", stake: "Decentralizing software ownership & access", impact: "Medium", metric: "Global Contributor Pools" },
    { key: "Growth", stake: "Compounding a global alternative tech stack", impact: "Critical", metric: "Exponential Network Effects" }
  ];

  // Helper to get a singular macro icon for each stake key, aligning with APPLE_STYLE_BENTO_GRID
  const getStakeIcon = (key: string) => {
    switch (key) {
      case "Governance": return "🏛️";
      case "Economics": return "💰";
      case "Modernization": return "🚀";
      case "Sociology": return "🤝";
      case "Growth": return "📈";
      default: return "✨";
    }
  };

  return (
    <div style={{ padding: '64px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      
      {/* 
        Blueprint: STRIPE_STYLE_MEGA_FLYOUT
        Core Utility: Contextual navigation with fluid spatial continuity.
        
        UX Taxonomy Pillars Applied:
        1. ONTOLOGY (Routing): [LATERAL_DISCOVERY] - The spacious layout and highly descriptive text encourage users to explore the foundational pillars presented below, acting as a contextual entry point.
        2. SENSORIAL (Visual Design & Density): [CONCEPTUAL_COMPACTION] - Information is grouped logically into two distinct, clear blocks, presenting a high-level overview without visual clutter.

        Implementation DNA Compliance:
        - Leverages standard semantic layout wrappers (`<header>`).
        - Uses clean, spacious container groupings (`gridTemplateColumns: '1fr 1fr'`, `gap: '48px'`).
        - Provides highly descriptive link subtext (the paragraphs) to favor LATERAL_DISCOVERY towards the content below.
        - Avoids raw data streams; content is purely exploratory and descriptive.
      */}
      <header style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', // Creates a spacious, two-column layout
        gap: '48px', 
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--border)', 
        paddingBottom: '32px' 
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
            Architecture Specs
          </h1>
          <p style={{ color: '#8b949e', marginTop: '16px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            The systemic macro-stakes of transforming software contributions and open-source democratization.
            Project Mirror replaces fragmented exploration with a structured, market-aligned index.
            Explore the foundational pillars that drive our vision and understand their core impact.
          </p>
        </div>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--primary)', fontSize: '1.1rem' }}>The Product-Market Fit</h3>
          <p style={{ margin: 0, color: '#8b949e', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Widespread workforce restructuring and corporate gatekeeping have left massive talent pools seeking alternative avenues. 
            Project Mirror captures this shift, providing an intentional framework for autonomous production.
            This section provides a high-level overview, encouraging further exploration of our unique value proposition.
          </p>
        </div>
      </header>

      {/* 
        Blueprint: APPLE_STYLE_BENTO_GRID for the G.E.M.S.G. Stakes
        Core Utility: High-impact macro grouping of disparate value propositions.

        UX Taxonomy Pillars Applied:
        1. SENSORIAL (Visual Design & Density): [CONCEPTUAL_COMPACTION] - Each stake is a self-contained, high-impact block, presenting complex ideas concisely with a macro icon, bold headline, and short narrative.
        2. EPISTEMOLOGY (Information Design): [ATEMPORAL_PERMANENCE] - Only static, narrative descriptions are shown. Dynamic metrics, impacts, or real-time counters (e.g., 'impact', 'metric' fields from `stakes` array) are strictly forbidden and omitted to ensure content permanence.
        3. KINETICS (Interaction Design): [PASSIVE_CONSUMPTION] - Interactions are limited to subtle visual feedback on hover, indicating no active navigation or data manipulation is expected. The `cursor: 'default'` reinforces this.
        4. TELEOLOGY (Macro-Flow): [ISOLATED_NODE] - Each content block, and the section as a whole, is presented as a complete, self-contained unit, requiring no further user action or leading to external flows.

        Implementation DNA Compliance:
        - Utilizes an uneven layout matrix grid (`repeat(auto-fit, minmax(280px, 1fr))`) for flexible, high-impact grouping.
        - Each block prioritizes a singular macro icon (`getStakeIcon`), a bold headline (`item.key`), and a short narrative sentence (`item.stake`).
        - Maintains absolute ATEMPORAL_PERMANENCE by explicitly forbidding and omitting dynamic metrics, timers, or real-time counters (e.g., `item.impact`, `item.metric` are not rendered).
      */}
      <section>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '24px' }}>The G.E.M.S.G. Stakes: Foundational Pillars</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Uneven layout matrix grid - flexible columns
          gap: '24px' 
        }}>
          {stakes.map((item) => (
            <div 
              key={item.key} 
              style={{ 
                background: 'var(--surface)', 
                border: '1px solid var(--border)', 
                borderRadius: '12px', 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                cursor: 'default' // Indicates passive consumption
              }}
              // KINETICS (PASSIVE_CONSUMPTION): Subtle visual feedback on hover
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Singular macro icon */}
              <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '8px' }}>
                {getStakeIcon(item.key)}
              </div>
              {/* Bold headline */}
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600, color: 'var(--primary)' }}>
                {item.key}
              </h3>
              {/* Short narrative sentence */}
              <p style={{ margin: 0, color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {item.stake}
              </p>
              {/* 
                EPISTEMOLOGY (ATEMPORAL_PERMANENCE): 
                The original 'impact' and 'metric' fields are explicitly omitted here.
                They imply dynamic states or measurements ("100% CLA Verification", "High"), 
                which are forbidden by the ATEMPORAL_PERMANENCE pillar for the Bento Grid blueprint.
                Only static, descriptive content is allowed.
              */}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}