import { Route, Routes } from 'react-router'
import Navbar from '../Navbar/Navbar'
import appRoutes from './AppRoutes'
import { CssBaseline } from '@mui/material'

const MainRouter = () => {
    return (
        <Routes>
            {appRoutes.map((route) => (
                <Route
                    key={`Route - ${route.path}`}
                    path={route.path}
                    exact={route.exact}
                    element={
                        <>
                            {!/401|dashboard|403|\*/.test(route.path) && (
                                <Navbar />
                            )}
                            <CssBaseline>{route.element}</CssBaseline>
                        </>
                    }
                />
            ))}
        </Routes>
    )
}

export default MainRouter
