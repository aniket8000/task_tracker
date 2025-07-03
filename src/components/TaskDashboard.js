import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import DarkModeToggle from "./DarkModeToggle";
import {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
} from "../utils/localStorage";

const TaskDashboard = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = getTasksFromLocalStorage(username);
    setTasks(saved || []);
  }, [username]);

  useEffect(() => {
    saveTasksToLocalStorage(username, tasks);
  }, [tasks, username]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <div className="dashboard-header">
        <h2>Hello, {username} 👋</h2>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <TaskForm onAdd={addTask} />
      <TaskFilter
        currentFilter={filter}
        setFilter={setFilter}
        taskCounts={{
          all: tasks.length,
          completed: tasks.filter((t) => t.completed).length,
          pending: tasks.filter((t) => !t.completed).length,
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onToggle={toggleComplete}
      />
    </div>
  );
};

export default TaskDashboard;
