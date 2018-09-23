export const startLoadingAuthForm = () => {
  return {
    type: 'LOAD_AUTH_FORM_START',
  };
};

export const completeLoadingAuthForm = (formData: any) => {
  return {
    type: 'LOAD_AUTH_FORM_COMPLETE',
    payload: formData,
  };
};

export const failLoadingAuthForm = (error: any) => {
  return {
    type: 'END_SEARCH_LOADING',
    payload: error
  };
};
