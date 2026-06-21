
import GalleryCard from './GalleryCard.jsx';
import {Header, Footer} from './HeaderFooter.jsx';
import { openDB, getImageAddresses, closeDB } from './db.js';

function Content(){

    const database = openDB();
    const imageAddresses = getImageAddresses(database);
    const result = closeDB(database);

    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <>
            <Header></Header>
            {
                imageAddresses.map((address) => (
                    <GalleryCard key={address.id} imageAddress={address.imageAddress}></GalleryCard>
                ))
            }
            <Footer></Footer>
        </>
        
    );
}

export default Content