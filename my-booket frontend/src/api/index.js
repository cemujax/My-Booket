import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const request = (method, url, data) => {
  return axios({
    method,
    url: BASE_URL + url,
    data
  }).then(result => {
    return result;
  });
};

export const auth = {
  login(email, password) {
    return request("post", "/login", { email, password });
  }
};
