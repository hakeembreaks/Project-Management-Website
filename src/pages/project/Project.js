import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

// components
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";

// styles
import "./Project.css";
// Define the Project component
export default function Project() {
  const { id } = useParams(); // Extract the 'id' parameter from the URL using the useParams hook
  const { document, error } = useDocument("projects", id); // Use the useDocument hook to fetch a specific document from the Firestore collection
  // Handle error case
  if (error) {
    return <div className="error">{error}</div>;
  }
  // Handle loading state
  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  // If data is available, render the Project details
  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}

// This component represents the details page of a specific project.
// It imports the useParams hook from react-router-dom to access URL parameters,
// and the useDocument hook from a custom source, possibly a custom hook defined in the
//  ../../hooks/useDocument path.
// The ProjectComments and ProjectSummary components are also imported along
// with their respective styles from the ProjectComments and ProjectSummary files.
// JSX is used to create the UI for the Project page, including the ProjectSummary
//  and ProjectComments components.
// The useParams hook is used to extract the id parameter from the URL,
// which represents the ID of the specific project being displayed.
// The useDocument hook is used to fetch the specific project document using the id.
//  The document and error values are returned from this hook.
// If an error occurs while fetching the project document, an error message is displayed.
// If the document is still loading (not yet fetched), a loading message is displayed.
// If the document is fetched successfully, the ProjectSummary and ProjectComments
// components are rendered within a parent container with the class project-details.
// The project prop is passed to both the ProjectSummary and ProjectComments components to
//  provide them with the project data.
// Please note that the specific functionality of the useDocument hook and the content of the
// ProjectSummary and ProjectComments components are not provided, so you might need to refer to
// those implementations for a complete understanding of this code's behavior.
