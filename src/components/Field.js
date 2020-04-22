import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import {specialState} from '../utils/special-state';
import {getRandomCoordinates} from '../utils/random';
const rows = 22;
const columns = 32;
const numberOfBombs = Math.floor((rows*columns)/3);

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
  const [special, setSpecial] = useState(false);

  const onCellClick = ({xIndex, yIndex, selected}) => {
    const newMatrix = [...matrix];
    newMatrix[xIndex][yIndex].selected = selected;
    setMatrix(newMatrix);
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