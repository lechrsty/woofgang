import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./Dogs.css"
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'


export const UserDogList = () => {

    const { ownerId } = useParams
    const [dog, setDog] = useState([])

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs?_expand=gender&energyLevel&owner&ownerId=${woofGangUserObject.id}`)
                .then(response => response.json())
                .then((dog) => {
                    setDog(dog)
                })
        },
        [ownerId]
    )

        return <>

            <div className="list-header">
                <button onClick={event => window.location.href = '/createdog'} className="btn mt-4">Add a New Dog</button>
            </div>

            <article>
                <div className="list-container">
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
                        <Typography variant="h4" component="div">
                        {dog.name}
                        </Typography>
                        <Typography paragraph color="text.secondary">
                        {dog.description}
                        </Typography>
                        <button onClick={event =>  window.location.href=`/editdog/${dog.id}`} className="btn mt-4"> Edit </button>
                    </CardContent>
                </Card>
                        })

                    }
                </div>
            </article>
        </>
    }

