//

import { Link } from "react-router-dom"; // The Link component is imported from react-router-dom. It's used to create links that navigate to different routes within your app.
import { useLogout } from "../hooks/useLogout"; // imported from custom hook files. This hook provides functionalities related to user authentication and logout.
import { useAuthContext } from "../hooks/useAuthContext"; // same thing with useLogout

// styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

//

export default function Navbar() {
  const { logout, isPending } = useLogout(); // The logout function and isPending variable are extracted from the useLogout hook.
  const { user } = useAuthContext(); // the use variable is extracted from the useAuthContext hook.

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Breaks Nation</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
