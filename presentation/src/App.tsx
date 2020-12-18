import React, { useEffect } from 'react';
import './App.css';
import { HeaderPanel } from './View/HeaderPanel/HeaderPanel';
import { SlidesPanel } from './View/SlidesPanel/SlidesPanel';
import { MainPanel } from './View/MainPanel/MainPanel';
import { Popup } from './View/Popup/Popup';
import { PopupProvider } from './View/Popup/PopupContext';
import { deleteSelectedElements } from './Models/changeSlideContent';
import { actualProgState, dispatch } from './Models/dispatcher';
import { useDeleteSelectedElems, useDeleteSelectedSlides, useMouseDownDocumentListner } from './CustomHooks/CommonMouseKeyboardEvents';
import { deleteSlide } from './Models/slideMoveInProgramm';

function App() {

  useDeleteSelectedElems()
  useDeleteSelectedSlides()
  useMouseDownDocumentListner()

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
