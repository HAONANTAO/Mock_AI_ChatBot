import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}>
      <img
        src="openai.png"
        alt="openai image"
        width={"30px"}
        height={"30px"}
        className="image-inverted"
      />
      <Link to={"/"}>
        <Typography
          sx={{
            display: { lg: "block", md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}>
          <span style={{ fontSize: "24px" }}>MERN-GPT</span>
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
