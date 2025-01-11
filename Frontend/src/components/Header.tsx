import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const auth = useAuth();
  return (
    <>
      {" "}
      <AppBar
        sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
        {/* 放小组件的地方 ，用于承载具体的内容元素 */}
        <Toolbar sx={{ display: "flex" }}>
          <Logo />
          {/* 检查login了吗 ,*/}
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#59f6f3"
                  to="/chat"
                  text="GO-TO-Chat"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  to="/"
                  text="Logout"
                  textColor="white"
                  onClick={auth.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/login"
                  text="Login"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  to="/signup"
                  text="Signup"
                  textColor="white"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
