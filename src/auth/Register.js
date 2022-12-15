import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import React from 'react';


export const Register = (props) => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)
    
    let navigate = useNavigate()
    const [dropdownCity, setDropdownCity] = useState([])

    const [owner, setOwner] = useState({
        name: "",
        image: "",
        email: "",
        description: "",
        phoneNumber: 0,
        cityId: 0,
        isRegistered: true
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/cities`)
            .then(res => res.json())
            .then((data) => {
                setDropdownCity(data)
            })
        },
        []
    )


    const registerNewUser = () => {
        return fetch("http://localhost:8088/owners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(owner)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("woofGang_user", JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.name,
                        image: createdUser.image,
                        email: createdUser.email,
                        description: createdUser.description,
                        phoneNumber: createdUser.phoneNumber,
                        cityId: createdUser.cityId,
                        isRegistered: createdUser.isRegistered
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/owners?email=${owner.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateOwner = (evt) => {
        const copy = { ...owner }
        copy[evt.target.id] = evt.target.value
        setOwner(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for WoofGang</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input onChange={updateOwner}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="image"> Profile Photo </label>
                    <input onChange={updateOwner}
                            type="file" id="image" className="form-control"
                            required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateOwner}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input onChange={updateOwner}
                        type="text" id="description" className="form-control"
                        placeholder="Tell us about yourself" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone number </label>
                    <input onChange={updateOwner}
                        type="number" id="phoneNumber" className="form-control"
                        placeholder="Phone number" required />
                </fieldset>
                <fieldset>
                    <div className="form-control">
                    <label htmlFor="city">City: </label>
                    <select id="cityId" onChange={updateOwner}>
                        <option value={0}>{dropdownCity?.name}</option>
                        {
                            dropdownCity.map((city) =>
                            <option key={`cityId--${city?.id}`} value={city?.id}>{city?.name}</option>
                            )
                        }
                    </select>
                    </div>
                </fieldset>
                <button type="submit"> Register </button>
            </form>
        </main >
    )
}

