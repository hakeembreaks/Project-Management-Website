import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuthContext(); // useAuthContext() provides access to the authenticated user.
  const { documents, error } = useCollection("projects"); // useCollection("projects") fetches project documents.
  const [filter, setFilter] = useState("all"); // useState("all") sets the initial state for the filter, defaulting to "all".

  // changeFilter is a function that updates the filter state.
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            console.log(document.category, filter);
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}

// projects is an array of project documents based on the selected filter.
// If documents exist, the filter function is used to determine which projects should be displayed.
// The switch statement handles different filter cases: "all", "mine", specific categories.
// For "mine", it checks if the user is assigned to the project.
// If none of the cases match, all projects are displayed.
