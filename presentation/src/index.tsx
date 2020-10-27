import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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
  ShapeObj,
  Actions
} from './Models/types'
import { changePresentationTitle, createProgram } from './Models/functions';
import { addSlide, deleteSlide, setSelectedSlides } from './Models/slideMoveInProgramm';
import { addPictureObj, addShapeObj, addTextObj, changeElemPosition, changeShapeObj, changeTextObj, deleteSelectedElements, resizeElement, setSlideBackground } from './Models/changeSlideContent';
import { Program } from 'typescript';
import { dispatch, actualProgState, loadProgramm } from './Models/dispatcher';

const prog: Programm = require('./importFiles/testPresent2.json');

//dispatch(createProgram, ({}))

dispatch(loadProgramm, (prog))

export function render(){
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
