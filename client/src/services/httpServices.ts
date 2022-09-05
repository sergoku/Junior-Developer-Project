import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getAccsessToken,
  getExpiresIn,
  getId,
  getRefreshToken,
  setAccsessToken,
  setExpiresIn,
  setRefreshToken,
} from "./localStorageServices";

interface dataGetNewTokens {
  accsessToken: string;
  refreshToken: string;
  expiresIn: string;
  id: string;
  image: string;
  email: string;
}

axios.interceptors.request.use<AxiosRequestConfig<any>>(
  (config) => {
    const accsessToken = getAccsessToken();
    if (accsessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accsessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log(error);
    }
  }
);

axios.interceptors.response.use<AxiosResponse>(
  (config) => {
    return config;
  },
  async function (error: AxiosError) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (error.response?.status === 500 || !expectedErrors) {
      return error.config;
    }
    const refreshToken = getRefreshToken();
    const expiresDate = getExpiresIn();
    const userId = getId();

    const isActualTokenCheck = Number(expiresDate) > Date.now();
    if (error.config && refreshToken && !isActualTokenCheck) {
      try {
        const data: dataGetNewTokens = await axios.post(
          "http://localhost:8080/api/auth/token",
          {
            id: userId,
            refresh_token: refreshToken,
          }
        );
        setAccsessToken(data.accsessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);

        return axios.request(error.config);
      } catch (error) {
        console.log("Не авторизован");
      }
    }

    return Promise.reject(error);
  }
);

const httpServise = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpServise;
