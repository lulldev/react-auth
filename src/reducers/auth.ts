const initialState: any = {
  formData: null,
  loadingFormData: false,
  loadingFormDataComplete: false,
  loadingFormDataFail: false,
};

export default (state: any = initialState, action: any) => {
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