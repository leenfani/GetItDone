import { useState, useRef } from "react";

export default function TasksArranging() {
  const [newTask, setNewTask] = useState("");
  const [taskslist, setTaskslist] = useState([]);
  const nextid = useRef(0);

  //انشاء id فريد
  function increase() {
    nextid.current++;
    return nextid.current;
  }

  // إضافة مهمة جديدة
  function handleAddClick() {
    setTaskslist([
      ...taskslist,
      { name: newTask, id: increase(), pressed: false }, // pressed لكل مهمة
    ]);
    setNewTask("");
  }

  // حذف مهمة محددة
  function handleDeleteClick(id) {
    const newTasksList = taskslist.filter((task) => task.id !== id);
    setTaskslist(newTasksList);
  }

  // تبديل حالة Done لكل مهمة
  function handleDoneClicked(id) {
    setTaskslist((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, pressed: !task.pressed } : task
      )
    );
  }

  // عرض القائمة
  const tasks = taskslist.map((task) => (
    <li key={task.id} style={{ marginBottom: "10px" }}>
      <span>{task.name}</span>
      <div>
        <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
        <button
          style={{
            backgroundColor: task.pressed ? " rgb(18, 182, 247)" : "white",
            color: task.pressed ? "white" : "black",
            
          }}
          onClick={() => handleDoneClicked(task.id)}>
          Done
        </button>
      </div>
    </li>
  ));

  return (
    <>
      <ul style={{ padding: 0, listStyle: "none" }}>{tasks}</ul>
      <input
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        placeholder="Add a task"
      />
      <button onClick={handleAddClick} style={{ padding: "5px 10px" }}>
        Add
      </button>
    </> 
  );
}
