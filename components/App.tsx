import { useEffect, useReducer } from "react";
import { Row } from 'antd';

import { Connect, Keys, Fund, Balance, Transfer } from 'components/Steps';
import { appStateReducer, initialState, ArweaveContext } from 'context'
import { useAppState, useLocalStorage } from 'hooks'
import { Sidebar, Step } from 'components/Layout'
import { Nav } from 'components';

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
                { step.id === "connect"   && <Connect  />  }
                { step.id === "wallet"    && <Keys     />  }
                { step.id === "fund"      && <Fund     />  }
                { step.id === "balance"   && <Balance  />  }
                { step.id === "transfert" && <Transfer />  }
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
        <ArweaveContext.Provider value={{ state, dispatch }}>
            <ArweaveApp chain={chain} />
        </ArweaveContext.Provider>
    )
}

export default Arweave
