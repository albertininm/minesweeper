import React from 'react';

const PlayersScore = ({
  namePlayer1,
  namePlayer2,
  singlePlayer,
  setSinglePlayer,
  setPlayerName,
  onStart,
  inProgress
  }) => {

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
          <div className="player-score">
            1
          </div>
        </div>
        {!singlePlayer &&
          <>
            <span className="score-separator">X</span>
            <div className="player">
              <div className="player-score">
                0
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
        >
          <span className="start-game-text">{inProgress? 'Restart' : 'Start!'}</span>
        </button>
      </div>
    </div>
  );
}

export default PlayersScore;