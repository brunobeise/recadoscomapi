import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

import {
  buscarRecados,
  deleteRecado,
  updateRecado,
} from "../../store/modules/errands/errandsSlice";
import {
  deleteRecadoRequest,
  Errand,
  updateRecadoRequest,
} from "../../store/modules/typeStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface FormProps {
  lista: Errand[];
}

export default function BasicTableArquivados({ lista }: FormProps) {
  const recadosSlicebuscar = useAppSelector(buscarRecados);
  const userLogged = useAppSelector((state) => state.userLogged);

  const dispatch = useAppDispatch();

  function handletoUnarchive(dado: Errand) {
    const recadoArquivado: updateRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
      newRecado: {
        name: dado.name,
        detail: dado.detail,
        filed: false,
      },
    };
    dispatch(updateRecado(recadoArquivado));
  }

  function handleDelete(dado: Errand) {
    const dadosForDelete: deleteRecadoRequest = {
      id: userLogged!.id,
      idRecado: dado.id,
    };

    dispatch(deleteRecado(dadosForDelete));
  }

  return (
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
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Detalhamento</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((dado: Errand, index: number) => (
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
                          color="primary"
                          sx={{ fontSize: "1rem", color: "black" }}
                          onClick={() => handletoUnarchive(dado)}
                        >
                          <Inventory2Icon />
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
    </Grid>
  );
}
