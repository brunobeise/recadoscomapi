import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./modules/rootReducer";

const minhaStore = configureStore({
  reducer: rootReducer,
});

export { minhaStore };

export type RootState = ReturnType<typeof minhaStore.getState>;
export type AppDispatch = typeof minhaStore.dispatch;
