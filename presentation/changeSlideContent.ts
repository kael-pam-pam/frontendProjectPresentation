import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  Picture,
  PictureObj,
  SlideElements,
  TextObj,
  Color,
  ShapeObj
} from './types'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  deepFreeze,
  isTextObj,
  isShapeObj,
  isPictureObj,
  getSlidesWithoutChangedSlide,
  getChangedSlideObj,
  getNewTextElem,
  getElemsWithoutChangedElem,
  getElemsWithNewElem,
  getChangedElem,
  getNewShapeElem,
  getNewResizedElem,
  getNewElemWithNewPosition,
  getSlideWithNewBackground,
  getSlidesWithChangedSlide,
  getElemsWithChangedElem
} from './commonFunctionsConst'
import { textChangeRangeIsUnchanged } from 'typescript'

export {
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
}

function setSlideBackground(prog: Programm, newBackground: Picture | Color): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex: number = searchChangedSlideIndex(prog)

  const changedSlide =  getSlideWithNewBackground(prog, changedSlideIndex, newBackground)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, changedSlide, changedSlideIndex)

  return {
      ...prog,
      currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
      }
  }
}

function createPictureObj(url: string): PictureObj { 
  return {
      id: createNewId(),
      position: defaultPoint,
      height: 100,
      wigth: 100,
      url: url, // w/h take from url 
      type: 'picture'
  }
}


function getSlideWithChangedElems(prog: Programm, changedElems: Array<PictureObj | TextObj | ShapeObj>, changedSlideIndex: number): Slide {
  return {
    ...prog.currentPresentation.slides[changedSlideIndex],
    elements: changedElems
  }
}

function addPictureObj(prog: Programm, url: string): Programm {
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)

  const newPictureObj = createPictureObj(url)
  const changedElems = getElemsWithNewElem(prog, newPictureObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex)

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: [newPictureObj.id]
  }           
}

function createEmtyTextObj(): TextObj {
  return {
    id: createNewId(),
    position: {
      x: 550,
      y: 400
    },
    height: 100,
    wigth: 300,
    text: "введите текст", //  ' '      in vieu=>textObj.text || placeholder(enter text)
    fontFamily: 'oblique',
    fontSize: '50',
    type: 'text'
  }
}

function addTextObj(prog: Programm): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex = searchChangedSlideIndex(prog)

  const newTextObj = createEmtyTextObj()

  const changedElems = getElemsWithNewElem(prog, newTextObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex)

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: [newTextObj.id]           
  }
}

function changeTextObj(prog: Programm, newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily'): Programm { 
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)
  const changedElemIndex = searchChangedElemIndex(prog, changedSlideIndex)
  
  let changedElem = getChangedElem(prog, changedSlideIndex, changedElemIndex)
  if (isTextObj(changedElem)) {
    changedElem = getNewTextElem(changedElem, newParam, paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(prog, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex)

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
    }
  }  
}

function createShapeObj(type: 'rect' | 'triangle' | 'circle'): ShapeObj {
  return {
    id: createNewId(),
    position: defaultPoint,
    wigth: 100,
    height: 100,
    borderColor: 'fff',
    fillColor: '#7ef507',
    type
  }
} 

function addShapeObj(prog: Programm, shapeType: 'rect' | 'triangle' | 'circle'): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex = searchChangedSlideIndex(prog)
  const newShapeObj = createShapeObj(shapeType)

  const changedElems = getElemsWithNewElem(prog, newShapeObj, changedSlideIndex)
  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex)

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: slidesWithChangedSlide
      },
      selectedElements: [newShapeObj.id]    
  }
}

function changeShapeObj(prog: Programm, newParam: string, paramToChange: 'borderColor' | 'fillColor'): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex = searchChangedSlideIndex(prog)
  const changedElemIndex = searchChangedElemIndex(prog, changedSlideIndex)
  
  let changedElem = getChangedElem(prog, changedSlideIndex, changedElemIndex)
  if (isShapeObj(changedElem)) {
    changedElem = getNewShapeElem(changedElem, newParam, paramToChange)
  }

  const changedElemsArr = getElemsWithChangedElem(prog, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex) 

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
    }
  }  
}

function resizeElement(prog: Programm, newWidth:number, newHeigth: number): Programm {  // add points for resize
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)
  const changedElemIndex = searchChangedElemIndex(prog, changedSlideIndex)

  let changedElem = getChangedElem(prog, changedSlideIndex, changedElemIndex)
  changedElem = getNewResizedElem(changedElem, newWidth, newHeigth)

  const changedElemsArr = getElemsWithChangedElem(prog, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex)

  return {
    ...prog,
    currentPresentation: {
      ...prog.currentPresentation,
      slides: slidesWithChangedSlide
    }
  }
}

function changeElemPosition(prog: Programm, newX: number, newY: number): Programm {
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)
  const changedElemIndex = searchChangedElemIndex(prog, changedSlideIndex)

  let changedElem = getChangedElem(prog, changedSlideIndex, changedElemIndex)
  changedElem = getNewElemWithNewPosition(changedElem, newX, newY)

  const changedElemsArr = getElemsWithChangedElem(prog, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(prog, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(prog, slideWithChangedElems, changedSlideIndex) 

  return {
    ...prog,
    currentPresentation: {
      ...prog.currentPresentation,
      slides: slidesWithChangedSlide
    }
  }
}

function setSelectedElement(prog: Programm, selectedElems: Array<string>): Programm {
  return {
      ...prog,
      selectedElements: selectedElems
  }
}

function deleteSelectedElements(prog: Programm): Programm { //only redraw selected slide

  let copySlides: Array<Slide> = prog.currentPresentation.slides
  let newSlides: Array<Slide> = [];

  for (let i = 0; i < copySlides.length; i++) {
    newSlides.push({
        ...copySlides[i],
        elements: [...copySlides[i].elements.filter((elem) => !prog.selectedElements.includes(elem.id))]
    })
  }

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: newSlides
    },
    selectedElements: []
  }
}

