import * as actionTypes from '../actions/actionTypes';

const initialState = {
    inputField: "",
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_TODO_INPUT:
            // console.log(state)
            return{
                ...state,
                inputField: action.data
            }
        default:
            return state;
    }
}

export default todoReducer;