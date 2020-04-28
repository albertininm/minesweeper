import React from 'react';

const PlayersScore = ({
  namePlayer1,
  namePlayer2,
  scorePlayer1,
  scorePlayer2,
  singlePlayer,
  setSinglePlayer,
  setPlayerName,
  onStart,
  inProgress,
  special,
  player1Turn,
  }) => {

  inProgress = inProgress || special;

  return (
    <div className="players-container">
      <div className="players-container-wrapper">
        <div className="player">
          <input
            className={`player-name${inProgress?' inprogress' : ''}`}
            disabled={inProgress}
            type="text"
            value={namePlayer1}
            onChange={({target: {value}}) => setPlayerName('namePlayer1', value)}
          >
          </input>
          <div className={`player-score${player1Turn ? ' current-turn': ''}`}>
            {scorePlayer1}
          </div>
        </div>
        {!singlePlayer &&
          <>
            <span className="score-separator">X</span>
            <div className="player player-2">
              <div className={`player-score${!player1Turn ? ' current-turn': ''}`}>
                {scorePlayer2}
              </div>
              <input
                className={`player-name${inProgress?' inprogress' : ''}`}
                disabled={inProgress}
                type="text"
                value={namePlayer2}
                onChange={({target: {value}}) => setPlayerName('namePlayer2', value)}
              >
              </input>
            </div>
          </>
        }
        </div>
      <div className="start-game">
        <div className="single-player-wrapper">
          <input
            checked={singlePlayer}
            className={`single-player-checkbox${inProgress?' inprogress' : ''}`}
            disabled={inProgress}
            id="checkbox"
            type="checkbox"
            onChange={(value)=>setSinglePlayer(value.target.checked)}
          />
          <label
            className={`single-player-label${inProgress?' inprogress' : ''}`}
            htmlFor="checkbox"
          >
            Single player
          </label>
        </div>
        <button
          className="start-game-button"
          onClick={() => onStart(!inProgress)}
          disabled={special}
        >
          <span className="start-game-text">{inProgress? 'Stop' : 'Start!'}</span>
        </button>
      </div>
    </div>
  );
}

export default PlayersScore;