
import { useEffect, useRef, useState, useContext } from 'react';
import { PageContext } from "./Contexts.jsx";

function Signup(){
    
    const {bodyContent, setBodyContent} = useContext(PageContext);
    const [signupResult, setSignupResult] = useState("");

    const handleSubmitAction = async (formData) => {

    const username = formData.get("username");
    const password = formData.get("password");
    const repeatpassword = formData.get("repeatpassword");

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password, repeatpassword}),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSignupResult(result.message);
      
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

            <label htmlFor="password">Repeat Password:</label>
            <input type="password" id="repeatpassword" name="repeatpassword" required></input>

            <button type="submit">SignUp</button>
            </form>
            <p>{signupResult}</p>
        </>
        
    );
}

export default Signup