import PropTypes from 'prop-types';

function GalleryCard(props){

    return(
        <div className="card">
            <img src={"/images/"+props.imageURL} alt="Not Found"></img>

        </div>
    );
}

GalleryCard.propTypes = {
    imageURL: PropTypes.string
}

export default GalleryCard