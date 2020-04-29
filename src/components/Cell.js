import React from 'react';
const bomb = require('../static/bomb.png');

const Cell = ({callback, classes, x, y, selected, value, isBomb}) => {
  const updateState = () => {
    callback({x, y, selected: !selected});
  }

  let contetToShow = '';
  if (selected) {
    if(isBomb) {
      contetToShow = <img className="bomb-icon" src={bomb} alt=""/>;
    } else {
      contetToShow = <span className={`bombs-${value}`}>{value !== 0 ? value : ''}</span>;
    }
  }

  return (
    <div
      className={`cell${selected ? ' selected' : ''}${classes ? classes : ''}`}
      onClick={updateState}
    >
      {contetToShow}
    </div>
  );
}

export default Cell;