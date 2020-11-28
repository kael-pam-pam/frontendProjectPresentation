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
import { isShapeObj, isTextObj, searchChangedSlideIndex, isSlide, isProgramm, isSlideId, isPoint, isChangedObjPosType } from './commonFunctionsConst';
import { createProgram } from './functions';
import { addSlide, setSelectedSlides } from './slideMoveInProgramm';
import { goBackAchive, goForwardAchive, saveStateToArchive } from './archive';

export let globalActiveTool: number = 0;

export function setGlobalActiveTool(state: number): void {
    globalActiveTool = state;
} 

export let actualProgState: Programm

export function dispatch<T>(func: { (prog: Programm, obj: T): Programm }, obj: T ): void { 
  if (isProgramm(obj)) {
    actualProgState = obj
  } else {
    console.log(func.name)
    actualProgState = func(actualProgState, obj) 
    if (func !== goForwardAchive && func !== goBackAchive) {
        saveStateToArchive()
        console.log('savedToArh')
    }
  }  
  render()
}

export function dispatchTwoParams<T>(func: { (prog: Programm, firstObj: T, secondObj: T): Programm }, firstObj: T, secondObj: T): void { 
  actualProgState =  func(actualProgState, firstObj, secondObj);
  console.log('56')
  render()
}

export function loadProgramm(newProg: Programm): Programm {
  return newProg
}











