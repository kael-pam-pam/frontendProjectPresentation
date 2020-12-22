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

import { getState } from '../../index'

export {
  setCanDeleteSlide,
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
  removeOneElemFromSelectedElems,
  deleteSelectedElements
}

function setCanDeleteSlide(canDeleteSlide: boolean) {
  const prevDepsState = getState().commonDeps
  return {
    type: StateTypes.SET_CAN_DELETE_SLIDE,
    payload: {
      ...prevDepsState,
      canDeleteSlides: canDeleteSlide
    }
  }
}

function setSlideBackground(newBackground: Picture | Color) {

  const prevProgState: MainProg = getState().mainProg

  deepFreeze(prevProgState)
  
  const changedSlideIndex: number = searchChangedSlideIndex()

  const changedSlide =  getSlideWithNewBackground(prevProgState, changedSlideIndex, newBackground)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, changedSlide, changedSlideIndex)

  return {
    type: StateTypes.SET_SLIDE_BACKGROUND,
    payload: {
      ...prevProgState,
      currentPresentation: {
        ...prevProgState.currentPresentation,
        slides: slidesWithChangedSlide
      }
    }  
  }
}

function createPictureObj(url: string, width: number, height: number, imgB64: string): PictureObj {
  return {
    id: createNewId(),
    position: defaultPoint,
    height: height,
    wigth: width,
    url, 
    type: 'picture',
    imgB64
  }
}


function getSlideWithChangedElems(changedElems: Array<PictureObj | TextObj | ShapeObj>, changedSlideIndex: number): Slide {
  const prevProgState: MainProg = getState().mainProg
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    elements: changedElems
  }
}

export function getSlideWithChangedBorderLight(borderLight: borderLightType, changedSlideIndex: number): Slide {
  const prevProgState: MainProg = getState().mainProg
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    slideBorderLight: borderLight
  }
}

function addPictureObj(payload: {url: string, width: number, height: number, imgB64: string}) {
  
  const prevProgState = getState().mainProg

  deepFreeze(prevProgState)

  const changedSlideIndex = searchChangedSlideIndex()

  const newPictureObj = createPictureObj(payload.url, payload.width, payload.height, payload.imgB64)
  const changedElems = getElemsWithNewElem(prevProgState, newPictureObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex)

  return {
    type: StateTypes.ADD_PICTURE_OBJ,
    payload: {
      ...prevProgState,
      currentPresentation: {
          ...prevProgState.currentPresentation,
          slides: slidesWithChangedSlide
      },
      selectedElements: [newPictureObj.id]
    }  
  }           
}

function createEmtyTextObj(): TextObj {
  return {
    id: createNewId(),
    position: {
      x: 10,
      y: 10
    },
    height: 100,
    wigth: 300,
    text: "",
    fillColor: '#e6e6e6',
    fontFamily: 'oblique',
    fontSize: '50',
    type: 'text'
  }
}

function addTextObj() {

  const prevProgState = getState().mainProg

  deepFreeze(prevProgState)
  
  const changedSlideIndex = searchChangedSlideIndex()

  const newTextObj = createEmtyTextObj()

  const changedElems = getElemsWithNewElem(prevProgState, newTextObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex)

  return {
    type: StateTypes.ADD_TEXT_OBJ,
    payload: {
      ...prevProgState,
      currentPresentation: {
          ...prevProgState.currentPresentation,
          slides: slidesWithChangedSlide
      },
      selectedElements: [newTextObj.id]
    }             
  }
}

function changeTextObj(payload: {newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily'}) { 
  const prevProgState = getState().mainProg
  deepFreeze(prevProgState)

  const changedSlideIndex = searchChangedSlideIndex()
  const changedElemIndex = searchChangedElemIndex(prevProgState, changedSlideIndex)
  
  let changedElem = getChangedElem(prevProgState, changedSlideIndex, changedElemIndex)
  if (isTextObj(changedElem)) {
    changedElem = getNewTextElem(changedElem, payload.newParam, payload.paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(prevProgState, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(changedElemsArr, changedSlideIndex)
  
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex)

  return {
    type: StateTypes.CHANGE_TEXT_OBJ,
    payload: {
      ...prevProgState,
      currentPresentation: {
          ...prevProgState.currentPresentation,
          slides: slidesWithChangedSlide
      }
    }  
  }  
}


function createShapeObj(type: 'rect' | 'triangle' | 'circle'): ShapeObj {
  let fillColor = '#ccccd9'
  return {
    id: createNewId(),
    position: {
      x: 10,
      y: 10
    },
    wigth: 200,
    height: 200,
    borderColor: '#cccccc',
    fillColor: fillColor,
    type
  }
} 

function addShapeObj(shapeType: 'rect' | 'triangle' | 'circle') {
  const prevProgState = getState().mainProg
  deepFreeze(prevProgState)
  
  const changedSlideIndex = searchChangedSlideIndex()

  let newShapeObj: ShapeObj
  newShapeObj = createShapeObj(shapeType)
  
  const changedElems = getElemsWithNewElem(prevProgState, newShapeObj, changedSlideIndex)
  const slideWithChangedElems = getSlideWithChangedElems(changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex)

  return {
      type: StateTypes.ADD_SHAPE_OBJ,
      payload: {
        ...prevProgState,
        currentPresentation: {
            ...prevProgState.currentPresentation,
            slides: slidesWithChangedSlide
        },
        selectedElements: []
      }
  }        
}

function changeShapeObj(newParam: string, paramToChange: 'borderColor' | 'fillColor') {
  const prevProgState = getState().mainProg
  deepFreeze(prevProgState)
  
  const changedSlideIndex = searchChangedSlideIndex()
  const changedElemIndex = searchChangedElemIndex(prevProgState, changedSlideIndex)
  
  let changedElem = getChangedElem(prevProgState, changedSlideIndex, changedElemIndex)
  if (isShapeObj(changedElem)) {
    changedElem = getNewShapeElem(changedElem, newParam, paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(prevProgState, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex) 

  return {
    type: StateTypes.CHANGE_SHAPE_OBJ,
    payload: {
      ...prevProgState,
      currentPresentation: {
          ...prevProgState.currentPresentation,
          slides: slidesWithChangedSlide
      }
    }  
  }  
}

function resizeElement(payload: {newWidth: number, newHeigth: number, newPosX: number, newPosY: number}) { 
  const prevProgState = getState().mainProg
  deepFreeze(prevProgState)

  const changedSlideIndex = searchChangedSlideIndex()
  const changedElemIndex = searchChangedElemIndex(prevProgState, changedSlideIndex)

  let changedElem = getChangedElem(prevProgState, changedSlideIndex, changedElemIndex)
  changedElem = getNewResizedElem(changedElem, payload.newWidth, payload.newHeigth, payload.newPosX, payload.newPosY)

  const changedElemsArr = getElemsWithChangedElem(prevProgState, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex)

  return {
    type: StateTypes.RESIZE_ELEMENT,
    payload: {
      ...prevProgState,
      currentPresentation: {
        ...prevProgState.currentPresentation,
        slides: slidesWithChangedSlide
      }
    }  
  }
}

function changeElemPosition(payload: {newX: number, newY: number, id: string}) {
  const prevProgState = getState().mainProg
  deepFreeze(prevProgState)

  const changedSlideIndex = searchChangedSlideIndex()

  const changedElemIndex = searchChangedElemIndexById(prevProgState, changedSlideIndex, payload.id)
  let changedElem = getChangedElem(prevProgState, changedSlideIndex, changedElemIndex)
  changedElem = getNewElemWithNewPosition(changedElem, payload.newX, payload.newY)

  let changedElemsArr = getElemsWithChangedElem(prevProgState, changedSlideIndex, changedElemIndex, changedElem)  

  const slideWithChangedElems = getSlideWithChangedElems(changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedElems, changedSlideIndex) 

  return {
    type: StateTypes.CHANGE_ELEM_POSITION,
    payload: {
      ...prevProgState,
      currentPresentation: {
        ...prevProgState.currentPresentation,
        slides: slidesWithChangedSlide,
      }
    }  
  }
}


function removeOneElemFromSelectedElems(id: string) {
  const prevProgState = getState().mainProg
  const selectedElems: Array<string> = [...prevProgState.selectedElements]
  let newElems: Array<string> = []
  for(let i = 0; i < selectedElems.length; i++) {
    if (selectedElems[i] !== id) {
      newElems.push(selectedElems[i])
    }
  }

  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS,
    payload: {
      ...prevProgState,
      selectedElements: newElems
    }  
  }
}


function setSelectedElement(selectedElems: Array<string>) {
  const prevProgState = getState().mainProg
  return {
    type: StateTypes.SET_SELECTED_ELEMENT,
    payload: {
      ...prevProgState,
      selectedElements: selectedElems
    }  
  }
}

function deleteSelectedElements() { 
  const prevProgState = getState().mainProg

  let copySlides: Array<Slide> = prevProgState.currentPresentation.slides
  let newSlides: Array<Slide> = [];

  for (let i = 0; i < copySlides.length; i++) {
    newSlides.push({
        ...copySlides[i],
        elements: [...copySlides[i].elements.filter((elem) => !prevProgState.selectedElements.includes(elem.id))]
    })
  }

  return {
    type: StateTypes.DELETE_SELECTED_ELEMENTS,
    payload: {
      ...prevProgState,
      currentPresentation: {
          ...prevProgState.currentPresentation,
          slides: newSlides
      },
      selectedElements: []
    }  
  }
}

