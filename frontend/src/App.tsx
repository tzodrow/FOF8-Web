import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.scss";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { FileDropzone } from './components/FileDropzone';


export function App() {
  const [todos, setTodos] = useState<Array<{ text: string }>>([{ text: "example"}]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
      axios
        .get("/api")
        .then((response) => {
          setTodos(response.data.data);
        })
        .catch((e) => {
          console.log("Error : ", e);
          setInit(false);
        });
    }
  }, [init]);

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
              <FileDropzone />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
