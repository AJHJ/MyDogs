
import { useEffect, useRef, useState, useContext } from 'react';
import { PageContext } from "./Contexts.jsx";

function Login(){

    const {bodyContent, setBodyContent} = useContext(PageContext);

    return (
        <>
            <form action="/login" method="POST">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <button type="submit">Log In</button>
            </form>

            <p>You don't have an account yet? <button onClick={() => setBodyContent("Signup")}>SignUp here</button></p>
        </>
        

    );
}

export default Login