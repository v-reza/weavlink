import React from "react";
import { makeStyles } from "@mui/styles";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const Toast = ({
  open,
  setOpen,
  message,
  variant = "info",
  autoHideDuration = 2000,
}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      margin: 10,
      maxWidth: "100%",
      padding: 10,
      overflow: "hidden",
      wordWrap: "break-word",
      minWidth: "300px",
    },
    message: {
      wordWrap: "break-word",
      display: "flex",
      flexWrap: "wrap",
    },
  }));

  const AlertToast = (props) => {
    const styles = useStyles();
    return (
      <>
        <Alert
          elevation={6}
          classes={{ root: styles.container, message: styles.message }}
          variant="standard"
          {...props}
        />
      </>
    );
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <div>
        <AlertToast onClose={handleClose} severity={variant}>
          {message}
        </AlertToast>
      </div>
    </Snackbar>
  );
};

export default Toast;
