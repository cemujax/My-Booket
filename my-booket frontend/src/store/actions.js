import * as api from "@/api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    return api.auth
      .login(email, password)
      .then(res => commit("LOGIN", res.data));
  },
  FETCH_NEWBOOKS({ commit }) {
    return api.interpark.newBooks().then(data => {
      commit("SET_NEW_BOOKS", data.item.slice(0, 5));
    });
  }
};

export default actions;
