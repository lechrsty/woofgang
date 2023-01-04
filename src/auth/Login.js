import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/owners?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("woofGang_user", JSON.stringify({
                        id: user.id,
                        registered: user.isRegistered
                    }))

                    navigate("/dogs")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    const [dropdownCity, setDropdownCity] = useState([])

    const [owner, setOwner] = useState({
        name: "",
        email: "",
        description: "",
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
                        email: createdUser.email,
                        description: createdUser.description,
                        cityId: createdUser.cityId,
                        isRegistered: createdUser.isRegistered
                    }))

                    window.alert("Profile successfully created!")
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

        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Log In</h4>
                                                <form className="form-group" onSubmit={handleLogin}>
                                                    <div className="form-group">
                                                        <input type="email"
                                                            value={email}
                                                            onChange={evt => set(evt.target.value)}
                                                            name="logemail"
                                                            id="logemail"
                                                            className="form-style"
                                                            placeholder="Email Address"
                                                            required autoFocus />
                                                    </div>
                                                    <button className="btn mt-4" type="submit">submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Sign Up</h4>

                                                <form className="form-group" onSubmit={handleRegister}>
                                                    <div className="form-group mt-2">
                                                        <input onChange={updateOwner} type="text" name="name" className="form-style" placeholder="Your Full Name" id="name" required autoFocus autoComplete="off" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input onChange={updateOwner} type="email" name="email" className="form-style" placeholder="Your Email" id="email" required />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input onChange={updateOwner} type="text" name="description" className="form-style" placeholder="Tell Us About Yourself" id="description" required />
                                                    </div>
                                                        <div className="form-group">
                                                            <label htmlFor="city">City </label>
                                                            <select className="form-style"  id="cityId" onChange={updateOwner}>
                                                                <option value={0}>{dropdownCity?.name}</option>
                                                                {
                                                                    dropdownCity.map((city) =>
                                                                        <option key={`cityId--${city?.id}`} value={city?.id}>{city?.name}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>

                                                    <button className="btn mt-4" type="submit">submit</button>
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
        </div>
    )
}

