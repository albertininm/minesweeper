import React, { useState } from 'react';

const Cell = () => {
  const [selected, setSelected] = useState(false);

  const updateState = () => {
    console.log('crancky!')
    setSelected(!selected);
  }

  return (
    <div
      className={`cell${selected ? ' selected' : ''}`}
      onClick={updateState}
    >
    </div>
  );
}

export default Cell;