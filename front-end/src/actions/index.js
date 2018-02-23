import axios from 'axios';
import history from '../history';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:8080';


export function signinUser ({ email, password }) {
    return function(dispatch) {
        // submit email and password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
            // If request is good..
            // - Update state to indicate user is authenticated
            dispatch({ type: AUTH_USER });

            // - Save the JWT token
            localStorage.setItem('token', response.data.token);
            // - redirect to the route '/feature'
            history.push('/feature');
        })

        .catch(() => {
            dispatch({ type: UNAUTH_USER });
        });

        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
    };
}


export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
