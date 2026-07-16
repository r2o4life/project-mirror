// The CrowdsourceOptIn import is removed as its dynamic nature violates ATEMPORAL_PERMANENCE
// and its functionality is replaced by static, descriptive bento blocks.

export default function GitHubPage() {
  // Common styles for a bento grid block, ensuring visual consistency and adherence to
  // SENSORIAL (CONCEPTUAL_COMPACTION) and EPISTEMOLOGY (ATEMPORAL_PERMANENCE)
  const bentoBlockStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-surface, #1a1a1a)', // Example background for visual separation
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'space-between',
    minHeight: '180px', // Ensures blocks have a consistent minimum visual presence
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    border: '1px solid var(--border-color, #333)', // Border for definition
  };

  // Styles for the macro icon within each bento block
  const iconStyle: React.CSSProperties = {
    fontSize: '3rem', // Large size for "macro icon"
    marginBottom: '8px',
    lineHeight: '1', // Ensure icon doesn't add extra line height
  };

  // Styles for the bold headline within each bento block
  const headlineStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '700',
    lineHeight: '1.2',
    color: 'var(--text-primary, #f0f0f0)',
  };

  // Styles for the short narrative sentence within each bento block
  const narrativeStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: 'var(--text-secondary, #b0b0b0)',
  };

  return (
    <div
      style={{
        padding: '64px 48px',
        maxWidth: '1200px', // Increased max-width to accommodate a wider, more spacious grid
        margin: '0 auto',
        display: 'grid',
        // Utilizes an uneven layout matrix grid:
        // Responsive columns, minimum 300px wide, distributing remaining space.
        // Combined with 'gridColumn: span X' on individual items, this creates the unevenness.
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px', // Spacious gaps between blocks for clarity (STRIPE_STYLE_MEGA_FLYOUT)
      }}
    >
      {/* Block 1: Project Mirror Core - Spans 2 columns to create an uneven layout */}
      <div style={{ ...bentoBlockStyle, gridColumn: 'span 2' }}>
        <div style={iconStyle}>🐙</div> {/* Singular macro icon */}
        <h2 style={headlineStyle}>Project Mirror Core</h2> {/* Bold headline */}
        <p style={narrativeStyle}>
          The central nervous system for our open-source codebase. We provision the official Project Mirror organization and core repositories.
        </p> {/* Short narrative sentence, ATEMPORAL_PERMANENCE */}
      </div>

      {/* Block 2: Contribution Pathways - Standard size block */}
      <div style={bentoBlockStyle}>
        <div style={iconStyle}>📝</div> {/* Singular macro icon */}
        <h2 style={headlineStyle}>Contribution Pathways</h2> {/* Bold headline */}
        <p style={narrativeStyle}>
          Explore our guidelines for contributing code, documentation, and community support to the Project Mirror ecosystem.
        </p> {/* Short narrative sentence, ATEMPORAL_PERMANENCE */}
      </div>

      {/* Block 3: Community & Governance - Standard size block */}
      <div style={bentoBlockStyle}>
        <div style={iconStyle}>🤝</div> {/* Singular macro icon */}
        <h2 style={headlineStyle}>Community & Governance</h2> {/* Bold headline */}
        <p style={narrativeStyle}>
          Understand the structure and decision-making processes that guide the evolution of our open-source initiatives.
        </p> {/* Short narrative sentence, ATEMPORAL_PERMANENCE */}
      </div>

      {/* Block 4: Strategic Roadmap - Standard size block */}
      <div style={bentoBlockStyle}>
        <div style={iconStyle}>🗺️</div> {/* Singular macro icon */}
        <h2 style={headlineStyle}>Strategic Roadmap</h2> {/* Bold headline */}
        <p style={narrativeStyle}>
          Discover the long-term vision and key milestones for Project Mirror's development and expansion.
        </p> {/* Short narrative sentence, ATEMPORAL_PERMANENCE */}
      </div>

      {/* Block 5: Developer Resources - Adding another block to further demonstrate the grid's capacity */}
      <div style={bentoBlockStyle}>
        <div style={iconStyle}>🛠️</div> {/* Singular macro icon */}
        <h2 style={headlineStyle}>Developer Resources</h2> {/* Bold headline */}
        <p style={narrativeStyle}>
          Access essential tools, APIs, and documentation to integrate with and extend Project Mirror functionalities.
        </p> {/* Short narrative sentence, ATEMPORAL_PERMANENCE */}
      </div>
    </div>
  );
}