import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: "",
    id: null,
    islogged: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOGIN:
            console.log(action.data);
            return {
                ...state,
                username: action.data.username,
                id: action.data.id,
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