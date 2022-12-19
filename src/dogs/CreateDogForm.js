import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CreateDog.css"
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SaveAltIcon from '@mui/icons-material/SaveAlt'



export const CreateDogForm = (props) => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    let navigate = useNavigate()
   
    const [dropdownGender, setDropdownGender] = useState([])
    const [dropdownEnergyLevel, setDropdownEnergyLevel] = useState([])

    const [dog, setDog] = useState({
        ownerId: "",
        name: "",
        image: "",
        description: "",
        birthday: "",
        genderId: 0,
        energyLevelId: 0,
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const dogToSendToAPI = {
            ownerId: woofGangUserObject.id,
            name: dog.name,
            image: dog.image,
            description: dog.description,
            birthday: dog.birthday,
            genderId: dog.genderId,
            energyLevelId: dog.energyLevelId
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
            navigate("/mydogs")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Dog Profile</h2>

            <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input required autoFocus value={dog.name}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your dog's name" 
                        onChange={
                            (event) => {
                                const copy = {...dog}
                                copy.name = event.target.value
                                setDog(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="imageLocation"> Profile Photo </label>
                    <input required value={dog.image}
                        type="text" id="imageLocation" className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...dog}
                                copy.image = event.target.value
                                setDog(copy)
                            }
                        }/>
                </fieldset>
                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input required value={dog.description}
                        type="text" id="description" className="form-control"
                        placeholder="What does your dog have to say?"
                        onChange={
                            (event) => {
                                const copy = {...dog}
                                copy.description = event.target.value
                                setDog(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="birthday"> Birthday </label>
                    <input required value={dog.birthday}
                        type="date" id="birthday" className="form-control"
                        placeholder="Date of birth" 
                        onChange={
                            (event) => {
                                const copy = {...dog}
                                copy.birthday = event.target.value
                                setDog(copy)
                            }
                        }/>
                </fieldset>
                <fieldset>
                    <div className="form-control">
                    <label htmlFor="gender">Gender: </label>
                    <select required id="gender" onChange={(event) => {
                        const copy = {...dog}
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
                    <div className="form-control">
                    <label htmlFor="energyLevel">Energy level: </label>
                    <select required id="energyLevel" onChange={(event) => {
                        const copy = {...dog}
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

            <SaveAltIcon
                onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="createSubmitButton"
                fontSize="large">
                Create Dog
            </SaveAltIcon>

        </form>
    )
}


