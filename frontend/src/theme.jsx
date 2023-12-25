import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EAA017", // YELLOW COLOR
    },
    secondary: {
      main: "#000", // BLACK COLOR
    },
    tertiary: {
      main: "#045307", // GREEN COLOR
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Oswald, sans-serif",
  },
});

export default theme;
