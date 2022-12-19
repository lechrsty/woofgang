import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const AnonymousNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">

            <button className="navbar__item active">
                <Link className="navbar__link" to="/login">Login</Link>
            </button>

            <button className="navbar__item active">
                <Link className="navbar__link" to="/register">Register</Link>
            </button>
        </ul>
    )
}
