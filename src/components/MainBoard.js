import React, { useReducer } from 'react';
import Field from './Field';
import FieldConfig from './FieldConfig';
import PlayersScore from './PlayersScore';

const MainLayout = () => {
  const reducer = (state, action) => {
    return {...state, ...action.payload};
  }
  const [state, setState] = useReducer(reducer, {
    singlePlayer: false,
    namePlayer1: "",
    namePlayer2: "",
    scorePlayer1: 0,
    scorePlayer2: 0,
    inProgress: false,
    columns: 15,
    rows: 10,
    numberOfBombs: 25,
    special: false,
    player1Turn: true,
  });

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
    let payload = {inProgress};

    //restart
    if(!inProgress) {
      payload = {
        scorePlayer1: 0,
        scorePlayer2: 0,
        inProgress: false,
      }
    }

    setState({payload});
  }

  return (
    <div className="container">
      <PlayersScore
        inProgress={state.inProgress}
        singlePlayer={state.singlePlayer}
        setSinglePlayer={setSinglePlayer}
        setPlayerName={setPlayerName}
        setPlayerScore={setPlayerScore}
        namePlayer1={state.namePlayer1}
        namePlayer2={state.namePlayer2}
        scorePlayer1={state.scorePlayer1}
        scorePlayer2={state.scorePlayer2}
        special={state.special}
        onStart={onStart}
        player1Turn={state.player1Turn}
      />
      <div className="field-wrapper">
        <Field
          singlePlayer={state.singlePlayer}
          special={state.special}
          rows={state.rows}
          columns={state.columns}
          numberOfBombs={state.numberOfBombs}
          onStart={onStart}
          inProgress={state.inProgress}
          updatePlayerTurn={updatePlayerTurn}
        />
      </div>
      <FieldConfig
        onConfigChange={setFieldConfig}
        rows={state.rows}
        columns={state.columns}
        numberOfBombs={state.numberOfBombs}
      />
    </div>
  )
}

export default MainLayout;