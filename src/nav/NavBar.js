import { useNavigate } from "react-router-dom"
import './NavBar.css'
import { Link } from "react-router-dom"



export const NavBar = () => {
    const navigate = useNavigate()

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)
    if (woofGangUserObject.registered) {
    return (

<nav>
    <div className="navicon">
        <div></div>
    </div>
        <ul className="navbar">
            
            <li className="navbar__item">
                <Link className="navbar__link" to="/profile">Owner Profile</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/mydogs">My Dogs</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/dogs">All Dogs</Link>
            </li>
            {
                localStorage.getItem("woofGang_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link variant="text" className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("woofGang_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            </ul>

        </nav>



    )
}
}
