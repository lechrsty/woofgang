import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import {
    MDBContainer,
    MDBRow,
    MDBCol
}
    from 'mdb-react-ui-kit';


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

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (

        <MDBContainer className="container--login">
            <MDBRow>
                <MDBCol>
                <div className="col-md-4">
                    <section>
                        <form className="form--login" onSubmit={handleLogin}>
                            <h1>WoofGang</h1>
                            <fieldset>
                                <h2>Log in </h2>
                                <input type="email"
                                    value={email}
                                    onChange={evt => set(evt.target.value)}
                                    className="form-control"
                                    placeholder="Email address"
                                    required autoFocus />
                            </fieldset>
                                <button type="submit">
                                    Submit
                                </button>
                        </form>
                    </section>
                    <section className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </section>
                </div>
                </MDBCol>
                {/* <MDBCol sm='6' className="col-md-8">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol> */}
            </MDBRow>
        </MDBContainer>
    )
}
