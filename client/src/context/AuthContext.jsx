import { createContext, useState,useEffect } from 'react';
import api from '../services/api';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const restoreUser = async () => {
        const storedToken = localStorage.getItem('token');

        if (!storedToken) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('/auth/me');
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    restoreUser();
}, []);
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

  return (
    <AuthContext.Provider value={{ user, token, loading,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;