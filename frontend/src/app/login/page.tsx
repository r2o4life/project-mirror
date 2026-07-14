import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in or create an account to start spawning competitors.</p>
        
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />
          
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required placeholder="••••••••" />
          
          <div className="login-actions">
            <button formAction={login} className="btn primary">Log in</button>
            <button formAction={signup} className="btn secondary">Sign up</button>
          </div>
        </form>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-card {
          background: var(--surface);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 3rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          text-align: center;
        }

        .login-card h1 {
          margin-bottom: 0.5rem;
          font-size: 2rem;
          background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-card p {
          color: #a0a0a0;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .login-form label {
          font-size: 0.85rem;
          color: #e0e0e0;
          font-weight: 500;
        }

        .login-form input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .login-form input:focus {
          border-color: var(--primary);
        }

        .login-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          border: none;
          font-size: 1rem;
        }

        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .btn.primary {
          background: var(--primary);
          color: #fff;
        }

        .btn.secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
        }
      `}</style>
    </div>
  )
}
