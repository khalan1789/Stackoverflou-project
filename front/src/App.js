import NavBar from "./components/navBar"
import { LogIn } from "./pages/login"
import { SignUp } from "./pages/signup"
import { Profile } from "./pages/profile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { RequireAuth } from "./components/requireAuth"

function App() {
    return (
        <div>
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
                </Routes>
            </Router>
        </div>
    )
}

export default App
