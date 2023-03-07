import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
} from "../../../service/ApiService";
import { RootState } from "../rootReducer";
import {
  deleteRecadoRequest,
  getErrandRequest,
  saveRecadoRequest,
  updateRecadoRequest,
} from "../typeStore";
import { Errand } from "../typeStore";

const errandsAdapter = createEntityAdapter<Errand>({
  selectId: (recado) => recado.id,
});

export const { selectAll: buscarRecados, selectById: buscarRecadosById } =
  errandsAdapter.getSelectors<RootState>((state) => state.errands);

//GET
export const getRecados = createAsyncThunk(
  "recados/getRecado",
  async (id: string) => {
    const response = await apiGet(`/users/${id}/recados`);
    console.log(response);
    return response;
  }
);

//GET by ID
export const getRecadosById = createAsyncThunk(
  "recados/getRecadoId",
  async (dados: getErrandRequest) => {
    const { id, idRecado, name } = dados;
    const response = await apiGet(
      `/users/${id}/recados/filtro?name=${name}&idRecado=${idRecado}`
    );
    console.log(response);
    return response;
  }
);

//POST
export const saveRecado = createAsyncThunk(
  "recados/salvarRecado",
  async (dados: saveRecadoRequest) => {
    const { id, newRecado } = dados;
    const response = await apiPost(`/users/${id}/recados`, newRecado);
    console.log(response);
    return response;
  }
);

//POST
export const updateRecado = createAsyncThunk(
  "recados/updateRecado",
  async (dados: updateRecadoRequest) => {
    const { id, idRecado, newRecado } = dados;
    const response = await apiPut(
      `/users/${id}/recados/${idRecado}`,
      newRecado
    );
    console.log(response);
    return response;
  }
);

//DELETE
export const deleteRecado = createAsyncThunk(
  "recados/deleteRecado",
  async (dados: deleteRecadoRequest) => {
    const { id, idRecado } = dados;
    const response = await apiDelete(`/users/${id}/recados/${idRecado}`);
    console.log(response);

    const payload = {
      ...response,
      idRecadotRemoved: idRecado,
    };

    return payload;
  }
);

const errandsSlice = createSlice({
  name: "errands",
  initialState: errandsAdapter.getInitialState({
    success: false,
    message: "",
    loading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    //  GET
    builder.addCase(getRecados.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRecados.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.setAll(state, action.payload.data);
      }
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(getRecados.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.message = action.error.message ?? "";
    });
    //  GET by ID
    builder.addCase(getRecadosById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRecadosById.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.setAll(state, action.payload.data);
      }
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(getRecadosById.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.message = action.error.message ?? "";
    });
    //POST
    builder.addCase(saveRecado.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveRecado.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.addOne(state, action.payload.data);
      }
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(saveRecado.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.message = action.error.message ?? "";
    });
    //PUT
    builder.addCase(updateRecado.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateRecado.fulfilled, (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;

      if (action.payload.success) {
        errandsAdapter.updateOne(state, {
          id: action.payload.data.id,
          changes: action.payload.data,
        });
      }
    });

    builder.addCase(updateRecado.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.message = action.error.message ?? "";
    });
    //DELETE
    builder.addCase(deleteRecado.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteRecado.fulfilled, (state, action) => {
      if (action.payload.success) {
        errandsAdapter.removeOne(state, action.payload.idRecadotRemoved);
      }
      state.success = true;
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteRecado.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.message = action.error.message ?? "";
    });
  },
});

export const errands = errandsSlice.reducer;
