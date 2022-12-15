import { useEffect, useState, Link } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditDogForm = () => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)
    let navigate = useNavigate()

    const [dropdownGender, setDropdownGender] = useState([])
    const [dropdownEnergyLevel, setDropdownEnergyLevel] = useState([])
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

    useEffect(() => {
        fetch(`http://localhost:8088/dogs?_expand=ownerId=${woofGangUserObject.id}&id=${dogId}&_expand=gender&_expand=energyLevel`)

            .then(response => response.json())
            .then((arrayOfDogs) => {
                const dogObject = arrayOfDogs[0]
                setSingleDog(dogObject)
            })
    }, [] )

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
        <form className="dogProfile">
            <h2 className="dogProfile__title">Dog Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        defaultValue={dog.name}
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
                        type="file" id="image" className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...dog}
                                copy.image = event.target.value
                                setDog(copy)
                            }
                        }/>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text"
                        className="form-control"
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
                    <label htmlFor="birthday">Birthday:</label>
                    <input type="date"
                        className="form-control"
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
                    <div className="form-control">
                    <label htmlFor="genderType">Gender: </label>
                    <select onChange={(evt) => {
                        const copy = {...dog}
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
                    <div className="form-control">
                    <label htmlFor="energyLevelType">Energy Level: </label>
                    <select onChange={(evt) => {
                        const copy = {...dog}
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

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Dog Profile
            </button>

            <button
                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">
                Delete Dog Profile
            </button>
        
        </form>
    )
}
