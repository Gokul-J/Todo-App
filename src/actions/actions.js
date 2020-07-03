import * as actionTypes from './actionTypes';
import axios from 'axios';

//ROUTE REQUESTS

export const getData = (url, props) => {
    
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            dispatch({
                type: actionTypes.GET_DATA_SUCCESS,
                data: response.data
            });
        })
    }
}


export const postData = (url, obj, history) => {
    return (dispatch) => {
        axios.post(url, obj)
        .then(response => {
            dispatch(getData(url));
        })
    }
}

 
export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj)
        .then(response => {
            dispatch(getData(url));
        })
    }
}


export const deleteData = (url, obj, props) => {
    return (dispatch) => {
        axios.delete(url, obj)
        .then(response => {
            dispatch(getData(url));
        })
    }
}