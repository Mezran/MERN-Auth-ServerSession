// Redux
import { setPopupState } from "./popup/popupSlice";

export const rtkMessageDisplayMiddleware = (api) => (next) => (action) => {
  if (action.type.includes("rejected") && action.payload.data.error) {
    api.dispatch(
      setPopupState({
        open: true,
        message: action.payload.data.error,
        severity: "error",
      })
    );
  } else if (action.type.includes("fulfilled") && action.payload.message) {
    api.dispatch(
      setPopupState({
        open: true,
        message: action.payload.message,
        severity: "success",
      })
    );
  }
  return next(action);
};
