export const DogSearch = ({setterFunction}) => {

    return (
        <div className="wrap">
            <form className="searchDog">
        <input className="dogSearch"
        onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
            type="text" placeholder="Search Dogs" />
            </form>
        </div>
    )
}
