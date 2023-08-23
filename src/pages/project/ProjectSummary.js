import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects"); //  // Use the useFirestore hook to access Firestore functionality, including deleteDocument function
  const { user } = useAuthContext(); // // Fetch the authenticated user's information using the useAuthContext hook
  const history = useHistory(); // Use the useHistory hook to access the router's history for navigation

  // // Handle the click event when "Mark as Complete" button is clicked
  const handleClick = () => {
    deleteDocument(project.id);
    history.push("/");
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}

// This component is responsible for displaying a summary of project details,
//  including its name, due date, details, and assigned users. Additionally,
// it provides a "Mark as Complete" button for the user who created the project.
// The Avatar component is imported from "../../components/Avatar" to display user avatars.
// The useFirestore hook is used to access Firestore functionality,
//  including the deleteDocument function to delete a project.
// The useAuthContext hook is used to fetch the authenticated user's information.
// The useHistory hook is used to access the router's history, which allows for navigation.
// The handleClick function is triggered when the "Mark as Complete" button is clicked.
// It deletes the project document from Firestore using the deleteDocument function and
// then redirects the user to the homepage using the history.push method.
// Inside the JSX, project details are displayed, including the name,
// due date (formatted using toDate().toDateString()), details, and assigned users' avatars.
// The avatars of assigned users are mapped and rendered using the Avatar component.
// The "Mark as Complete" button is displayed only if the authenticated user's uid matches the id of the user who created the project.
// The user interface is constructed using JSX elements and
//  rendering to show or hide the "Mark as Complete" button based on the user's authorization.
