import React, { useState, useEffect } from 'react';
import ExercisesList from '../components/ExercisesList';
import Filter from '../components/Filter';

const HomePage = () => {
    const [exercises, setExercises] = useState([]);
    const [currFilter, setCurrFilter] = useState('all');

    const handleFilterUpdate = (newFilter) => {
        setCurrFilter(newFilter);
    }

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch("http://localhost:3111/exercises");
                const fetchedExercises = await response.json();
                setExercises(fetchedExercises);
            } catch (error) {
                console.log(error);
            }
        }
        fetchExercises();
    }, []);

    const handleDelete = (id) => {
        const exercisesAfterDeleting = exercises.filter(exercise => exercise.id !== id);
        setExercises(exercisesAfterDeleting);
    }
    const handleToggleComplete = (id) => {
        console.log('id is: ', id);
        const clonedExercises = [...exercises];
        const clickedIndex = clonedExercises.findIndex(exercise => exercise.id === id);
        const clickedExercise = clonedExercises[clickedIndex];
        clickedExercise.complete = !clickedExercise.complete;
        setExercises(clonedExercises);
    }

    let jsx = (
        <ExercisesList 
            toggleExercise={handleToggleComplete}
            deleteExercise={handleDelete}
            exercises={exercises}
        />
    );
    if(currFilter === 'completed') {
        jsx = <ExercisesList 
                toggleExercise={handleToggleComplete}
                deleteExercise={handleDelete}
                exercises={exercises.filter(exercise => exercise.complete === true)}
            />
    } else if(currFilter === 'pending') {
        jsx = <ExercisesList 
                toggleExercise={handleToggleComplete}
                deleteExercise={handleDelete}
                exercises={exercises.filter(exercise => exercise.complete === false)}
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
