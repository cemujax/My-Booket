import axios from "axios";

const REST_API = "http://localhost:4000";
// const REST_API = "https://reqres.in/api";

const request = (method, url, data) => {
  return axios({
    method,
    url: REST_API + url,
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
