import React from 'react';

const Cell = ({callback, xIndex, yIndex, selected, value}) => {
  // const [selected, setSelected] = useState(initialSelected);

  const updateState = () => {
    callback({xIndex, yIndex, selected: !selected});
  }

  return (
    <div
      className={`cell${selected ? ' selected' : ''}`}
      onClick={updateState}
    >
      {value}
    </div>
  );
}

export default Cell;