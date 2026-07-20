
import { useEffect, useRef, useState, useContext } from 'react';
import { PageContext } from "./Contexts.jsx";

function Login(){

    const {bodyContent, setBodyContent} = useContext(PageContext);
    const [loginResult, setLoginResult] = useState("");
    const {username, setUsername} = useContext(PageContext);

    const handleSubmitAction = async (formData) => {

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      if(result.isSuccess == true){
        setLoginResult('Logged in successfully.');
        setUsername(result.username);
      }else{
        setLoginResult('Error: Username or password is wrong.');
      }

      
    } catch (error) {

      console.log(error.message);

    }
    };

    return (
        <>
            <form action={handleSubmitAction}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required></input>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required></input>

            <button type="submit">Log In</button>
            </form>

            <p>You don't have an account yet? <button onClick={() => setBodyContent("Signup")}>SignUp here</button></p>
            <p>{loginResult}</p>
        </>
        

    );
}

export default Login