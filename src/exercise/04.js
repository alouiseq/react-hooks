// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React, { useState } from 'react'
import { useLocalStorageState } from '../utils'

function Board({ onClick, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentSquares, setCurrentSquares] = useLocalStorageState('currentSquares', Array(9).fill(null))
  const [history, setHistory] = useLocalStorageState('history', [])
  const [currentIndex, setCurrentIndex] = useState(-1)

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
//  const current = history.length ? history.length - 1 : null

  function restart() {
    const newSquares = Array(9).fill(null)
    setCurrentSquares(newSquares)
    setHistory([])
  }

  function selectSquare(square) {
    if (winner || currentSquares[square]) return;

    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setCurrentSquares(squaresCopy)
    const historyCopy = currentIndex >= 0 ? history.slice(0, currentIndex + 1) : [...history]
//    const historyCopy = [...history]
    const mergedHistory = [...historyCopy, squaresCopy]
    setHistory(mergedHistory)
    setCurrentIndex(mergedHistory.length - 1)
  }

  const updateHistory = (squares, index) => {
    console.log('INDEX is ', index)
    console.log('CURRENT INDEX is ', currentIndex)
    setCurrentSquares(squares)
    setCurrentIndex(index)
  }

  const getMoves = () => {
    return (
      history.map((squares, index) => {
        return (
          <li key={`square-${index}`}>
            <button
              onClick={() => updateHistory(squares, index)}
              disabled={index === currentIndex}
            >
              {`Go to move #${index + 1}`} {index === currentIndex && '(current)'}
            </button>
          </li>
        )
      })
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          <li>
            <button
              onClick={restart}
              disabled={currentIndex === -1}
            >
              Go to game start {currentIndex === -1 && '(current)'}
            </button>
          </li>
          {getMoves()}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
