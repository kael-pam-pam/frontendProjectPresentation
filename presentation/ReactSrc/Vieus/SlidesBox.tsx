import React from 'react';
import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
} from '../Models/types';

import{createProgram} from '../Models/functions'
import{
  createDefaultSlide,
  addSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  moveSlide,
  setSelectedSlides,
  deleteSlide
} from '../Models/slideMoveInProgramm'


/*let prog = createProgram()
prog = addSlide(prog)
prog = addSlide(prog)

interface SlideBoxProps {
  slides: Array<number>
}

function SlideBox(props: SlideBoxProps) {
  return (
   <slideBox></slideBox> 
  )  
}

export {SlideBox}*/