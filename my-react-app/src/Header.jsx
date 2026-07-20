import { useContext } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const {bodyContent, setBodyContent} = useContext(PageContext);
    const {username, setUsername} = useContext(PageContext);

    //Default values are for logging in
    const logInOut = () => setBodyContent("Login");
    const logInOutStr = "Login";

    //If the username is not guest then set the button text as logout and set the callback function for loggin out
    if(username != "Guest"){

        logInOutStr = "Logout";

        logInOut = async () => {

        try {
            const response = await fetch("/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong.");
            }

            if(result.isSuccess == true){
                logInOut = () => setBodyContent("Login");
                logInOutStr = "Login";
                setUsername("Guest");
            }else{
                setLoginResult('Error: Something went wrong.');
            }

      
        } catch (error) {

            console.log(error.message);

        }
        };
    }

    return(

        <header>
            <ul className="navbar">
                <li ><button onClick={() => setBodyContent("Home")}>Home</button></li>
                <li ><button onClick={() => setBodyContent("Gallery")}>Gallery</button></li>
                <li ><button onClick={logInOut}>{logInOutStr}</button></li>
                <li ><button >{username}</button></li>
            </ul>
        </header>
    );
}

export default Header;