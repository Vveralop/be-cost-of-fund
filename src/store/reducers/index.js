// Third-party
import { combineReducers } from 'redux';

// Project import
import menu from './menu';
import costfund from "./slice/costfund";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu,costfund });

export default reducers;