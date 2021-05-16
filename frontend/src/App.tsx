import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.scss";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";


export function App() {
  const [todos, setTodos] = useState<Array<{ text: string }>>([{ text: "example"}]);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((e) => console.log("Error : ", e));
  });

  const handleAddTodo = (text: string) => {
    axios
      .post("/api/todos", { text: text })
      .then(() => {
        setTodos([...todos, { text: text }]);
      })
      .catch((e) => console.log("Error : ", e));
  }

  return (
    <div className="App container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
            <h1>Todos</h1>
            <div className="todo-app">
              <AddTodo handleAddTodo={handleAddTodo} />
              <TodoList todos={todos} />
              <div
                className={highlighted ? 'green-background' : ''}
                onDragEnter={() => setHighlighted(true)}
                onDragLeave={() => setHighlighted(false)}
                onDrag={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  setHighlighted(false);

                  Array.from(e.dataTransfer.files)
                    .filter((file) => file.type === "text/csv")
                    .forEach((file) => {
                      console.log(file);
                    })
                }}
              >
                Drag to Me
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
