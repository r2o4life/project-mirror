import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--border)', 
      background: 'var(--surface)', 
      padding: '64px 48px 32px 48px',
      marginTop: 'auto',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '48px' 
      }}>
        
        {/* VERCEL_STYLE_SITEMAP_FOOTER: Multi-column sitemap grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '32px' 
        }}>
          
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: 0, color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem' }}>Ecosystem</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/benchmarks" className="footer-link" style={linkStyle}>Benchmarks Matrix</Link>
              <Link href="/matchmaking" className="footer-link" style={linkStyle}>Matchmaking Engine</Link>
              <Link href="/spawn" className="footer-link" style={linkStyle}>Autonomous Inception</Link>
              <Link href="/dashboard" className="footer-link" style={linkStyle}>Governance Dashboard</Link>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: 0, color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/resources/documentation" className="footer-link" style={linkStyle}>Documentation</Link>
              <Link href="/resources/architecture" className="footer-link" style={linkStyle}>Architecture Specs</Link>
              <Link href="/resources/paradigms" className="footer-link" style={linkStyle}>Global Paradigms</Link>
              <Link href="/resources/api" className="footer-link" style={linkStyle}>API Reference</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: 0, color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem' }}>Community</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/community/github" className="footer-link" style={linkStyle}>GitHub Core</Link>
              <Link href="/community/discord" className="footer-link" style={linkStyle}>Discord Terminal</Link>
              <Link href="/community/twitter" className="footer-link" style={linkStyle}>X / Twitter</Link>
              <Link href="/community/blog" className="footer-link" style={linkStyle}>Open Source Blog</Link>
            </div>
          </div>

          {/* Column 4: Operational Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ margin: 0, color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem' }}>Status</h4>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '8px 12px', 
              borderRadius: '6px',
              border: '1px solid var(--border)' 
            }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                background: 'var(--success)',
                boxShadow: '0 0 8px var(--success)'
              }} />
              <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>All Systems Operational</span>
            </div>
            <p style={{ color: '#8b949e', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
              Tracking 4 active open-source replacements globally.
            </p>
          </div>

        </div>

        {/* Immutable Operational Constants (Legal / Copyright) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
              <BrandLogo />
            </div>
            <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>© 2026 Open Web Int.</span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={legalLinkStyle}>Privacy Policy</a>
            <a href="#" style={legalLinkStyle}>Terms of Service</a>
            <a href="#" style={legalLinkStyle}>Code of Conduct</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Inline styles for repeated elements
const linkStyle = {
  color: '#8b949e',
  fontSize: '0.9rem',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
};

const legalLinkStyle = {
  color: '#8b949e',
  fontSize: '0.85rem',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
};
