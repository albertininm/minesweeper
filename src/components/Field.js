import React, { useState, useEffect, useReducer } from 'react';
import Cell from './Cell';
import Failure from './Failure';
import {specialState} from '../utils/special-state';
import {getRandomCoordinates} from '../utils/random';
import {
  countNearBombs,
} from '../helpers/bomb';

import {expandBoundaries} from '../helpers/field';

const rows = 22;
const columns = 32;
const numberOfBombs = Math.floor((rows*columns)/7);

const markAllAsSelected = (matrix) => {
  const rows = matrix.length;
  const columns = matrix[0] && matrix[0].length;

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      matrix[i][j].selected = true;
    }
  }
}

const getInitialMatrix = () => {
  let matrix = new Array(rows);

  for(let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for(let j = 0; j < columns; j++) {
      matrix[i][j] = {selected: false};
    }
  }

  for(let i = 0; i < numberOfBombs; i++) {
    const [x, y] = getRandomCoordinates(rows, columns);
    matrix[x][y].isBomb = true;
  }

  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      matrix[i][j].value = countNearBombs(matrix, i, j);
    }
  }

  return matrix;
}

const Field = () => {

  const reducer = (state, action) => {
    return {...state, ...action.payload};
  }

  const [state, setState] = useReducer(reducer, {
    matrix: [],
    finished: false,
    failed: false,
    special: false,
  });

  const onCellClick = ({x, y}) => {
    if(!state.finished) {
      const newMatrix = [...state.matrix];
      const payload = {};
      if (newMatrix[x][y].isBomb) {
        markAllAsSelected(newMatrix);
        payload.finished = true;
        payload.failed = true;
      } else if (newMatrix[x][y].value){
        newMatrix[x][y].selected = true;
      } else {
        newMatrix[x][y].selected = true;
        expandBoundaries(newMatrix, x, y);
      }
      payload.matrix = newMatrix;
      setState({payload});
    }
  }

  useEffect(() => {
    if(state.special) {
      setState({
        payload: {
          matrix: specialState,
          finished: true,
        }
      });
    } else {
      setState({
        payload: {
          matrix: getInitialMatrix(),
        }
      });
    }
  }, [state.special]);

  const restart = () => {
    setState({
      payload: {
        matrix: getInitialMatrix(),
        failed: false,
        finished: false,
      }
    });
  }

  return (
    <div className={'field-container'}>
      <Failure
        failed={state.failed}
        restart={restart}
      />
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