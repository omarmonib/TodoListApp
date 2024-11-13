import React from "react";

const Todo = (props) => {
  return (
    <div className={`d-f ${props.isEditing ? "editing" : ""}`}>
      <div className="task">
        <input
          type="checkbox"
          checked={props.todo.complete}
          onChange={props.toggleComplete}
        />
        <div
          onClick={props.toggleComplete}
          style={{
            textDecoration: props.todo.complete ? "line-through" : "none",
            color: props.todo.complete ? "#888" : "#fff",
          }}
        >
          {props.todo.text}
        </div>
      </div>
      <div className="effict-btn">
        <button className="edit-btn btn" onClick={props.startEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
