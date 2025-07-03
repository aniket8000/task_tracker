import React from "react";

const TaskFilter = ({
  currentFilter,
  setFilter,
  taskCounts,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {["all", "completed", "pending"].map((type) => (
          <button
            key={type}
            className={currentFilter === type ? "active" : ""}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} ({taskCounts[type]})
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default TaskFilter;
