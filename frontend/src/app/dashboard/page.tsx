import { createClient } from '@/utils/supabase/server';

async function fetchDashboardData(token?: string) {
  const requestHeaders: Record<string, string> = {};
  if (token) requestHeaders['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('http://127.0.0.1:8000/api/core/dashboard/', {
      headers: requestHeaders,
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

const getStatusBgColor = (status: 'optimal' | 'warning' | 'critical') => {
  switch (status) {
    case 'optimal': return 'rgba(34, 197, 94, 0.1)'; // Green
    case 'warning': return 'rgba(250, 204, 21, 0.1)'; // Yellow
    case 'critical': return 'rgba(239, 68, 68, 0.1)'; // Red
    default: return 'rgba(139, 148, 158, 0.1)'; // Gray
  }
};

const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up': return '#22c55e'; // var(--success)
    case 'down': return '#ef4444'; // var(--danger)
    case 'stable': return '#8b949e'; // var(--text-muted)
    default: return '#8b949e';
  }
};

interface MetricDisplayData {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string; 
  baseline: string | number; 
  status: 'optimal' | 'warning' | 'critical'; 
  actionLabel: string; 
}

function processMetric(
  label: string,
  currentValue: any,
  config: {
    baseline: number;
    optimalThreshold: number;
    warningThreshold: number;
    trendUpValue: string;
    trendDownValue: string;
    actionLabel: string;
    isInverseStatus?: boolean; 
  }
): MetricDisplayData {
  const value = currentValue ?? '--';
  const numValue = typeof currentValue === 'number' ? currentValue : parseFloat(currentValue);

  let trend: 'up' | 'down' | 'stable' = 'stable';
  let trendValue = '0%';
  let status: 'optimal' | 'warning' | 'critical' = 'optimal';

  if (typeof numValue === 'number' && !isNaN(numValue)) {
    if (config.isInverseStatus) { 
      // For inverse status, lower values are better (e.g., latency)
      if (numValue <= config.optimalThreshold) {
        status = 'optimal';
        trend = 'down'; // Lower is better
        trendValue = config.trendDownValue;
      } else if (numValue <= config.warningThreshold) {
        status = 'warning';
        trend = 'stable';
        trendValue = '0%';
      } else {
        status = 'critical';
        trend = 'up'; // Higher is worse
        trendValue = config.trendUpValue;
      }
    } else { 
      // For normal status, higher values are better (e.g., health score)
      if (numValue >= config.optimalThreshold) {
        status = 'optimal';
        trend = 'up'; // Higher is better
        trendValue = config.trendUpValue;
      } else if (numValue >= config.warningThreshold) {
        status = 'warning';
        trend = 'stable';
        trendValue = '0%';
      } else {
        status = 'critical';
        trend = 'down'; // Lower is worse
        trendValue = config.trendDownValue;
      }
    }
  } else {
    status = 'warning'; // Default to warning if data is missing/invalid
    trend = 'stable';
    trendValue = 'N/A';
  }

  return {
    label,
    value,
    trend,
    trendValue,
    baseline: config.baseline,
    status,
    actionLabel: config.actionLabel,
  };
}

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const data = await fetchDashboardData(session?.access_token);
  
  const metrics: MetricDisplayData[] = [
    processMetric('Global Health Score', data?.global_health_score || 92, {
      baseline: 90, optimalThreshold: 85, warningThreshold: 70,
      trendUpValue: '+2%', trendDownValue: '-5%',
      actionLabel: 'Optimize Health',
    }),
    processMetric('Active Developers', data?.active_developers || 142, {
      baseline: 50, optimalThreshold: 45, warningThreshold: 30,
      trendUpValue: '+10%', trendDownValue: '-8%',
      actionLabel: 'Engage Devs',
    }),
    processMetric('Signed CLAs', data?.signed_clas || 108, {
      baseline: 100, optimalThreshold: 90, warningThreshold: 70,
      trendUpValue: '+5%', trendDownValue: '-3%',
      actionLabel: 'Manage CLAs',
    }),
    processMetric('Tracked Open Source', data?.total_open_source_projects || 12, {
      baseline: 10, optimalThreshold: 8, warningThreshold: 5,
      trendUpValue: '+1', trendDownValue: '-1',
      actionLabel: 'Review OSS',
    }),
    processMetric('Tracked Proprietary', data?.total_proprietary_products || 4, {
      baseline: 5, optimalThreshold: 4, warningThreshold: 2,
      trendUpValue: '+1', trendDownValue: '-1',
      actionLabel: 'Manage Targets',
    }),
  ];

  return (
    <div style={{ 
      padding: '48px 32px', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      fontFamily: 'Inter, sans-serif', // Assuming Inter is available or a similar system font
      color: '#e0e0e0', // Mimics var(--foreground)
      background: '#000000', // Mimics var(--background)
      minHeight: '100vh'
    }}>
      
      {/* Header aligned with SYNTACTIC Granular Precision & Operational Command */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '20px', 
        borderBottom: '1px solid #282828', // Mimics var(--border)
        marginBottom: '16px'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 700, 
            color: '#e0e0e0', // Mimics var(--foreground)
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Governance Telemetry
          </h1>
          <p style={{ 
            color: '#8b949e', // Mimics var(--text-muted)
            marginTop: '6px', 
            fontSize: '0.85rem',
            lineHeight: '1.4'
          }}>
            Real-time, high-density overview of project health, velocity, and contributor engagement.
          </p>
        </div>
        
        {/* Operational Command */}
        <div>
          <form>
            <button 
              type="submit"
              style={{ 
                backgroundColor: '#1a1a1a', // Mimics var(--surface)
                color: '#e0e0e0', // Mimics var(--foreground)
                padding: '10px 18px', 
                borderRadius: '6px', 
                border: '1px solid #282828', // Mimics var(--border)
                cursor: 'pointer', 
                fontSize: '0.85rem', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s, border-color 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
                e.currentTarget.style.borderColor = '#444444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = '#282828';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
              Refresh Telemetry
            </button>
          </form>
        </div>
      </header>

      {/* VERCEL_STYLE_DEPLOYMENT_TELEMETRY: Columnar Schema with Granular Precision */}
      <div style={{ 
        border: '1px solid #282828', // Mimics var(--border)
        borderRadius: '8px', 
        overflow: 'hidden', 
        background: '#1a1a1a', // Mimics var(--surface)
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        
        {/* Table Header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 1.5fr', // Adjusted column widths for better balance
          gap: '16px', 
          padding: '14px 24px', 
          background: '#111111', // Slightly darker surface for header
          borderBottom: '1px solid #282828', // Mimics var(--border)
          fontSize: '0.75rem', // Smaller font for density
          color: '#8b949e', // Mimics var(--text-muted)
          textTransform: 'uppercase',
          letterSpacing: '0.08em', // Increased letter spacing
          fontWeight: 600,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div>Telemetry Metric</div>
          <div>Current Node</div>
          <div>Baseline</div>
          <div>30d Velocity</div>
          <div style={{ textAlign: 'right' }}>Operational Command</div>
        </div>

        {/* Data Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {metrics.map((metric, i) => (
            <div key={metric.label} style={{ 
              display: 'grid', 
              gridTemplateColumns: '2.5fr 1fr 1fr 1.2fr 1.5fr', 
              gap: '16px', 
              padding: '14px 24px', // Reduced padding for density
              borderBottom: i < metrics.length - 1 ? '1px solid #282828' : 'none', // Mimics var(--border)
              alignItems: 'center',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', // Subtle zebra striping
              transition: 'background-color 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
            >
              
              {/* Metric Name & Status (Granular Precision) */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                position: 'relative',
                paddingLeft: '12px', // Space for status indicator
              }}>
                <div style={{ 
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '6px', 
                  height: '100%', 
                  borderRadius: '3px', 
                  background: getTrendColor(metric.trend), // Using trend color for a subtle side indicator
                  opacity: 0.7,
                }} />
                <span style={{ 
                  color: '#e0e0e0', // Mimics var(--foreground)
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  // Subtle background based on status for granular precision
                  backgroundColor: getStatusBgColor(metric.status),
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getTrendColor(metric.trend),
                    boxShadow: `0 0 6px ${getTrendColor(metric.trend)}`,
                    display: 'inline-block',
                  }} />
                  {metric.label}
                </span>
              </div>

              {/* Current Value */}
              <div style={{ 
                color: '#e0e0e0', // Mimics var(--foreground)
                fontWeight: 'bold', 
                fontSize: '1.1rem',
                letterSpacing: '-0.02em'
              }}>
                {metric.value}
              </div>

              {/* Baseline */}
              <div style={{ 
                color: '#8b949e', // Mimics var(--text-muted)
                fontSize: '0.9rem' 
              }}>
                {metric.baseline}
              </div>

              {/* Trend Velocity (Chronological Velocity) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  color: getTrendColor(metric.trend), 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  {metric.trend === 'up' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>}
                  {metric.trend === 'down' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                  {metric.trend === 'stable' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>}
                  {metric.trendValue}
                </span>
              </div>

              {/* Operational Action (Operational Command) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ 
                  padding: '6px 14px', // Adjusted padding for density
                  background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)', // Subtle gradient
                  border: '1px solid #3a3a3a', // Slightly lighter border
                  borderRadius: '5px', 
                  color: '#e0e0e0', // Mimics var(--foreground)
                  fontSize: '0.8rem', 
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #3a3a3a, #2a2a2a)';
                  e.currentTarget.style.borderColor = '#5a5a5a';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(180deg, #2a2a2a, #1a1a1a)';
                  e.currentTarget.style.borderColor = '#3a3a3a';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.2)';
                }}
                >
                  {metric.actionLabel}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}