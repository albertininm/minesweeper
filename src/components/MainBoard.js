import React, { useReducer } from 'react';
import Field from './Field';
import FieldConfig from './FieldConfig';
import PlayersScore from './PlayersScore';

const MainLayout = () => {
  const reducer = (state, action) => {
    return {...state, ...action.payload};
  }
  const [state, setState] = useReducer(reducer, {
    columns: 3,
    finished: false,
    inProgress: false,
    namePlayer1: 'albert',
    namePlayer2: '',
    numberOfBombs: 1,
    player1Turn: true,
    rows: 3,
    scorePlayer1: 0,
    scorePlayer2: 0,
    singlePlayer: true,
    special: false,
    winner: '',
  });

  const onFinish = (success) => {
    let winner = '';

    if (success) {
      if (state.player1Turn) {
        winner = state.namePlayer1;
      } else {
        winner = state.namePlayer2;
      }
    } else {
      if (state.player1Turn) {
        winner = state.namePlayer2;
      } else {
        winner = state.namePlayer1;
      }
    }

    setState({payload: {
      winner,
      finished: true,
    }})
  }

  const setSinglePlayer = (singlePlayer) => {
    setState({payload: {singlePlayer}})
  }

  const setPlayerName = (key, name) => {
    const data = {[key]: name};
    setState({payload: {...data}});
  }

  const setPlayerScore = (key, score) => {
    const data = {[key]: score};
    setState({payload: {...data}});
  }

  const setFieldConfig = (key, value) => {
    const data = {[key]: value};
    setState({payload: {...data}});
  }

  const updatePlayerTurn = () => {
    if (!state.singlePlayer) {
      setState({
        payload: {
          player1Turn: !state.player1Turn,
        }
      });
    }
  }

  const onStart = (inProgress) => {
    let payload = {
      finished: false,
      inProgress: inProgress,
      player1Turn: true,
      scorePlayer1: 0,
      scorePlayer2: 0,
      winner: '',
    }

    setState({payload});
  }

  return (
    <div className="container">
      <PlayersScore
        inProgress={state.inProgress}
        namePlayer1={state.namePlayer1}
        namePlayer2={state.namePlayer2}
        onStart={onStart}
        player1Turn={state.player1Turn}
        scorePlayer1={state.scorePlayer1}
        scorePlayer2={state.scorePlayer2}
        singlePlayer={state.singlePlayer}
        setSinglePlayer={setSinglePlayer}
        setPlayerName={setPlayerName}
        special={state.special}
      />
      <div className="field-wrapper">
        <Field
          columns={state.columns}
          finished={state.finished}
          inProgress={state.inProgress}
          numberOfBombs={state.numberOfBombs}
          onStart={onStart}
          onFinish={onFinish}
          player1Turn={state.player1Turn}
          rows={state.rows}
          scorePlayer1={state.scorePlayer1}
          scorePlayer2={state.scorePlayer2}
          setPlayerScore={setPlayerScore}
          singlePlayer={state.singlePlayer}
          special={state.special}
          updatePlayerTurn={updatePlayerTurn}
        />
      </div>
      <FieldConfig
        columns={state.columns}
        numberOfBombs={state.numberOfBombs}
        rows={state.rows}
        onConfigChange={setFieldConfig}
      />
    </div>
  )
}

export default MainLayout;