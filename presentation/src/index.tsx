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
import { changePresentationTitle, createProgram } from './Models/functions';
import { addSlide, deleteSlide, setSelectedSlides } from './Models/slideMoveInProgramm';
import { addPictureObj, addShapeObj, addTextObj, changeElemPosition, changeShapeObj, changeTextObj, deleteSelectedElements, resizeElement, setSlideBackground } from './Models/changeSlideContent';
import { Program } from 'typescript';

const prog = require('./importFiles/testPresent2.json');

//let prog: Programm = createProgram()    //создать программу

//newProg = jsonProg



/*prog = addTextObj(prog)                 //добавить стандартный текст
prog = addSlide(prog)
prog = addShapeObj(prog, 'circle')
prog = addSlide(prog)  
prog = addShapeObj(prog, 'rect')        
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
prog = resizeElement(prog, 300, 300)
prog = addShapeObj(prog, 'triangle')
prog = resizeElement(prog, 230, 230)
prog = changeElemPosition(prog, 700, 500)
prog = addShapeObj(prog, 'rect')
prog = changeElemPosition(prog, 1000, 100)
prog = changeShapeObj(prog, 'red' ,'fillColor')
prog = setSelectedSlides(prog, [prog.currentPresentation.slides[2].id])
prog = addShapeObj(prog, 'rect')
prog = addPictureObj(prog, "home/mishan/Изображения/481997.jpg")
prog = changePresentationTitle(prog, 'DiMiPa presentation 1')

//prog = setSelectedSlides(prog, [prog.currentPresentation.slides[3].id])
*/

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
