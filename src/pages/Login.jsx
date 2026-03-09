import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "owner" ? "/dashboard" : "/ospite");
    } catch (err) {
      setError(err.message || "Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <i className="bi bi-house-heart login-icon"></i>
            <h2>Bentornato</h2>
            <p>Accedi al tuo account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group-login">
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la-tua@email.com"
                required
              />
            </div>

            <div className="form-group-login">
              <label htmlFor="password">
                <i className="bi bi-lock me-2"></i>Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-login w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Accesso in corso...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Accedi
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="login-info">
              <div className="login-role-badge owner-badge">
                <i className="bi bi-shield-check me-1"></i>
                <span>Proprietario: accesso completo al gestionale</span>
              </div>
              <div className="login-role-badge guest-badge">
                <i className="bi bi-person-check me-1"></i>
                <span>Ospite: accesso durante il soggiorno</span>
              </div>
            </div>
            <Link to="/" className="back-link">
              <i className="bi bi-arrow-left me-1"></i>Torna alla home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
