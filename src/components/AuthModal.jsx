/**
 * AuthModal Component
 *
 * This component renders a modal for user authentication, allowing users to log in or sign up.
 * It includes a demo mode for testing purposes without real authentication.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onLoginSuccess - Callback function triggered upon successful login or demo mode activation.
 *
 * @returns {JSX.Element} The rendered authentication modal component.
 */
import React, { useState } from "react";
import { User, Lock, Leaf, ChevronDown } from "lucide-react";
import "../styles/AuthModal.css"; // Adjust the path as necessary

const AuthModal = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("treeAppUser", JSON.stringify({ email }));
      onLoginSuccess(email);
    }, 800);
  };

  return (
    <div className="auth-modal-overlay">
      <div className={`auth-modal ${isExpanded ? "expanded" : ""}`}>
        <div className="auth-header">
          <Leaf size={24} className="icon-green" />
          <h2>{isLoginView ? "Welcome Back" : "Join Our Forest"}</h2>
          <button
            className="auth-expand"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User size={16} />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={16} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isExpanded && (
            <div className="auth-extra">
              <div className="stat">
                <Leaf size={14} />
                <span>Demo Mode: No real authentication</span>
              </div>
            </div>
          )}

          <button type="submit" className="auth-submit">
            {isLoginView ? "Log In" : "Sign Up"}
          </button>
          <button
            className="auth-demo"
            onClick={() => onLoginSuccess("demo@example.com")}
          >
            Try Demo Mode
          </button>
        </form>

        <div className="auth-footer">
          <button
            className="auth-toggle"
            onClick={() => setIsLoginView(!isLoginView)}
          >
            {isLoginView
              ? "Need an account? Sign up"
              : "Have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
