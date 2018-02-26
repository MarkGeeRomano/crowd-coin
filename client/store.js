import { createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const defaultState = { campaigns: []};

const enhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const store = createStore(rootReducer, defaultState, enhancers);

//adds hot reload for changes to reducer
if(module.hot){
    module.hot.accept('./reducers', ()=>{
        const nextRootReducer = require(`./reducers/index`).default;
        store.replaceReducer(nextRootReducer);
    });
};

export default store;

