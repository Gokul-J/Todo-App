import * as actionTypes from './actionTypes';
import axios from 'axios';

//ROUTE REQUESTS

export const getData = (url, obj, props) => {
    
    return (dispatch) => {
        console.log(obj);
        axios.get("http://localhost:5000/" + obj)
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
            dispatch(getData(url, obj.username));
        })
    }
}

 
// export const putData = (url, obj, props) => {
//     return (dispatch) => {
//         axios.put(url, obj)
//         .then(response => {
//             dispatch(getData(url));
//         })
//     }
// }


export const deleteData = (url, obj, history) => {
    return (dispatch) => {
        axios.delete(url, obj)
        .then(response => {
            dispatch(getData(url, obj.username));
        })
    }
}