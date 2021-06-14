import React, { useState } from 'react'
import "./Register.scss"

const Register = () => {

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const [step, setStep] = useState(1);
    const [users, setUsers] = useState([]);
    const [nameError, setNameError] = useState(false);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value // квадратные скобки, тк переменная
        }))
    }

    const registerHandler = (e) => {
        e.preventDefault();
        console.log("userData", userData);
        setUsers(prevState => [...prevState, userData]);
        setStep(1);
        if(nameError){
            setNameError(false);
        }
        setUserData({
            username: "",
            password: "",
        });
    }

    const stepHandler = () => {
        const user = users.find(user => user.username === userData.username);
        if (user) {
            return setNameError(true);
        }
        setStep(step + 1);
    }

    return (

        <form className="register" onSubmit={registerHandler}>

            {step === 1 ? (<input type="text"
                name="username"
                className={`register__input ${nameError ? 'error' : ''}`}
                value={userData.username}
                placeholder="Name..."
                onChange={inputHandler} />) : (
                <input type="password"
                    name="password"
                    className="register__input"
                    value={userData.password}
                    placeholder="Password..."
                    onChange={inputHandler} />)}

            {step === 1 ? (<div style={{
                border: "1px solid red",
                padding: "10px 20px",
                marginTop: 20,
                cursor: "pointer",
                width:"200px",
                backgroundColor: "#cccc"
            }}
                onClick={stepHandler}> Next step </div>) :
                <button type="submit" class="register__button">Register</button>}

        </form>

    )
}

export default Register;