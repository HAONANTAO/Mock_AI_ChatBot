import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
function App() {
    const auth = useAuth();
    return (_jsxs("main", { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), auth?.isLoggedIn && auth.user && (_jsx(Route, { path: "/Chat", element: _jsx(Chat, {}) })), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }));
}
export default App;
