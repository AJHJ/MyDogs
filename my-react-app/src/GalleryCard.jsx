import PropTypes from 'prop-types';

function GalleryCard(props){

    return(
        <div className="card">
            <img src={"http://localhost:3000/images/"+props.imageAddress}></img>

        </div>
    );
}

GalleryCard.propTypes = {
    imageAddress: PropTypes.string
}

export default GalleryCard