import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
});
    
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("USER_DATA");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setAuthToken = (token, user) => {
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
            if (user) {
                localStorage.setItem("USER_DATA", JSON.stringify(user));
            }
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER_DATA");
        }
        setToken(token);
        setUser(user || null); // Assurez-vous de réinitialiser `user` si aucun utilisateur n'est fourni
    };

    // Effet pour surveiller les modifications de l'utilisateur et du token
    useEffect(() => {
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }

        if (user) {
            localStorage.setItem("USER_DATA", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER_DATA");
        }
    }, [user, token]);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken: setAuthToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
