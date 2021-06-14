import './Todos.scss';
import { useState } from "react";
import {Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField,} from "@material-ui/core";
import {Edit, Delete} from "@material-ui/icons";

const Todos = () => {

    const [todos, setTodos] = useState([]);

    const [newTodo, setNewTodo] = useState("");

    const inputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const addTodo = (e) => {
        e.preventDefault();
        const newTodoItem = {
            id: Date.now(),
            text: newTodo,
            status: "new"
        }

        setTodos((prevState) => [newTodoItem, ...prevState]);
        setNewTodo("");
    };
    const editTodo = id => {

    }

    return (
        <div className="todos">
            <form className="todos__form" onSubmit={addTodo}>
                <TextField  label="Your new todo..."
                            type="text"
                            name="todo"
                            size={"small"}
                            value={newTodo}
                            onChange={inputChange}
                            variant="outlined" />
                <Button color="primary"
                        type="submit"
                        variant="contained"
                >Add todo</Button>

            </form>
            <div className="todos__list">
                {todos.length ? (todos.map(({id, text}) => {

                    console.log(todos);

                    function deleteTodo (id) {
                        setTodos(todos.filter(todo => todo.id !== id))
                    }

                    return (
                        <div className="todos__item" 
                        key={id}>
                          <p>{text}</p>
                            <div className="todos__actions">
                                <Button startIcon={<Edit />}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => editTodo(id)}
                                        >Edit</Button>
                                {/* eslint-disable-next-line react/jsx-no-undef */}
                                <Button startIcon={<Delete />}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => deleteTodo(id)}
                                        >Delete</Button>

                            </div>
                        </div>
                    );
                })) : <h2>No todos...</h2>}
            </div>
        </div>
    );
};

export default Todos;