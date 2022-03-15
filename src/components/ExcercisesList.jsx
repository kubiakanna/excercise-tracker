import React from 'react'
import ExerciseItem from './ExerciseItem';
import './ExercisesList.css';

function ExercisesList(props) {
    if (props.exercises.length === 0) return null;
    return (
        <div className="exercises-list">
            {props.exercises.map(exercise => (
            <ExerciseItem 
                toggleExercise={props.toggleExercise}
                deleteExercise={props.deleteExercise} 
                key={exercise.id} 
                exercise={exercise}
            />))}
        </div>
    )
}

export default ExercisesList;