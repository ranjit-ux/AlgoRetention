import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            try{
                const token = localStorage.getItem("token");

                if(!token){
                    setLoading(false);
                    return;
                }

                const data = await getCurrentUser();

                setUser(data.user);
            }catch(error){
                localStorage.removeItem("token");
                setUser(null);
            }finally{
                setLoading(false);
            }
        };
        loadUser();
    },[]);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};