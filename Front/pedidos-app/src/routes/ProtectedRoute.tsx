import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {JSX} from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
