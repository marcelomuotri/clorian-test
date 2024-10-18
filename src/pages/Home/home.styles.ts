import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

export const useStyles = makeStyles()((theme: Theme) => ({
  cartContainer: {
    display: "flex",
    justifyContent: "end",
    paddingTop: 12,
    paddingRight: 30,
  },
}));
