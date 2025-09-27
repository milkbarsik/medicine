import { Navigate, Route, Routes } from "react-router-dom"
import { Authroutes, notAuthRoutes } from "./routes"
import { useAuth } from "../store/userStore"


const AppRouter = ({isLoading}: {isLoading: boolean}) => {

	const {isAuth} = useAuth();

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return(
		<Routes>
			{isAuth && Authroutes.map(({Path, Component}) => (
				<Route key={Path} path={Path} element={<Component />} />
			))}
			{!isAuth && notAuthRoutes.map(({Path, Component}) => (
				<Route key={Path} path={Path} element={<Component />} />
			))}
			{!isAuth &&
					<Route path='*' element={<Navigate to="/auth" />} />
			}
			<Route path={'*'} element={<Navigate to='/'/>} />
		</Routes>
	)
}

export default AppRouter;