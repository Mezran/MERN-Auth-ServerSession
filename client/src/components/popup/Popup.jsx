// mui
import { Alert, AlertTitle, Snackbar } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setPopupStateHidden } from "../../redux/popup/popupSlice";
const Popup = () => {
  const dispatch = useDispatch();
  const popupState = useSelector((state) => state.popup);

  const handleOnClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setPopupStateHidden());
  };

  const capitalize = (str) => {
    return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  const autoHideDuration = popupState.severity !== "success" ? 6000 : 3000;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={popupState.open}
      autoHideDuration={autoHideDuration}
      onClose={handleOnClose}
      severity={popupState.severity}
    >
      <Alert onClose={handleOnClose} severity={popupState.severity}>
        <AlertTitle>{capitalize(popupState.severity)}</AlertTitle>
        {popupState.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </Alert>
    </Snackbar>
  );
};

export default Popup;
