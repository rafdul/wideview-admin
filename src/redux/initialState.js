export const initialState = {
  categories: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },

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
