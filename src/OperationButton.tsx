import { Dispatch } from 'react'
import { Actions, ReducerAction } from './App'

type OperationButtonProps = {
  dispatch: Dispatch<ReducerAction>
  operation: string
}

export function OperationButton({ dispatch, operation }: OperationButtonProps) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}
