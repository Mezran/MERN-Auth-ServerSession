// mui
import { TextField } from "@mui/material";
// React hook form
import { useController } from "react-hook-form";

// const FileName
const CTextField = ({ name, label, control, ...otherProps }) => {
  // react hook form use controller
  const RHFController = useController({
    name: name,
    control,
  });
  // return ()
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      {...RHFController.field}
      error={!!RHFController.fieldState.error}
      helperText={RHFController.fieldState.error?.message}
      {...otherProps}
    />
  );
};

// export default
export default CTextField;
