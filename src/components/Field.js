import React, { useState, useEffect } from 'react';
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

  const [matrix, setMatrix] = useState([]);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);
  const [special, setSpecial] = useState(false);

  const onCellClick = ({x, y}) => {
    if(!finished) {
      const newMatrix = [...matrix];
      if (newMatrix[x][y].isBomb) {
        markAllAsSelected(matrix);
        setFinished(true);
        setFailed(true);
      } else if (newMatrix[x][y].value){
        newMatrix[x][y].selected = true;
      } else {
        newMatrix[x][y].selected = true;
        expandBoundaries(newMatrix, x, y);
      }
      setMatrix(newMatrix);
    }
  }

  useEffect(() => {
    if(special) {
      setMatrix(specialState);
      setFinished(true);
    } else {
      setMatrix(getInitialMatrix());
    }
  }, [special]);

  const restart = () => {
    setMatrix(getInitialMatrix());
    setFailed(false);
    setFinished(false);
  }

  return (
    <div className={'field-container'}>
      <Failure
        failed={failed}
        restart={restart}
      />
      {matrix.map((row, i) => {
        return <div key={i} className="row"> {row.map((item, j) => {
          return (
              <Cell
                key={`${i}-${j}`}
                callback={onCellClick}
                x={i}
                y={j}
                selected={matrix[i][j].selected}
                isBomb={matrix[i][j].isBomb}
                value={matrix[i][j].value}
              />
          );
        })}</div>
    })}
  </div>);
}

export default Field;