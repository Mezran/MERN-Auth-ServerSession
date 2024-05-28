// Redux
import { setPopupState } from "./popup/popupSlice";

export const rtkMessageDisplayMiddleware = (api) => (next) => (action) => {
  console.log("action", action.payload);
  if (action.type.includes("rejected") && action.payload.data.messages.length > 0) {
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
