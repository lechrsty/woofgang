import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Login } from "./auth/Login"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"
import { Home } from "./views/Home"
import "./WoofGang.css"


export const WoofGang = () => {
	return <Routes>
		<Route path="/login" element={ <Login/> } />
		<Route path="/" element={ <Home/> } />


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
