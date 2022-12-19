import { useEffect, useState } from "react"
import "./Dogs.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export const DogsList = () => {
    const [dogs, setDogs] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs?&_expand=gender&_expand=energyLevel`)
                .then(response => response.json())
                .then((dogArray) => {
                    setDogs(dogArray)
                })
        },
        []
    )
    return <article className="dogs">
        {
            dogs.map(dog => {
                return <Card sx={{ maxWidth: 300 }} className="dog" key={`dogs--${dog.id}`}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="200"
                        image={dog?.image}
                        alt="doggo" />
                    <CardContent>
                        <Typography variant="h5" component="div">
                        {dog.name}
                        </Typography>
                        <Typography paragraph color="text.secondary">
                        {dog.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        I'm a {dog?.gender?.type}.
                        </Typography>
                        <Typography  variant="body2" color="text.secondary">
                        I have a {dog?.energyLevel?.type} level of energy.
                        </Typography>
                    </CardContent>
                </Card>
            })

        }

    </article>
}