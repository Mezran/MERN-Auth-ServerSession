// imports
// Material UI
import { Container, Box, Avatar, Typography, Button, Link, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// React Router Dom
import { useSelector } from "react-redux";
import { Link as RRDLink, useNavigate, Navigate } from "react-router-dom";

// Redux
import { useUserLoginMutation } from "../../../redux/user/userApiSlice";

// React Hook Form, yup, resolver, and devtool
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import CTextField from "../../../components/customMUI/cTextField/CTextField";

// const FileName
const PageUserLogin = () => {
  // local state
  // React Router Dom
  const navigate = useNavigate();

  // Redux
  const [userLogin] = useUserLoginMutation();

  // React Hook Form
  // - schema
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(1).max(32).required(),
  });
  // - defaultValues
  const defaultValues = {
    email: "",
    password: "",
  };
  // - const {} = useForm;
  const { handleSubmit, resetField, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // onXXSubmit
  const onFormSubmit = async (data) => {
    const { error } = await userLogin(data);
    error ? resetField("password") : navigate("/dashboard");
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
          Login
        </Typography>
        <Box
          mt={1}
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          width="100%"
        >
          <CTextField name="email" label="Email" control={control} required />
          <CTextField
            name="password"
            label="Password"
            control={control}
            required
            type="password"
          />

          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Login
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link component={RRDLink} to="/user/register" variant="body2">
                Need an account? Register here!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

// export default
export default PageUserLogin;
