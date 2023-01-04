import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import './ProfileForm.css'



export const ProfileForm = () => {

    let navigate = useNavigate()
    const { ownerId } = useParams()

    // const [inputPhoneNumber, setInputPhoneNumber] = useState(0)

    const [singleProfile, setSingleProfile] = useState([])
    const [profile, setProfile] = useState({
        name: "",
        image: "",
        email: "",
        description: "",
        // phoneNumber: 0,
        cityId: 0
    })

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)
    const [dropdownCity, setDropdownCity] = useState([])

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

    useEffect(() => {
        fetch(`http://localhost:8088/owners?id=${woofGangUserObject.id}&_expand=city`)
            .then(response => response.json())
            .then((data) => {
                const singleProfile = data[0]
                setSingleProfile(singleProfile)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/owners/${woofGangUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                setProfile(data)
            })
    }, [ownerId])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/owners/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/dogs")
            })
    }

    return (

        <div className="section">
            <div className="profile-container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="profile-card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Owner Profile</h4>
                                                <form className="form-group">
                                                    <fieldset>

                                                        <div className="form-group">
                                                            <label htmlFor="name">Full Name</label>
                                                            <input
                                                                required autoFocus
                                                                type="text"
                                                                className="form-style"
                                                                value={profile.name}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...profile }
                                                                        copy.name = evt.target.value
                                                                        setProfile(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <input type="text"
                                                                className="form-style"
                                                                value={profile.description}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...profile }
                                                                        copy.description = evt.target.value
                                                                        setProfile(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <input type="text"
                                                                className="form-style"
                                                                value={profile.email}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...profile }
                                                                        copy.email = evt.target.value
                                                                        setProfile(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>
                                                    {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset> */}
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="cityId">City </label>
                                                            <select className="form-style" onChange={(evt) => {
                                                                const copy = { ...profile }
                                                                copy.cityId = parseInt(evt.target.value)
                                                                setProfile(copy)
                                                            }}>
                                                                <option defaultValue="">{singleProfile?.city?.name}</option>
                                                                {
                                                                    dropdownCity.map((city) =>
                                                                        <option key={`cityId--${city?.id}`} value={city?.id}>{city?.name}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    </fieldset>
                                                    <button
                                                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                                                        className="btn mt-4" fontSize="large">
                                                        Save Profile
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
        </div>
    )
}

