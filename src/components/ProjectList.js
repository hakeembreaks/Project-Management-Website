import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";

// styles
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  console.log(projects);

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p>
              <strong>Assigned to:</strong>
            </p>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
//In summary, the ProjectList component receives an array of projects,
// maps through them, and displays project details including
// the project name, due date, and assigned users' avatars.

//If there are no projects (projects.length === 0), a message "No projects yet!" is displayed.
// If projects are available, they are mapped through.
// For each project, a Link component is created using the to prop to specify the link destination.
// The project's id is used as the key.

// Map through the assignedUsersList and display user avatars
// Render the "Avatar" component with the user's photo URL
