import {Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {STATUSES} from "../../constants";
import {Delete, Edit} from "@material-ui/icons";
import {useState} from "react";

const TodoItem = ({todo,todos,setTodos}) => {

    const[isEditorActive,setIsEditorActive] = useState(false);
    const[editingText,setEditingText] = useState("");

    const editTodo = (id,text) => {
        setEditingText(text);
        setIsEditorActive(prevState => !prevState);
    if(isEditorActive){
        const newTodos = todos.map(todo => {
        if (todo.id === id) {
            return {...todo, text: editingText}
        }
        return todo
    })
        setTodos(newTodos);
    }}

    function statusHandler (id) {
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

    function changeTodoText (e) {
        setEditingText(e.target.value);
    }

    function saveTodoByClickEnter (e,id,text){
        if (e.key === "Enter"){
            editTodo(id,text);
        }
    }

    return (
        <div className="todos__item"
             key={todo.id}>
            <Checkbox
                color ="default"
                checked={todo.status === "done"}
                onChange={() => statusHandler(todo.id)}
            />
            {isEditorActive ? (<TextField  autoFocus={true}
                                           onKeyUp={(e) => saveTodoByClickEnter(e,todo.id,todo.text)}
                                           onChange={changeTodoText}
                                           value={editingText}/>) :
                <p className="todos__text">{todo.text}</p>}
            <div className="todos__actions">
                <FormControl className="todos__select">
                    <InputLabel>Status</InputLabel>
                    <Select value={todo.status}
                            onChange={function (e) {
                                return changeStatus(e, todo.id)}}>
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
                        onClick={() => editTodo(todo.id,todo.text)}
                >Edit</Button>
                <Button startIcon={<Delete />}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteTodo(todo.id)}
                >Delete</Button>
            </div>
        </div>
    );
};

export default TodoItem;