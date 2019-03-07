import { setAuthInHeader } from "../api";

const mutations = {
  LOGIN(state, data) {
    if (!data) return;
    const { token, user } = data;

    if (!token) return;
    state.token = token;
    localStorage.setItem("token", token);
    setAuthInHeader(token);

    if (!user) return;
    state.user = user;
  },
  LOGOUT(state, token) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(token);
    state.user = {};
  },
  SET_BOOKETS(state, bookets) {
    state.bookets = bookets;
  },
  SET_NEW_BOOKS(state, newBooks) {
    state.newBooks = newBooks;
  },
  SET_BEST_SELLERS(state, bestSellers) {
    state.bestSellers = bestSellers;
  }
};

export default mutations;
