import React from "react";
import axios from "axios";
import "./App.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      highlighted: false
    };
  }

  componentDidMount() {
    axios
      .get("/api")
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          todos: response.data.data,
        });
      })
      .catch((e) => console.log("Error : ", e));
  }

  handleAddTodo = (value) => {
    axios
      .post("/api/todos", { text: value })
      .then(() => {
        this.setState({
          todos: [...this.state.todos, { text: value }],
        });
      })
      .catch((e) => console.log("Error : ", e));
  };

  render() {
    return (
      <div className="App container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-8 offset-md-2">
              <h1>Todos</h1>
              <div className="todo-app">
                <AddTodo handleAddTodo={this.handleAddTodo} />
                <TodoList todos={this.state.todos} />
                <div
                  className={this.state.highlighted ? 'green-background' : ''}
                  onDragEnter={() => this.setHighlighted(true)}
                  onDragLeave={() => this.setHighlighted(false)}
                  onDrag={(e)=> {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    this.setHighlighted(false);

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

  setHighlighted = (val) => {
    this.setState({
      highlighted: val
    });
  }
}
