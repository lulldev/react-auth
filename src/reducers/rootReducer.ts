import {combineReducers} from 'redux';
import loadingAuthForm from './loadAuthForm';
import login from './login';

export default combineReducers({ login, loadingAuthForm } as object);
