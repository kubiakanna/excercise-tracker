import React from 'react';
import { Link } from 'react-router-dom';
import './ExerciseItem.css';

function ExerciseItem(props) {
    const deleteExercise = () => {
        fetch(`http://localhost:3111/exercises/${props.exercise.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            props.deleteExercise(props.exercise.id);
        })
        .catch((error) => console.log(error));
    }
    const toggleExercise = () => {
        fetch(`http://localhost:3111/exercises/${props.exercise.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({complete: !props.exercise.complete})
        })
        .then(() => {
            props.toggleExercise(props.exercise.id);
        })
        .catch((error) => console.log(error));

    }
    const classes = [];
    if(props.exercise.complete) {
        classes.push("complete");
    }
    let status = 'Mark complete';
    if(props.exercise.complete) {
        status = 'Mark incomplete'
    }

    return (
        <div className="exercise">
            <div className="actions">
                <h4 className={classes}>{props.exercise.title}</h4>
                <div className="buttons">
                    <button onClick={deleteExercise}>Delete</button>
                    <Link id="edit" to={`/exercises/${props.exercise.id}/edit`}>Edit</Link>
                    <button onClick={toggleExercise}>{status}</button>
                </div>
            </div>
            <div className="details">
                <p>{props.exercise.details}</p>
            </div>
        </div>
    )
}
export default ExerciseItem;