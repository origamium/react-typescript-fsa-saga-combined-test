import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const IncrementAction = actionCreator<{}>("Increment");
export const DecrementAction = actionCreator<{}>("Decrement");

export interface IAsyncAddActionPayload {
    amount: number;
}
export const AsyncAddRequestAction = actionCreator<IAsyncAddActionPayload>(
    "AsyncIncrementRequest"
);
export const AsyncAddAction = actionCreator.async<IAsyncAddActionPayload, {}>(
    "AsyncIncrementBody"
);
