import React from 'react';

const PlayersScore = ({singlePlayer=true, onClick}) => {
  return (
    <div class="players-container">
      <div class="players-container-wrapper">
        <div class="player">
          <input class="player-name" type="text"></input>
          <div class="player-score">
            12312
          </div>
        </div>
        {!singlePlayer &&
          <>
            <span class="score-separator">X</span>
            <div class="player">
              <div class="player-score">
                123
              </div>
              <input class="player-name" type="text"></input>
            </div>
          </>
        }
        </div>
      <div class="start-game">
        <button class="start-game-button" onClick={onClick}><span class="start-game-text">Start!</span></button>
        <div class="single-player-wrapper">
          <input class="single-player-checkbox" type="checkbox" id="checkbox"/>
          <label class="single-player-label" for="checkbox">Single player</label>
        </div>
      </div>
    </div>
  );
}

export default PlayersScore;