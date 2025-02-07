import { Box, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomizedInput from "../components/shared/CustomizedInput";

const Login = () => {
  const navigator = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // put all data into the  FormData,ready to transmit
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing in ~", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed in Successfully!", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signed in Failed!", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      navigator("/chat");
      return;
    }
  }, [auth, navigator]);
  return (
    <>
      <Box width={"100%"} height={"100%"} display="flex" flex="1">
        {/* scalability */}
        {/* image机器人 */}
        <Box
          padding={8}
          mt={8}
          display={{ md: "flex", sm: "none", xs: "none" }}>
          <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
        </Box>

        {/*  login part*/}
        <Box
          display={"flex"}
          flex={{ xs: 1, md: 0.5 }}
          justifyContent={"center"}
          alignContent={"center"}
          padding={2}
          ml="auto"
          mt={10}>
          {/* form part */}
          <form
            onSubmit={handleSubmit}
            action=""
            style={{
              margin: "auto",
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none ",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "300px",
              }}>
              {/* text */}
              <Typography
                variant="h3"
                textAlign={"center"}
                padding="2"
                fontWeight={"800"}>
                Login
              </Typography>
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput
                type="password"
                name="password"
                label="Password"
              />
              <Button
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  width: "400px",
                  borderRadius: 2,
                  bgcolor: "white",
                  color: "black",

                  // hover effect
                  ":hover": {
                    bgcolor: "#00fffc",
                    color: "blue",
                  },
                }}
                endIcon={<BiLogInCircle />}>
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
