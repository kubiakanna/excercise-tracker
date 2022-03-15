import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CreateExercise.css';

const CreateExercise = () => {
    const [exercise, setExercise] = useState({
        title: '',
        details: ''
    })
    const history = useHistory();
    const handleChange = e => {
        setExercise({
            ...exercise,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            title: exercise.title,
            details: exercise.details,
            complete: false,
            id: Math.floor(Math.random() * 10000)
        };
        console.log("new exercise is: ", newExercise);
        fetch('http://localhost:3111/exercises', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(newExercise)
        })
        .then(() => {
            history.push('/home');
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
            type="text"
            name="title"
            onChange={handleChange} 
            value={exercise.title} 
            maxLength="15" 
            required
            />
            <label>Details</label>
            <textarea
            name="details" 
            cols="30" 
            rows="10" 
            onChange={handleChange} 
            value={exercise.details} 
            required
            ></textarea>
            <button>Add Exercise</button>
        </form>
    )
}

export default CreateExercise
