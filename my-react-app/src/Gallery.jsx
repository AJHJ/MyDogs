import GalleryCard from './GalleryCard.jsx';
import { useEffect, useState } from 'react';


function Gallery(){

    //This is a state variable
    const [imagesURL, setImagesURL] = useState([]);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Create an instance of AbortController to cancel requests if component unmounts
        const controller = new AbortController();
    
        // 2. Define the inner async function
        const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/imagesURL', {
          signal: controller.signal // Pass the abort signal to fetch
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setImagesURL(result);
        console.log(result);

      } catch (err) {
        // Only update state if the error wasn't triggered by aborting the request
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // 3. Call the inner function
    fetchData();

    // 4. Return cleanup function to abort the fetch if dependencies change or component unmounts
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array ensures this runs exactly once on mount


    return(
        //Here goes the HTML inside the body tag, the body tag isn't used here because it is already in the INDEX.HTML file
        <div className="gallery">
          {
            imagesURL.map((url) => (<GalleryCard key={url.id} imageURL={url.imageAddress}></GalleryCard>))
          }
        </div>
        
    );
}

export default Gallery