import React from 'react';
import { Link } from 'react-router-dom';
import './ExcerciseItem.css';

function ExcerciseItem(props) {
    const deleteExcercise = () => {
        fetch(`http://localhost:3111/excercises/${props.excercise.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            props.deleteExcercise(props.excercise.id);
        })
        .catch((error) => console.log(error));
    }
    const toggleExcercise = () => {
        fetch(`http://localhost:3111/excercises/${props.excercise.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({complete: !props.excercise.complete})
        })
        .then(() => {
            props.toggleExcercise(props.excercise.id);
        })
        .catch((error) => console.log(error));

    }
    const classes = [];
    if(props.excercise.complete) {
        classes.push("complete");
    }
    let status = 'Mark complete';
    if(props.excercise.complete) {
        status = 'Mark incomplete'
    }

    return (
        <div className="excercise">
            <div className="actions">
                <h4 className={classes}>{props.excercise.title}</h4>
                <div className="buttons">
                    <button onClick={deleteExcercise}>Delete</button>
                    <Link id="edit" to={`/excercises/${props.excercise.id}/edit`}>Edit</Link>
                    <button onClick={toggleExcercise}>{status}</button>
                </div>
            </div>
            <div className="details">
                <p>{props.excercise.details}</p>
            </div>
        </div>
    )
}
export default ExcerciseItem;