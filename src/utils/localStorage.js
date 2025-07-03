export const getTasksFromLocalStorage = (username) => {
  const key = `tasks_${username}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveTasksToLocalStorage = (username, tasks) => {
  const key = `tasks_${username}`;
  localStorage.setItem(key, JSON.stringify(tasks));
};
