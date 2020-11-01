import React from 'react';
import './App.css';
import { HeaderPanel } from './HeaderPanel/HeaderPanel';
import { SlidesPanel } from './SlidesPanel/SlidesPanel';
import { MainPanel } from './MainPanel/MainPanel';

function App() {
  return (
    <div className="App">
      <div className="App-header">      
        <HeaderPanel />
      </div>
      <div className="App-body">
        <SlidesPanel />
        <MainPanel />
      </div>
      <div className="App-footer">
      </div>
    </div>
  );
}

export default App;
