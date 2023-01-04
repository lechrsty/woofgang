import { useState } from "react"
import { DogList } from "./DogList"
import { DogSearch } from "./DogSearch"

export const DogContainer = () => {
    const [searchTerms, setSearchTerms] =useState("")

return <> 

    <DogSearch setterFunction={setSearchTerms} />
    <DogList searchTermState={searchTerms} />
    
    </>

}