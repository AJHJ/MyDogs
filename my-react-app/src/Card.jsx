
function Card(){
    var img="./assets/react.svg";
    var title="React";
    var text="Is what I am learning.";

    return(
        <div className="card">
            <img src="{img}"></img>
            <h2>{title}</h2>
            <p>{text}</p>

        </div>
    );
}

export default Card