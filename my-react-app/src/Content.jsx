
import GalleryCard from './GalleryCard.jsx';
import Gallery from './Gallery.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { PageContext } from './Contexts.jsx';
import { useEffect, useState, createContext } from 'react';

function Content(){
    let contentComp = <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
    
    const updateBodyContent = (contentStr) => {
        if(contentStr=="Home"){
            contentComp = <p>This is a site dedicated to show everyone how perfect and worthy of worship my dogs are.</p>;
        }else if(contentStr=="Gallery"){
            contentComp = <Gallery></Gallery>;
        }
    }

    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <>
            <PageContext.Provider value={updateBodyContent}>
                <Header></Header>
            </PageContext.Provider>
            {contentComp}
            <Footer></Footer>
        </>
        
    );
}

export default Content