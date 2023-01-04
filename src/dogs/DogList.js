import { useEffect, useState } from "react"
import "./Dogs.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export const DogList = ({searchTermState}) => {
    const [dogs, setDogs] = useState([])
    const [filteredDogs, setFilteredDogs] = useState([])

    // Fetch dogs for Dog List

    const fetchedDogs = () => {
        return fetch(`http://localhost:8088/dogs?&_expand=gender&_expand=energyLevel&_expand=goal&_expand=activity`)
                .then(response => response.json())
                .then((dogArray) => {
                    setDogs(dogArray)
                })
        }
    

    // Search bar functionality

    useEffect(
        () => {
           fetchedDogs() //console.log("Initial state of dogs", dog) // View the initial state of dogs
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const searchedDogs = dogs.filter(dog => {
                return dog?.energyLevel?.type?.toLowerCase().includes(searchTermState?.toLowerCase()) ||
                dog?.gender?.type?.toLowerCase().includes(searchTermState?.toLowerCase()) ||
                dog?.name?.toLowerCase().includes(searchTermState?.toLowerCase()) ||
                dog?.goal?.type?.toLowerCase().includes(searchTermState?.toLowerCase()) ||
                dog?.activity?.type?.toLowerCase().includes(searchTermState?.toLowerCase()) 
            })
            setFilteredDogs(searchedDogs)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            setFilteredDogs(dogs)
        },
        [dogs]
    )



    return <article className="list-container">
        {
            filteredDogs.map(dog => {
                return <Card sx={{ maxWidth: 300 }} className="dog" key={`dogs--${dog.id}`}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={dog?.image}
                        alt="doggo" />
                    <CardContent>
                        <Typography variant="h4" component="div">
                        {dog.name}
                        </Typography>
                        <Typography paragraph color="text.secondary">
                        {dog.description}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                        My gender is {dog?.gender?.type}.
                        </Typography>
                        <Typography  variant="h5" color="text.secondary">
                        My activity level is {dog?.energyLevel?.type}.
                        </Typography>
                        <Typography  variant="h5" color="text.secondary">
                        I like to spend time {dog?.activity?.type}.
                        </Typography>
                        <Typography  variant="h5" color="text.secondary">
                        I'm looking for a teammate who can learn how to {dog?.goal?.type} with me.
                        </Typography>
                    </CardContent>
                </Card>
            })

        }

    </article>
}

