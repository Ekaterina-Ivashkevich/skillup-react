import React, { useState } from 'react'
import "./Register.scss"

const Register = () => {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [step, setStep] = useState(1);
    const [users, setUsers] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [emailError,setEmailError] = useState(false);

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
        if (nameError) {
            setNameError(false);
        }
        if (emailError){
            setEmailError(false);
        }
        setUserData({
            username: "",
            email: "",
            password: ""
        });
    }

    const stepHandler = () => {
        const user = users.find(user => user.username === userData.username);
        const email = users.find(user => user.email ===userData.email);
        if (user) {
            return setNameError(true);
        }
        if (email){
            return setEmailError(true);
        }
        setStep(step + 1);
    }

    return (

        <form className="register" onSubmit={registerHandler}>

            {(step === 1) ? (<input type="text"
                name="username"
                className={`register__input ${nameError ? 'error' : ''}`}
                value={userData.username}
                placeholder="Name..."
                onChange={inputHandler} />) : (step === 2) ? (
                    <input type="email"
                        name="email"
                        className={`register__input ${emailError ? 'error' : ''}`}
                        value={userData.email}
                        placeholder="E-mail..."
                        onChange={inputHandler} />) :
                (<input type="password"
                    name="password"
                    className="register__input"
                    value={userData.password}
                    placeholder="Password..."
                    onChange={inputHandler} />)}

            {((step === 1)||(step === 2)) ? (<div style={{
                border: "1px solid red",
                padding: "10px 20px",
                marginTop: 20,
                cursor: "pointer",
                width: "200px",
                backgroundColor: "#cccc"
            }}
                onClick={stepHandler}> Next step </div>) :
                <button type="submit" className="register__button">Register</button>}

        </form>

    )
}

export default Register;