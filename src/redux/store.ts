import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { rootReducer } from "./reducer";
import { InitState } from "./state";

const logger = createLogger({
    collapsed: true,
    duration: true
});
export const sagaMiddleware = createSagaMiddleware();

export const configureStore = (): Store => {
    return createStore(
        rootReducer,
        InitState(),
        applyMiddleware(sagaMiddleware, logger)
    );
};
