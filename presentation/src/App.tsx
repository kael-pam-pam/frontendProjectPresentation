import React from 'react';
import './App.css';
import  HeaderPanel  from './View/HeaderPanel/HeaderPanel';
import  SlidesPanel  from './View/SlidesPanel/SlidesPanel';
import  MainPanel from './View/MainPanel/MainPanel';
import { Popup } from './View/Popup/Popup';
import { PopupProvider } from './View/Popup/PopupContext';
import { useDeleteSelectedElems, useDeleteSelectedSlides, useMouseDownDocumentListner } from './CustomHooks/CommonMouseKeyboardEvents';
import { connect } from 'react-redux';
import { getState, store } from '.';
import { saveStateToArchive } from './Models/CommonFunctions/archive';
import { Dispatch } from 'redux';
import { deleteSelectedElements, setCanDeleteSlide, setSelectedElement } from './Models/ActionCreators/slideElemActionCreators';
import { deleteSlide, setSelectedSlides } from './Models/ActionCreators/slidesActionCreators';
import { Programm } from './Models/CommonFunctions/types';


interface AppProps {
  state: Programm,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  deleteSelectedElements: () => void,
  deleteSlide: () => void  
}


function App(props: AppProps) {

  useDeleteSelectedElems(props.state.mainProg, props.deleteSelectedElements)
  useDeleteSelectedSlides(props.state.commonDeps, props.deleteSlide)
  useMouseDownDocumentListner({
    state: props.state,
    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedSlides: props.setSelectedSlides,
    setSelectedElement: props.setSelectedElement
  })
  
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


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSelectedSlides: (slidesArr: Array<string>) => dispatch(setSelectedSlides(slidesArr)),
    setCanDeleteSlide: (canDelete: boolean) => dispatch(setCanDeleteSlide(canDelete)),
    setSelectedElement: (elemsArr: Array<string>) => dispatch(setSelectedElement(elemsArr)),
    deleteSelectedElements: () => dispatch(deleteSelectedElements()),
    deleteSlide: () => dispatch(deleteSlide())
  }
}


function mapStateToProps(state = getState()) {
  return { state: state } 
}

export default connect(mapStateToProps,  mapDispatchToProps)(App)