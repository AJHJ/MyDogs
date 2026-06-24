import { useContext } from "react";
import { PageContext } from "./Contexts.jsx";

function Header(){

    const updateBodyContent = useContext(PageContext);
    console.log(updateBodyContent);

    return(

        <header>
            <ul className="navbar">
                <li className="navbar-item" ><button onClick={() => updateBodyContent("Home")}>Home</button></li>
                <li className="navbar-item" ><button onClick={() => updateBodyContent("Gallery")}>Gallery</button></li>
                <li className="navbar-item" ><button >Know the babies</button></li>
            </ul>
        </header>
    );
}

export default Header;