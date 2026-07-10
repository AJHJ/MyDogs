
import { useEffect, useRef, useState } from 'react';
import { PageContext } from "./Contexts.jsx";

function Signup(){
    
    const {bodyContent, setBodyContent} = useContext(PageContext);

    return (
        <form action="/signup" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <label for="password">Repeat Password:</label>
            <input type="password" id="repeatpassword" name="repeatpassword" required></input>

            <button type="submit">SignUp</button>
        </form>
    );
}

export default Signup