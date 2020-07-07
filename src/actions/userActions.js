import * as actionTypes from './actionTypes';
import axios from 'axios';

export const userIn = (url, obj, history) => {
    console.log(obj);
    return (dispatch) => {
        axios.post(url, obj)
        .then(response => {
            dispatch({
                type: actionTypes.SET_LOGIN,
                data: response.data
            })
            history.push("/user");
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
            dispatch({
                type: actionTypes.GET_DATA_SUCCESS,
                data: []
            })
        })
    }
}