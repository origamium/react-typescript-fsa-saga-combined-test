import { SagaIterator } from "redux-saga";
import {
    takeEvery,
    put,
    all,
    fork,
    delay,
    ForkEffect
} from "redux-saga/effects";
import { bindAsyncAction } from "typescript-fsa-redux-saga";
import {
    AsyncAddAction,
    AsyncAddRequestAction,
    DecrementAction,
    IAsyncAddActionPayload,
    IncrementAction
} from "./action";
import { Action } from "typescript-fsa";

const AsyncIncrementCoWorker = function*(index: number): SagaIterator {
    yield delay(index * 100);
    yield put(IncrementAction({}));
};

const AsyncDecrementCoWorker = function*(index: number): SagaIterator {
    yield delay(index * 100);
    yield put(DecrementAction({}));
};

const AsyncAddWorker = bindAsyncAction(AsyncAddAction)(function*(
    params
): SagaIterator {
    if (params.amount > 0) {
        yield all(
            new Array(params.amount)
                .fill(null)
                .map(
                    (v: null, i: number): ForkEffect =>
                        fork(AsyncIncrementCoWorker, i)
                )
        );
    } else if (params.amount < 0) {
        yield all(
            new Array(Math.abs(params.amount))
                .fill(null)
                .map(
                    (v: null, i: number): ForkEffect =>
                        fork(AsyncDecrementCoWorker, i)
                )
        );
    }

    return {};
});

export function* rootSaga(): SagaIterator {
    yield takeEvery(
        AsyncAddRequestAction.type,
        (action: Action<IAsyncAddActionPayload>) =>
            AsyncAddWorker(action.payload)
    );
}
