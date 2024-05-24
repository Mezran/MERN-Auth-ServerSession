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
  const { isLoading, isFetching } = useUserGetSessionQuery();
  const username = useSelector((state) => state.user.username);

  // return () {}
  if (isLoading || isFetching) return <Box>Loading...</Box>;
  return username ? <Outlet /> : <Navigate to="/user/login" />;
};
// export default
export default ProtectedPage;
