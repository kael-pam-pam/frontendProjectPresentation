import {
  MainProg,
  StateTypes,
  Slide,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
  borderLightType,
  Programm,
} from '../CommonFunctions/types'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  searchChangedElemIndexById,
  deepFreeze,
  isTextObj,
  isShapeObj,
  getNewTextElem,
  getElemsWithNewElem,
  getChangedElem,
  getNewShapeElem,
  getNewResizedElem,
  getNewElemWithNewPosition,
  getSlideWithNewBackground,
  getSlidesWithChangedSlide,
  getElemsWithChangedElem,
} from '../CommonFunctions/supportFunctionsConst'
import { textChangeRangeIsUnchanged } from 'typescript'



export function addSlide() {
  return {
    type: StateTypes.ADD_SLIDE,
  }
}

export function addShapeObj(shape: 'rect' | 'triangle' | 'circle') {
  return {
    type: StateTypes.ADD_SHAPE_OBJ,
    payload: shape
  }
}

export function addTextObj() {
  return {
    type: StateTypes.ADD_TEXT_OBJ
  }
}


export function addPictureObj() {
  return {
    type: StateTypes.ADD_PICTURE_OBJ
  }
}

export function moveSlide(posBefore: number) {
  return {
    type: StateTypes.MOVE_SLIDE,
    payload: posBefore
  }
}