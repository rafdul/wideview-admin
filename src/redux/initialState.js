export const initialState = {
  apartments: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
    oneOffer: {},
  },

  orders: {
    data: [],
    loading: {
      active: false,
      error: false,
      added: false,
      done: false,
    },
    oneOrder: {},
  },
};
