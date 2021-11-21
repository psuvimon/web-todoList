import React from 'react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

  }

  removeTodo(id) {
    this.props.removeTodo(id);
  }

  render() {
    return [
      <div key="todoItem" style={{ textAlign: 'left', marginBottom: 10 }}>
        <button style={{ marginRight: 6 }} onClick={(e) => this.removeTodo(this.props.id)}>Delete</button>
        {this.props.todo.todo}
      </div>
    ];
  }
}