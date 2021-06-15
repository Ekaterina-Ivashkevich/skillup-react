import './Todos.scss';
import { useState,  useEffect} from "react";
import {Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField,} from "@material-ui/core";
import {Edit, Delete} from "@material-ui/icons";
import { STATUSES } from "../../constants";

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
    const editTodo = id => {

    }
    function statusHandler(id){
        const newTodos = todos.map(
            todo => {
                if(todo.id === id) {
                    if(todo.status !== "done"){
                  return {...todo, status:"done"}}
                    return {...todo, status:"new"}
                }
                return todo;
            })
        setTodos(newTodos); //кладем в сет новые, обработка клика
    }

    function changeStatus (e, id) {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, status: e.target.value}
            }
            return todo
        })
        setTodos(newTodos)
    }

    function deleteTodo (id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function saveTodos () {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    useEffect(()=>{
        console.log('useEffect')
        return ()=>{
        }
    },[todos])

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
                <Checkbox
                    color="default"
                    checked={true}
                    onChange={() => statusHandler()}
                />
                Autosave
            </div>
            <div className="todos__list">
                {todos.length ? (todos.map(({id, text, status}) => {
                    return (
                        <div className="todos__item" 
                        key={id}>
                            <Checkbox
                                color ="default"
                                checked={status === "done"}
                                onChange={() => statusHandler(id)}
                            />
                          <p className="todos__text">{text}</p>
                            <div className="todos__actions">
                                <FormControl className="todos__select">
                                    <InputLabel>Status</InputLabel>
                                    <Select value={status}
                                        onChange={function (e) {
                                            return changeStatus(e, id)}}>
                                        {STATUSES.map((status) => (
                                            <MenuItem value={status}
                                                      key={status}>{status}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                                <Button startIcon={<Edit />}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => editTodo(id)}
                                        >Edit</Button>
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