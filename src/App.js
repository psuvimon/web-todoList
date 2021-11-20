import React, { Component } from 'react';
import './App.css';
// import AddTodo from "../src/components/AddTodo";\
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      nextId: 1
    }

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(inputText) {
    let todoList = this.state.todoList.slice();
    let nextId = this.state.nextId == null ? 1 : this.state.nextId;
    todoList.push({ id: nextId, text: inputText });
    this.setState({
      todoList: todoList,
      nextId: nextId + 1,
    });
  }

  removeTodo(id) {
    this.setState({
      todoList: this.state.todoList.filter((todo, index) => todo.id !== id)
    });
  }

  render() {
    return [
      <div className="App">
        <Header />
        <hr color="black" />
        <TodoInput text="" addTodo={this.addTodo} />
        <ul>
          {
            this.state.todoList.map((todo) => {
              return <TodoItem key={todo.id} id={todo.id} todo={todo} removeTodo={this.removeTodo} />;
            })
          }
        </ul>
      </div>
    ];
  }
}

export default App;
