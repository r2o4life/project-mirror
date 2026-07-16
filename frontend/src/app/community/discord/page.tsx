// components/ConceptOverviewCard.tsx
import React from 'react';

interface ConceptOverviewCardProps {
  icon?: React.ReactNode; // For singular macro icon
  title: string; // Bold headline
  description: string; // Short narrative sentence
  linkHref?: string; // For LATERAL_DISCOVERY (exploratory pathway)
  linkText?: string; // Descriptive link subtext
  children?: React.ReactNode; // Allows embedding additional content if needed
}

/**
 * A conceptual overview card designed for bento-grid layouts.
 * Adheres to APPLE_STYLE_BENTO_GRID for visual impact and ATEMPORAL_PERMANENCE.
 * Provides LATERAL_DISCOVERY through descriptive links.
 */
export default function ConceptOverviewCard({ icon, title, description, linkHref, linkText, children }: ConceptOverviewCardProps) {
  return (
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: '#1a1a1a', // Consistent dark background for conceptual compaction
      border: '1px solid #333', // Subtle border for definition
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%', // Ensures cards fill their grid area vertically
      boxSizing: 'border-box', // Include padding and border in the element's total width and height
    }}>
      {icon && <div style={{ fontSize: '48px', marginBottom: '8px', color: '#88f' }}>{icon}</div>}
      <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#eee' }}>{title}</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#ccc', flexGrow: 1 }}>{description}</p>
      {children} {/* Render any additional specific content */}
      {linkHref && linkText && (
        <a href={linkHref} style={{
          marginTop: '16px',
          color: '#88f',
          textDecoration: 'none',
          fontWeight: '600',
          alignSelf: 'flex-start', // Aligns link to the start
        }}>
          {linkText} &rarr;
        </a>
      )}
    </div>
  );
}