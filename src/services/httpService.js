import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./authService";
import logger from "./logService";

// console.log(getToken());

axios.defaults.headers.common["x-auth-token"] = getToken();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An Unexpected Error Occured.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
