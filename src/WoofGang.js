import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { DogsList } from "./dogs/DogList"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"
import "./WoofGang.css"


export const WoofGang = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		<Route path="/dogs" element={<DogsList />} />

		<Route path="/home" element={<></>} />


		<Route path="*" element={
		
			
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>


		} />
	</Routes>
}
