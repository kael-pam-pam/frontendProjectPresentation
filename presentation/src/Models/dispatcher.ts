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
  ChangedParams,
  Actions
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
import { isShapeObj, isTextObj, searchChangedSlideIndex, isSlide, isProgramm, isSlideId } from './commonFunctionsConst';
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


export function loadProgramm(newProg: Programm): Programm {
  return newProg
}
/*export function dispatch(action: Actions, props: ChangedParams): void {

  let newProgState: Programm

  if (action == "CREATE_NEW_PROGRAMM") {
    actualProgState = createProgram()
  }

  if (action == "LOAD_PROGRAMM") {
    if (isProgramm(props)) {
      actualProgState = props
    }
  }

  if (action == "ADD_NEW_SLIDE") {
    actualProgState = addSlide(actualProgState)
  }

  if (action == "SELECT_SLIDES") {
    if (isSlideId(props)) {
      actualProgState = setSelectedSlides(actualProgState, [props])
    }  
  }

  if (action == "ADD_TEXT_OBJ") {
    actualProgState = addTextObj(actualProgState)
  }

  if (action == "ADD_RECT") {
    actualProgState = addShapeObj(actualProgState, 'rect')
  }

  if (action == "ADD_CIRCLE") {
    actualProgState = addShapeObj(actualProgState, 'circle')
  }

  if (action == "ADD_TRIANGLE") {
    actualProgState = addShapeObj(actualProgState, 'triangle')
  }
   
  if (props != null && isTextObj(props)){
    if (action == "CHANGE_TEXT_IN_TEXT" ) {  
      actualProgState = changeTextObj(actualProgState, props.text, 'text')
    }
    if (action == "CHANGE_FONT_FAMILY_IN_TEXT" ) {  
      actualProgState = changeTextObj(actualProgState, props.text, 'fontFamily')
    }
    if (action == "CHANGE_FONT_SIZE_IN_TEXT" ) {  
      actualProgState = changeTextObj(actualProgState, props.fontSize, 'text')
    }      
  }
  render()
}*/











