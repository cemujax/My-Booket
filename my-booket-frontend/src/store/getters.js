const getters = {
  isAuth(state) {
    return !!state.token;
  },
  isBooket(state) {
    return function(isbn) {
      return !state.bookets.every(booket => booket.isbn !== isbn);
    };
  }
};

export default getters;
