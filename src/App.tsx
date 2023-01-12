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
  | { type: Actions.CHOOSE_OPERATION; payload: { operation: string } }
  | { type: Actions.CLEAR }
  | { type: Actions.DELETE_DIGIT }
  | { type: Actions.EVALUATE }

type ReducerState = {
  currentOperand: string
  previousOperand: string
  operation: string
  overwrite: boolean
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case Actions.ADD_DIGIT:
      const { digit } = action.payload

      if (state.overwrite) {
        return {
          ...state,
          currentOperand: digit,
          overwrite: false,
        }
      }

      if (digit === '0' && state.currentOperand === '0') return state
      if (digit === '.' && state.currentOperand.includes('.')) return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload.digit}`,
      }

    case Actions.CHOOSE_OPERATION:
      const { operation } = action.payload
      if (state.currentOperand == '' && state.previousOperand == '') {
        return state
      }

      if (state.currentOperand == '') {
        return {
          ...state,
          operation,
        }
      }

      if (state.previousOperand == '') {
        return {
          ...state,
          operation,
          previousOperand: state.currentOperand,
          currentOperand: '',
        }
      }

      return {
        ...state,
        operation,
        previousOperand: evaluate(state),
        currentOperand: '',
      }

    case Actions.CLEAR:
      return {
        currentOperand: '',
        previousOperand: '',
        operation: '',
        overwrite: false,
      }

    case Actions.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: '',
        }
      }

      if (state.currentOperand == '') return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: '' }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    case Actions.EVALUATE:
      if (
        state.operation == '' ||
        state.previousOperand == '' ||
        state.currentOperand == ''
      ) {
        return state
      }

      return {
        ...state,
        previousOperand: '',
        operation: '',
        currentOperand: evaluate(state),
        overwrite: true,
      }

    default:
      return state
  }
}

export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer<
    Reducer<ReducerState, ReducerAction>
  >(reducer, {
    currentOperand: '',
    previousOperand: '',
    operation: '',
    overwrite: false,
  })

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
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
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

function evaluate({
  currentOperand,
  previousOperand,
  operation,
}: ReducerState) {
  const previous = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(previous) || isNaN(current)) return ''

  let computation = ''
  switch (operation) {
    case '+':
      computation = (previous + current).toString()
      break
    case '-':
      computation = (previous - current).toString()
      break
    case '*':
      computation = (previous * current).toString()
      break
    case '÷':
      computation = (previous / current).toString()
      break
  }

  return computation
}
