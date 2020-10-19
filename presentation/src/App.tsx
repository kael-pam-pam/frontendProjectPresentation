import React from 'react';
import './App.css';
import { HeaderPanel } from './HeaderPanel/HeaderPanel';
import { MainPanel } from './MainPanel/MainPanel';
import { SlideMain } from './Slide/Slide';
import { SlidesPanel } from './SlidesPanel/SlidesPanel'
import { Program } from 'typescript';
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


function App(props: Programm) {

  const slides: Array<Slide> = props.currentPresentation.slides
  const currSlide = slides[searchChangedSlideIndex(props)]

  return (
    <div className="App">
      <div className="App-header">      
        <HeaderPanel text={'Презентация без названия'} />
      </div>
      <div className="App-body">
        <SlidesPanel {...slides}/>
        <MainPanel {...currSlide} />
      </div>
      <div className="App-footer">
      </div>
    </div>
  );
}

export default App;
