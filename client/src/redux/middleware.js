// Redux
import { setPopupState } from "./popup/popupSlice";

export const rtkMessageDisplayMiddleware = (api) => (next) => (action) => {
  if (action.type.includes("rejected") && action.payload.data?.messages) {
    api.dispatch(
      setPopupState({
        open: true,
        messages: action.payload.data.messages,
        severity: action.payload.data.severity || "error",
      })
    );
  } else if (action.type.includes("fulfilled") && action.payload.messages) {
    api.dispatch(
      setPopupState({
        open: true,
        messages: action.payload.messages,
        severity: "success",
      })
    );
  }
  return next(action);
};
