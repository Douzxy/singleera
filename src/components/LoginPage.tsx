"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, pin);

    if (!success) {
      setError("Kredensial tidak valid! �️");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Floating Elements Background */}
      <div className="login-background">
        <span
          className="floating-item"
          style={{ left: "10%", animationDelay: "0s" }}
        >
          ✨
        </span>
        <span
          className="floating-item"
          style={{ left: "25%", animationDelay: "1.5s" }}
        >
          🏔️
        </span>
        <span
          className="floating-item"
          style={{ left: "40%", animationDelay: "3s" }}
        >
          🍂
        </span>
        <span
          className="floating-item"
          style={{ left: "55%", animationDelay: "0.5s" }}
        >
          ✨
        </span>
        <span
          className="floating-item"
          style={{ left: "75%", animationDelay: "2s" }}
        >
          🌲
        </span>
        <span
          className="floating-item"
          style={{ left: "90%", animationDelay: "1s" }}
        >
          🧭
        </span>
      </div>

      <div className="login-card">
        {/* Shield Icon */}
        <div className="login-icon">�️</div>

        <h1 className="login-title">Journey Of The Year</h1>
        <p className="login-subtitle">
          Akses jurnal pribadi untuk melanjutkan ✨
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pin">PIN</label>
            <div className="input-wrapper">
              <span className="input-icon">�</span>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan PIN..."
                required
                disabled={isLoading}
                maxLength={6}
              />
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner">⚙️</span>
            ) : (
              <>Buka Jurnal ✨</>
            )}
          </button>
        </form>

        <div className="login-footer">
          <span>Documentation of the journey — 2025</span>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            var(--sand) 0%,
            #ede4d3 25%,
            #e8dcc4 50%,
            #ede4d3 75%,
            var(--sand) 100%
          );
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        .login-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-item {
          position: absolute;
          bottom: -50px;
          font-size: 24px;
          opacity: 0.4;
          animation: floatUp 10s linear infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .login-card {
          background: rgba(255, 253, 249, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 60px rgba(139, 90, 43, 0.15),
            0 0 0 1px rgba(139, 90, 43, 0.1);
          position: relative;
          z-index: 10;
          animation: slideUp 0.6s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-icon {
          font-size: 48px;
          text-align: center;
          margin-bottom: 20px;
          filter: drop-shadow(0 4px 10px rgba(139, 90, 43, 0.2));
        }

        .login-title {
          font-family: "Caveat", cursive;
          font-size: 2.8rem;
          text-align: center;
          background: linear-gradient(135deg, var(--rust), var(--clay));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .login-subtitle {
          text-align: center;
          color: #666;
          font-size: 1rem;
          margin-bottom: 32px;
          font-family: "Outfit", sans-serif;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--denim);
          margin-left: 4px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          font-size: 18px;
          pointer-events: none;
          opacity: 0.7;
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 14px 14px 50px;
          border: 2px solid rgba(139, 90, 43, 0.15);
          border-radius: 12px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
          font-family: "Outfit", sans-serif;
          color: #333;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--clay);
          box-shadow: 0 0 0 4px rgba(217, 165, 102, 0.1);
          background: #fff;
        }

        .input-wrapper input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-error {
          background: rgba(192, 110, 82, 0.1);
          color: var(--rust);
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          font-size: 0.95rem;
          border: 1px solid rgba(192, 110, 82, 0.2);
          animation: shake 0.5s ease;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .login-button {
          background: linear-gradient(135deg, var(--clay), var(--rust));
          color: white;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Outfit", sans-serif;
          box-shadow: 0 10px 20px rgba(139, 90, 43, 0.15);
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(139, 90, 43, 0.25);
          filter: brightness(1.05);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .login-footer {
          text-align: center;
          margin-top: 24px;
          color: #999;
          font-size: 0.85rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
