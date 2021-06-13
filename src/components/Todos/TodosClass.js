import React, { Component } from 'react'

class TodosClass extends Component {
    state = {
        newTodo: "",
        todos: [],
    }

    addTodo = (e) => {
        e.preventDefault(); 
        const newTodoItem = {
            id: Date.now(),
            text: this.state.newTodo,
            status: "new"
        }

        this.setState((prevState) =>(
            {
                newTodo: "",
                todos: [newTodoItem, ...prevState.todos]
            }
        ))
    }

    inputChange = (event) => {
        this.setState({newTodo: event.target.value}, ()=>{})
    } 

    render() {
        return (
            <div className="todos">
                <form className="todos__form" onSubmit={this.addTodo}>
                    <input type="text" value={this.state.newTodo} onChange={this.inputChange} placeholder="Your new todo..." />
                    <button type="submit">Add todo</button>
                </form>
                <div className="todos__list">
                    {this.state.todos.length ? (this.state.todos.map(({id, text:other}) => {
                        return (
                            <div className="todos__item" 
                            key={id}>
                                {other}
                            </div>
                        );
                    })) : <h2>No todos...</h2>}
                </div>
            </div>
        );
    }
}
export default  TodosClass;