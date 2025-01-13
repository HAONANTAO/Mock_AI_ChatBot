import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser, } from "../helpers/api-communicator";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);
    const login = async (email, password) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name, email, password) => {
        const data = await signupUser(name, email, password);
        if (data) {
            // signup完直接就登录了！！
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        await logoutUser();
        // 重置
        setIsLoggedIn(false);
        setUser(null);
        // 刷新
        window.location.reload();
    };
    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
