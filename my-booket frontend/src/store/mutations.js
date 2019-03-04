const mutations = {
  LOGIN(state, token) {
    if (!token) return;
    state.token = token;
    localStorage.setItem("token", token);
  },
  LOGOUT(state, token) {
    state.token = null;
    delete localStorage.token;
  }
};

export default mutations;
