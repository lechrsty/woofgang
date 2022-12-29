import { Outlet, Route, Routes } from "react-router-dom"
import { CreateDogForm } from "../dogs/CreateDogForm"
import { DogsList } from "../dogs/DogList"
import { EditDogForm } from "../dogs/EditDogForm"
import { UserDogList } from "../dogs/UserDogList"
import { ProfileForm } from "../profileForm/ProfileForm"
import { AddActivities } from "../dogs/AddActivities"

export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

            <Route path="profile" element={ <ProfileForm /> } />
            <Route path="mydogs" element={ <UserDogList /> } />
            <Route path="editdog/:dogId" element={ <EditDogForm /> } />
            <Route path="createdog" element={ <CreateDogForm /> } />
            <Route path="dogs" element={ <DogsList /> } />
            <Route path="activities/:dogId" element={ <AddActivities /> } />

                
            </Route>
        </Routes>
    )
}