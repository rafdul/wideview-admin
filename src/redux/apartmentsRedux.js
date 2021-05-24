import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllApartments = ({apartments}) => apartments.data;
export const getFiveApartments = ({apartments}) => apartments.data.slice(0,5);
export const getLoadingApartments = ({apartments}) => apartments.loading;

/* action name creator */
const reducerName = 'apartments';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

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
    default:
      return statePart;
  }
};
