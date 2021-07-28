import { Row } from 'antd';
import { useEffect, useReducer } from "react";

import { Connect, Wallet, Fund, Balance, Transfer, Submit, Deploy } from 'components/Steps';
import { useAppState, useLocalStorage } from 'hooks'
import { initialState, appStateReducer, AppContext } from 'context'
import { Sidebar, Step } from 'components/Layout'
import Nav from 'components/Nav';

import type { AppI } from 'types';

const ArweaveApp: React.FC<AppI> = ({ chain }) => {
    const { state, dispatch } = useAppState();
    const { steps } = chain
    const step = steps[state.index];
    const nextHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index + 1
        })
    }
    const prevHandler = () => {
        dispatch({
            type: 'SetIndex',
            index: state.index - 1
        })
    }
    const isFirstStep = state.index == 0;
    const isLastStep = state.index === steps.length - 1;

    return (
        <Row>
        <Sidebar
            steps={steps}
            stepIndex={state.index}
        />
        <Step
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            prev={prevHandler}
            next={nextHandler}
            body={
            <>
                { step.id === "connect"   && <Connect  /> }
                { step.id === "wallet"    && <Wallet   /> }
                { step.id === "fund"      && <Fund     /> }
                { step.id === "balance"   && <Balance  /> }
                { step.id === "transfert" && <Transfer /> }
                { step.id === "submit"    && <Submit   /> }
                { step.id === "deploy"    && <Deploy   /> }
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Arweave: React.FC<AppI> = ({ chain }) => {
    const [storageState, setStorageState] = useLocalStorage(
        'arweave',
        initialState
    )
    const [state, dispatch] = useReducer(appStateReducer, storageState)
    useEffect(() => {
        setStorageState(state)
    }, [state, setStorageState])
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <ArweaveApp chain={chain} />
        </AppContext.Provider>
    )
}

export default Arweave
