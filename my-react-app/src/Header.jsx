import { useContext } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const {bodyContent, setBodyContent} = useContext(PageContext);

    return(

        <header>
            <ul className="navbar">
                <li ><button onClick={() => setBodyContent("Home")}>Home</button></li>
                <li ><button onClick={() => setBodyContent("Gallery")}>Gallery</button></li>
                <li ><button onClick={() => setBodyContent("Login")}>Login</button></li>
            </ul>
        </header>
    );
}

export default Header;