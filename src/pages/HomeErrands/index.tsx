import React, { useEffect, useState } from "react";
import { CardsErrands } from "../../components/CardErrands";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router/dist";
import { Errand, saveRecadoRequest } from "../../store/modules/typeStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { atualizarLogged } from "../../store/modules/userLogged/userSlice";
import {
  clearInputDesc,
  mudarValueDesc,
} from "../../store/modules/userLogged/descricaoSlice";
import {
  clearInputDet,
  mudarValueDet,
} from "../../store/modules/userLogged/detailSlice";
import { Grid, IconButton, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import "../../config/style/index.css";
import InputHome from "../../components/Inputs/InputHome";
import {
  buscarRecados,
  getRecados,
  saveRecado,
} from "../../store/modules/errands/errandsSlice";

function HomeRecados() {
  const navigate = useNavigate();
  const userLogged = useAppSelector((state) => state.userLogged);
  const recadosSlicebuscar = useAppSelector(buscarRecados);
  const recados = useAppSelector((state) => state.errands);
  const [recadosFiltradosNaoArquivados, setreacadosFiltradosNaoArquivados] =
    useState(recadosSlicebuscar);
  const inputDesc = useAppSelector((state) => state.inputDesc);
  const inputDetail = useAppSelector((state) => state.inputDetail);
  const buttonEnviar = useAppSelector((state) => state.buttonEnviar);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

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
    let recadosNaoArquivados = recadosSlicebuscar.filter(
      (recado) => recado.filed === false
    );
    setreacadosFiltradosNaoArquivados(recadosNaoArquivados);
  }, [recados, recadosSlicebuscar]);

  function mudaInputDesc(event: string) {
    dispatch(mudarValueDesc(event));
  }

  function mudaInputDet(event: string) {
    dispatch(mudarValueDet(event));
  }

  function sendInputs() {
    const novoRecado: saveRecadoRequest = {
      id: userLogged!.id,
      newRecado: {
        name: inputDesc,
        detail: inputDetail,
        filed: false,
      },
    };

    dispatch(saveRecado(novoRecado));
    dispatch(clearInputDet());
    dispatch(clearInputDesc());
  }

  function logout() {
    localStorage.removeItem("userLogged");
    navigate("/");
    setAnchorEl(null);
  }

  function navigateArquivados() {
    navigate("/arquivados");
    setAnchorEl(null);
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
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
          height: "15vh",
          display: "flex",
          justifyContent: "end",
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
          <MenuItem onClick={navigateArquivados}>Arquivados</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          height: { xs: "10vh", md: "15vh" },
          paddingLeft: { xs: "2rem", md: "3rem" },
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        <p>Olá, {userLogged.name}</p>
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{
          backgroundColor: "white",
          borderRadius: { md: "0px 0px 0px 20px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: "2rem" },
        }}
      >
        <InputHome
          label="Name"
          name="Name"
          type="text"
          value={inputDesc}
          handleChange={mudaInputDesc}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: "2rem" },
        }}
      >
        <InputHome
          label="Detalhamento"
          name="Detail"
          type="text"
          value={inputDetail}
          handleChange={mudaInputDet}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={2}
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: { xs: "0px 0px 20px 20px", md: "0px 0px 20px 0px" },
        }}
      >
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            width: { xs: "85%", md: "70%" },
            height: "3rem",
            backgroundColor: "black",
            marginTop: { xs: "2rem", md: "3rem" },
            marginBottom: { xs: "2rem", md: "0px" },
          }}
          disabled={buttonEnviar === false}
          onClick={sendInputs}
          className="Button"
        >
          Enviar
        </Button>
      </Grid>

      <Grid item xs={12}>
        <CardsErrands list={recadosFiltradosNaoArquivados} />
      </Grid>
    </Grid>
  );
}

export default HomeRecados;
