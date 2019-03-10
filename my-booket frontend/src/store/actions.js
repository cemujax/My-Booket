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
  FETCH_BOOKETS({ commit }) {
    return api.bookets.fetch().then(data => {
      commit("SET_BOOKETS", data.list);
    });
  },
  FETCH_BOOKET({ commit }, { id }) {
    return api.bookets.fetch(id).then(data => {
      commit("SET_BOOKET", data.item);
    });
  },
  DELETE_BOOKET({ dispatch }, { id }) {
    return api.bookets.destroy(id).then(_ => dispatch("FETCH_BOOKETS"));
  },
  UPDATE_BOOKET(
    { dispatch, state },
    { id, status, startDate, endDate, comment, rate, timeline }
  ) {
    return api.bookets
      .update(id, { status, startDate, endDate, comment, rate, timeline })
      .then(_ => dispatch("FETCH_BOOKET", { id: state.booket._id }))
      .then(_ => dispatch("FETCH_BOOKETS"));
  },

  // 인터파크
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
