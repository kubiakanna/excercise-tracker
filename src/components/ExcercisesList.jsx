import React from 'react'
import ExcerciseItem from './ExcerciseItem';
import './ExcercisesList.css';

function ExcercisesList(props) {
    if (props.excercises.length === 0) return null;
    return (
        <div className="excercises-list">
            {props.excercises.map(excercise => (
            <ExcerciseItem 
                toggleExcercise={props.toggleExcercise}
                deleteExcercise={props.deleteExcercise} 
                key={excercise.id} 
                excercise={excercise}
            />))}
        </div>
    )
}

export default ExcercisesList;