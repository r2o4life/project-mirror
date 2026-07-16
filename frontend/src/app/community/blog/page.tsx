import CrowdsourceOptIn from '@/components/CrowdsourceOptIn';

export default function BlogPage() {
  return (
    <div style={{ padding: '64px 48px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* 
        This section adheres to:
        - EPISTEMOLOGY (ATEMPORAL_PERMANENCE): Static goal and commitments, descriptive text.
        - KINETICS (PASSIVE_CONSUMPTION): Information is presented for reading, not dynamic interaction.
        - SENSORIAL (CONCEPTUAL_COMPACTION): Focused message in a clean, contained block.
        - TELEOLOGY (ISOLATED_NODE): Self-contained primary content.
      */}
      <CrowdsourceOptIn
        platformName="Open Source Blog"
        description="The architectural transmission log. We will launch the publication platform for long-form case studies, paradigm blueprints, and engineering post-mortems once we have enough committed authors and readers."
        thresholdGoal={250}
        initialCommitments={215}
      />

      {/* 
        This new section addresses the ONTOLOGY (LATERAL_DISCOVERY) deviation.
        It leverages principles from STRIPE_STYLE_MEGA_FLYOUT for "clean, spacious container groupings with highly descriptive link subtext"
        to facilitate discovery from this ISOLATED_NODE to other potential nodes.
        Additionally, it incorporates elements of APPLE_STYLE_BENTO_GRID for "high-impact macro grouping"
        with "a singular macro icon, a bold headline, and a short narrative sentence" for each discovery block,
        maintaining ATEMPORAL_PERMANENCE and CONCEPTUAL_COMPACTION.
      */}
      <div style={{ borderTop: '1px solid #eee', paddingTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '2em', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Explore the Platform</h2>
        
        {/* 
          Grid container for LATERAL_DISCOVERY blocks.
          Utilizes a flexible grid for "uneven layout matrix grid" feel, adapting to content and screen size.
          Each block is a "clean, spacious container grouping" with "highly descriptive link subtext".
        */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          
          {/* Discovery Link 1: Case Studies - Bento-style block */}
          <a
            href="/blog/case-studies"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex', // Use flex for internal layout
              flexDirection: 'column', // Stack icon, title, description
              padding: '24px',
              border: '1px solid #ddd',
              borderRadius: '12px', // Slightly more rounded for a softer bento feel
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // More pronounced initial shadow
              backgroundColor: '#fff',
              justifyContent: 'flex-start', // Align content to the top
              minHeight: '180px', // Ensure consistent height for bento feel
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0070f3', e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,112,243,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ddd', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)')}
          >
            {/* Macro Icon Placeholder - for APPLE_STYLE_BENTO_GRID */}
            <div style={{ fontSize: '2.5em', marginBottom: '16px', color: '#0070f3' }}>
              🔬 {/* Example Icon */}
            </div>
            <h3 style={{ fontSize: '1.4em', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Case Studies</h3>
            <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.5' }}>Dive deep into real-world applications and engineering challenges. Learn from detailed analyses of successful implementations and critical post-mortems.</p>
          </a>

          {/* Discovery Link 2: Paradigm Blueprints - Bento-style block */}
          <a
            href="/blog/blueprints"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              minHeight: '180px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0070f3', e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,112,243,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ddd', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)')}
          >
            {/* Macro Icon Placeholder - for APPLE_STYLE_BENTO_GRID */}
            <div style={{ fontSize: '2.5em', marginBottom: '16px', color: '#0070f3' }}>
              📐 {/* Example Icon */}
            </div>
            <h3 style={{ fontSize: '1.4em', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Paradigm Blueprints</h3>
            <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.5' }}>Discover foundational architectural patterns and design philosophies. Understand the core principles guiding our development and strategic choices.</p>
          </a>

          {/* Discovery Link 3: Meet the Authors - Bento-style block */}
          <a
            href="/blog/authors"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              minHeight: '180px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0070f3', e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,112,243,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ddd', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)')}
          >
            {/* Macro Icon Placeholder - for APPLE_STYLE_BENTO_GRID */}
            <div style={{ fontSize: '2.5em', marginBottom: '16px', color: '#0070f3' }}>
              ✍️ {/* Example Icon */}
            </div>
            <h3 style={{ fontSize: '1.4em', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Meet the Authors</h3>
            <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.5' }}>Learn about the contributors shaping our content. Explore their expertise, publications, and commitment to open-source knowledge sharing.</p>
          </a>

          {/* Discovery Link 4: How to Contribute - Bento-style block */}
          <a
            href="/blog/contribute"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              minHeight: '180px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#0070f3', e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,112,243,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#ddd', e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)')}
          >
            {/* Macro Icon Placeholder - for APPLE_STYLE_BENTO_GRID */}
            <div style={{ fontSize: '2.5em', marginBottom: '16px', color: '#0070f3' }}>
              💡 {/* Example Icon */}
            </div>
            <h3 style={{ fontSize: '1.4em', fontWeight: '700', color: '#333', marginBottom: '8px' }}>How to Contribute</h3>
            <p style={{ fontSize: '0.95em', color: '#555', lineHeight: '1.5' }}>Join our community of writers and share your insights. Find guidelines, submission processes, and support for becoming a published author.</p>
          </a>
        </div>
      </div>
    </div>
  );
}