import React, { useState } from 'react';

const Field = () => {
  let size = 20;
  let matrix = new Array(size);

  for(let i = 0; i < size; i++) {
    matrix[i] = [];
    for(let j = 0; j < size; j++) {
      matrix[i][j] = <div key={`${i}-${j}`} className="cell"></div>
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