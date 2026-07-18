import { useState } from "react";
import { useAuth } from "./UseAuth";
import { useNavigate } from "react-router-dom";

import "./SignupLogin.css";

function SignupLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, signup, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // dashboard

    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      setIsLogin(true);
      console.log("click huaaaaaa")
      navigate("/"); // dashboard
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="logo">ByteGPT</h1>

        <p className="subtitle">
          {isLogin
            ? "Welcome back! Please login to your account."
            : "Create your account to get started."}
        </p>

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="login-form"
        >
          {!isLogin && (
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="google-btn">Continue with Google</button>

        <p className="footer-text">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupLogin;
