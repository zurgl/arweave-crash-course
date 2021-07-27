import { createContext, Dispatch } from 'react'

export type State = {
  host: string
  protocol: string
  port: number
  index: number
  address?: string
  wallet?: string
}

export type Action =
  | { type: 'SetWallet'; wallet: string | undefined }
  | { type: 'SetAddress'; address: string | undefined }
  | { type: 'SetIndex'; index: number }

export function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetWallet':
      return { ...state, wallet: action.wallet }
    case 'SetAddress':
          return { ...state, address: action.address }
    case 'SetIndex':
      return { ...state, index: action.index }
    default:
      return state
  }
}

export const initialState = {
  host: 'localhost',
  port: 80,
  index: 0,
  protocol: 'http',
}

export const ArweaveContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})
