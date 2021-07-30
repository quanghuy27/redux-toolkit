import { Input, Button } from "antd";
import { useState } from "react";

function Item(props) {
  const { index, title, description, handleEditTask, handleDeleteTask } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskForm, setEditTaskForm] = useState({
    title: title,
    description: description,
  });
  function handleChangeValue(e) {
    const { name, value } = e.target;
    setEditTaskForm({
      ...editTaskForm,
      [name]: value,
    });
  }
  function renderTask() {
    if (isEdit) {
      return (
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <h3>Edit task</h3>

          <label>Title:</label>
          <Input
            type="text"
            name="title"
            onChange={(e) => handleChangeValue(e)}
            value={editTaskForm.title}
          ></Input>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            onChange={(e) => handleChangeValue(e)}
            value={editTaskForm.description}
          ></Input>
          <div
            style={{
              marginTop: "20px",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
            type="primary"
              style={{ marginLeft: "150px", marginRight:"10px" }}
              onClick={() => {
                handleEditTask(editTaskForm, index);
                setIsEdit(false);
              }}
            >
              OK
            </Button>
            <Button
              style={{ marginRight: "150px" }}
              onClick={() => setIsEdit(false)}
            >
              {" "}
              Cancel
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div>Title: {title}</div>
          <div>Description: {description}</div>
        </>
      );
    }
  }

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid",
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        {!isEdit && (
          <Button
            type="primary"
            onClick={() => setIsEdit(true)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
        )}
        <Button danger onClick={() => handleDeleteTask(index)}>
          Delete
        </Button>
      </div>
      {renderTask()}
    </div>
  );
}

export default Item;
