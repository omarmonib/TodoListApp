import React, { useState, useEffect } from "react";
import shortid from "shortid";

const TodoForm = ({ editTodoId, todos, saveEdit, onSubmit }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTodoId) {
      const todoToEdit = todos.find(({ id }) => id === editTodoId);
      if (todoToEdit) {
        setText(todoToEdit.text);
      }
    } else {
      setText("");
    }
  }, [editTodoId, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    if (editTodoId) {
      saveEdit(editTodoId, text);
    } else {
      onSubmit({
        id: shortid.generate(),
        text: text,
        complete: false,
      });
    }
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        onChange={handleChange}
        value={text}
        placeholder="Add new task"
      />
      <button className="btn" type="submit">
        {editTodoId ? "Save" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
