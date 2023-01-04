import { Route, Routes } from "react-router-dom"
import { CreateDogForm } from "../dogs/CreateDogForm"
import { EditDogForm } from "../dogs/EditDogForm"
import { ProfileForm } from "../profileForm/ProfileForm"
import { AddActivities } from "../dogs/AddActivities"
import { DogContainer } from "../dogs/DogContainer"
import { UserDogList } from "../dogs/UserDogList"

export const ApplicationViews = () => {
	return (
        <Routes>

            <Route path="home" element={ <></> } />
            <Route path="profile" element={ <ProfileForm /> } />
            <Route path="mydogs" element={ <UserDogList /> } />
            <Route path="editdog/:dogId" element={ <EditDogForm /> } />
            <Route path="createdog" element={ <CreateDogForm /> } />
            <Route path="dogs" element={ <DogContainer /> } />
            <Route path="activities/:dogId" element={ <AddActivities /> } />

                
        </Routes>
    )
}