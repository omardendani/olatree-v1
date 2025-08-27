import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulation d'une requête pour récupérer l'utilisateur connecté
        const fakeUser = { username: "monprofile", email: "user@example.com" };
        setUser(fakeUser);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
