'use client';

import Link from "next/link";
import { useState, ReactNode } from "react";
import { BrandLogo } from "./BrandLogo";

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: {
    label: string;
    href: string;
    exploreHref: string;
    description: string;
    toolActionText: string;
    icon: ReactNode;
  }[] = [
    {
      label: "Benchmarks",
      href: "/benchmarks",
      exploreHref: "/explore/benchmarks",
      description: "Explore the global market graph and compare open-source alternatives against proprietary monopolies.",
      toolActionText: "Analyze proprietary targets",
      icon: (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '24px' }}>
          <div style={{ width: '6px', height: '12px', background: 'var(--primary)', borderRadius: '2px' }} />
          <div style={{ width: '6px', height: '24px', background: 'var(--success)', borderRadius: '2px' }} />
          <div style={{ width: '6px', height: '16px', background: '#8b949e', borderRadius: '2px' }} />
        </div>
      )
    },
    {
      label: "Matchmaking",
      href: "/matchmaking",
      exploreHref: "/explore/matchmaking",
      description: "Frictionless skill mapping to immediate codebase gaps.",
      toolActionText: "Find codebase gaps",
      icon: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '24px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
          <div style={{ width: '12px', height: '2px', background: 'var(--border)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
        </div>
      )
    },
    {
      label: "Spawn a Competitor",
      href: "/spawn",
      exploreHref: "/explore/spawn",
      description: "Instantiate a new codebase rivaling proprietary tools with one click.",
      toolActionText: "Execute inception sequence",
      icon: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', height: '24px', justifyContent: 'center' }}>
          <div style={{ width: '20px', height: '4px', background: 'var(--primary)', borderRadius: '2px' }} />
          <div style={{ width: '14px', height: '4px', background: '#8b949e', borderRadius: '2px' }} />
          <div style={{ width: '24px', height: '4px', background: 'var(--success)', borderRadius: '2px' }} />
        </div>
      )
    },
    {
      label: "Governance",
      href: "/dashboard",
      exploreHref: "/explore/governance",
      description: "High-fidelity tracking of project licensing, PR velocity, and operational command.",
      toolActionText: "Review trust analytics",
      icon: (
        <div style={{ position: 'relative', width: '24px', height: '24px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '2px solid var(--primary)', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', top: '8px', left: '4px', width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%' }} />
        </div>
      )
    }
  ];

  return (
    <header 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        background: 'rgba(13, 17, 23, 0.85)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid var(--border)',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Link href="/" style={{ textDecoration: 'none' }}>
        <BrandLogo />
      </Link>

      {/* STRIPE_STYLE_MEGA_FLYOUT Implementation */}
      <nav style={{ display: 'flex', gap: '32px', position: 'relative' }}>
        {menuItems.map((item) => (
          <div 
            key={item.label}
            onMouseEnter={() => setActiveMenu(item.label)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <Link href={item.href} style={{ 
              color: activeMenu === item.label ? 'var(--primary)' : 'var(--foreground)', 
              fontWeight: 500, 
              fontSize: '1rem',
              transition: 'color 0.2s',
              padding: '8px 0',
              textDecoration: 'none'
            }}>
              {item.label}
            </Link>

            {/* Mega Flyout Menu */}
            {activeMenu === item.label && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '16px',
                width: '320px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fadeIn 0.2s ease forwards',
                cursor: 'default'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ margin: 0, color: 'var(--foreground)', fontSize: '1.1rem' }}>{item.label}</h3>
                </div>
                <p style={{ margin: 0, color: '#8b949e', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href={item.exploreHref} onClick={() => setActiveMenu(null)} style={{ 
                    color: 'var(--primary)', 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Explore conceptual thesis →
                  </Link>
                  <Link href={item.href} onClick={() => setActiveMenu(null)} style={{ 
                    color: 'var(--foreground)', 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {item.toolActionText} ↗
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Optional Auth / Action Button area */}
      <div>
        <Link href="/dashboard" style={{ 
          padding: '8px 16px', 
          background: 'var(--primary)', 
          color: 'white', 
          borderRadius: '6px', 
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none'
        }}>
          Access Terminal
        </Link>
      </div>
    </header>
  );
}
