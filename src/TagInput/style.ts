import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  formControlRoot: {
    gap: "8px",
    width: "100% !important",
    display: "flex !important",
    flexWrap: "wrap",
    flexDirection: "column",
    border: "2px solid lightgray !important",
    padding: "4px !important",
    borderRadius: "4px !important",
  },
  rootContainer: {
    gap: "6px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export { useStyles };
