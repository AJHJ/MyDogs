import PropTypes from 'prop-types';

function GalleryCard(props){
    var img="./assets/react.svg";
    var title="React";
    var text="Is what I am learning.";

    return(
        <div className="card">
            <img src={props.imageAddress}></img>
        </div>
    );
}

GalleryCard.propTypes = {
    imageAddress: PropTypes.string
}

export default GalleryCard