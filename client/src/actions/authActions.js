import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) =>{
    // User Loading

    dispatch({ type: USER_LOADING});
    

    axios.get('/api/auth/user', tokenConfig(getState))
         .then(res=> dispatch({
             type: USER_LOADED,
             payload: res.data
         })).catch(err =>{
             dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
             type: AUTH_ERROR
         })})
}

// setup config/headers and token 

export const tokenConfig = getState => {
    // get Token from local storage

    const token = getState().auth.token;

    // Headers Object

    const config = {
        headers: {
        "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
}
