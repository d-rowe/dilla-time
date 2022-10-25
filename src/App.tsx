import './App.css';
import React from 'react';
import BeatGrid from './components/BeatGrid';
import Playbar from './components/Playbar';

function App() {
  return (
    <div className="App">
      <BeatGrid />
      <Playbar />
    </div>
  );
}

export default App;
