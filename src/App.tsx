import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
    IncrementAction,
    DecrementAction,
    AsyncAddRequestAction
} from "./redux/action";
import { IState } from "./redux/type";
import { Dispatch } from "redux";
import { Typography, Button, TextField } from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";

const mapStateToProps = (state: IState) => ({
    amount: state.amount
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    increment: () => dispatch(IncrementAction({})),
    decrement: () => dispatch(DecrementAction({})),
    asyncIncrement: (amount: number) =>
        dispatch(AsyncAddRequestAction({ amount }))
});

interface Props {
    amount: number;
    increment: () => void;
    decrement: () => void;
    asyncIncrement: (amount: number) => void;
}

const Styled = {
    Root: styled.main``,
    Section: styled.section`
        display: flex;
        align-items: flex-end;
        & > * {
            margin: 4px;
        }
    `,
    AsyncButton: styled.div`
        display: flex;
        flex-direction: column;
    `
};

const _App: React.FC<Props> = (props: Props) => {
    const [asyncNumberAmount, setAsyncNumberAmount] = React.useState<number>(0);
    const handleChangeAsyncNumberAmountField = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAsyncNumberAmount(parseInt(e.target.value) || 0);
    };
    const handleSliderChangeEvent = (
        e: React.ChangeEvent<{}>,
        value: number
    ) => {
        setAsyncNumberAmount(value);
    };

    return (
        <Styled.Root>
            <Styled.Section>
                <Typography variant="headline">{props.amount}</Typography>
            </Styled.Section>
            <Styled.Section>
                <div>
                    <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => props.increment()}
                    >
                        +1
                    </Button>
                </div>
                <div>
                    <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => props.decrement()}
                    >
                        -1
                    </Button>
                </div>
                <Styled.AsyncButton>
                    <Slider
                        min={-100}
                        max={100}
                        step={1}
                        value={asyncNumberAmount}
                        onChange={handleSliderChangeEvent}
                    />
                    <TextField
                        type="number"
                        margin="normal"
                        value={asyncNumberAmount}
                        onChange={handleChangeAsyncNumberAmountField}
                    />
                    <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => props.asyncIncrement(asyncNumberAmount)}
                    >
                        async add
                    </Button>
                </Styled.AsyncButton>
            </Styled.Section>
        </Styled.Root>
    );
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(_App);
