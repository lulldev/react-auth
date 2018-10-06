export type LoginState = {
  accessToken: null|string,
  tokenId: null|string,
  userId: null|string,
  isLoginFail: boolean,
};

export type LoadAuthFormState = {
  formData: object|null,
  loadingFormData: boolean,
  loadingFormDataComplete: boolean,
  loadingFormDataFail: boolean,
};
