import * as api from "@/api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    return api.auth
      .login(email, password)
      .then(res => commit("LOGIN", res.data.token));
  }
};

export default actions;
