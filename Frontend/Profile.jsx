import { useEffect, useState } from "react";
import "./Profile.css";

const API_URL = "http://localhost:5000/api/auth";

export default function Profile({ onLogout, onProfileUpdated }) {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {

        if (!token) {
          onLogout();
          return;
        }

        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          onLogout();
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile");
        }

        setUsername(data.user.username);
      } catch (err) {
        setError(err.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [onLogout]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {

      const payload = { username };

      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 401) {
        if (data.message === "Invalid or expired token") {
          onLogout();
          return;
        }

        throw new Error(data.message || "Authentication failed");
      }

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      setUsername(data.user.username);
      setCurrentPassword("");
      setNewPassword("");
      setMessage(data.message);

      onProfileUpdated(data.user.username);
    } catch (err) {
      setError(err.message || "Unable to update profile");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleUpdate}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <h3>Change Password</h3>
        <p>Leave the password fields empty if you don't want to change it.</p>

        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="current-password"
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          minLength={8}
          autoComplete="new-password"
        />

        <button type="submit">Save Changes</button>
      </form>

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}