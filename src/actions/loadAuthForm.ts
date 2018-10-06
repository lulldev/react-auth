import {Dispatch} from 'redux';
import {
  LOAD_AUTH_FORM_START,
  LOAD_AUTH_FORM_COMPLETE,
  LOAD_AUTH_FORM_FAIL,
} from '../constants/actions';
import {SimpleAction} from '../types/actions';
import {FORM_AUTHENTICATION_ENDPOINT} from '../constants/api';


export const startLoadingAuthForm = (): { type: typeof LOAD_AUTH_FORM_START } => {
  return {
    type: LOAD_AUTH_FORM_START,
  };
};

export const completeLoadingAuthForm = (formData: object): { type: typeof LOAD_AUTH_FORM_COMPLETE, payload: object } => {
  return {
    type: LOAD_AUTH_FORM_COMPLETE,
    payload: formData,
  };
};

export const failLoadingAuthForm = (error: Error): { type: typeof LOAD_AUTH_FORM_FAIL, payload: Error } => {
  return {
    type: LOAD_AUTH_FORM_FAIL,
    payload: error,
  };
};

export const loadAuthForm = (dispatch: Dispatch<SimpleAction>) => {
  dispatch(startLoadingAuthForm());
  fetch(FORM_AUTHENTICATION_ENDPOINT)
    .then((response: Response) => {
      return response.json();
    })
    .then((formData: object) => {
      dispatch(completeLoadingAuthForm(formData));
    })
    .catch(() => {
      dispatch(failLoadingAuthForm(new Error('Error loading form data')));
    });
};
