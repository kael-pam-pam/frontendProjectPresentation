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
  ActionType,
  CommonDeps,
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



export {
  re_setCanDeleteSlide,
  re_setSlideBackground,
  createPictureObj,
  re_addPictureObj,
  createEmtyTextObj,
  re_addTextObj,
  re_changeTextObj,
  createShapeObj,
  re_addShapeObj,
  changeShapeObj,
  re_resizeElement,
  re_changeElemPosition,
  re_setSelectedElement,
  re_removeOneElemFromSelectedElems,
  re_deleteSelectedElements
}

function re_setCanDeleteSlide(state: CommonDeps, action: ActionType) {
  return {
    ...state,
    canDeleteSlides: action.payload
  }
}

function re_setSlideBackground(state: MainProg, action: ActionType) {

  deepFreeze(state)
  
  const changedSlideIndex: number = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const changedSlide =  getSlideWithNewBackground(state, changedSlideIndex, action.payload.newBackground)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, changedSlide, changedSlideIndex)

  return {
      ...state,
      currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
      } 
  }
}

function createPictureObj(width: number, height: number, imgB64: string): PictureObj {
  return {
    id: createNewId(),
    position: defaultPoint,
    height: height,
    wigth: width,
    type: 'picture',
    imgB64
  }
}


function getSlideWithChangedElems(prevProgState: MainProg, changedElems: Array<PictureObj | TextObj | ShapeObj>, changedSlideIndex: number): Slide {
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    elements: changedElems
  }
}

export function getSlideWithChangedBorderLight(prevProgState: MainProg, borderLight: borderLightType, changedSlideIndex: number): Slide {
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    //slideBorderLight: borderLight
  }
}

function re_addPictureObj(state: MainProg, action: ActionType) {
  
  console.log(action)

  const width = action.payload.width
  const height = action.payload.height
  const imgB64 = action.payload.imgB64


  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const newPictureObj = createPictureObj(width, height, imgB64)
  const changedElems = getElemsWithNewElem(state, newPictureObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
      },
      selectedElements: [newPictureObj.id]
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

function re_addTextObj(state: MainProg, action: ActionType) {

  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const newTextObj = createEmtyTextObj()

  const changedElems = getElemsWithNewElem(state, newTextObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return {
    ...state,
    currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: [newTextObj.id]        
  }
}

function re_changeTextObj(state: MainProg, action: ActionType) { 
  
  const paramToChange = action.payload.paramToChange
  const newParam = action.payload.newParam

  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const changedElemIndex = searchChangedElemIndex(state, changedSlideIndex)
  
  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  if (isTextObj(changedElem)) {
    changedElem = getNewTextElem(changedElem, newParam, paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
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

function re_addShapeObj(state: MainProg, action: ActionType) {

  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  let newShapeObj: ShapeObj
  newShapeObj = createShapeObj(action.payload)
  
  const changedElems = getElemsWithNewElem(state, newShapeObj, changedSlideIndex)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return { 
    ...state,
    currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: []
  }       
}

function changeShapeObj(state: MainProg, newParam: string, paramToChange: 'borderColor' | 'fillColor') {
  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const changedElemIndex = searchChangedElemIndex(state, changedSlideIndex)
  
  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  if (isShapeObj(changedElem)) {
    changedElem = getNewShapeElem(changedElem, newParam, paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex) 

  return {
    type: StateTypes.CHANGE_SHAPE_OBJ,
    payload: {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
      }
    }  
  }  
}

function re_resizeElement(state: MainProg, action: ActionType): MainProg { 
  
  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(state.currentPresentation.slides, changedSlideIndex, action.payload.id)

  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  
  changedElem = getNewResizedElem(changedElem, action.payload.newWidth, action.payload.newHeigth, action.payload.newPosX, action.payload.newPosY)

  const changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  //console.log(slidesWithChangedSlide[0].elements[0].position)

  return {
    ...state,
    currentPresentation: {
      ...state.currentPresentation,
      slides: slidesWithChangedSlide
    }  
  }
}

function re_changeElemPosition(state: MainProg, action: ActionType) {
  
  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const changedElemIndex = searchChangedElemIndexById(state.currentPresentation.slides, changedSlideIndex, action.payload.id)
  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  changedElem = getNewElemWithNewPosition(changedElem, action.payload.newX, action.payload.newY)

  let changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)  

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex) 

  return {
    ...state,
    currentPresentation: {
      ...state.currentPresentation,
      slides: slidesWithChangedSlide
    }  
  }
}


function re_removeOneElemFromSelectedElems(state: MainProg, action: ActionType) {
  const selectedElems: Array<string> = [...state.selectedElements]
  let newElems: Array<string> = []
  for(let i = 0; i < selectedElems.length; i++) {
    if (selectedElems[i] !== action.payload) {
      newElems.push(selectedElems[i])
    }
  }

  return {
      ...state,
      selectedElements: newElems
  }
}


function re_setSelectedElement(state: MainProg, action: ActionType) {
  const prevProgState = state
  return {
      ...prevProgState,
      selectedElements: action.payload
  }
}

function re_deleteSelectedElements(state: MainProg, action: ActionType) { 

  let copySlides: Array<Slide> = state.currentPresentation.slides
  let newSlides: Array<Slide> = [];

  for (let i = 0; i < copySlides.length; i++) {
    newSlides.push({
        ...copySlides[i],
        elements: [...copySlides[i].elements.filter((elem) => !state.selectedElements.includes(elem.id))]
    })
  }

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: newSlides
      },
      selectedElements: []
    }  
}

