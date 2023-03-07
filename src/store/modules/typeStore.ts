export interface Errand {
  id: string;
  name: string;
  detail: string;
  changeIcon: number;
  filed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  errands: Errand[];
}

export interface UserLogged {
  id: string;
  name: string;
}

export interface saveUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface saveRecadoRequest {
  id: string;
  newRecado: {
    name: string;
    detail: string;
    filed: boolean;
  };
}

export interface updateRecadoRequest {
  id: string;
  idRecado: string;
  newRecado: {
    name: string;
    detail: string;
    filed: boolean;
  };
}

export interface getErrandRequest {
  id: string;
  idRecado: string;
  name: string;
}

export type deleteRecadoRequest = Omit<updateRecadoRequest, "newRecado">;

export interface ResponseAPI {
  success: boolean;
  message: string;
  data: any;
}

export type Users = User[];
export type ListaRecados = Errand[];
