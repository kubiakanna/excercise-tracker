import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CreateExercise.css';

const EditExercise = () => {
    const [exercise, setExercise] = useState({
        title: '',
        details: ''
    })
    const params = useParams();
    const exerciseId = params.id;
    const history = useHistory();
    const handleChange = e => {
        setExercise({
            ...exercise,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3111/exercises/${exerciseId}`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            setExercise({
                title: data.title,
                details: data.details
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }, [exerciseId])
    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3111/exercises/${exerciseId}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(exercise)
        })
        .then(() => {
            history.push('/home');
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <form onSubmit={handleEditSubmit}>
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
            <button>Update Exercise</button>
        </form>
    )
}

export default EditExercise
