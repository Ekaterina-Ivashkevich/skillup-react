import './Todos.scss';
import { useState } from "react";

const Todos = () => {

const [todos, setTodos] = useState([
    { 
        id: 1,
        text: "first todo",
    },
    { 
        id: 2,
        text: "second todo",
    },
    { 
        id: 3,
        text: "third todo",
    },
]);

const [newTodo,setNewTodo] = useState("");
const [newTodo2, setNewTodo2] = useState("")

const inputChange = (e) => {
    setNewTodo(e.target.value);
};

const inputChange2 = (e) => {
    setNewTodo2(e.target.value);
};

const addTodo = (e) => {
e.preventDefault(); //чтобы форма не перегружалась
console.log (newTodo, newTodo2);
};
    return (
        <div className="todos">
            <form className="todos__form" onSubmit={addTodo}>
                <input type="text" value={newTodo}  onChange={inputChange} placeholder="Your new todo..." />
                <input type="text" value={newTodo2}  onChange={inputChange2} placeholder="Your new todo2" />
                <button type="submit">Add todo</button>
            </form>
            <div className="todos__list">
                {todos.map((todo)=>
                {return <div className="todos__item" key={todo.id}>
                    {todo.text}
                    </div> })}
            </div>
        </div>
    );
};

export default Todos;