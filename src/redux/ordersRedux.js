import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllOrders = ({orders}) => orders.data;
export const getFiveOrders = ({orders}) => orders.data.slice(0,5);
export const getLoadingOrders = ({orders}) => orders.loading;
export const getOneOrder = ({orders}) => orders.oneOrder;

/* action name creator */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE = createActionName('FETCH_ONE');
const FETCH_ADD_ONE = createActionName('FETCH_ADD_ONE');
const FETCH_EDIT_ONE = createActionName('FETCH_EDIT_ONE');
const FETCH_DELETE_ONE = createActionName('FETCH_DELETE_ONE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOne = payload => ({ payload, type: FETCH_ONE });
export const fetchAddOne = payload => ({ payload, type: FETCH_ADD_ONE });
export const fetchEditOne = payload => ({ payload, type: FETCH_EDIT_ONE });
export const fetchDeleteOne = payload => ({ payload, type: FETCH_DELETE_ONE });

/* thunk creators */
export const fetchAllOrders = () => {
  return (dispatch, getState) => {
    const { orders } = getState();

    if(orders.data.length === 0 && orders.loading.active === false) {
      dispatch(fetchStarted());

      Axios
        .get(`${API_URL}/orders`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOneOrder = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/orders/${id}`)
      .then(res => {
        dispatch(fetchOne(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAddOneOrder = (order) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post(`${API_URL}/orders/add`, order)
      .then(res => {
        dispatch(fetchAddOne(order));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchEditOrder = (order, id) => {
  return(dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .put(`${API_URL}/orders/${id}/edit`, order)
      .then(res => {
        dispatch(fetchEditOne(order));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchDeleteOneOrder = (order) => {
  return(dispatch, getState) => {
    dispatch(fetchDeleteOne(order));

    Axios
      .delete(`${API_URL}/orders/delete`, {data: {_id: order._id}})

      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneOrder: action.payload,
      };
    }
    case FETCH_ADD_ONE: {
      // console.log('action.payload w reducer addOne:', action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: true,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case FETCH_EDIT_ONE: {
      // console.log('action.payload w reducer edit:', action.payload);
      const statePartIndex = statePart.data.findIndex(order => order._id === action.payload._id);
      statePart.data.splice(statePartIndex, 1, action.payload);

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: true,
        },
        data: [...statePart.data],
      };
    }
    case FETCH_DELETE_ONE: {
      // console.log('action.payload w reducer deleteOne:', action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          deleted: true,
        },
        data: statePart.data.filter(order => order._id !== action.payload._id),
      };
    }
    default:
      return statePart;
  }
};
