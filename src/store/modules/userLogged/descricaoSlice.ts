import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Errand } from "../typeStore";

const initialState: string = "";

const inputDesc = createSlice({
  name: "descricaoSlice",
  initialState,
  reducers: {
    mudarValueDesc(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
    editarRecadoDes(state, action: PayloadAction<Errand>) {
      return (state = action.payload.name);
    },
    clearInputDesc(state) {
      return (state = "");
    },
  },
});

export const { mudarValueDesc, editarRecadoDes, clearInputDesc } =
  inputDesc.actions;
export const inputDescricao = inputDesc.reducer;
