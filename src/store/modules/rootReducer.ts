import { combineReducers } from "redux";
import buttonEnviar from "./button/buttonEnviar";
import { errands } from "./errands/errandsSlice";
import { inputDescricao } from "./userLogged/descricaoSlice";
import { inputDetalhe } from "./userLogged/detailSlice";
import { userLogged } from "./userLogged/userSlice";
import { listUsers } from "./users/usersSlice";

const rootReducer = combineReducers({
  users: listUsers,
  userLogged: userLogged,
  inputDesc: inputDescricao,
  inputDetail: inputDetalhe,
  buttonEnviar: buttonEnviar,
  errands: errands,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
