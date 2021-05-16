import React, { useState } from 'react';

interface IAddTodoProps {
  handleAddTodo: (val: string) => void;
}

export function AddTodo(props: IAddTodoProps) {
  const [todo, setTodo] = useState("");

  const handleSubmit = () => {
    props.handleAddTodo(todo);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="new-todo form-group"
    >
      <input
        type="text"
        name="value"
        required
        minLength={1}
        className="form-control"
        value={todo}
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">
        Add Todo
      </button>
    </form>
  );
}