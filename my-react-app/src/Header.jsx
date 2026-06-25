import { useContext } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const {bodyContent, setBodyContent} = useContext(PageContext);

    return(

        <header>
            <ul className="navbar">
                <li className="navbar-item" ><button onClick={() => setBodyContent("Home")}>Home</button></li>
                <li className="navbar-item" ><button onClick={() => setBodyContent("Gallery")}>Gallery</button></li>
                <li className="navbar-item" ><button >Know the babies</button></li>
            </ul>
        </header>
    );
}

export default Header;