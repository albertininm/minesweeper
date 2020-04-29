import React, { useEffect, useReducer } from 'react';
import Cell from './Cell';
import Failure from './Failure';
import {specialState} from '../utils/special-state';
import {getRandomCoordinates} from '../utils/random';
import {
  countNearBombs,
} from '../helpers/bomb';

import {expandBoundaries} from '../helpers/field';

const markAllAsSelected = (matrix) => {
  const rows = matrix.length;
  const columns = matrix[0] && matrix[0].length;

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      matrix[i][j].selected = true;
    }
  }
}

const getInitialMatrix = ({rows, columns, numberOfBombs}) => {
  let matrix = new Array(rows);

  for(let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for(let j = 0; j < columns; j++) {
      matrix[i][j] = {selected: false};
    }
  }

  let bombs = 0;
  const cells = rows * columns;
  for(let i = 0; i < numberOfBombs; i++) {
    const [x, y] = getRandomCoordinates(rows, columns);
    if(matrix[x][y].isBomb && bombs < cells) {
      i--;
    } else {
      matrix[x][y].isBomb = true;
      bombs++;
    }
  }

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      matrix[i][j].value = countNearBombs(matrix, i, j);
    }
  }

  return matrix;
}

const Field = ({
  special,
  rows,
  columns,
  numberOfBombs,
  onStart,
  inProgress,
  updatePlayerTurn,
  player1Turn,
  setPlayerScore,
  scorePlayer1,
  scorePlayer2,
  singlePlayer,
}) => {
  const reducer = (state, action) => {
    return {...state, ...action.payload};
  }

  const [state, setState] = useReducer(reducer, {
    matrix: [],
    failed: false,
  });

  useEffect(() => {
    setState({
      payload: {
        matrix: special ? specialState : getInitialMatrix({rows, columns, numberOfBombs}),
      }
    });
    onStart();
  }, [rows, columns, numberOfBombs, special]);

  const onCellClick = ({x, y}) => {
    if(inProgress) {
      const newMatrix = [...state.matrix];
      const payload = {};

      let counter = 0;
      if (newMatrix[x][y].isBomb) {
        markAllAsSelected(newMatrix);
        payload.finished = true;
        payload.failed = true;
      } else if (newMatrix[x][y].value){
        newMatrix[x][y].selected = true;
        counter += newMatrix[x][y].value || 1;
      } else {
        newMatrix[x][y].selected = true;
        const count = expandBoundaries(newMatrix, x, y);
        counter += count + 1;
      }

      if (player1Turn) {
        setPlayerScore('scorePlayer1', scorePlayer1 + counter);
      } else {
        setPlayerScore('scorePlayer2', scorePlayer2 + counter);
      }

      payload.matrix = newMatrix;
      updatePlayerTurn();
      setState({payload});
    }
  }

  return (
    <div className={'field-container'}>
      {state.matrix.map((row, i) => {
        return <div key={i} className="row"> {row.map((item, j) => {
          return (
              <Cell
                key={`${i}-${j}`}
                callback={onCellClick}
                x={i}
                y={j}
                selected={state.matrix[i][j].selected}
                isBomb={state.matrix[i][j].isBomb}
                value={state.matrix[i][j].value}
              />
          );
        })}</div>
    })}
  </div>);
}

export default Field;