import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('user_token') || null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            const localUser = localStorage.getItem('user_data');
            if (localUser) {
                setUser(JSON.parse(localUser));
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setCargando(false);
    }, [token]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('user_token', newToken);
        localStorage.setItem('user_data', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Token ${newToken}`;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        delete axios.defaults.headers.common['Authorization'];
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        cargando
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}