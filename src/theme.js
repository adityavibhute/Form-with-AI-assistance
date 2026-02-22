import { createTheme } from "@mui/material/styles";

export const getTheme = (direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      primary: {
        main: "#0055A5",
      },
      secondary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial",
    },
  });
