
import GalleryCard from './GalleryCard.jsx';
import {Header, Footer} from './HeaderFooter.jsx';
import { useState } from 'react';


function Content(){

    //This is a state variable
    const [imageAddresses, setImageAddresses] = useState([]);

    async function getImages(){
        try{
            const response = await fetch("http://localhost:3000/images");
            if(!response.ok){
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            setImageAddresses(data);
            console.log(data);
        }
        catch(error){
            console.error("Error message: ", error);
        }
    }

    getImages();

    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <>
            <Header></Header>
            {
                imageAddresses.map((address) => (<GalleryCard key={address.id} imageAddress={address.imageAddress}></GalleryCard>))
            }
            <Footer></Footer>
        </>
        
    );
}

export default Content