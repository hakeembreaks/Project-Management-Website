import { useState } from "react";

// filterList is an array that contains all the available filter options.
const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("all"); // useState("all") initializes the state currentFilter with the default value "all".

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
// handleClick is a function triggered when a filter button is clicked.
// It updates the currentFilter state to the clicked filter and then calls
//  the changeFilter function passed as a prop, which in turn changes
// the filter in the parent component.

// The JSX structure of the component includes a set of buttons for each filter option.
// The onClick event of each button is connected to the handleClick function.
// The className of each button is conditionally set to "active" if the filter matches the currentFilter.
// This highlights the currently selected filter button with the "active" style.
