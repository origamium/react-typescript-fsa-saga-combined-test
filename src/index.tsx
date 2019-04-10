import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore, sagaMiddleware } from "./redux/store";
import { rootSaga } from "./redux/saga";
import { App } from "./App";

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById("root")
);

sagaMiddleware.run(rootSaga);
