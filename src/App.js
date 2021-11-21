import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import TodoInput from './components/todoInput';
import TodoItem from './components/todoItem';
import { API_URL } from './constants';

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

  getData(){
    fetch(`${API_URL}`, {
      method: 'get',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      let todoList = data;
      let nextId = data.at(-1).id;
      this.setState({
        todoList: todoList,
        nextId: nextId + 1,
      });
    })
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getData();
  }

  addTodo(inputText) {
    let todoList = this.state.todoList.slice();
    let nextId = this.state.nextId == null ? 1 : this.state.nextId;
    todoList.push({ id: nextId, todo: inputText });
    fetch(`${API_URL}`, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: nextId, todo: inputText })
    })
    .then(res => {
      this.getData();
    })
    .catch(err => console.log(err));
  }

  removeTodo(id) {
    console.log("delete >>>>")
    fetch(`${API_URL}/${id}`, {
      method: 'delete',
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.getData();
    })
    .catch(err => console.log(err));
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
