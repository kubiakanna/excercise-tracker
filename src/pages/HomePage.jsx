import React, { useState, useEffect } from 'react';
import ExcercisesList from '../components/ExcercisesList';
import Filter from '../components/Filter';

const HomePage = () => {
    const [excercises, setExcercises] = useState([]);
    const [currFilter, setCurrFilter] = useState('all');

    const handleFilterUpdate = (newFilter) => {
        setCurrFilter(newFilter);
    }

    useEffect(() => {
        async function fetchExcercises() {
            try {
                const response = await fetch("http://localhost:3111/excercises");
                const fetchedExcercises = await response.json();
                setExcercises(fetchedExcercises);
            } catch (error) {
                console.log(error);
            }
        }
        fetchExcercises();
    }, []);

    const handleDelete = (id) => {
        const excercisesAfterDeleting = excercises.filter(excercise => excercise.id !== id);
        setExcercises(excercisesAfterDeleting);
    }
    const handleToggleComplete = (id) => {
        console.log('id is: ', id);
        const clonedExcercises = [...excercises];
        const clickedIndex = clonedExcercises.findIndex(excercise => excercise.id === id);
        const clickedExcercise = clonedExcercises[clickedIndex];
        clickedExcercise.complete = !clickedExcercise.complete;
        setExcercises(clonedExcercises);
    }

    let jsx = (
        <ExcercisesList 
            toggleExcercise={handleToggleComplete}
            deleteExcercise={handleDelete}
            excercises={excercises}
        />
    );
    if(currFilter === 'completed') {
        jsx = <ExcercisesList 
                toggleExcercise={handleToggleComplete}
                deleteExcercise={handleDelete}
                excercises={excercises.filter(excercise => excercise.complete === true)}
            />
    } else if(currFilter === 'pending') {
        jsx = <ExcercisesList 
                toggleExcercise={handleToggleComplete}
                deleteExcercise={handleDelete}
                excercises={excercises.filter(excercise => excercise.complete === false)}
            />
    }

    return (
        <div>
            <Filter onUpdate={handleFilterUpdate} current={currFilter} />
            {jsx}
        </div>
    )
}

export default HomePage
