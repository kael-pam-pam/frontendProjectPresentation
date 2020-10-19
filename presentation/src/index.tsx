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
  ShapeObj
} from './Models/types'
import { createProgram } from './Models/functions';
import { addSlide, deleteSlide, setSelectedSlides } from './Models/slideMoveInProgramm';
import { addShapeObj, addTextObj, changeElemPosition, changeShapeObj, changeTextObj, deleteSelectedElements, resizeElement, setSlideBackground } from './Models/changeSlideContent';

let prog: Programm = createProgram()    //создать программу
prog = addTextObj(prog)                 //добавить стандартный текст  
prog = addShapeObj(prog, 'rect')        //добавить фигуру(пока только квадрат)
prog = changeElemPosition(prog, 1000, 100) //поменять позицию
prog = setSlideBackground(              //поменять бэкграунд слайда
  prog,
  {
    hexColor:'#FFC0CB',
    type: 'color' 
  }
)

prog = addSlide(prog)                   //добавили новый слайд, на главном экране новый слайд, первый остался в маленьком окне

prog = setSlideBackground(              //поменять бэкграунд слайда
  prog,
  {
    hexColor:'blue',
    type: 'color' 
  }
)

prog = setSelectedSlides(prog, [prog.currentPresentation.slides[0].id]) // переключились на первый слайд

prog = addSlide(prog)

prog = addTextObj(prog)

prog = changeTextObj(prog,'Hello DiMiPa!', 'text')

prog = addShapeObj(prog, 'circle')

prog = changeShapeObj(prog, 'yellow', 'fillColor')

prog = resizeElement(prog, 200, 300)

prog = changeElemPosition(prog, 100, -300)

/*prog = setSelectedSlides(prog, [prog.currentPresentation.slides[1].id])

prog = deleteSlide(prog)*/   //удалить 2 слайд

//prog = deleteSelectedElements(prog)

ReactDOM.render(
  <React.StrictMode>
    <App {...prog}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
