import React from 'react';
import MainLayout from './layouts/MainLayout';
import './styles/main.scss';

function App() {
  return (
    <>
      <header className="app-title">
        <h2>Special Minesweeper</h2>
      </header>
      <MainLayout></MainLayout>
    </>
  );
}

export default App;
