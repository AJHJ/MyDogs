import PropTypes from 'prop-types';

function GalleryCard(props){

    return(
        <div className="card">
            <img src={"http://localhost:3000/public/images/"+props.imageURL} alt="Not Found"></img>

        </div>
    );
}

GalleryCard.propTypes = {
    imageURL: PropTypes.string
}

export default GalleryCard