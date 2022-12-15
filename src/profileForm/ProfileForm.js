import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Input from 'react-phone-number-input/input'


export const ProfileForm = () => {

    let navigate = useNavigate()

   const {ownerId} = useParams()

    const [singleProfile, setSingleProfile] = useState([])
    const [profile, setProfile] = useState({
        name: "",
        image: "",
        email: "",
        description: "",
        phoneNumber: 0,
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
    }, [] )

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
                navigate("/")
            })
    }

    return (
        <form className="profile">
            <h2 className="profile__title">Owner Profile</h2>
            <fieldset>

                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
                    <label htmlFor="image">Profile Photo:</label>
                    <input 
                        type="file"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.image = evt.target.value
                                setProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text"
                        className="form-control"
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
                    <label htmlFor="email">Email:</label>
                    <input type="text"
                        className="form-control"
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
            <fieldset>
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
            </fieldset>
            <fieldset>
                    <div className="form-control">
                    <label htmlFor="cityId">City: </label>
                    <select onChange={(evt) => {
                        const copy = {...profile}
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
                className="btn btn-primary">
                Save Profile
            </button>
        </form>

    )
}

