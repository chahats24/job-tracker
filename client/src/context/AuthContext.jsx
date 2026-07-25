import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const login = (data) => {
        setUser({ email: data.email });
        setToken(data.token);
        localStorage.setItem('token', data.token);
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};


export default AuthContextProvider;
