import axios from 'axios';
import history from '../history';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:8080';

function signinSuccess(response) {
     return function (dispatch) {
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        history.push('/feature');
     };
}

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

function unAuthUser() {
    return {
        type: UNAUTH_USER
    };
}


export function signinFail(error) {
    return function(dispatch) {
        // - Show an error to the user
        dispatch(authError(error));
        dispatch(unAuthUser());
    };
}
export function signinUser ({ email, password }) {
    return function(dispatch) {
        // submit email and password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
            // If request is good..
            dispatch(signinSuccess(response));
        })
        .catch(error => {
            // If request is bad...
            dispatch(signinFail(error.response.data.error));
        });
    };
}

export function signupUser({ email, password }) {

    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            dispatch(signinSuccess(response));
        })
        .catch(error => {
            dispatch(signinFail(error.response.data.error));
        });
    };
}


export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        });
    };
}
