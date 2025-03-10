import { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axios.post("http://localhost:8080/api/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setError(null);
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};
