import React, { useEffect } from 'react';
import {store} from './index'
import './App.css';
import  HeaderPanel  from './View/HeaderPanel/HeaderPanel';
import  SlidesPanel  from './View/SlidesPanel/SlidesPanel';
import  MainPanel from './View/MainPanel/MainPanel';
import { Popup } from './View/Popup/Popup';
import { PopupProvider } from './View/Popup/PopupContext';
import { useDeleteSelectedElems, useDeleteSelectedSlides, useMouseDownDocumentListner } from './CustomHooks/CommonMouseKeyboardEvents';
import { connect } from 'react-redux';
import { saveStateToArchive } from './Models/CommonFunctions/archive';
import { Dispatch } from 'redux';
import { Programm } from './Models/CommonFunctions/types';
import { setSelectedElement, deleteSelectedElements, setCanDeleteSlide, deleteSlide, setSelectedSlides   } from './Models/ActionCreators/actionCreators';
import  Archive  from './View/ArchiveElem';


interface AppProps {
  canDeleteSlides: boolean,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  deleteSelectedElements: () => void,
  deleteSlide: () => void  
}


function App(props: AppProps) {

  useDeleteSelectedElems(props.selectedElements, props.deleteSelectedElements)
  useDeleteSelectedSlides(props.canDeleteSlides, props.deleteSlide)
  useMouseDownDocumentListner({
    canDeleteSlides: props.canDeleteSlides,
    selectedSlides: props.selectedSlides,
    selectedElements: props.selectedElements,
    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedSlides: props.setSelectedSlides,
    setSelectedElement: props.setSelectedElement
  })
  
  // popup layer


  return (
    <PopupProvider>
    <Archive />
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
  )
}


const mapDispatchToProps = {
    setSelectedSlides,
    setCanDeleteSlide,
    setSelectedElement,
    deleteSelectedElements,
    deleteSlide
}



const mapStateToProps = (state: Programm) => ({ 
  selectedElements: state.mainProg.selectedElements,
  selectedSlides: state.mainProg.selectedSlides,
  canDeleteSlides: state.commonDeps.canDeleteSlides 
}) 


export default connect(mapStateToProps,  mapDispatchToProps)(App)