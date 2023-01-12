import { Dispatch } from 'react'
import { Actions, ReducerAction } from './App'

type OperationButtonProps = {
  dispatch: Dispatch<ReducerAction>
  symbol: string
}

export function OperationButton({ dispatch, symbol }: OperationButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.CHOOSE_OPERATION, payload: { symbol } })
      }
    >
      {symbol}
    </button>
  )
}
