
import GalleryCard from './GalleryCard.jsx';
import Gallery from './Gallery.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageContext } from './Contexts.jsx';
import { useEffect, useState, createContext } from 'react';

function Content(){
    const [bodyContent, setBodyContent] = useState("Home");
    let contentComp= <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
    
        
    if(bodyContent=="Home"){
        contentComp = <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
    }else if(bodyContent=="Gallery"){
        contentComp = <Gallery></Gallery>;
    }

    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <div className="bodyDiv">
            <PageContext.Provider value={{bodyContent, setBodyContent}}>
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