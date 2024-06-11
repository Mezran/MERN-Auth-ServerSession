// imports
import { useState } from "react";
// Material UI
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Redux
import {
  useUserUpdateMutation,
  useUserDeleteMutation,
} from "../../../redux/user/userApiSlice";
import { useSelector } from "react-redux";

// React Hook Form, yup, resolver, and devtool
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import CTextField from "../../../components/customMUI/cTextField/CTextField";

// const FileName
const PageUserProfile = () => {
  // local state
  const [updateProfileDialogState, setUpdateProfileDialogState] = useState(false);
  const [deleteProfileDialogState, setDeleteProfileDialogState] = useState(false);

  // React Router Dom
  const navigate = useNavigate();

  // Redux
  const user = useSelector((state) => state.user);
  const [userUpdate] = useUserUpdateMutation();
  const [userDelete, { isError: isUserDeleteError }] = useUserDeleteMutation();

  // React Hook Form
  // - schema
  const schema = yup.object().shape({
    username: yup.string(),
    usernameConfirm: yup
      .string()
      .oneOf([yup.ref("username"), undefined], "Usernames must match"),

    password: yup
      .string()
      .notRequired()
      .min(1)
      .max(32)
      .nullable()
      .transform((value) => (!!value ? value : null)),
    passwordConfirm: yup.string().when("password", (password, schema) => {
      if (password[0] != null) {
        return schema
          .required("Password confirmation is required")
          .oneOf([yup.ref("password")], "Passwords must match");
      } else {
        return schema
          .notRequired()
          .nullable()
          .transform((value) => (!!value ? value : null));
      }
    }),

    passwordCurrent: yup.string(),
  });

  // - defaultValues
  const defaultValues = {
    username: "",
    usernameConfirm: "",
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
  };

  // - const {} = useForm;
  const {
    handleSubmit,
    resetField,
    reset,
    getValues,
    formState: { errors, isDirty, dirtyFields },
    control,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // onXXSubmit
  const onUserProfileUpdateClicked = () => {
    setUpdateProfileDialogState(true);
  };

  const onUpdateProfileDialogClose = () => {
    setUpdateProfileDialogState(false);
    reset();
  };

  const onUpdateProfileDialogConfirmed = () => {
    userUpdate(getValues());
    onUpdateProfileDialogClose();
  };

  const onUserProfileDeleteClicked = () => {
    setDeleteProfileDialogState(true);
  };

  const onDeleteProfileDialogClose = () => {
    setDeleteProfileDialogState(false);
    reset();
  };

  const onDeleteProfileDialogConfirmed = async () => {
    await userDelete({ passwordCurrent: getValues("passwordCurrent") });
    onDeleteProfileDialogClose();
    if (!isUserDeleteError) {
      navigate("/user/login");
    }
  };

  // return () {}
  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onUserProfileUpdateClicked)}
        noValidate
      >
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>
                  Email: {user.user.email} | Username: {user.user.username}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isDirty}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {/* form */}
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CTextField name="username" label="Username" control={control} />
            </Grid>
            <Grid item xs={6}>
              <CTextField
                name="usernameConfirm"
                label="Confirm Username"
                control={control}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CTextField
                name="password"
                label="Password"
                control={control}
                type="password"
              />
            </Grid>
            <Grid item xs={6}>
              <CTextField
                name="passwordConfirm"
                label="Confirm Password"
                control={control}
                type="password"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} />

            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={() => onUserProfileDeleteClicked()}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* Update dialog */}
        <Dialog
          open={updateProfileDialogState}
          onClose={() => onUpdateProfileDialogClose()}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography pb={1}>
              Please enter your password. The following account credentials will change:
            </Typography>
            <Typography>{dirtyFields.username ? "- Username" : ""}</Typography>
            <Typography>{dirtyFields.password ? "- Password" : ""}</Typography>

            <CTextField
              name="passwordCurrent"
              label="Current Password"
              control={control}
              required
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onUpdateProfileDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => onUpdateProfileDialogConfirmed()} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete dialog */}
        <Dialog
          open={deleteProfileDialogState}
          onClose={() => onDeleteProfileDialogClose()}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot be undone.
            </Typography>
            <CTextField
              name="passwordCurrent"
              label="Current Password"
              control={control}
              required
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onDeleteProfileDialogClose()} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onDeleteProfileDialogConfirmed()}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};
// export default
export default PageUserProfile;
