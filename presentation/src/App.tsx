import React from 'react';
import './App.css';
import { HeaderPanel } from './View/HeaderPanel/HeaderPanel';
import { SlidesPanel } from './View/SlidesPanel/SlidesPanel';
import { MainPanel } from './View/MainPanel/MainPanel';
import { Popup } from './View/Popup/Popup';
import { PopupProvider } from './View/Popup/PopupContext';
import { useDeleteSelectedElems, useDeleteSelectedSlides, useMouseDownDocumentListner } from './CustomHooks/CommonMouseKeyboardEvents';
import { connect } from 'react-redux';
import { getState, store } from '.';
import { saveStateToArchive } from './Models/CommonFunctions/archive';



function App() {

  useDeleteSelectedElems()
  useDeleteSelectedSlides()
  useMouseDownDocumentListner()
  
  saveStateToArchive()
  

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


/*const mapDispatchToProps = (dispatch:  Dispatch<TestActionType>) => {
  return {
    addSlide: () => store.dispatch(addSlide())
  }
}

props: {addSlide: PropsWithChildren<any>}*/

export {App}

function mapStateToProps(state = getState()) {
  return { state: state } 
}

export default connect(mapStateToProps)(App)