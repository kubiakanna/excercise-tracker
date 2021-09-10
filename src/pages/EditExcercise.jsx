import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CreateExcercise.css';

const EditExcercise = () => {
    const [excercise, setExcercise] = useState({
        title: '',
        details: ''
    })
    const params = useParams();
    const excerciseId = params.id;
    const history = useHistory();
    const handleChange = e => {
        setExcercise({
            ...excercise,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3111/excercises/${excerciseId}`)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            setExcercise({
                title: data.title,
                details: data.details
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }, [excerciseId])
    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3111/excercises/${excerciseId}`, {
            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(excercise)
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
            value={excercise.title} 
            maxLength="15" 
            required
            />
            <label>Details</label>
            <textarea
            name="details" 
            cols="30" 
            rows="10" 
            onChange={handleChange} 
            value={excercise.details} 
            required
            ></textarea>
            <button>Update Excercise</button>
        </form>
    )
}

export default EditExcercise
