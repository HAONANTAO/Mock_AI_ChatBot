import React from "react";
import TypingAnimation from "../components/typer/TypingAnimation";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box width={"100%"} height={"100%"} flex={"flex"} mx={"auto"}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
            mt: "3",
          }}>
          <Box>
            <TypingAnimation />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
