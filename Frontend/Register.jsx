import { useState } from "react";
import { UserRound, LockKeyhole, BookOpen } from "lucide-react";
import "./Register.css";

function Register({ onShowLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage(data.message || "Registration successful!");
      setIsSuccess(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(
        error.message || "Unable to connect to the server"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-icon">
          <BookOpen size={38} />
        </div>

        <h1 className="register-title">Home Food</h1>

        <p className="register-subtitle">
          Delicious food, made with love
        </p>

        <div className="register-divider">❧ ✦ ❧</div>

        <h2>Create Your Account</h2>

        <p className="register-description">
          Join us and discover delicious homemade food!
        </p>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-input-group">
            <label htmlFor="register-username">Username</label>

            <div className="register-input-wrapper">
              <UserRound size={19} />

              <input
                id="register-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="register-input-group">
            <label htmlFor="register-password">Password</label>

            <div className="register-input-wrapper">
              <LockKeyhole size={19} />

              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                disabled={isLoading}
              />
            </div>

            <small className="register-hint">
              Password must contain at least 8 characters.
            </small>
          </div>

          <button
            className="register-submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p
            className={`register-message ${
              isSuccess ? "success" : "error"
            }`}
            role="status"
          >
            {message}
          </p>
        )}

        <div className="register-login-section">
          <p>Already have an account?</p>

          <button
            className="register-login-button"
            type="button"
            onClick={onShowLogin}
            disabled={isLoading}
          >
            Back to Login
          </button>
        </div>

        <p className="register-footer">
          Made with ♥ for food lovers
        </p>
      </div>
    </div>
  );
}

export default Register;