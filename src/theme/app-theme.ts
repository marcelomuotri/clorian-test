import { Breakpoint, createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  breakpoints: {
    keys: ["sm", "md", "lg"] as Breakpoint[],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1320,
      xl: 1536,
    },
  },
});

export default appTheme;
