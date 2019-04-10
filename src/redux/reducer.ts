import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IncrementAction, DecrementAction } from "./action";
import { IState, InitialState } from "./type";

export const rootReducer = reducerWithInitialState(InitialState())
    .caseWithAction(IncrementAction, (state: IState, { payload }) => ({
        amount: state.amount + 1
    }))
    .caseWithAction(DecrementAction, (state: IState, { payload }) => ({
        amount: state.amount - 1
    }));
