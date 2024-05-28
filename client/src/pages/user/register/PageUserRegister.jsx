// imports
// Material UI
import { Container, Box, Avatar, Typography, Button, Link, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// React Router Dom
import { Link as RRDLink, useNavigate, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { useUserRegisterMutation } from "../../../redux/user/userApiSlice";

// React Hook Form, yup, resolver, and devtool
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";

// components
import CTextField from "../../../components/customMUI/cTextField/CTextField";

// const FileName
const PageUserRegister = () => {
  // local state
  // React Router Dom
  const navigate = useNavigate();

  // Redux
  const [userRegister] = useUserRegisterMutation();

  // React Hook Form
  // - schema
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(1).max(32).required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  // - defaultValues
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  // - const {} = useForm;
  const { handleSubmit, resetField, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // onXXSubmit
  const onFormSubmit = async (data) => {
    const { error } = await userRegister(data);
    error
      ? (resetField("password"), resetField("passwordConfirm"))
      : navigate("/dashboard");
  };
  const user = useSelector((state) => state.user.user);

  // return () {}
  if (user != null) return <Navigate to="/dashboard" />;
  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Avatar mt={1} sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" mt={1}>
          Register
        </Typography>
        <Box
          mt={1}
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          width="100%"
        >
          <CTextField name="username" label="Username" control={control} required />
          <CTextField name="email" label="Email" control={control} required />
          <CTextField
            name="password"
            label="Password"
            control={control}
            required
            type="password"
          />
          <CTextField
            name="passwordConfirm"
            label="Confirm Password"
            control={control}
            required
            type="password"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Register
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link component={RRDLink} to="/user/login" variant="body2">
                Already have an account? Login here!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <DevTool control={control} />
    </Container>
  );
};

// export default
export default PageUserRegister;
