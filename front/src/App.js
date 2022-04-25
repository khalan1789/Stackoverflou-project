import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from "./components/navBar"
import { LogIn } from "./pages/login"
import { SignUp } from "./pages/signup"
import { Profile } from "./pages/profile"
import { Topic } from "./pages/topic"
import { Home } from "./pages/home"
import { CreateTopic } from "./pages/createTopic"
import { RequireAuth } from "./components/requireAuth"
import styled from "styled-components"
import colors from "./utils/style/colors"
import { Error404 } from "./pages/error"
import { UpdateProfile } from "./pages/updateProfile"

function App() {
    return (
        <AppDivContainer>
            <Router>
                <NavBar />
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <RequireAuth withAuth={true}>
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RequireAuth withAuth={false}>
                                <LogIn />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RequireAuth withAuth={false}>
                                <SignUp />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RequireAuth withAuth={true}>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile/update"
                        element={
                            <RequireAuth withAuth={true}>
                                <UpdateProfile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/topic"
                        element={
                            <RequireAuth withAuth={true}>
                                <Topic />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/createTopic"
                        element={
                            <RequireAuth withAuth={true}>
                                <CreateTopic />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <RequireAuth withAuth={false}>
                                <Error404 />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </AppDivContainer>
    )
}

const AppDivContainer = styled.div`
    background-color: ${colors.backgroundBase};
`

export default App
