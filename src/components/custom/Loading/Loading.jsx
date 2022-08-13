import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import useLoading from "../../../hooks/useLoading";

const Loading = () => {
  const { isLoading } = useLoading();
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <span className="font-md ml-4">Processing...</span>
      </Backdrop>
    </div>
  );
};

export default Loading;
