// imports
// Material UI
import { AppBar, Toolbar, Grid, Button, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
// React Router Dom
import { Link as RRDLink, useNavigate } from "react-router-dom";
// Redux
// React Hook Form, yup, resolver, and devtool
// components

// const FileName
const Header = () => {
  // local state
  // React Router Dom
  const navigate = useNavigate();
  // Redux
  // React Hook Form
  // - schema
  // - defaultValues
  // - const {} = useForm;
  // onXXSubmit
  // return () {}
  return (
    <>
      <AppBar color="primary" position="fixed" elevation={4}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            {/* Pet Icon */}
            <Grid item>
              <PetsIcon />
            </Grid>
            {/* Pet Life Title */}
            <Grid item>
              <Typography
                variant="h6"
                component={RRDLink}
                to="/"
                paddingX={2}
                style={{ textDecoration: "none", color: "white" }}
              >
                Pet Life
              </Typography>
            </Grid>
            <Grid item>
              {/* Dashboard Button */}
              <Button component={RRDLink} to={"/dashboard"} sx={{ color: "white" }}>
                Dashboard
              </Button>
            </Grid>

            {/* pushes the avatar to the right */}
            <Grid item xs />
            {/* User button */}
            <Grid item>
              <Button component={RRDLink} to={"/user/register"} sx={{ color: "white" }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* this toolbar provides spacing for content below the app bar */}
      <Toolbar />
    </>
  );
};
// export default
export default Header;
