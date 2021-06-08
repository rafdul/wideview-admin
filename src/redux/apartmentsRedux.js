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
const FETCH_EMPTY_ONE = createActionName('FETCH_EMPTY_ONE');
const FETCH_ADD_ONE = createActionName('FETCH_ADD_ONE');
const FETCH_EDIT_ONE = createActionName('FETCH_EDIT_ONE');
const FETCH_DELETE_ONE = createActionName('FETCH_DELETE_ONE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOne = payload => ({ payload, type: FETCH_ONE });
export const fetchEmptyOne = payload => ({ payload, type: FETCH_EMPTY_ONE });
export const fetchAddOne = payload => ({ payload, type: FETCH_ADD_ONE });
export const fetchEditOne = payload => ({ payload, type: FETCH_EDIT_ONE });
export const fetchDeleteOne = payload => ({ payload, type: FETCH_DELETE_ONE });

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
        console.log('res.data', res.data);
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAddOneApartments = (offer) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post(`${API_URL}/offers/add`, offer, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        dispatch(fetchAddOne(offer));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchEditApartments = (offer, id) => {
  return(dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .put(`${API_URL}/offers/${id}/edit`, offer)
      .then(res => {
        dispatch(fetchEditOne(offer));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchDeleteApartments = (offer) => {
  return(dispatch, getState) => {
    // dispatch(fetchStarted());
    dispatch(fetchDeleteOne(offer));

    Axios
      .delete(`${API_URL}/offers/delete`, {data: {_id: offer._id}})
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
          added: false,
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
      console.log('action.payload w fetchone:', action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneOffer: action.payload,
      };
    }
    case FETCH_EMPTY_ONE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneOffer: {},
      };
    }
    case FETCH_ADD_ONE: {
      // console.log('action.payload w reducer addone:', action.payload);

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
      const statePartIndex = statePart.data.findIndex(offer => offer._id === action.payload._id);
      statePart.data.splice(statePartIndex, 1, action.payload);
      // console.log('action.payload w reducer edit:', action.payload);

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
      // console.log('action.payload w reducer edit:', action.payload);

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          deleted: true,
        },
        data: statePart.data.filter(offer => offer._id !== action.payload._id),
      };
    }
    default:
      return statePart;
  }
};
