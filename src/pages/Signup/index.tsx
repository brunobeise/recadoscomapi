import React, { useEffect } from "react";
import Form from "../../components/Form";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buscarUsuarios, getUsers } from "../../store/modules/users/usersSlice";

function Signup() {
  const dispatch = useAppDispatch();
  const listaSlice = useAppSelector(buscarUsuarios);

  useEffect(() => {
    dispatch(getUsers());
    console.log(listaSlice);
  }, []);
  return (
    <Grid container width="60vw" height="100vh" display="flex">
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Form mode="signup" />
      </Grid>
    </Grid>
  );
}

export default Signup;
