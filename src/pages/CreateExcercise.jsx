import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CreateExcercise.css';

const CreateExcercise = () => {
    const [excercise, setExcercise] = useState({
        title: '',
        details: ''
    })
    const history = useHistory();
    const handleChange = e => {
        setExcercise({
            ...excercise,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newExcercise = {
            title: excercise.title,
            details: excercise.details,
            complete: false,
            id: Math.floor(Math.random() * 10000)
        };
        console.log("new excercise is: ", newExcercise);
        fetch('http://localhost:3111/excercises', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(newExcercise)
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
            <button>Add Excercise</button>
        </form>
    )
}

export default CreateExcercise
