import { useContext, useState, useEffect } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const {bodyContent, setBodyContent} = useContext(PageContext);
    const {username, setUsername} = useContext(PageContext);

    //Default values are for logging in
    const [logInOut, setLogInOut] = useState(() => {setBodyContent("Login")});
    const [logInOutStr, setLogInOutStr] = useState("Login");
    const [userMenuOptions, setUserMenuOptions] = useState(<></>);


    useEffect(() => {

        //If the username is not guest then set the button text as logout and set the callback function for loggin out
        if(username != "Guest"){

            setLogInOutStr("Logout");

            setLogInOut(async () => {

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
                    setLogInOut(() => setBodyContent("Login"));
                    setLogInOutStr("Login");
                    setUsername("Guest");
                    setUserMenuOptions(<></>);
                }else{
                    setLoginResult('Error: Something went wrong.');
                }

      
                } catch (error) {

                    console.log(error.message);

                }
            });
            setUserMenuOptions(<li ><button onClick={() => setBodyContent("GalleryManager")}>Gallery</button></li>);
        }
    }, [])
    

    return(

        <header>
            <ul className="navbar">
                <li ><button onClick={() => setBodyContent("Home")}>Home</button></li>
                <li ><button onClick={() => setBodyContent("Gallery")}>Gallery</button></li>
                {userMenuOptions}
                <li ><button onClick={logInOut}>{logInOutStr}</button></li>
                <li ><button >{username}</button></li>
            </ul>
        </header>
    );
}

export default Header;