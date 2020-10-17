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
  deepCopy,
  getCopyOfSlidesArr,
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
  getNewElemWithNewPosition
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
  
  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide: Array<Slide> = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      background: newBackground
    }
  ]  

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
      height: 15,
      wigth: 15,
      url: url, // w/h take from url 
      type: 'picture'
  }
}

function addPictureObj(prog: Programm, url: string): Programm {
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)

  const newPictureObj = createPictureObj(url)
  const elemsWithNewElem = getElemsWithNewElem(prog, newPictureObj, changedSlideIndex)

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide: Array<Slide> = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: elemsWithNewElem
    }
  ]

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
      position: defaultPoint,
      height: 15,
      wigth: 30,
      text: '', //  ' '      in vieu=>textObj.text || placeholder(enter text)
      fontFamily: 'roboto',
      fontSize: '14',
      type: 'text'
  }
}

function addTextObj(prog: Programm): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex = searchChangedSlideIndex(prog)

  const newTextObj = createEmtyTextObj()
  const elemsWitNewElem = getElemsWithNewElem(prog, newTextObj, changedSlideIndex) 

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: elemsWitNewElem
    }
  ]

  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: [newTextObj.id]
  }
}


function changeTextObj(prog: Programm, newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily'): Programm {  // add type ParameterType = 'text' |  'Font
  deepFreeze(prog)

  const changedSlideIndex = searchChangedSlideIndex(prog)
  const changedElemIndex = searchChangedElemIndex(prog, changedSlideIndex)
  
  let changedElem = getChangedElem(prog, changedSlideIndex, changedElemIndex)
  const elemsWithoutChangedElem = getElemsWithoutChangedElem(prog, changedElemIndex, changedSlideIndex)
  if (isTextObj(changedElem)) {
    changedElem = getNewTextElem(changedElem, newParam, paramToChange)
  }

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: [
        ...elemsWithoutChangedElem,
        changedElem  
      ]      
    }          
  ]  

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
    wigth: 15,
    height: 15,
    borderColor: '11',
    fillColor: '11',
    type
  }
} 

function addShapeObj(prog: Programm, shapeType: 'rect' | 'triangle' | 'circle'): Programm {
  deepFreeze(prog)
  
  const changedSlideIndex = searchChangedSlideIndex(prog)
  const newShapeObj = createShapeObj(shapeType)
  const elemsWitNewElem = getElemsWithNewElem(prog, newShapeObj, changedSlideIndex) 

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: elemsWitNewElem
    }
  ]

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

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const elemsWithoutChangedElem = getElemsWithoutChangedElem(prog, changedElemIndex, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: [
        ...elemsWithoutChangedElem,
        changedElem  
      ]      
    }          
  ]    

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
  const elemsWithoutChangedElem = getElemsWithoutChangedElem(prog, changedElemIndex, changedSlideIndex)
  changedElem = getNewResizedElem(changedElem, newWidth, newHeigth)

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)  
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: [
        ...elemsWithoutChangedElem,
        changedElem  
      ]      
    }          
  ]  

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

  const changedSlide = getChangedSlideObj(prog, changedSlideIndex)
  const slidesWithoutChangedSlide = getSlidesWithoutChangedSlide(prog, changedSlideIndex)
  const elemsWithoutChangedElem = getElemsWithoutChangedElem(prog, changedElemIndex, changedSlideIndex)
  const slidesWithChangedSlide: Array<Slide> = [
    ...slidesWithoutChangedSlide,
    {
      ...changedSlide,
      elements: [
        ...elemsWithoutChangedElem,
        changedElem  
      ]      
    }          
  ]  

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

