import React, { useState } from "react";

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleUpdate = () => {
    const updated = { ...task, title, description };
    onUpdate(task.id, updated);
    setEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-item-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {editing ? (
          <input
            className="task-edit-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h3>{task.title}</h3>
        )}
      </div>

      {editing ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p>{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        {task.dueDate && <span>📅 {task.dueDate}</span>}
        {task.tags?.length > 0 && (
          <div className="tags">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="task-actions">
        {editing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
