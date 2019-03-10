const state = {
  token: null,
  user: {},
  bookets: [],
  booket: {},
  isReviewBooket: false,
  booketStatusCode: [
    { code: 0, value: "읽기전" },
    { code: 1, value: "읽는중" },
    { code: 2, value: "완독" }
  ],
  newBooks: [],
  bestSellers: []
};

export default state;
