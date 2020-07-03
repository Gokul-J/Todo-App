import * as actionTypes from './actionTypes';
import axios from 'axios';

export const userIn = (url, obj, history) => {

    return (dispatch) => {
        axios.post(url, obj)
        .then(response => {
            dispatch({
                type: actionTypes.SET_LOGIN,
                data: response.data
            })
            history.push("/");
        })
    }
}

export const userOut = (url) => {
    return (dispatch) => {
        axios.post(url)
        .then(response => {
            dispatch({
                type: actionTypes.RESET_LOGIN,
                data: ""
            })
        })
    }
}