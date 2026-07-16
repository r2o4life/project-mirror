"use client";

import Link from "next/link";

export default function Home() {
  return (
    // Outer container: Establishes the ISOLATED_NODE context for the page.
    // SENSORIAL: [CONCEPTUAL_COMPACTION] - Ample padding and min-height ensure a spacious, focused presentation.
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      position: 'relative',
    }}>

      {/* Main content area: Constrains width and centers elements for optimal readability. */}
      <main style={{
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* Manifesto Heading: Core value proposition of the platform. */}
        {/* EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] - A bold, timeless statement, free from transient data. */}
        {/* SENSORIAL: [CONCEPTUAL_COMPACTION] - Large, impactful typography to convey the core concept concisely. */}
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '800px' }}>
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            marginBottom: '24px',
          }}>
            The Structural <br />
            <span style={{ background: 'linear-gradient(90deg, var(--primary), var(--success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Contribution Engine.
            </span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#8b949e',
            fontWeight: 500,
            lineHeight: 1.6,
          }}>
            Decoupling engineering labor from proprietary lock-in. Match your skills, benchmark monopolies, and spawn open alternatives.
          </p>
        </div>

        {/* Refactored: Operational Command Center - Direct Action & Lateral Discovery Gateways */}
        {/* This section provides explicit entry points for user actions and access to dynamic data,
            segregating them from ATEMPORAL_PERMANENCE content by acting as gateways rather than displays. */}
        {/* ONTOLOGY: [LATERAL_DISCOVERY] - Provides distinct, clearly labeled entry points for active engagement. */}
        {/* EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] - Content here is static, descriptive, and leads to dynamic data elsewhere. */}
        {/* KINETICS: [OPERATIONAL_COMMAND] - Explicit interactive elements with clear visual feedback for data creation and management. */}
        {/* SENSORIAL: [CONCEPTUAL_COMPACTION] - Grouped actions, visually distinct but integrated, with concise information. */}
        {/* TELEOLOGY: [SEQUENTIAL_ORCHESTRATION] - Each action leads to a specific, orchestrated workflow or dashboard. */}
        <div style={{
          width: '100%',
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          marginBottom: '64px',
        }}>
          {/* Create New Project - Direct Action */}
          <Link href="/dashboard/new-project" style={{
            background: 'rgba(163, 113, 247, 0.05)',
            border: '1px solid var(--primary)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textDecoration: 'none',
            minHeight: '180px',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(163, 113, 247, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'; }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '12px' }}>Start a New Project</h2>
            <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
              Initiate a new structural contribution.
            </p>
            <div style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
              Launch
            </div>
          </Link>

          {/* View Your Impact - Gateway to Analytics (Adheres to ATEMPORAL_PERMANENCE by not displaying dynamic metrics here) */}
          <Link href="/dashboard/analytics" style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '180px',
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'; }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '12px' }}>View Your Impact</h2>
            <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
              Access detailed analytics and performance metrics.
            </p>
            {/* Removed direct display of dynamic metrics to strictly adhere to EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] */}
            <div style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--success)', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
              Analytics Dashboard
            </div>
          </Link>

          {/* Manage Contributions - Direct Action */}
          <Link href="/dashboard/my-contributions" style={{
            background: 'rgba(163, 113, 247, 0.05)',
            border: '1px solid var(--success)',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            textDecoration: 'none',
            minHeight: '180px',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 200, 100, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'; }}
          >
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--success)', marginBottom: '12px' }}>Manage My Contributions</h2>
            <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
              Update, archive, or delete your work.
            </p>
            <div style={{ marginTop: '20px', padding: '10px 20px', background: 'var(--success)', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
              Dashboard
            </div>
          </Link>
        </div>


        {/* Implementation of the APPLE_STYLE_BENTO_GRID Blueprint */}
        {/* ONTOLOGY: [LATERAL_DISCOVERY] - Each cell acts as a distinct entry point for exploration. */}
        {/* EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] - Content is static, descriptive, and enduring, forbidding dynamic metrics. */}
        {/* KINETICS: [OPERATIONAL_COMMAND] - Interaction is a clear click-through navigation with visual feedback. */}
        {/* SENSORIAL: [CONCEPTUAL_COMPACTION] - High-impact macro grouping with concise information and clear visuals. */}
        {/* TELEOLOGY: [SEQUENTIAL_ORCHESTRATION] - Guides users to different exploratory paths within the platform. */}
        <div style={{
          width: '100%',
          display: 'grid',
          gap: '24px',
          gridAutoRows: '280px', // Consistent row height for a structured matrix feel.
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive, uneven layout as per blueprint.
        }}>

          {/* Bento Cell 1: Competitive Benchmarks */}
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
            textDecoration: 'none',
            gridColumn: 'span 2', // Creates the "uneven" aspect for the grid.
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Macro Icon: Singular, abstract visual for high impact and quick recognition. */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '4px', alignItems: 'flex-end', height: '48px', opacity: 0.5, transform: 'scale(1.3)', transformOrigin: 'top left' }}>
              <div style={{ width: '18px', height: '36px', background: 'var(--primary)', borderRadius: '2px' }} />
              <div style={{ width: '18px', height: '72px', background: 'var(--success)', borderRadius: '2px' }} />
              <div style={{ width: '18px', height: '45px', background: '#ffffff', borderRadius: '2px' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Competitive Benchmarks</h2>
              <p style={{ color: '#8b949e', fontSize: '1.1rem', margin: 0 }}>
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
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Macro Icon */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '10px', height: '48px', opacity: 0.5, transform: 'scale(1.3)', transformOrigin: 'top left' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary)' }} />
              <div style={{ width: '35px', height: '4px', background: '#ffffff' }} />
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--success)' }} />
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
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(163, 113, 247, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Macro Icon */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', height: '48px', opacity: 0.5, transform: 'scale(1.3)', transformOrigin: 'top left' }}>
              <div style={{ width: '55px', height: '10px', background: 'var(--primary)', borderRadius: '3px' }} />
              <div style={{ width: '40px', height: '10px', background: '#ffffff', borderRadius: '3px' }} />
              <div style={{ width: '65px', height: '10px', background: 'var(--success)', borderRadius: '3px' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Autonomous Inception</h2>
              <p style={{ color: 'var(--primary)', fontSize: '1.05rem', margin: 0 }}>
                Instantiate a new codebase rivaling proprietary tools with one click.
              </p>
            </div>
          </Link>

          {/* Bento Cell 4: Governance & Health */}
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
            textDecoration: 'none',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Macro Icon */}
            <div style={{ position: 'absolute', top: '24px', right: '24px', width: '65px', height: '65px', opacity: 0.5, transform: 'scale(1.3)', transformOrigin: 'top right' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '6px solid var(--primary)', borderRadius: '12px' }} />
              <div style={{ position: 'absolute', top: '22px', left: '12px', width: '18px', height: '18px', background: 'var(--success)', borderRadius: '50%' }} />
            </div>
            <div style={{ zIndex: 10 }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>Governance & Health</h2>
              <p style={{ color: '#8b949e', fontSize: '1.05rem', margin: 0 }}>
                High-fidelity tracking of project licensing, PR velocity, and distributed operational command.
              </p>
            </div>
          </Link>

        </div>

        {/* G.E.M.S.G. Stakes Summary Bar: Static conceptual grouping. */}
        {/* EPISTEMOLOGY: [ATEMPORAL_PERMANENCE] - Fixed, non-dynamic terms for foundational concepts. */}
        {/* SENSORIAL: [CONCEPTUAL_COMPACTION] - Concise list of key concepts, presented without clutter. */}
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
            fontWeight: 600,
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