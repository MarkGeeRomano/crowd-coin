import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import contracts from './contracts';

const rootReducer = combineReducers({
    contracts
});

export default rootReducer;
