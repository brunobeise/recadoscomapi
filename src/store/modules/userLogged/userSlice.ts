import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLogged } from "../typeStore";

const initialState = {
  id: "",
  name: "",
};

const userLog = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    atualizarLogged(state, action: PayloadAction<UserLogged>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { atualizarLogged } = userLog.actions;
export const userLogged = userLog.reducer;
