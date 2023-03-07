import React, { useEffect, useState } from "react";
import { Stack, Button, Box, Typography, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router/dist";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { saveUser } from "../../store/modules/users/usersSlice";
import {
  atualizarLogged,
  userLogged,
} from "../../store/modules/userLogged/userSlice";
import "../../config/style/index.css";
import InputDefault, { Name } from "../Inputs/InputDefault";
import SaveIcon from "@mui/icons-material/Save";
import { buscarUsuarios } from "../../store/modules/users/usersSlice";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface FormProps {
  mode: "login" | "signup";
}

function Form({ mode }: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [openSuccess, setopenSuccess] = useState(false);
  const [openError, setopenError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorName, setErrorName] = useState(true);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorRePassword, setErrorRePassword] = useState(true);
  const listaSlice = useAppSelector(buscarUsuarios);
  const { loading, mensagem, success } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setopenSuccess(false);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setopenError(false);
  };

  const handleValidateInput = (value: string, key: Name) => {
    switch (key) {
      case "name":
        if (value.length < 3 || value === "") {
          setErrorName(true);
        } else {
          setErrorName(false);
        }
        break;

      case "email":
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!value.match(regexEmail) || value === "") {
          setErrorEmail(true);
        } else {
          setErrorEmail(false);
        }
        break;

      case "password":
        const regexPassword =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        if (mode === "signup") {
          if (!value.match(regexPassword) || value === "") {
            setErrorPassword(true);
          } else {
            setErrorPassword(false);
          }
        }

        if (mode === "login") {
          if (!value) {
            setErrorPassword(true);
          } else {
            setErrorPassword(false);
          }
        }
        break;

      case "repassword":
        if (value === "" || value !== password) {
          setErrorRePassword(true);
        } else {
          setErrorRePassword(false);
        }
        break;

      default:
    }
  };

  function mudarInput(value: string, key: Name) {
    switch (key) {
      case "name":
        setName(value);
        handleValidateInput(value, key);
        break;

      case "email":
        setEmail(value);
        handleValidateInput(value, key);
        break;

      case "password":
        setPassword(value);
        handleValidateInput(value, key);
        break;

      case "repassword":
        setRepassword(value);
        handleValidateInput(value, key);
        break;
    }
  }

  function createAccount() {
    const newName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const newUser = {
      name: newName,
      email,
      password,
    };

    dispatch(saveUser(newUser));

    const userExist = listaSlice.some((user) => user.email === newUser.email);

    if (!userExist) {
      setopenSuccess(true);
      console.log(listaSlice);
      return;
    }

    setopenError(true);
    clearInput();
  }

  function login() {
    console.log(listaSlice);

    const userExist = listaSlice.find((user) => {
      return user.email === email && user.password === password;
    });

    if (!userExist) {
      setShowAlert(true);
      return;
    }

    const userLog = {
      id: userExist!.id,
      name: userExist!.name,
    };

    dispatch(atualizarLogged(userLog));
    localStorage.setItem("userLogged", JSON.stringify(userLog));

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }

  const clearInput = () => {
    setEmail("");
  };

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ width: "80%" }}>
        {mode === "signup" && (
          <>
            <InputDefault
              type="name"
              label="Nome"
              name="name"
              value={name}
              handleChange={mudarInput}
            />
            <InputDefault
              type="email"
              label="E-mail"
              name="email"
              value={email}
              handleChange={mudarInput}
            />
            <InputDefault
              type="password"
              label="Senha"
              name="password"
              value={password}
              handleChange={mudarInput}
            />

            <InputDefault
              type="password"
              label="Repita a Senha"
              name="repassword"
              value={repassword}
              handleChange={mudarInput}
            />
            {loading === true && (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Criando
              </LoadingButton>
            )}

            <Button
              disabled={
                errorName || errorEmail || errorRePassword || errorPassword
              }
              variant="contained"
              onClick={createAccount}
              sx={{
                display: loading === true ? "none" : "flex",
                backgroundColor: "black",
              }}
              className="Button"
            >
              Criar Conta
            </Button>
          </>
        )}

        {mode === "login" && (
          <>
            <InputDefault
              type="email"
              label="E-mail"
              name="email"
              value={email}
              handleChange={mudarInput}
            />
            <InputDefault
              type="password"
              label="Senha"
              name="password"
              value={password}
              handleChange={mudarInput}
            />

            {loading === true && (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Logando
              </LoadingButton>
            )}

            <Button
              disabled={errorEmail || errorPassword}
              variant="contained"
              onClick={login}
              sx={{
                backgroundColor: "black",
                display: loading === true ? "none" : "flex",
              }}
              className="Button"
            >
              Acessar
            </Button>
          </>
        )}
      </Stack>
      <Box marginTop={3}>
        {mode === "login" && (
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Não tem conta?{" "}
            <Typography
              variant="button"
              sx={{ cursor: "pointer", color: "black" }}
              onClick={handleNavigate}
            >
              Cadastre-se
            </Typography>
          </Typography>
        )}
        {mode === "signup" && (
          <Typography variant="subtitle2" sx={{ color: "black" }}>
            Já tem conta?{" "}
            <Typography
              variant="button"
              sx={{ cursor: "pointer", color: "black" }}
              onClick={handleNavigate}
            >
              Fazer Login
            </Typography>
          </Typography>
        )}
      </Box>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%", display: mensagem === "" ? "none" : "flex" }}
        >
          {mensagem}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%", display: mensagem === "" ? "none" : "flex" }}
        >
          {mensagem}
        </Alert>
      </Snackbar>
      <Alert
        severity="error"
        sx={{ display: showAlert ? "flex" : "none", marginTop: "1rem" }}
      >
        Usuário não encontrado
      </Alert>
      ;
    </>
  );
}

export default Form;
