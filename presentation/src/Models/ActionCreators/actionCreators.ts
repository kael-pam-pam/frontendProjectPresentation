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


export function addPictureObj(imgData: {width: number, height: number, imgB64: string}) {
  return {
    type: StateTypes.ADD_PICTURE_OBJ,
    payload: imgData
  }
}

export function moveSlide(posBefore: number) {
  return {
    type: StateTypes.MOVE_SLIDE,
    payload: posBefore
  }
}

export function changeElemPosition(newX: number, newY: number, id: string) {
  return {
    type: StateTypes.CHANGE_ELEM_POSITION,
    payload: {newX, newY, id}
  }
}

export function resizeElement(newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) {
  console.log('action')
  return {
    type: StateTypes.RESIZE_ELEMENT,
    payload: {newWidth, newHeigth, newPosX, newPosY, id}
  }
}

export function setSelectedElement(selectedElems: Array<string>) {
  return {
    type: StateTypes.SET_SELECTED_ELEMENT,
    payload: selectedElems
  }
}

export function setCanDeleteSlide(canDelete: boolean) {
  return {
    type: StateTypes.SET_CAN_DELETE_SLIDE,
    payload: canDelete
  }
}

export function deleteSelectedElements() {
  return {
    type: StateTypes.DELETE_SELECTED_ELEMENTS
  }
}

export function removeOneElemFromSelectedElems(elemId: string) {
  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS,
    payload: elemId
  }
}

export function removeOneElemFromSelectedSlides(slideId: string) {
  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES,
    payload: slideId
  }
}

export function setSelectedSlides(selectedSlides: Array<string>) {
  return {
    type: StateTypes.SET_SELECTED_SLIDES,
    payload: selectedSlides
  }
}

export function deleteSlide() {
  return {
    type: StateTypes.DELETE_SLIDE
  }
}


export function setSlideBackground(newBackground: Picture | Color) {
  return {
    type: StateTypes.SET_SLIDE_BACKGROUND,
    payload: newBackground
  }
}


export function changeTextObj(newParams: {newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily'}) {
  return {
    type: StateTypes.CHANGE_TEXT_OBJ,
    payload: newParams
  }
}


export function loadProgToStore(newProg: Programm) {
  return {
      type: StateTypes.LOAD_PROJECT,
      payload: {...newProg}  
  }
}

export function goForwardArchive() {
  return {
    type: StateTypes.GO_FORWARD_ARCHIVE
  }
}

export function goBackArchive() {
  return {
    type: StateTypes.GO_BACK_ARCHIVE
  }
}