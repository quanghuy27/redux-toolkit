import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createToDoListAction,
  editToDoListAction,
  deleteToDoListAction,
} from "./redux/actions";
import { Input, Button } from "antd";
import Item from "./components/Item";

function App() {
  const getTask = useSelector((state) => state.toDoListReducer.taskList);
  const dispatch = useDispatch();
  const [addTaskForm, setAddTaskForm] = useState({
    title: "",
    description: "",
  });

  function handleAddTask() {
    if (addTaskForm.title === "" || addTaskForm.description === "") {
      alert("Sư huynh à! Hãy cho tại hạ biết sư huynh muốn làm gì điiiiiii");
    } else {
      dispatch(createToDoListAction(addTaskForm));
      setAddTaskForm({
        title: "",
        description: "",
      });
    }
  }

  function handleChangeValue(e) {
    const { name, value } = e.target;
    setAddTaskForm({
      ...addTaskForm,
      [name]: value,
    });
  }

  function handleEditTask(values, index) {
    dispatch(
      editToDoListAction({
        values,
        index,
      })
    );
  }

  function handleDeleteTask(index) {
    dispatch(
      deleteToDoListAction({
        payload: index,
      })
    );
  }
  function renderTaskList() {
    return getTask.map((taskItem, taskIndex) => {
      return (
        <Item
          key={`${taskIndex}-${taskItem.title}`}
          index={taskIndex}
          title={taskItem.title}
          description={taskItem.description}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      );
    });
  }

  return (
    <div style={{ width: 500, margin: "24px auto" }}>
      <h1 style={{textAlign:"center", color:"	#CC9966"}}>TO DO LIST</h1>
      <div
        style={{
          padding: "20px",
          border: "2px solid",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{color:"#6699CC", textAlign: "center"}} >Add Task</h2>

        <label>Title:</label>
        <Input  type="text"
          name="title"
          onChange={(e) => handleChangeValue(e)}
          value={addTaskForm.title} />

        <label>Description:</label>
        <Input type="text"
          name="description"
          onChange={(e) => handleChangeValue(e)}
          value={addTaskForm.description}></Input>
        <Button type="primary" onClick={() => handleAddTask()} style={{ marginTop: "20px" }}> Add</Button>
     
         

      </div>
      {renderTaskList()}
    </div>
  );
}

export default App;
