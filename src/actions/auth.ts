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
    type: 'LOAD_AUTH_FORM_FAIL',
    payload: error
  };
};

export const loadAuthForm = (dispatch: any) => {
  dispatch(startLoadingAuthForm());
  fetch('https://api.vs12.nwaj.ru/v1/forms/post/user/authentication')
    .then((response: any) => {
      return response.json();
    })
    .then((formData: any) => {
      dispatch(completeLoadingAuthForm(formData));
    })
    .catch(() => {
      dispatch(failLoadingAuthForm(new Error('Error loading form data')));
    });
};


export const loginSuccess = (accessData: any) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: accessData,
  };
};

export const loginFailure = () => {
  return {
    type: 'LOGIN_FAILURE',
  };
};

export const login = (dispatch: any, requestData: any) => {
  console.log(requestData);
  fetch('https://api.vs12.nwaj.ru/v1/user/authentication', {
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

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};