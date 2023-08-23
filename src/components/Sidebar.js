import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Avatar from "./Avatar";

// styles & images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext(); // the useAuthContext hook is used to get the user data from the authentication context.

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

// In summary, the Sidebar component renders a sidebar navigation panel
// that displays the user's avatar, greeting, and navigation links to different
// sections of the application using NavLink components.
// The navigation links are accompanied by icons and labels.