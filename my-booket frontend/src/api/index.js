import axios from "axios";
import router from "../router";

const BASE_URL = "http://localhost:4000/api";
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};

const request = (method, url, data) => {
  return axios({
    method,
    url: BASE_URL + url,
    data
  })
    .then(result => result.data)
    .catch(result => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) onUnauthorized();
      throw result.response;
    });
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null;
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  }
};

export const interpark = {
  newBooks() {
    return axios
      .get("http://localhost:4000/interparkAPI/newBook.api")
      .then(res => res.data)
      .catch(error => console.log(error));
  }
};
