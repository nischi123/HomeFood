import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import "./Login.css";

export default function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpening, setIsOpening] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  useEffect(() => {
    if (!isOpening) return;

    const timer = setTimeout(() => {
      onLogin(loggedInUsername);
    }, 1200);

    return () => clearTimeout(timer);
  }, [isOpening, loggedInUsername, onLogin]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onLogin(data.username);
      } else {
        alert(data.message || "Login failed");
      }
      setLoggedInUsername(data.user?.username || username);
      setIsOpening(true);
    } catch (error) {
      setError("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <div className="login-cover">
      <div className="cover-decoration">
        <div className="login-cover-content">
          <BookOpen size={48} />

          <h1>Home Food</h1>
          <p>Delicious food, made with love</p>

          <div className="cover-divider">❧ ✦ ❧</div>

          <h2>Welcome to Our Food Book</h2>

          <p className="cover-subtitle">
            Please sign in to open the menu
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isOpening}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isOpening}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={isOpening}>
              {isOpening ? "Opening Book..." : "Open Food Book"}
            </button>
          </form>

          <p>Don't have an account?</p>

          <button
            type="button"
            onClick={onShowRegister}
            disabled={isOpening}
          >
            Create an Account
          </button>

          {isOpening && (
            <p className="demo-credentials">
              Welcome, {loggedInUsername}!
            </p>
          )}
        </div>
      </div>

      {isOpening && <div className="opening-page" />}
    </div>
  );
}