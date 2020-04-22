import React, { useState } from 'react';
import Cell from './Cell';

const Field = () => {
  let size = 20;
  let matrix = new Array(size);

  for(let i = 0; i < size; i++) {
    matrix[i] = [];
    for(let j = 0; j < size; j++) {
      matrix[i][j] = <Cell key={`${i}-${j}`} />
    }
  }

  const [hide, setHide] = useState(false);

  return (
    <div className={`${hide? ' hidden': 'field-container'}`}>
      {matrix.map((row, index) => {
        return <div key={index} className="row"> {row.map(item => item)}</div>
    })}
  </div>);
}

export default Field;