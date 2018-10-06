import {Dispatch} from 'redux';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants/actions';

import {USER_AUTHENTICATION_ENDPOINT} from '../constants/api';

import {SimpleAction} from '../types/actions';

export const loginSuccess = (accessData: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: accessData,
  };
};

export const loginFailure = (): SimpleAction => {
  return {
    type: LOGIN_FAILURE,
  };
};

export const login = (dispatch: Dispatch<SimpleAction>, requestData: any) => {
  fetch(USER_AUTHENTICATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(requestData)
  })
    .then((response: any) => {
      if (response.status !== 200) {
        dispatch(loginFailure());
        return;
      }
      return response.json();
    })
    .then((authResult: any) => {
      dispatch(loginSuccess(authResult));
    })
    .catch(() => {
      dispatch(loginFailure());
    });
};

export const logout = (): SimpleAction => {
  return {
    type: LOGOUT,
  };
};