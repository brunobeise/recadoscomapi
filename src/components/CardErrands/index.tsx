import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SearchIcon from "@mui/icons-material/Search";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {
  deleteRecadoRequest,
  Errand,
  getErrandRequest,
  updateRecadoRequest,
} from "../../store/modules/typeStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearInputDesc,
  editarRecadoDes,
} from "../../store/modules/userLogged/descricaoSlice";
import {
  clearInputDet,
  editarRecadoDet,
} from "../../store/modules/userLogged/detailSlice";
import {
  changeBooleanFalse,
  changeBooleanTrue,
} from "../../store/modules/button/buttonEnviar";
import {
  Alert,
  Checkbox,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import "../../config/style/index.css";
import { CssTextField } from "../Inputs/Textfield";
import {
  buscarRecados,
  deleteRecado,
  getRecados,
  getRecadosById,
  updateRecado,
} from "../../store/modules/errands/errandsSlice";

interface FormProps {
  list: Errand[];
}

function CardsErrands({ list }: FormProps) {
  const userLogged = useAppSelector((state) => state.userLogged);
  const recadosSlicebuscar = useAppSelector(buscarRecados);
  const [inputId, setInputId] = useState<any>("");
  const [inputName, setInputName] = useState("");
  const inputDesc = useAppSelector((state) => state.inputDesc);
  const inputDetail = useAppSelector((state) => state.inputDetail);
  let { loading, message, success } = useAppSelector((state) => state.errands);
  const [changeIcon, setChangeIcon] = useState(Math.random());
  const [checked, setChecked] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checked && userLogged.id) {
      dispatch(getRecados(userLogged.id));
    }
  }, [checked, dispatch, userLogged]);

  useEffect(() => {
    setOpenAlert(true);
  }, [success]);

  function mudaInputId(event: any) {
    setInputId(event);
  }

  function mudaInputName(event: string) {
    setInputName(event);
  }

  function handleEdit(dado: Errand) {
    dispatch(editarRecadoDes(dado));
    dispatch(editarRecadoDet(dado));
    setChangeIcon(dado.changeIcon);

    dispatch(changeBooleanFalse());
  }

  function handleAtt(dado: Errand) {
    const newRecado: updateRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
      newRecado: {
        name: inputDesc,
        detail: inputDetail,
        filed: false,
      },
    };

    dispatch(updateRecado(newRecado));

    clearInput();
    setChangeIcon(Math.random());
    dispatch(changeBooleanTrue());
  }

  function handleDelete(dado: Errand) {
    const dadosForDelete: deleteRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
    };

    dispatch(deleteRecado(dadosForDelete));
  }

  function handleToFile(dado: Errand) {
    const recadoArquivado: updateRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
      newRecado: {
        name: dado.name,
        detail: dado.detail,
        filed: true,
      },
    };
    dispatch(updateRecado(recadoArquivado));
  }

  function handleToFilter() {
    let iderrand = list[inputId - 1].id as string;

    if (iderrand === undefined) {
      success = false;
      message = "ID não encontrado, digite novamente";
    }

    const errandToFilter: getErrandRequest = {
      id: userLogged!.id,
      idRecado: iderrand,
      name: inputName,
    };
    dispatch(getRecadosById(errandToFilter));

    setInputName("");
    setInputId("");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  function clearInput() {
    dispatch(clearInputDet());
    dispatch(clearInputDesc());
  }

  return (
    <>
      <Grid container padding={4}>
        <Grid xs={12}>
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey" }}>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Detalhamento</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((dado: Errand, index: number) => (
                  <TableRow
                    key={dado.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "white",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{dado.name}</TableCell>
                    <TableCell align="center">{dado.detail}</TableCell>
                    <TableCell align="center">
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            sx={{
                              fontSize: "10px",
                              margin: "5px",
                              color: "black",
                            }}
                            onClick={() =>
                              dado.changeIcon === changeIcon
                                ? handleAtt(dado)
                                : handleEdit(dado)
                            }
                          >
                            {" "}
                            {dado.changeIcon == changeIcon ? (
                              <UpgradeIcon />
                            ) : (
                              <EditIcon />
                            )}{" "}
                          </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            color="primary"
                            sx={{
                              fontSize: "10px",
                              margin: "5px",
                              color: "black",
                            }}
                            onClick={() => handleDelete(dado)}
                          >
                            <DeleteIcon />{" "}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}

export { CardsErrands };
