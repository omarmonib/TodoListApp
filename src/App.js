import React, { useCallback, useMemo, useState } from "react";
import TodoForm from "./component/TodoForm";
import Todo from "./component/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoToShow, setTodoToShow] = useState("all");
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = useCallback((todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const updateTodoToShow = useCallback((showValues) => {
    setTodoToShow(showValues);
  }, []);

  const showAll = useCallback(
    () => updateTodoToShow("all"),
    [updateTodoToShow]
  );

  const enhancedUpdateTodo = useCallback(
    (filterBy) => () => updateTodoToShow(filterBy),
    [updateTodoToShow]
  );

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }, []);

  const startEdit = useCallback((id) => {
    setEditTodoId(id);
  }, []);

  const saveEdit = useCallback((id, text) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    setEditTodoId(null);
  }, []);

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (todoToShow === "active") {
          return !todo.complete;
        }
        if (todoToShow === "complete") {
          return todo.complete;
        }
        return true;
      }),
    [todoToShow, todos]
  );

  const TodosList = useMemo(
    () =>
      filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={() => handleDelete(todo.id)}
          toggleComplete={() => toggleComplete(todo.id)}
          startEdit={() => startEdit(todo.id)}
          isEditing={editTodoId === todo.id}
        />
      )),
    [editTodoId, filteredTodos, handleDelete, toggleComplete, startEdit]
  );

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoForm
        onSubmit={addTodo}
        editTodoId={editTodoId}
        saveEdit={saveEdit}
        todos={todos}
      />
      {TodosList}
      <div>
        <button className="update-btn btn" onClick={showAll}>
          All
        </button>
        <button
          className="update-btn btn"
          onClick={enhancedUpdateTodo("active")}
        >
          Active
        </button>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("complete")}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default App;
