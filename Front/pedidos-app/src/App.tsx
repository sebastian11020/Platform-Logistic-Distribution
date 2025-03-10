import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import './index.css';

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={<h1>Bienvenido, {user?.email || "Invitado"}</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
