import axios from "axios";
import router from "../router";

const BASE_URL = "/api";
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
  },
  signup(form) {
    return request("post", "/signup", { form });
  }
};
export const bookets = {
  create(bookInfo) {
    return request("post", "/bookets", bookInfo);
  },
  fetch(id) {
    return id ? request("get", `/bookets/${id}`) : request("get", `/bookets`);
  },
  destroy(id) {
    return request("delete", `/bookets/${id}`);
  },
  update(id, payload) {
    return request("put", `/bookets/${id}`, payload);
  }
};
export const interpark = {
  newBooks() {
    return axios
      .get("/interparkAPI/newBook.api")
      .then(res => res.data)
      .catch(error => console.log(error));
  },
  bestSeller() {
    return axios
      .get("/interparkAPI/bestSeller.api")
      .then(res => res.data)
      .catch(error => console.log(error));
  }
};
