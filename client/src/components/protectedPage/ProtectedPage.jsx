// imports
import { Box } from "@mui/material";
// Material UI
// React Router Dom
import { Navigate, Outlet } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
import { useUserGetSessionQuery } from "../../redux/user/userApiSlice";
// React Hook Form, yup, resolver, and devtool
// components

// const FileName
const ProtectedPage = () => {
  // Redux
  const user = useSelector((state) => state.user.user);
  const { isLoading, isFetching } = useUserGetSessionQuery();

  // return () {}
  if (isLoading || isFetching) return <Box>Loading...</Box>;
  return user != null ? <Outlet /> : <Navigate to="/user/login" />;
};
// export default
export default ProtectedPage;
