import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./Dogs.css"

export const UserDogList = () => {

    const { ownerId } = useParams
    const [dog, setDog] = useState([])

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs?_expand=owner&ownerId=${woofGangUserObject.id}`)
                .then(response => response.json())
                .then((arrayOfDogs) => {
                    setDog(arrayOfDogs)
                })
        },
        [ownerId]
    )

    return <>

        <Link to={'/createdog'}>
            <button > Create New Dog </button>
        </Link>

        <article className="dogs">
            {
                dog.map(dog => {
                    return <section className="dog" key={`dogs--${dog.id}`}>
                        <h2>{dog.name}</h2>
                        <div>{dog.description}</div>
                        <Link to={`/editdog/${dog.id}`}>
                            <button > Edit Dog </button>
                        </Link>
                    </section>
                })

            }
        </article>
    </>
}
