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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              gap: 5,
              my: 10,
            }}>
            <img
              src="robot.png"
              alt="robot"
              style={{ width: "200px", margin: "auto" }}
            />
            <img
              className="image-inverted"
              src="openai.png"
              alt="openai"
              style={{ width: "200px", margin: "auto" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
