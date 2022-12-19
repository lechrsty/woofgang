import { Outlet, Route, Routes } from "react-router-dom"
import { DogsList } from "../dogs/DogList"

export const AnonymousViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>WoofGang</h1>
                    <div>tagline here</div>

                    <Outlet />
                </>
            }>
            </Route>
        </Routes>
    )
}