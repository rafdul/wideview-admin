import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllApartments = ({apartments}) => apartments.data;
export const getFiveApartments = ({apartments}) => apartments.data.slice(0,5);
export const getLoadingApartments = ({apartments}) => apartments.loading;
export const getOneOffer = ({apartments}) => apartments.oneOffer;

/* action name creator */
const reducerName = 'apartments';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE = createActionName('FETCH_ONE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOne = payload => ({ payload, type: FETCH_ONE });

/* thunk creators */
export const fetchAllApartments = () => {
  return (dispatch, getState) => {
    const { apartments } = getState();

    if(apartments.data.length === 0 && apartments.loading.active === false) {
      dispatch(fetchStarted());

      Axios
        .get(`${API_URL}/offers`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOneApartments = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/offers/${id}`)
      .then(res => {
        dispatch(fetchOne(res.data));
      })
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
        oneOffer: action.payload,
      };
    }
    default:
      return statePart;
  }
};
