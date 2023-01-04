import { useEffect, useState, Link } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CreateDog.css"


export const EditDogForm = () => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)
    let navigate = useNavigate()

    const [dropdownGender, setDropdownGender] = useState([])
    const [dropdownEnergyLevel, setDropdownEnergyLevel] = useState([])
    const [dropdownActivity, setDropdownActivity] = useState([])
    const [dropdownGoal, setDropdownGoal] = useState([])

    const { dogId } = useParams()

    const [singleDog, setSingleDog] = useState([])


    const [dog, setDog] = useState({
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
                .then((data) => {
                    setDropdownGender(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/energyLevels`)
                .then(res => res.json())
                .then((data) => {
                    setDropdownEnergyLevel(data)
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

    useEffect(() => {
        fetch(`http://localhost:8088/dogs?_expand=ownerId=${woofGangUserObject.id}&id=${dogId}&_expand=gender&_expand=energyLevel&_expand=goal&_expand=activity`)

            .then(response => response.json())
            .then((arrayOfDogs) => {
                const dogObject = arrayOfDogs[0]
                setSingleDog(dogObject)
            })
    }, [])

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs/${dogId}`)
                .then(res => res.json())
                .then((data) => {
                    setDog(data)
                })
        },
        [dogId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/dogs/${dog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dog)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/mydogs")

            })
    }


    const handleDeleteButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/dogs/${dog.id}`, {
            method: "DELETE"
        })
            .then(() => {
                navigate("/mydogs")
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

                                                    <h4>Edit Dog Profile</h4>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Name</label>
                                                            <input
                                                                required autoFocus
                                                                type="text"
                                                                className="form-style"                                                                defaultValue={dog.name}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...dog }
                                                                        copy.name = evt.target.value
                                                                        setDog(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>
                                                    <fieldset>
                                                        <label htmlFor="image"> Profile Photo </label>
                                                        <input required defaultValue={dog.image}
                                                            type="text" id="image" className="form-style"
                                                            onChange={
                                                                (event) => {
                                                                    const copy = { ...dog }
                                                                    copy.image = event.target.value
                                                                    setDog(copy)
                                                                }
                                                            } />
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <input type="text"
                                                               className="form-style"
                                                                defaultValue={dog.description}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...dog }
                                                                        copy.description = evt.target.value
                                                                        setDog(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>
                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="birthday">Birthday</label>
                                                            <input type="date"
                                                                className="form-style"
                                                                defaultValue={dog.birthday}
                                                                onChange={
                                                                    (evt) => {
                                                                        const copy = { ...dog }
                                                                        copy.birthday = evt.target.value
                                                                        setDog(copy)
                                                                    }
                                                                } />
                                                        </div>
                                                    </fieldset>

                                                    <fieldset>
                                                        <div className="form-group">
                                                            <label htmlFor="genderType">Gender </label>
                                                            <select className="form-style" onChange={(evt) => {
                                                                const copy = { ...dog }
                                                                copy.genderId = parseInt(evt.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option defaultValue="">{singleDog?.gender?.type}</option>
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
                                                            <label htmlFor="energyLevelType">Energy Level </label>
                                                            <select className="form-style" onChange={(evt) => {
                                                                const copy = { ...dog }
                                                                copy.energyLevelId = parseInt(evt.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option defaultValue="">{singleDog?.energyLevel?.type}</option>
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
                                                            <label htmlFor="activityType"> Choose an ideal activity </label>
                                                            <select className="form-style" onChange={(evt) => {
                                                                const copy = { ...dog }
                                                                copy.activityId = parseInt(evt.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option defaultValue="">{singleDog?.activity?.type}</option>
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
                                                            <label htmlFor="goalType">Choose a skill to learn </label>
                                                            <select className="form-style" onChange={(evt) => {
                                                                const copy = { ...dog }
                                                                copy.goalId = parseInt(evt.target.value)
                                                                setDog(copy)
                                                            }}>
                                                                <option defaultValue="">{singleDog?.goal?.type}</option>
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
                                                        className="edit-btn mt-4"
                                                        fontSize="large">
                                                        Save Changes
                                                    </button>

                                                    <button
                                                        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                                                        className="edit-btn mt-4"
                                                        fontSize="large">
                                                        Delete Profile
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
            <div className="filler"/>

        </div>
    )
}
