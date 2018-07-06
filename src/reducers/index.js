import { combineReducers } from 'redux';
import empReducer from './empReducer';
import menuReducer from './menuReducer';

export default combineReducers({
    emps: empReducer,
    menu: menuReducer
});
