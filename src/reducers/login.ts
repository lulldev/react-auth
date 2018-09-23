const initialState: any = {
  formData: null,
  loadingFormData: false,
  loadingFormDataComplete: false,
  loadingFormDataFail: false,
  accessToken: null,
  tokenId: null,
  userId: null,
  isLoginFail: false,
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
    case 'LOGIN_SUCCESS':
      return {
        accessToken: action.payload.accessToken,
        tokenId: action.payload.tokenId,
        userId: action.payload.userId,
        isLoginFail: false,
      }
    case 'LOGIN_FAILURE':
      return {
        accessToken: null,
        tokenId: null,
        userId: null,
        isLoginFail: true,
      }
    case 'LOGOUT':
      return {
        accessToken: null,
        tokenId: null,
        userId: null,
        isLoginFail: false,
      }
    default:
      return state
  }
}