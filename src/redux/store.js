import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from 'redux-thunk'
import movie from './reducers/MovieReducer';

const store = createStore(
    combineReducers({movie}
    ),
    {},
    applyMiddleware( createLogger(), thunk))
export default store;