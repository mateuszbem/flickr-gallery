import { combineReducers } from 'redux'

const initState = {
    images: [],
    loading: false
}

function reducer(state=initState,action){
    
    switch(action.type){
        case 'ASYNC_REQUEST':
        return {...state, loading: action.payload}
        case 'GET_IMAGES':
        return {...state, images: action.payload, loading:false}
        case 'GET_MORE':
        return {...state, images: action.payload, loading:false}
        default:
            return state;
    }
}


const Reducers = combineReducers({
    reducer
});
export default Reducers;