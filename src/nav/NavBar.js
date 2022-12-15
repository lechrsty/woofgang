
import { UserNav } from "./UserNav"
import { AnonymousNav } from "./AnonymousNav"
import "./NavBar.css"

export const NavBar = () => {

  const localWoofGangUser = localStorage.getItem("woofGang_user")
  const woofGangUserObject = JSON.parse(localWoofGangUser)

    if (woofGangUserObject.registered) {
        return <UserNav />
    }
    else {
        return <AnonymousNav />

    }
}

