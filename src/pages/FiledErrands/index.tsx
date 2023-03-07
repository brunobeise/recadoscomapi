import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicTableArquivados from "../../components/CardFiled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, IconButton, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  buscarRecados,
  getRecados,
} from "../../store/modules/errands/errandsSlice";
import { atualizarLogged } from "../../store/modules/userLogged/userSlice";

function RecadosArquivados() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const recadosSlicebuscar = useAppSelector(buscarRecados);
  const [recadosFiltradosArquivados, setreacadosFiltradosArquivados] =
    useState(recadosSlicebuscar);
  const recados = useAppSelector((state) => state.errands);

  useEffect(() => {
    let userLoggedLocalStorage = JSON.parse(
      localStorage.getItem("userLogged") || "{}"
    );

    if (!userLoggedLocalStorage.id) {
      navigate("/");
    }

    dispatch(atualizarLogged(userLoggedLocalStorage));
  }, [navigate, dispatch]);

  useEffect(() => {
    if (userLogged.id) {
      dispatch(getRecados(userLogged.id));
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    let recadosArquivados = recadosSlicebuscar.filter(
      (recado) => recado.filed === true
    );
    setreacadosFiltradosArquivados(recadosArquivados);
  }, [recadosSlicebuscar]);

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logout() {
    localStorage.removeItem("userLogged");
    navigate("/");
    setAnchorEl(null);
  }

  function navigateRecados() {
    navigate("/home");
    setAnchorEl(null);
  }

  return (
    <Grid
      container
      sx={{
        margin: "none",
        backgroundColor: "white",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1rem",
          paddingRight: "2rem",
          backgroundColor: "white",
          color: "#fff",
          fontSize: "1rem",
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle sx={{ fontSize: "2rem" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={navigateRecados}>Recados</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: "6rem",
          paddingLeft: { xs: "2rem", md: "3rem" },
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        <p>Recados Aquivados:</p>
      </Grid>
      <Grid item xs={12}>
        <BasicTableArquivados lista={recadosFiltradosArquivados} />
      </Grid>
    </Grid>
  );
}

export default RecadosArquivados;
