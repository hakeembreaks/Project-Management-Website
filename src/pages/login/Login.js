import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

// styles
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Log in</button>}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
// This component represents a login form.
// It uses the useState hook to manage state for email, password, and loading/error states.
// The useLogin hook is used to manage the login functionality, providing the login function,
// error state, and isPending state.
// The handleSubmit function is triggered when the form is submitted,
// calling the login function from the useLogin hook with the form input values.
// JSX is used to create the login form UI, including form inputs, labels, error messages, and buttons.
// Conditional rendering is used to show the "Log in" button if not in the loading state (isPending is false)
// or show a "loading" button if in the loading state (isPending is true).
// If there's an error, it's displayed as an error message.
// CSS classes and styles from the Login.css file are applied to style the form.
