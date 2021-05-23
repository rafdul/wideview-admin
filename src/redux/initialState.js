export const initialState = {
  apartments: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },

  orders: {
    data: [],
    loading: {
      active: false,
      error: false,
      added: false,
      done: false,
    },
  },
};
