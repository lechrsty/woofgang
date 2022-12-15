import { AnonymousViews } from "./AnonymousViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = () => {

    const localWoofGangUser = localStorage.getItem("woofGang_user")
    const woofGangUserObject = JSON.parse(localWoofGangUser)

    if (woofGangUserObject.registered) {
        return <UserViews />
    }
    else {
        return <AnonymousViews />

    }
}