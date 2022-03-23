import NavBar from "./components/navBar";
import { LogIn } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Profile } from "./pages/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
