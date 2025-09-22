import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "./routes"


const AppRouter = ({isLoading}: {isLoading: boolean}) => {

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return(
		<Routes>
			{routes.map(({Path, Component}) => (
				<Route key={Path} path={Path} element={<Component />} />
			))}
			<Route path={'*'} element={<Navigate to='/'/>} />
		</Routes>
	)
}

export default AppRouter;