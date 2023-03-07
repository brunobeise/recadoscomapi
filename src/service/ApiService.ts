import axios, { AxiosResponse } from "axios";
import { ResponseAPI } from "../store/modules/typeStore";

axios.defaults.baseURL = "https://recadosapi-7yth.onrender.com";

const apiGet = async (rota: string) => {
  try {
    const resposta: AxiosResponse = await axios.get(rota);

    const retornoAPI: ResponseAPI = {
      success: resposta.data.success,
      message: resposta.data.message,
      data: resposta.data.data,
    };

    return retornoAPI;
  } catch (error: any) {
    const retornoAPIError: ResponseAPI = {
      success: error.respsonse.data.success,
      message: error.respsonse.data.message,
      data: error.respsonse.data.data,
    };

    return retornoAPIError;
  }
};

const apiPost = async (rota: string, dados: any) => {
  try {
    const resposta: AxiosResponse = await axios.post(rota, dados);

    const retornoAPI: ResponseAPI = {
      success: resposta.data.success,
      message: resposta.data.message,
      data: resposta.data.data,
    };

    return retornoAPI;
  } catch (error: any) {
    const retornoAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return retornoAPIError;
  }
};

const apiPut = async (rota: string, dados: any) => {
  try {
    const resposta: AxiosResponse = await axios.put(rota, dados);

    const retornoAPI: ResponseAPI = {
      success: resposta.data.success,
      message: resposta.data.message,
      data: resposta.data.data,
    };

    return retornoAPI;
  } catch (error: any) {
    const retornoAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return retornoAPIError;
  }
};

const apiDelete = async (rota: string) => {
  try {
    const resposta: AxiosResponse = await axios.delete(rota);

    const retornoAPI: ResponseAPI = {
      success: resposta.data.success,
      message: resposta.data.message,
      data: resposta.data.data,
    };

    return retornoAPI;
  } catch (error: any) {
    const retornoAPIError: ResponseAPI = {
      success: error.response.data.success,
      message: error.response.data.message,
      data: error.response.data.data,
    };

    return retornoAPIError;
  }
};

export { apiGet, apiDelete, apiPut, apiPost };
