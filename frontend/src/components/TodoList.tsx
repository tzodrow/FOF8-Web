import React, { useState } from "react";

interface ITodoListProps {
  todos: Array<{text: string}>;
}

export function TodoList(props: ITodoListProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTodos = (todos: Array<{ text: string }>) => {
    return (
      <ul className="list-group">
        {todos.map((todo, i) => (
          <li
            className={
              "list-group-item cursor-pointer " +
              (i === activeIndex ? "active" : "")
            }
            key={i}
            onClick={() => {
              setActiveIndex(i);
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    );
  }

  let { todos } = props;
  return todos.length > 0 ? (
    renderTodos(todos)
  ) : (
    <div className="alert alert-primary" role="alert">
      No Todos to display
    </div>
  );
}