import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import {specialState} from '../utils/special-state';
import {getRandomCoordinates} from '../utils/random';
import {
  isBombLeft,
  isBombBottom,
  isBombRight,
  isBombTop,
  isBombBottomLeft,
  isBombBottomRight,
  isBombTopLeft,
  isBombTopRight,
} from '../helpers/bomb';

import {expandBoundaries} from '../helpers/field';

const rows = 22;
const columns = 32;
const numberOfBombs = Math.floor((rows*columns)/10);

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

  return matrix;
}

const Field = () => {

  const [matrix, setMatrix] = useState([]);
  const [finished, setFinished] = useState(false);
  const [special, setSpecial] = useState(false);

  const onCellClick = ({xIndex, yIndex, selected}) => {
    if(!finished) {
      const newMatrix = [...matrix];

      if (newMatrix[xIndex][yIndex].isBomb) {
        markAllAsSelected(matrix);
        setFinished(true);
      } else {
        newMatrix[xIndex][yIndex].selected = selected;
        expandBoundaries(newMatrix, xIndex, yIndex);
      }
      setMatrix(newMatrix);

      console.log(newMatrix[xIndex][yIndex].isBomb, 'cell is bomb!!!')
      console.log(isBombBottom(newMatrix, xIndex, yIndex), 'bottom is bomb');
      console.log(isBombTop(newMatrix, xIndex, yIndex), 'top is bomb');
      console.log(isBombRight(newMatrix, xIndex, yIndex), 'right is bomb');
      console.log(isBombLeft(newMatrix, xIndex, yIndex), 'left is bomb');
      console.log(isBombTopLeft(newMatrix, xIndex, yIndex), 'top left is bomb');
      console.log(isBombTopRight(newMatrix, xIndex, yIndex), 'top right bomb');
      console.log(isBombBottomLeft(newMatrix, xIndex, yIndex), 'bottom left is bomb');
      console.log(isBombBottomRight(newMatrix, xIndex, yIndex), 'bottom right is bomb');
    }
  }

  useEffect(() => {
    if(special) {
      setMatrix(specialState);
    } else {
      setMatrix(getInitialMatrix());
    }
  }, [special]);

  return (
    <div className={'field-container'}>
      {matrix.map((row, i) => {
        return <div key={i} className="row"> {row.map((item, j) => {
          return (
            <Cell
              key={`${i}-${j}`}
              callback={onCellClick}
              xIndex={i}
              yIndex={j}
              selected={matrix[i][j].selected}
              isBomb={matrix[i][j].isBomb}
            />
          );
        })}</div>
    })}
  </div>);
}

export default Field;