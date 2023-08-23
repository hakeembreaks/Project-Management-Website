import { useCollection } from "../hooks/useCollection";

// components
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection("users"); // The useCollection hook is used to fetch a collection of user data from the "users" collection in a database. The returned values from the hook (isPending, error, and documents) are destructured and assigned to corresponding variables.

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
// In summary, the OnlineUsers component fetches user data using the useCollection hook
// and displays a list of users along with their online status, display name, and avatar
// using the Avatar component.
