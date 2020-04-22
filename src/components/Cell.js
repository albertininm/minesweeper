import React from 'react';
const bomb = require('../static/bomb.png');

const Cell = ({callback, xIndex, yIndex, selected, value, isBomb}) => {
  // const [selected, setSelected] = useState(initialSelected);

  const updateState = () => {
    callback({xIndex, yIndex, selected: !selected});
  }
  
  let contetToShow = '';
  if (selected) {
    if(isBomb) {
      contetToShow = <img className="bomb-icon" src={bomb} />;
    } else {
      contetToShow = value;
    }
  }

  return (
    <div
      className={`cell${selected ? ' selected' : ''}`}
      onClick={updateState}
    >
      {contetToShow}
    </div>
  );
}

export default Cell;