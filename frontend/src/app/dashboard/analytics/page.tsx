import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      padding: '48px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: '48px' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', marginBottom: '16px', display: 'inline-block' }}>
            &larr; Back to Home
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>Impact Analytics</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', margin: 0 }}>
            Analyzing the structural impact of your contributions.
          </p>
        </header>

        {/* Analytics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Card 1: Total Contributions */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
          }}>
            <h3 style={{ color: 'var(--muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Total Contributions</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: '#ffffff' }}>42</div>
            <div style={{ color: 'var(--success)', fontSize: '0.9rem', marginTop: '8px', fontWeight: 600 }}>+12% this month</div>
          </div>

          {/* Card 2: Global Impact Score */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
          }}>
            <h3 style={{ color: 'var(--muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Global Impact Score</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)' }}>8.4</div>
            <div style={{ color: 'var(--success)', fontSize: '0.9rem', marginTop: '8px', fontWeight: 600 }}>Top 5% of engineers</div>
          </div>

          {/* Card 3: Active Projects */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '32px',
          }}>
            <h3 style={{ color: 'var(--muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>Active Projects</h3>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: '#ffffff' }}>3</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '8px' }}>Across 2 organizations</div>
          </div>
        </div>

        {/* Detailed Graph Area (Placeholder) */}
        <div style={{
          marginTop: '48px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '16px' }}>Velocity Trajectory</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>A visualization of your impact over time will appear here once sufficient data is gathered.</p>
          <div style={{
            height: '200px',
            background: 'linear-gradient(180deg, rgba(163, 113, 247, 0.1) 0%, rgba(163, 113, 247, 0) 100%)',
            border: '1px dashed var(--primary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontWeight: 600
          }}>
            Graph Rendering Engine Init...
          </div>
        </div>

      </div>
    </div>
  );
}
