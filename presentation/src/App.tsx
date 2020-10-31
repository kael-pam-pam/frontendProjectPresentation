import React, { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import { HeaderPanel } from './HeaderPanel/HeaderPanel';
import { MainPanel } from './MainPanel/MainPanel';
import { SlideMain } from './Slide/Slide';
import { SlidesPanel } from './SlidesPanel/SlidesPanel'
import { Program } from 'typescript';
//import { ShapesMenu } from './Tools/Tools';
import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  SlideElements,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj
} from './Models/types'
import { 
  searchChangedSlideIndex
} from './Models/commonFunctionsConst';
import { dispatch, actualProgState} from './Models/dispatcher'
import { render } from './index';


function App() {

  
  const appRef = React.useRef()

  
  return (
    <div ref={appRef.current} className="App">
      <div className="App-header">      
        <HeaderPanel/>
      </div>
      <div className="App-body">
        <SlidesPanel/>
        <MainPanel/>
      </div>
      <div className="App-footer">
      </div>
    </div>
  )
}

export default App;
