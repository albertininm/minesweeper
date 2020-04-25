import React from 'react';
import Field from './Field';
import PlayersScore from './PlayersScore';

const MainLayout = () => {
  return (
    <div className="container">
      <PlayersScore />
      <Field />
      <div className="player-section">
      </div>
    </div>
  )
}

export default MainLayout;