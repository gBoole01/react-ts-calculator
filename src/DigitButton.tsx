import { Dispatch } from 'react'
import { Actions, ReducerAction } from './App'

type DigitButtonProps = {
  dispatch: Dispatch<ReducerAction>
  digit: string
}

export function DigitButton({ dispatch, digit }: DigitButtonProps) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  )
}
