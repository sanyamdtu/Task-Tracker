import { useState, useEffect } from "react";
import Header from "./components/header";
import Tasks from "./components/tasks";
import AddTask from "./components/addtask";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [task, setTask] = useState([]);

  //fetch data
  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks();
      setTask(tasksFromServer);
    };
    getTask();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    console.log(data);
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTask(task.filter((task) => task.id !== id));
  };
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const tasktobeToggled = await fetchTask(id);
    const updTask = { ...tasktobeToggled, reminder: !tasktobeToggled.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const newtask = await res.json();
    console.log(newtask);
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, reminder: newtask.reminder } : task
      )
    );
  };
  const addtask = async (t) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(t),
    });

    const newtask = await res.json();
    setTask([...task, newtask]);
  };
  return (
    <div className="container">
      <Header
        title="sanyam"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      ></Header>
      {showAddTask && <AddTask onAdd={addtask} />}
      {task.length > 0 ? (
        <Tasks
          tasks={task}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        ></Tasks>
      ) : (
        "No task to show"
      )}
    </div>
  );
}

export default App;
