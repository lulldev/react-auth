import {SimpleAction} from '../types/actions';

type LoadAuthFormState = {
  formData: object|null,
  loadingFormData: boolean,
  loadingFormDataComplete: boolean,
  loadingFormDataFail: boolean,
};

const initialState: LoadAuthFormState = {
  formData: null,
  loadingFormData: false,
  loadingFormDataComplete: false,
  loadingFormDataFail: false,
};

export default (state: LoadAuthFormState = initialState, action: SimpleAction) => {
  switch (action.type) {
    case 'LOAD_AUTH_FORM_START':
      return {
        formData: null,
        loadingFormData: true,
        loadingFormDataComplete: false,
      }
    case 'LOAD_AUTH_FORM_COMPLETE':
      return {
        formData: action.payload,
        loadingFormData: false,
        loadingFormDataComplete: true,
      }
    case 'LOAD_AUTH_FORM_FAIL':
      return {
        formData: null,
        loadingFormData: false,
        loadingFormDataComplete: false,
        loadingFormDataFail: true,
      }
    default:
      return state
  }
}