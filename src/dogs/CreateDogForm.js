import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CreateDog.css"
import React from 'react'

export const CreateDogForm = (props) => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    let navigate = useNavigate()

    const [dropdownGender, setDropdownGender] = useState([])
    const [dropdownEnergyLevel, setDropdownEnergyLevel] = useState([])
    const [dropdownActivity, setDropdownActivity] = useState([])
    const [dropdownGoal, setDropdownGoal] = useState([])


    const [singleDog, setSingleDog] = useState([])


    const [dog, setDog] = useState({
        ownerId: "",
        name: "",
        image: "",
        description: "",
        birthday: "",
        genderId: 0,
        energyLevelId: 0,
        activityId: 0,
        goalId: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/genders`)
                .then(res => res.json())
                .then((arrayofGenders) => {
                    setDropdownGender(arrayofGenders)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/energyLevels`)
                .then(res => res.json())
                .then((arrayOfEnergyLevels) => {
                    setDropdownEnergyLevel(arrayOfEnergyLevels)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/activities`)
                .then(res => res.json())
                .then((arrayOfActivities) => {
                    setDropdownActivity(arrayOfActivities)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/goals`)
                .then(res => res.json())
                .then((arrayOfGoals) => {
                    setDropdownGoal(arrayOfGoals)
                })
        },
        []
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const dogToSendToAPI = {
            ownerId: woofGangUserObject.id,
            name: dog.name,
            image: dog.image,
            description: dog.description,
            birthday: dog.birthday,
            genderId: dog.genderId,
            energyLevelId: dog.energyLevelId,
            activityId: dog.activityId,
            goalId: dog.goalId
        }

        return fetch(`http://localhost:8088/dogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/mydogs`)
            })
    }

    return (
        <div className="section">
            <div className="dog-container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="dog-card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <form className="form-group">
                                                    <h4>New Dog Profile</h4>

                                                    <fieldset>
                                                        <label htmlFor="name"> Name </label>
                                                        <input required autoFocus value={dog.name}
                                                            type="text" id="name" className="form-style"
                                                            placeholder="Enter your dog's name"
                                                            onChange={
                                                                (event) => {
                                                                    const copy = { ...dog }
                                                                    copy.name = event.target.value
                                                                    setDog(copy)
                                                                }
                                                            } />
                                                    </fieldset>
                                                    <fieldset>
                                                        <label htmlFor="imageLocation"> Profile Photo </label>
                                                        <input required value={dog.image}
                                                            type="text" id="imageLocation" className="form-style"
                                                            placeholder="Paste a URL image"
                                                            onChange={
                                                                (event) => {
                                                                    const copy = { ...dog }
                                                                    copy.image = event.target.value
                                                                    setDog(copy)
                                                                }
                                                            } />
                                                    </fieldset>
                                                    <fieldset>
                                                        <label htmlFor="description"> Description </label>
                                                        <input required value={dog.description}
                                                            type="text" id="description" className="form-style"
                                                            placeholder="What does your dog have to say?"
                                                            onChange={
                                                                (event) => {
                                                                    const copy = { ...dog }
                                                                    copy.description = event.target.value
                                                                    setDog(copy)
                                                                }
                                                            } />
                                                    </fieldset>
                                                    <fieldset>
                                                        <label htmlFor="birthday"> Birthday </label>
                                                        <input required value={dog.birthday}
                                                            type="date" id="birthday" className="form-style"
                                                            placeholder="Date of birth"
                                                            onChange={
                                                                (event) => {
                                                                    const copy = { ...dog }
                                                                    copy.birthday = event.target.value
                                                                    setDog(copy)
                                                                }
                                                            } />
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="gender">Gender </label>
                                                            <select className="form-style" required id="gender" onChange={(event) => {
                                                                const copy = { ...dog }
                                                                copy.genderId = parseInt(event.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option value={0}>{dropdownGender?.type}</option>
                                                                {
                                                                    dropdownGender.map((gender) =>
                                                                        <option key={`genderId--${gender?.id}`} value={gender?.id}>{gender?.type}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="energyLevel">Energy level </label>
                                                            <select className="form-style" required id="energyLevel" onChange={(event) => {
                                                                const copy = { ...dog }
                                                                copy.energyLevelId = parseInt(event.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option value={0}>{dropdownEnergyLevel?.type}</option>
                                                                {
                                                                    dropdownEnergyLevel.map((energyLevel) =>
                                                                        <option key={`energyLevelId--${energyLevel?.id}`} value={energyLevel?.id}>{energyLevel?.type}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="activity">Choose an ideal activity </label>
                                                            <select className="form-style" required id="activity" onChange={(event) => {
                                                                const copy = { ...dog }
                                                                copy.activityId = parseInt(event.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option value={0}>{dropdownActivity?.type}</option>
                                                                {
                                                                    dropdownActivity.map((activity) =>
                                                                        <option key={`activityId--${activity?.id}`} value={activity?.id}>{activity?.type}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="goal">Choose a skill to learn </label>
                                                            <select className="form-style" required id="goal" onChange={(event) => {
                                                                const copy = { ...dog }
                                                                copy.goalId = parseInt(event.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option value={0}>{dropdownGoal?.type}</option>
                                                                {
                                                                    dropdownGoal.map((goal) =>
                                                                        <option key={`goalId--${goal?.id}`} value={goal?.id}>{goal?.type}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </fieldset>

                                                    <button
                                                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                                        fontSize="large"
                                                        className="btn mt-4">
                                                        Create Dog
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="filler" />

        </div>

    )
}


