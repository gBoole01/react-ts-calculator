import { Reducer, useReducer } from 'react'
import { DigitButton } from './DigitButton'
import { OperationButton } from './OperationButton'

export enum Actions {
  ADD_DIGIT = 'add-digit',
  CHOOSE_OPERATION = 'choose-operation',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  EVALUATE = 'evaluate',
}

export type ReducerAction =
  | { type: Actions.ADD_DIGIT; payload: { digit: string } }
  | { type: Actions.CHOOSE_OPERATION; payload: { symbol: string } }
  | { type: Actions.CLEAR }
  | { type: Actions.DELETE_DIGIT }
  | { type: Actions.EVALUATE }

type ReducerState = {
  currentOperand: string
  previousOperand: string
  operation: string
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case Actions.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload.digit}`,
      }
    case Actions.CHOOSE_OPERATION:
      console.log(action)
      return state
    case Actions.CLEAR:
      console.log(action)
      return state
    case Actions.DELETE_DIGIT:
      console.log(action)
      return state
    case Actions.EVALUATE:
      console.log(action)
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: Actions.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} symbol="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} symbol="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} symbol="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} symbol="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}

export default App
