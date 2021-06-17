import './Todos.scss';
import { useState,  useEffect} from "react";
import {Button, Checkbox, TextField,FormControlLabel} from "@material-ui/core";
import TodoItem  from "../TodoItem/TodoItem";
import IOSSwitch from "../IOSSwitch/IOSSwitch";

const Todos = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
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
    console.log(todos);


    function saveTodos () {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    useEffect(()=>{
        saveTodos();
    },[todos]) //по сути автосохранение по умолчанию

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
            {todos.length ? <Button variant="outlined"
                                    color="primary"
                                    className="todos__save"
                                    onClick={saveTodos}>Save todos</Button> : null}
            <div className="todos__autosave">
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <FormControlLabel
                    control={<IOSSwitch checked={true}
                                        onChange={()=>{}} />}
                    label="iOS style"
                />
                <Checkbox
                    color="default"
                    checked={true}
                    onChange={() => {}}
                />
                Autosave
            </div>
            <div className="todos__list">
                {todos.length ? (todos.map((todo) => <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>)) : <h2>No todos...</h2>}
            </div>
        </div>
    );
};

export default Todos;