import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/mydogs">My Dogs</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/barks">Barks</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/matches">Matches</Link>
            </li>

            {
                localStorage.getItem("woofGang_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("woofGang_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}