"use client";

import React from 'react';
import Link from 'next/link';

// Mock data structure for contributions, expanded to support new requirements
interface Contribution {
  id: string;
  project: string;
  component: string;
  status: 'draft' | 'pending' | 'active' | 'archived';
  velocity: {
    currentImpactScore: number;
    deltaPercentage: number; // e.g., +14, -5
    trend: 'up' | 'down' | 'stable'; // for icon
  };
  lastActivity: string; // e.g., "2 hours ago", "Yesterday"
}

const mockContributions: Contribution[] = [
  {
    id: 'proj-mirror-core-1',
    project: 'Project Mirror Core',
    component: 'Agentic Framework Scaffold',
    status: 'active',
    velocity: { currentImpactScore: 85, deltaPercentage: 14, trend: 'up' },
    lastActivity: '2 hours ago',
  },
  {
    id: 'data-pipeline-v2-3',
    project: 'Data Pipeline V2',
    component: 'ETL Optimization Module',
    status: 'pending',
    velocity: { currentImpactScore: 60, deltaPercentage: 5, trend: 'up' },
    lastActivity: 'Yesterday',
  },
  {
    id: 'ux-redesign-4',
    project: 'UX Redesign Initiative',
    component: 'Onboarding Flow Prototype',
    status: 'draft',
    velocity: { currentImpactScore: 30, deltaPercentage: 0, trend: 'stable' },
    lastActivity: '3 days ago',
  },
  {
    id: 'api-gateway-refactor-2',
    project: 'API Gateway Refactor',
    component: 'Authentication Service',
    status: 'archived',
    velocity: { currentImpactScore: 70, deltaPercentage: -10, trend: 'down' },
    lastActivity: '1 month ago',
  },
];

// Helper for status badge styling
const getStatusStyles = (status: Contribution['status']) => {
  switch (status) {
    case 'active':
      return { color: 'var(--success)', background: 'rgba(34, 197, 94, 0.1)' };
    case 'pending':
      return { color: 'var(--warning)', background: 'rgba(250, 204, 21, 0.1)' };
    case 'draft':
      return { color: 'var(--info)', background: 'rgba(59, 130, 246, 0.1)' };
    case 'archived':
      return { color: 'var(--gray)', background: 'rgba(107, 114, 128, 0.1)' };
    default:
      return {};
  }
};

// Helper for trend icon
const TrendIcon = ({ trend, delta }: { trend: Contribution['velocity']['trend']; delta: number }) => {
  const color = delta > 0 ? 'var(--success)' : delta < 0 ? 'var(--error)' : 'var(--gray)';
  const icon =
    trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—';
  return (
    <span style={{ color, fontSize: '0.8em', marginRight: '4px' }}>
      {icon}
    </span>
  );
};

export default function MyContributionsPage() {
  // In a real app, this would be state managed, allowing for actual updates
  const [contributions, setContributions] = React.useState<Contribution[]>(mockContributions);

  // KINETICS: OPERATIONAL_COMMAND - Mock action handlers
  const handleEdit = (id: string) => {
    console.log(`Editing contribution: ${id}`);
    // TARGETED_ROUTING: Navigate to an edit page
    // router.push(`/dashboard/contributions/${id}/edit`);
    alert(`Navigating to edit page for ${id}`);
  };

  const handlePromote = (id: string) => {
    setContributions(prev =>
      prev.map(c => {
        if (c.id === id) {
          let newStatus: Contribution['status'] = c.status;
          // TELEOLOGY: SEQUENTIAL_ORCHESTRATION - Enforce state progression
          if (c.status === 'draft') newStatus = 'pending';
          else if (c.status === 'pending') newStatus = 'active';
          else {
            alert(`Cannot promote an item with status: ${c.status}`);
            return c; // No change
          }
          console.log(`Promoting contribution ${id} from ${c.status} to ${newStatus}`);
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  const handleArchive = (id: string) => {
    setContributions(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'archived' } : c))
    );
    console.log(`Archiving contribution: ${id}`);
  };

  const handleDelete = (id: string) => {
    // TELEOLOGY: SEQUENTIAL_ORCHESTRATION - Guarded destructive action
    if (window.confirm(`Are you sure you want to permanently delete contribution: ${id}? This action cannot be undone.`)) {
      setContributions(prev => prev.filter(c => c.id !== id));
      console.log(`Deleting contribution: ${id}`);
    }
  };

  return (
    <div style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif', color: '#e0e0e0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0 }}>Manage My Contributions</h1>
          <p style={{ color: '#8b949e', fontSize: '1.1rem', marginTop: '8px' }}>Update, archive, promote, or delete your historical work payloads.</p>
        </div>
        {/* ONTOLOGY: TARGETED_ROUTING & KINETICS: OPERATIONAL_COMMAND */}
        <Link href="/dashboard/new-project" style={{
          padding: '12px 24px',
          background: 'var(--success)',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background 0.2s ease',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--success-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--success)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          New Payload
        </Link>
      </header>

      {/* SENSORIAL: GRANULAR_PRECISION & EPISTEMOLOGY: CHRONOLOGICAL_VELOCITY */}
      {/* KINETICS: OPERATIONAL_COMMAND - High-density list interface */}
      <div style={{ border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', background: '#111' }}>
        {/* Header Row for the list */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.2fr 1.5fr 1.5fr 1.8fr', // Adjusted for more columns
          padding: '16px 24px',
          background: '#1a1a1a',
          borderBottom: '1px solid #333',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          color: '#8b949e',
        }}>
          <div>Project / Component</div>
          <div>Status</div>
          <div>Velocity / Impact</div>
          <div>Last Activity</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {/* List Items */}
        {contributions.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#8b949e' }}>No contributions found.</div>
        ) : (
          contributions.map((item) => (
            <div
              key={item.id}
              tabIndex={0} // KINETICS: OPERATIONAL_COMMAND - Make row focusable for keyboard navigation
              onClick={() => handleEdit(item.id)} // ONTOLOGY: TARGETED_ROUTING - Clickable row for detail/edit
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 1.5fr 1.5fr 1.8fr',
                padding: '16px 24px',
                borderBottom: '1px solid #222',
                alignItems: 'center',
                transition: 'background 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit(item.id);
              }}
            >
              {/* Project / Component */}
              <div>
                <strong style={{ color: '#fff', display: 'block', fontSize: '1rem' }}>{item.project}</strong>
                <div style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '4px' }}>{item.component}</div>
              </div>

              {/* Status Badge */}
              <div>
                <span style={{
                  ...getStatusStyles(item.status),
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  {/* SENSORIAL: GRANULAR_PRECISION - Status indicator */}
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusStyles(item.status).color }}></span>
                  {item.status}
                </span>
              </div>

              {/* EPISTEMOLOGY: CHRONOLOGICAL_VELOCITY & SENSORIAL: GRANULAR_PRECISION */}
              {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY */}
              <div style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <TrendIcon trend={item.velocity.trend} delta={item.velocity.deltaPercentage} />
                  {item.velocity.currentImpactScore}
                  {item.velocity.deltaPercentage !== 0 && (
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '0.8rem',
                      color: item.velocity.deltaPercentage > 0 ? 'var(--success)' : 'var(--error)'
                    }}>
                      ({item.velocity.deltaPercentage > 0 ? '+' : ''}{item.velocity.deltaPercentage}%)
                    </span>
                  )}
                </span>
              </div>

              {/* Last Activity */}
              <div style={{ color: '#8b949e', fontSize: '0.9rem' }}>
                {item.lastActivity}
              </div>

              {/* KINETICS: OPERATIONAL_COMMAND - Action Buttons */}
              <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                {item.status !== 'archived' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #555',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Edit
                  </button>
                )}

                {/* TELEOLOGY: SEQUENTIAL_ORCHESTRATION & CRUDPA: Promote */}
                {(item.status === 'draft' || item.status === 'pending') && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePromote(item.id); }}
                    style={{
                      background: 'var(--info)',
                      border: '1px solid var(--info)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--info-dark)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--info)')}
                  >
                    {item.status === 'draft' ? 'Promote to Pending' : 'Promote to Active'}
                  </button>
                )}

                {item.status !== 'archived' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleArchive(item.id); }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #555',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Archive
                  </button>
                )}

                {/* CRUDPA: Delete - Explicitly added with guardrails */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--error)',
                    color: 'var(--error)',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}