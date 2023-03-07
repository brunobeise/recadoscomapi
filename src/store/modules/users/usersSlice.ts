import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../../../service/ApiService";
import { RootState } from "../rootReducer";
import { saveUserRequest, User } from "../typeStore";

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.email,
});

export const getUsers = createAsyncThunk(
  "listaUsuarios/getlistaUsuarios",
  async () => {
    const response = await apiGet("/users");
    return response;
  }
);

export const saveUser = createAsyncThunk(
  "users/saveUser",
  async (dadosNovoUsuario: saveUserRequest) => {
    const response = await apiPost("/users", dadosNovoUsuario);
    return response;
  }
);

export const { selectAll: buscarUsuarios, selectById: buscarUsuariosID } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

const listSlice = createSlice({
  name: "listUsers",
  initialState: usersAdapter.getInitialState({
    success: false,
    mensagem: "",
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload.success) {
        usersAdapter.setAll(state, action.payload.data);
      }
      state.mensagem = action.payload.data.mensagem;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.success = true;
      state.loading = false;
      state.mensagem = action.error.message ?? "";
    });

    //POST
    builder.addCase(saveUser.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.mensagem = "";
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        usersAdapter.addOne(state, action.payload.data);
      }

      state.success = action.payload.success;
      state.loading = false;
      state.mensagem = action.payload.message;
    });
    builder.addCase(saveUser.rejected, (state) => {
      state.success = false;
      state.loading = false;
      state.mensagem = "Requisição falhou";
    });
  },
});

export const {} = listSlice.actions;
export const listUsers = listSlice.reducer;
