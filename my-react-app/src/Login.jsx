
import { useEffect, useRef, useState } from 'react';
const {bodyContent, setBodyContent} = useContext(PageContext);

function Login(){

    const {bodyContent, setBodyContent} = useContext(PageContext);

    return (
        <>
            <form action="/login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <button type="submit">Log In</button>
            </form>

            <p>You don't have an account yet? <button onClick={() => setBodyContent("Signup")}>SignUp here.</button>'</p>
        </>
        

    );
}

export default Login