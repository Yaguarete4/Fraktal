import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const handleAccessToken = (string) => {
        setAccessToken(string);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, handleAccessToken, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
