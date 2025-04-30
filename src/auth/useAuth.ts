import { useState } from 'react';
// TODO: maybe with React Context
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('accessToken'));

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
  };

  return {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
};