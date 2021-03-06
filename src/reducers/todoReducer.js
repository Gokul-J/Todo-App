import * as actionTypes from '../actions/actionTypes';
 
const initialState = {
    data: [],
    showSuccessModal: false
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.POST_DATA_SUCCESS:
            return {
                ...state,
                showSuccessModal: true
            };
        case actionTypes.DELETE_DATA_SUCCESS:
            return {
                ...state,
                showSuccessModal: true
            }
        default:
            return state;
    }
}

export default todoReducer;