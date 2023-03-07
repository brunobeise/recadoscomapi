import React, { useEffect } from "react";
import Form from "../../components/Form";
import Grid from "@mui/material/Grid";
import { useAppDispatch } from "../../store/hooks";
import { getUsers } from "../../store/modules/users/usersSlice";

function Login() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Grid
      container
      width="60vw"
      height="100vh"
      display="flex"
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Form mode="login" />
      </Grid>
    </Grid>
  );
}

export default Login;
