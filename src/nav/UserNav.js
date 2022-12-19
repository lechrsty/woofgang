import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'
import PetsIcon from '@mui/icons-material/Pets'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { FaDog } from "react-icons/fa"
import Button from '@mui/material/Button'



export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Button onClick={event =>  window.location.href='/'} className="navbar__link">Home</Button>
            </li>

            <li className="navbar__item active">
                <AccountCircleIcon onClick={event =>  window.location.href='/profile'} className="navbar__link">Owner Profile</AccountCircleIcon>
            </li>

            <li className="navbar__item active">
                <FaDog size="1.6em" name="dog" className="navbar__link" onClick={event =>  window.location.href='/mydogs'}>My Dogs</FaDog>
            </li>

            <li className="navbar__item active">
            <MailOutlineIcon onClick={event =>  window.location.href='/barks'} className="navbar__link">Barks</MailOutlineIcon>

            </li>
{/* 
            <li className="navbar__item active">
                <Diversity1Icon onClick={event =>  window.location.href='/matches'} className="navbar__link">Matches</Diversity1Icon>
            </li> */}

            <li className="navbar__item active">
                <Diversity1Icon onClick={event =>  window.location.href='/dogs'}  className="navbar__link" to="/dogs">Community</Diversity1Icon>
            </li>


            {
                localStorage.getItem("woofGang_user")
                    ? <li className="navbar__item navbar__logout">
                        <Button variant="text" className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("woofGang_user")
                            navigate("/", {replace: true})
                        }}>Logout</Button>
                    </li>
                    : ""
            }
        </ul>
    )
}