import { useContext, useState, useEffect } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const {bodyContent, setBodyContent} = useContext(PageContext);
    const {username, setUsername} = useContext(PageContext);

    //Default values are for logging in
    const [logInOut, setLogInOut] = useState(<></>);
    //const [logInOutStr, setLogInOutStr] = useState("Login");
    const [userMenuOptions, setUserMenuOptions] = useState(<></>);


    useEffect(() => {

        //If the username is not guest then set the button text as logout and set the callback function for loggin out
        if(username != "Guest"){

            //setLogInOutStr("Logout");
            
            const handleLogOut = async () => {

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
                    //setLogInOut(() => setBodyContent("Login"));
                    //setLogInOutStr("Login");
                    setUserMenuOptions(<></>);
                    setUsername("Guest");
                }else{
                    setLoginResult('Error: Something went wrong.');
                }

      
                } catch (error) {

                    console.log(error.message);

                }
            };

            setLogInOut(<li ><button onClick={handleLogOut}>Logout</button></li>);
            setUserMenuOptions(<li ><button onClick={() => setBodyContent("GalleryManager")}>Gallery Manager</button></li>);
        }else{
            setLogInOut(<li ><button onClick={() => setBodyContent("Login")}>Login</button></li>);
        }
    }, [username]);
    

    return(

        <header>
            <ul className="navbar">
                <li ><button onClick={() => setBodyContent("Home")}>Home</button></li>
                <li ><button onClick={() => setBodyContent("Gallery")}>Gallery</button></li>
                {userMenuOptions}
                {logInOut}
                <li ><button >{username}</button></li>
            </ul>
        </header>
    );
}

export default Header;