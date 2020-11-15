import React from 'react';
import './App.css';
import { HeaderPanel } from './HeaderPanel/HeaderPanel';
import { SlidesPanel } from './SlidesPanel/SlidesPanel';
import { MainPanel } from './MainPanel/MainPanel';
import { Popup } from './Popup/Popup';
import { PopupProvider } from './Popup/PopupContext';

function App() {
  return (
    <PopupProvider>
    <div className="App">
      <div className="App-header">      
        <HeaderPanel />
      </div>
      <div className="App-body">
        <SlidesPanel />
        <MainPanel />
      </div>
      <div className="additional">
        <Popup />
      </div>
      <div className="App-footer">
      </div>
    </div>
    </PopupProvider>
  );
}

export default App;
