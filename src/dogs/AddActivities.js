import "./CreateDog.css"
import { useState, useEffect } from "react"
import React from 'react'
import { useNavigate, useParams } from "react-router-dom"

export const AddActivities = () => {

    let navigate = useNavigate()
    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    const [checkActivity, setCheckActivity] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [dog, setDog] = useState([])
    const { dogId } = useParams()


    useEffect(() => {
        fetch(`http://localhost:8088/dogs?_expand=ownerId=${woofGangUserObject.id}&id=${dogId}`)

            .then(response => response.json())
            .then((arrayOfDogs) => {
                const dogObject = arrayOfDogs[0]
                setDog(dogObject)
            })
    }, [dogId] )

    const [joinTable, setJoinTable] = useState({
        activityId: 0,
        dogId: 0
    })


    useEffect(
        () => {
            fetch(`http://localhost:8088/activities`)
                .then(res => res.json())
                .then((data) => {
                    setCheckActivity(data)
                })
        },
        []
    )

    const handleChange = event => {
        setIsChecked(event.target.checked)
        console.log(event.target)
        console.log(event.target.checked)
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const tableToSendToAPI = {
            activityId: checkActivity?.activity?.id,
            dogId: dog.id,
        }

        return fetch(`http://localhost:8088/dogActivities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tableToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/goals/:dogId")
        })
    }

    return (
        <main className="form--login">
            <h1>What are some of your dog's favorite activities?</h1>
            <div>
                <div>
                    {checkActivity.map((activity) =>
                        <div key={`activityId--${activity?.id}`}>
                               <input
                                type="checkbox"
                                id={activity?.id}
                                name={activity?.type}
                                onChange={handleChange}
                                value={activity?.id} />
                            <span> {activity?.type} </span>
                        </div>
                    )
                    }
                </div>
            </div>
            <button
                onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="createSubmitButton"
                fontSize="large">
                Create Dog
            </button>        </main>
    )
}

