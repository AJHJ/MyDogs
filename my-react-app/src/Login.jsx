
import { useEffect, useRef, useState } from 'react';

function Login(){
    return (
        <form action="/login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <button type="submit">Log In</button>
        </form>
    );
}

export default Login