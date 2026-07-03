import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function GalleryCard(props){
    const [comp, setComp] = useState(<></>);

    useEffect(() => {
        if(props.imageURL.endsWith("mp4")){
            setComp(<video controls>
                <source src={"/images/"+props.imageURL} type="video/mp4" />
                Your browser does not support the video tag.
                </video>);
        }else{
        setComp(<img src={"/images/"+props.imageURL} alt="Not Found"></img>);
        }

    }, []);

    return(
        <div className="card">
            {comp}

        </div>
    );
}

GalleryCard.propTypes = {
    imageURL: PropTypes.string
}

export default GalleryCard