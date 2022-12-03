import {
    legacy_createStore,
    combineReducers,
    compose,
    applyMiddleware,
  } from 'redux';
  import thunk from 'redux-thunk';
import { loginReducer } from '../reducer/LoginReducer';
  
  
  const rootReducer = combineReducers({ auth: loginReducer  });
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  