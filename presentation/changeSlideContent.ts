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
  ShapeObj
} from './types'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex
} from './commonFunctionsConst'

export {
  setSlideBackground,
  createPictureObj,
  addPictureObj,
  createEmtyTextObj,
  addTextObj,
  createShapeObj,
  addShapeObj,
  resizeElement,
  changeElemPosition,
  setSelectedElement,
  deleteSelectedElements
}

function setSlideBackground(prog: Programm, newBackground: Picture | Color): Programm {
  const changedSlideIndex: number = searchChangedSlideIndex(prog)     
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].background = newBackground

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: copyOfSlides
      }
  }
}

function createPictureObj(): PictureObj { 
  return {
      id: createNewId(),
      position: defaultPoint,
      height: 15,
      wigth: 15,
      url: 'tutututu',
      type: 'picture'
  }
}

function addPictureObj(prog: Programm): Programm {
  const newPictureObj = createPictureObj()
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].elements.push(newPictureObj) 
  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: copyOfSlides
    }
  }           
}

function changePictureInPictureObj(prog: Programm, newUrl: string): Programm {
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  const changedElemIndex: number = searchChangedElemIndex(prog, changedSlideIndex)
  copyOfSlides[changedSlideIndex].elements[changedElemIndex].url = newUrl         // <===  elements: Array<PictureObj | TextObj | ShapeObj>,
  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: copyOfSlides
    }
  }  
}

function createEmtyTextObj(): TextObj {
  return {
      id: createNewId(),
      position: defaultPoint,
      height: 15,
      wigth: 30,
      text: 'введите текст',
      fontFamily: 'roboto',
      fontSize: 14,
      type: 'text'
  }
}

function addTextObj(prog: Programm): Programm {
  const newTextObj = createEmtyTextObj()
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].elements.push(newTextObj)
  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: copyOfSlides
      }
  }
}

function createShapeObj(prog: Programm, shapeType: string): ShapeObj {
  let type = 'rect'
  if (shapeType == 'triangle') {
      type = 'triangle'
  } 
  if (shapeType == 'circle') {
      type = 'circle'
  }
  return {
      id: createNewId(),
      position: defaultPoint,
      wigth: 15,
      height: 15,
      borderColor: 11,
      fillColor: 11,
      type: type
  }
} 

function addShapeObj(prog: Programm, shapeType: string): Programm {
  const newShapeObj = createShapeObj(prog, shapeType)
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].elements.push(newShapeObj)
  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: copyOfSlides
      }    
  }
}

function resizeElement(prog: Programm, newWidth:number, newHeigth: number): Programm {
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  
  const changedElemIndex: number = searchChangedElemIndex(prog, changedSlideIndex)
  
  copyOfSlides[changedSlideIndex].elements[changedElemIndex].wigth = newWidth
  copyOfSlides[changedSlideIndex].elements[changedElemIndex].height = newHeigth
  return {
    ...prog,
    currentPresentation: {
      ...prog.currentPresentation,
      slides: copyOfSlides
    }
  }
}

function changeElemPosition(prog: Programm, newX: number, newY: number): Programm {
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  
  const changedElemIndex: number = searchChangedElemIndex(prog, changedSlideIndex)
  
  copyOfSlides[changedSlideIndex].elements[changedElemIndex].position.x = newX
  copyOfSlides[changedSlideIndex].elements[changedElemIndex].position.y = newY
  return {
    ...prog,
    currentPresentation: {
      ...prog.currentPresentation,
      slides: copyOfSlides
    }
  }
}

function setSelectedElement(prog: Programm, selectedElems: Array<string>): Programm {
  return {
      ...prog,
      selectedElements: selectedElems
  }
}

function deleteSelectedElements(prog: Programm): Programm {
  let copySlides: Array<Slide> = prog.currentPresentation.slides;
  let newSlides: Array<Slide> = [];

  for (let i = 0; i < copySlides.length; i++) {
      newSlides.push({
          ...copySlides[i],
          elements: [...copySlides[i].elements.filter((e) => !prog.selectedElements.includes(e.id))]
      })
  }

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: [...newSlides]
      },
      selectedElements: []
  }
}

