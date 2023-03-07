import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer, { BlockchainState } from "./reducer";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({ blockchain: reducer });

const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, sagaMiddleware];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export type CombinedState = {
    blockchain: BlockchainState
}
export default store;
