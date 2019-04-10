export interface IState {
    amount: number;
}

export const InitialState = (): IState => ({
    amount: 0
});
