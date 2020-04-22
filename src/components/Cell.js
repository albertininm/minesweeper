import React, { useState } from 'react';

const Cell = ({xIndex, yIndex, selected, callback}) => {
  // const [selected, setSelected] = useState(initialSelected);

  const updateState = () => {
    callback({xIndex, yIndex, selected: !selected});
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