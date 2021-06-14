import './Todos.scss';
import { useState } from "react";

/*const Todos = () => {

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "first todo",
            status: "new"
        },
        {
            id: 2,
            text: "second todo",
            status: "new"
        },
        {
            id: 3,
            text: "third todo",
            status: "new"
        },
    ]);*/

const Todos = () => {

    const [todos, setTodos] = useState([]);

    const [newTodo, setNewTodo] = useState("");

    const inputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const addTodo = (e) => {
        e.preventDefault(); //чтобы форма не перегружалась
        const newTodoItem = {
            id: Date.now(),
            text: newTodo,
            status: "new"
        }

        setTodos((prevState) => [newTodoItem, ...prevState]);
        setNewTodo("");
      //  console.log("newTodoItem", newTodoItem);
    };

   /* const [tests, setTests] = useState({
        value1: " ",
        value2: " ",
    });
    const testHandler = (e) => {
        setTests(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    console.log(tests);*/

    return (
        <div className="todos">
            <form className="todos__form" onSubmit={addTodo}>
                <input type="text" value={newTodo} onChange={inputChange} placeholder="Your new todo..." />
               {/*} <input type="text" value={tests.value1} name="value1" onChange={testHandler} placeholder="Your new todo2..." />
                <input type="text" value={tests.value2} name="value2" onChange={testHandler} placeholder="Your new todo3..." />*/}
                <button type="submit">Add todo</button>
            </form>
            <div className="todos__list">
                {todos.length ? (todos.map(({id, text:other}) => {
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
};

export default Todos;