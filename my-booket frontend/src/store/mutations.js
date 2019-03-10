import { setAuthInHeader } from "../api";

const mutations = {
  LOGIN(state, data) {
    if (!data) return;
    const { token, user, bookets } = data;

    if (!token) return;
    state.token = token;
    localStorage.setItem("token", token);
    setAuthInHeader(token);

    if (!user) return;
    state.user = user;
    if (!bookets) return;
    state.bookets = bookets;
  },
  LOGOUT(state, token) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(token);
    state.user = {};
    state.bookets = [];
  },
  SET_BOOKETS(state, bookets) {
    state.bookets = bookets;
  },
  SET_BOOKET(state, booket) {
    state.booket = booket;
  },
  SET_IS_REVIEW_BOOKET(state, toggle) {
    state.isReviewBooket = toggle;
  },
  SET_NEW_BOOKS(state, newBooks) {
    state.newBooks = newBooks;
  },
  SET_BEST_SELLERS(state, bestSellers) {
    state.bestSellers = bestSellers;
  }
};

export default mutations;
