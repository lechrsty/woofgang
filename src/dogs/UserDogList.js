import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./Dogs.css"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditIcon from '@mui/icons-material/Edit'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


export const UserDogList = () => {

    const { ownerId } = useParams
    const [dog, setDog] = useState([])

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs?_expand=owner&ownerId=${woofGangUserObject.id}`)
                .then(response => response.json())
                .then((arrayOfDogs) => {
                    setDog(arrayOfDogs)
                })
        },
        [ownerId]
    )

    return <>

        <article className="dogs">
        <Button onClick={event =>  window.location.href='/createdog'} className="createButton">Add a New Dog</Button>

            {
                dog.map(dog => {
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
                        {/* <Typography variant="body2" color="text.secondary">
                        I'm a {dog?.gender?.type}.
                        </Typography>
                        <Typography  variant="body2" color="text.secondary">
                        I have a {dog?.energyLevel?.type} level of energy.
                        </Typography> */}
                    </CardContent>
                    <EditIcon onClick={event =>  window.location.href=`/editdog/${dog.id}`} className="editButton"></EditIcon>
                </Card>
                })

            }
        </article>
    </>
}
