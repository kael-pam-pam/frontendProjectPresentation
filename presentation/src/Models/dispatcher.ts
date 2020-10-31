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
  ChangedParams
} from './types';

import {
  setSlideBackground,
  createPictureObj,
  addPictureObj,
  createEmtyTextObj,
  addTextObj,
  changeTextObj,
  createShapeObj,
  addShapeObj,
  changeShapeObj,
  resizeElement,
  changeElemPosition,
  setSelectedElement,
  deleteSelectedElements
} from './changeSlideContent'

import { render } from '../index'
import { isShapeObj, isTextObj, searchChangedSlideIndex, isSlide, isProgramm, isSlideId, isPoint } from './commonFunctionsConst';
import { createProgram } from './functions';
import { addSlide, setSelectedSlides } from './slideMoveInProgramm';

export let actualProgState: Programm

export function dispatch<T>(func: { (prog: Programm, obj: T): Programm }, obj: T): void { 
  if (isProgramm(obj)) {
    actualProgState  = obj
  } else {
    actualProgState =  func(actualProgState, obj);
  }  
  render()
}

export function dispatchTwoParams<T>(func: { (prog: Programm, firstObj: T, secondObj: T): Programm }, firstObj: T, secondObj: T): void { 
  actualProgState =  func(actualProgState, firstObj, secondObj);
  render()
}


export function loadProgramm(newProg: Programm): Programm {
  return newProg
}











