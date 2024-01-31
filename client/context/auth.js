import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
       
    })
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};

//custom hook
const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider}