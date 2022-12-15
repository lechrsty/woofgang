import { useEffect, useState } from "react"
import "./Dogs.css"

export const DogsList = () => {
    const [dogs, setDogs] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs`)
            .then(response => response.json())
            .then((dogArray) => {
                setDogs(dogArray)
            })
        },
        [] 
    )
    return <article className="dogs">
    {
        dogs.map(dog => {
            return <section className="dog" key={`dogs--${dog.id}`}>
                <div>Name: {dog.name}</div>
                <div>Description: {dog.description}</div>
                <div>Birthday: {dog.birthday}</div>         
                </section>
        })
    
    }
</article>
}