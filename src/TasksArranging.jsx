import { useState, useRef } from "react";

export default function TasksArranging() {
  const [newTask, setNewTask] = useState("");
  const [taskslist, setTaskslist] = useState([]);
  const nextid = useRef(0);

  //انشاء id
  function increase() {
    nextid.current++;
    return nextid.current;
  }

  // إضافة مهمة 
  function handleAddClick() {
    setTaskslist([
      ...taskslist,
      { name: newTask, id: increase(), pressed: false }, // pressed لكل مهمة
    ]);
    setNewTask("");
  }

  // حذف مهمة 
  function handleDeleteClick(id) {
    const newTasksList = taskslist.filter((task) => task.id !== id);
    setTaskslist(newTasksList);
  }

  //  Done لكل مهمة
  function handleDoneClicked(id) {
    setTaskslist((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, pressed: !task.pressed } : task
      )
    );
  }

//when all pressed show alert
  function allPressed() {
  taskslist.every((task) => task.pressed) ?
    alert("you have done your work for today!"): alert("you still have some to do")
}

  // عرض القائمة
  const tasks = taskslist.map((task) => (
    <li key={task.id} style={{ marginBottom: "10px" }}>
      <span>{task.name}</span>
      <hr></hr>
      <div>
        <button
          style={{ backgroundColor: "rgba(209, 5, 5, 0.788) " }}
          onClick={() => handleDeleteClick(task.id)}>
          Delete
        </button>
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
    <div style={{backgroundColor:"#a3a3a3",border:"solid, 2px" ,padding:"20px", borderRadius:"10px"}}>
      <ul style={{ padding: 0, listStyle: "none" }}>{tasks}</ul>
      <input
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        placeholder="Add a task"
      />
      <button onClick={handleAddClick} style={{ padding: "5px 10px" }}>
        Add
      </button>
       <button onClick={allPressed} style={{ width:"80px"}}>
      Check All
    </button>
    </div>
  );
}
