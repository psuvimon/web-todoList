import React from 'react';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: '' };
    
    this.handleChange = this.handleChange.bind(this);
    this.addButtonClick = this.addButtonClick.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  addButtonClick(text) {
    // check text not empty
    if (text.length > 0) {
      this.props.addTodo(text);
      this.setState({ value: "" });
    }
  }

  render() {
    return [
      <div key="todoInput">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button style={{ marginLeft: 6 }} onClick={() => this.addButtonClick(this.state.value)}>Add</button>
      </div>
    ];
  }
}