import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import {specialState} from '../utils/special-state';
import {getRandomCoordinates} from '../utils/random';
import {flattener} from '../utils/array';
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

const remainsOnlyBombs = (matrix, numberOfBombs) => {
  const flatenMatrix = flattener(matrix);
  return flatenMatrix.filter(cell => !cell.selected).length === numberOfBombs;
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
  onFinish,
  inProgress,
  updatePlayerTurn,
  player1Turn,
  setPlayerScore,
  scorePlayer1,
  scorePlayer2,
  singlePlayer,
}) => {

  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    setMatrix(special ? specialState : getInitialMatrix({rows, columns, numberOfBombs}));
  }, [rows, columns, numberOfBombs, special, inProgress]);

const updatePayerScore = (counter) => {
  if (player1Turn) {
    setPlayerScore('scorePlayer1', scorePlayer1 + counter);
  } else {
    setPlayerScore('scorePlayer2', scorePlayer2 + counter);
  }
}

  const onCellClick = ({x, y}) => {
    if(inProgress) {
      const newMatrix = [...matrix];

      let counter = 0;
      if (newMatrix[x][y].isBomb) {
        markAllAsSelected(newMatrix);
        setMatrix(newMatrix);
        onFinish(false);
        return;
      } else if (newMatrix[x][y].value){
        newMatrix[x][y].selected = true;
        counter += newMatrix[x][y].value || 1;
      } else {
        newMatrix[x][y].selected = true;
        const count = expandBoundaries(newMatrix, x, y);
        counter += count + 1;
      }

      updatePayerScore(counter);
      setMatrix(newMatrix);

      if (remainsOnlyBombs(newMatrix, numberOfBombs)) {
        onFinish(true);
        return;
      }

      updatePlayerTurn();
    }
  }

  return (
    <div className={`field-container${!inProgress ? ' inprogress' : ''}`}>
      {matrix.map((row, i) => {
        return <div key={i} className="row"> {row.map((item, j) => {
          return (
              <Cell
                classes={!inProgress?' inprogress' : ''}
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