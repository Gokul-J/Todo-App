import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: "",
    islogged: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                username: action.data,
                islogged: true
            }
        case actionTypes.RESET_LOGIN:
            return{
                username: "",
                islogged: false
            }
        default :
            return state;
    }
}

export default userReducer;