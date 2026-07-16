import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in or create an account to start spawning competitors.</p>
        
        <form className="login-form">
          {/* Tightly grouped label and input for CONCEPTUAL_COMPACTION */}
          <div className="form-field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          
          {/* Tightly grouped label and input for CONCEPTUAL_COMPACTION */}
          <div className="form-field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          
          <div className="login-actions">
            {/* Distinct buttons for clear LATERAL_DISCOVERY of actions */}
            <button formAction={login} className="btn primary">Log in</button>
            <button formAction={signup} className="btn secondary">Sign up</button>
          </div>
        </form>
      </div>

      <style>{`
        /* Global variables for consistent theming */
        :root {
          --surface: #1a1a1a; /* Darker surface for contrast */
          --primary: #007bff; /* Example primary color */
        }

        /* Base body styles for a dark theme */
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          background-color: #0d0d0d; /* Very dark background */
          color: #e0e0e0;
        }

        /* Centering container for the login card (ISOLATED_NODE) */
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem; /* Slightly reduced padding for overall compaction */
        }

        /* Login card styling, adjusted for CONCEPTUAL_COMPACTION */
        .login-card {
          background: var(--surface);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px; /* Slightly smaller border-radius */
          padding: 2.5rem; /* Reduced padding for a more compact feel */
          width: 100%;
          max-width: 380px; /* Reduced max-width to focus content */
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3); /* Softer shadow */
          text-align: center;
          display: flex; /* Use flex for internal layout control */
          flex-direction: column;
          gap: 1.25rem; /* Unified gap for elements within the card */
        }

        /* Headline styling, adjusted for CONCEPTUAL_COMPACTION */
        .login-card h1 {
          margin: 0; /* Remove default margin, controlled by parent gap */
          font-size: 1.8rem; /* Slightly smaller font size */
          background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.2;
        }

        /* Paragraph styling, adjusted for CONCEPTUAL_COMPACTION */
        .login-card p {
          color: #a0a0a0;
          margin: 0; /* Remove default margin, controlled by parent gap */
          font-size: 0.9rem; /* Slightly smaller font size */
          line-height: 1.4;
        }

        /* Form layout, adjusted for CONCEPTUAL_COMPACTION */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem; /* Consistent gap between form field groups */
          text-align: left;
          margin-top: 0.75rem; /* Slight separation from description */
        }

        /* Tighter grouping for labels and inputs (CONCEPTUAL_COMPACTION) */
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem; /* Reduced gap between label and input */
        }

        /* Label styling, adjusted for CONCEPTUAL_COMPACTION */
        .login-form label {
          font-size: 0.8rem; /* Slightly smaller font size */
          color: #c0c0c0; /* Slightly lighter label color */
          font-weight: 500;
        }

        /* Input styling, adjusted for CONCEPTUAL_COMPACTION and visual clarity */
        .login-form input {
          background: rgba(255, 255, 255, 0.05); /* Lighter background for better contrast */
          border: 1px solid rgba(255, 255, 255, 0.15); /* Slightly more visible border */
          border-radius: 6px; /* Slightly smaller border-radius */
          padding: 0.7rem 1rem; /* Slightly reduced vertical padding */
          color: #fff;
          font-size: 0.95rem; /* Slightly smaller font size */
          outline: none;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .login-form input:focus {
          border-color: var(--primary);
          background-color: rgba(255, 255, 255, 0.08); /* Subtle background change on focus */
        }

        /* Action buttons container, adjusted for CONCEPTUAL_COMPACTION */
        .login-actions {
          display: flex;
          gap: 0.75rem; /* Reduced gap between buttons */
          margin-top: 1.25rem; /* Adjusted margin-top for better flow */
        }

        /* Button base styling, adjusted for CONCEPTUAL_COMPACTION and PASSIVE_CONSUMPTION */
        .btn {
          flex: 1;
          padding: 0.7rem; /* Slightly reduced vertical padding */
          border-radius: 6px; /* Slightly smaller border-radius */
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease;
          border: none;
          font-size: 0.95rem; /* Slightly smaller font size */
        }

        /* Subtle hover effect for PASSIVE_CONSUMPTION */
        .btn:hover {
          transform: translateY(-1px); /* Less aggressive lift */
          opacity: 0.95; /* Slightly less opaque */
        }

        /* Primary button for main action (LATERAL_DISCOVERY) */
        .btn.primary {
          background: var(--primary);
          color: #fff;
        }

        /* Secondary button for alternative action (LATERAL_DISCOVERY) */
        .btn.secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.25); /* Slightly more visible border */
          color: #fff;
        }

        /* Subtle hover effect for secondary button */
        .btn.secondary:hover {
          background: rgba(255, 255, 255, 0.05); /* Subtle background on hover */
        }
      `}</style>
    </div>
  )
}