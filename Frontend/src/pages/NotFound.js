import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const NotFound = () => {
    const pageVariants = {
        initial: {
            opacity: 0,
            y: "100vh",
        },
        in: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                type: "spring",
                bounce: 0.3,
            },
        },
        out: {
            opacity: 0,
            y: "-100vh",
            transition: {
                duration: 1,
                type: "spring",
                bounce: 0.3,
            },
        },
    };
    const buttonVariants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };
    return (_jsxs(motion.div, { initial: "initial", animate: "in", exit: "out", variants: pageVariants, style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1a1a1a",
            color: "white",
            textAlign: "center",
        }, children: [_jsx(motion.h1, { style: { fontSize: "120px", fontWeight: "700", marginBottom: "20px" }, initial: { opacity: 0, y: "-50px" }, animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } }, children: "404" }), _jsx(motion.p, { style: { fontSize: "24px", marginBottom: "40px" }, initial: { opacity: 0, y: "50px" }, animate: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }, children: "Oops! The page you're looking for seems to have vanished." }), _jsx(motion.button, { whileHover: "hover", variants: buttonVariants, style: {
                    padding: "15px 30px",
                    fontSize: "18px",
                    fontWeight: "500",
                    backgroundColor: "#0099ff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }, onClick: () => (window.location.href = "/"), children: "Back to Home" })] }));
};
export default NotFound;
