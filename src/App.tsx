import { Reducer, useReducer } from 'react'
import { DigitButton } from './DigitButton'

export enum Actions {
  ADD_DIGIT = 'add-digit',
  CHOOSE_OPERATION = 'choose-operation',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  EVALUATE = 'evaluate',
}

export type ReducerAction = {
  type: Actions
  payload: { digit: string }
}

type ReducerState = {
  currentOperand: string
  previousOperand: string
  operation: string
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  const { type, payload } = action

  switch (type) {
    case Actions.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    case Actions.CHOOSE_OPERATION:
      return state
    case Actions.CLEAR:
      return state
    case Actions.DELETE_DIGIT:
      return state
    case Actions.EVALUATE:
      return state
    default:
      return state
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer<
    Reducer<ReducerState, ReducerAction>
  >(reducer, {} as ReducerState)

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <button>*</button>
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <button>+</button>
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <button>-</button>
      <button>.</button>
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="span-two">=</button>
    </div>
  )
}

export default App
