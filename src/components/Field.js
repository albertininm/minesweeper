import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import {specialState} from '../utils/special-state';

const getInitialMatrix = () => {
  const rows = 22;
  const columns = 32;
  let matrix = new Array(rows);

  for(let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for(let j = 0; j < columns; j++) {
      matrix[i][j] = false;
    }
  }

  return matrix;
}

const Field = () => {

  const [matrix, setMatrix] = useState([]);
  const [special, setSpecial] = useState(false);

  const onCellClick = ({xIndex, yIndex, selected}) => {
    const newMatrix = [...matrix];
    newMatrix[xIndex][yIndex] = selected;
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
              selected={matrix[i][j]}
            />
          );
        })}</div>
    })}
  </div>);
}

export default Field;