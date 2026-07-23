
import GalleryManager from './GalleryManager.jsx';
import Gallery from './Gallery.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { PageContext } from './Contexts.jsx';
import { useEffect, useState, createContext } from 'react';

function Content(){
    const [bodyContent, setBodyContent] = useState("Home");
    const [username, setUsername] = useState("Guest");

    let contentComp= <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
    
        
    if(bodyContent=="Home"){
        contentComp = <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
    }else if(bodyContent=="Gallery"){
        contentComp = <Gallery></Gallery>;
    }else if(bodyContent=="Signup"){
        contentComp = <Signup></Signup>;
    }else if(bodyContent=="Login"){
        contentComp = <PageContext.Provider value={{bodyContent, setBodyContent}}>
                <Login></Login>
            </PageContext.Provider>;
    }else if(bodyContent=="GalleryManager"){
        contentComp = <GalleryManager></GalleryManager>;
    }

    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <div className="bodyDiv">
            <PageContext.Provider value={{bodyContent, setBodyContent, username, setUsername}}>
                <Header></Header>
            </PageContext.Provider>
            <div className="content">
                {contentComp}
            </div>
            
            <Footer></Footer>
        </div>
        
    );
}

export default Content