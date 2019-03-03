const mutations = {
  LOGIN(state, token) {
    if (!token) return;
    state.token = token;
    localStorage.setItem("token", token);
  }
};

export default mutations;
