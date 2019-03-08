import * as api from "@/api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    return api.auth
      .login(email, password)
      .then(res => commit("LOGIN", res.data));
  },

  ADD_BOOKET(_, { bookInfo }) {
    return api.bookets.create({ bookInfo });
  },
  FETCH_BOOKETS({ commit }, { status }) {
    return api.bookets.fetch(status).then(data => {
      commit("SET_BOOKETS", data.list);
    });
  },
  DELETE_BOOKET(_, { id }) {
    return api.bookets.destroy(id);
  },

  FETCH_NEWBOOKS({ commit }) {
    return api.interpark.newBooks().then(data => {
      commit("SET_NEW_BOOKS", data.item.slice(0, 5));
    });
  },
  FETCH_BESTSELLERS({ commit }) {
    return api.interpark.bestSeller().then(data => {
      commit("SET_BEST_SELLERS", data.item.slice(0, 5));
    });
  }
};

export default actions;
