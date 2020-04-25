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
    columns: 1,
    rows: 1,
    numberOfBombs: 0,
    special: false,
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
    console.log('DATA', data)
    console.log(state)
    setState({payload: {...data}});
  }

  const onStart = (inProgress) => {
    setState({payload: {inProgress}});
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
        onStart={onStart}
      />
      <FieldConfig
        onConfigChange={setFieldConfig}
        rows={state.rows}
        columns={state.columns}
        numberOfBombs={state.numberOfBombs}
      />
      <Field
        singlePlayer={state.singlePlayer}
        special={state.special}
        rows={state.rows}
        columns={state.columns}
        numberOfBombs={state.numberOfBombs}
      />
      <div className="player-section">
      </div>
    </div>
  )
}

export default MainLayout;