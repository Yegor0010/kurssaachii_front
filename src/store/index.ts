import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunkMiddleware from "redux-thunk";

import { modelsReducer } from "./models/reducers";

const rootReducer = combineReducers({
    //system: systemReducer,
    user: modelsReducer
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig = {
    key: 'root',
    storage
  };

export default function configureStore() {
    const middlewares = [thunkMiddleware];

    if (process.env.NODE_ENV === 'development') {
        const { logger } = require('redux-logger');
        middlewares.push(logger);
      }
    
      const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
      const enhancer = composeEnhancers(applyMiddleware(...middlewares));
      const pReducer = persistReducer(persistConfig, rootReducer);
      const store = createStore(pReducer, enhancer);
      const persistor = persistStore(store, undefined);
    
      return { store, persistor };
}
