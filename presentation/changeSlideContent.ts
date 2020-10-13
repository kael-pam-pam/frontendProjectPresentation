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
  searchChangedElemIndex,
  isTextObj,
  isShapeObj,
  isPictureObj
} from './commonFunctionsConst'

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
  const changedSlideIndex: number = searchChangedSlideIndex(prog)     
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides  // [...]   object.freeze(prog) | deepfreeze
  copyOfSlides[changedSlideIndex].background = newBackground

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: copyOfSlides
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
  const newPictureObj = createPictureObj(url)
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].elements.push(newPictureObj) 
  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: copyOfSlides
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
      text: 'введите текст', //  ' '      in vieu=>textObj.text || placeholder(enter text)
      fontFamily: 'roboto',
      fontSize: '14',
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
    },
    selectedElements: [newTextObj.id]
  }
}


function changeTextObj(prog: Programm, newParam: string, paramType: string): Programm {  // add type ParameterType = 'text' |  'Font
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  const changedElemIndex: number = searchChangedElemIndex(prog, changedSlideIndex)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  
  let elemToChange = copyOfSlides[changedSlideIndex].elements[changedElemIndex]

  if(isTextObj(elemToChange)) {
    if (paramType == 'text') {
      elemToChange.text = newParam
    }
    if (paramType == 'fontFamily') {
      elemToChange.fontFamily = newParam
    }
    if (paramType == 'fontSize') {
      elemToChange.fontSize = newParam
    }
  }
  copyOfSlides[changedSlideIndex].elements[changedElemIndex] = elemToChange
  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: copyOfSlides
    }
  }  
}

function createShapeObj(shapeType: string): ShapeObj {


  if (shapeType == 'triangle') {
    return {
      id: createNewId(),
      position: defaultPoint,
      wigth: 15,
      height: 15,
      borderColor: '11',
      fillColor: '11',
      type: 'triangle'
    }
  } 
  else if (shapeType == 'circle') {
    return {
      id: createNewId(),
      position: defaultPoint,
      wigth: 15,
      height: 15,
      borderColor: '11',
      fillColor: '11',
      type: 'circle'
    }
  }
  else if (shapeType == 'rect') {
    return {
      id: createNewId(),
      position: defaultPoint,
      wigth: 15,
      height: 15,
      borderColor: '11',
      fillColor: '11',
      type: 'rect'
    }
  }
  else {
    return {
      id: createNewId(),
      position: defaultPoint,
      wigth: 15,
      height: 15,
      borderColor: '11',
      fillColor: '11',
      type: 'empty'
    }
  }
} 

function addShapeObj(prog: Programm, shapeType: string): Programm {
  const newShapeObj = createShapeObj(shapeType)
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  copyOfSlides[changedSlideIndex].elements.push(newShapeObj)
  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: copyOfSlides
      },
      selectedElements: [newShapeObj.id]    
  }
}

function changeShapeObj(prog: Programm, newParam: string, paramType: string): Programm {
  const changedSlideIndex: number = searchChangedSlideIndex(prog)
  const changedElemIndex: number = searchChangedElemIndex(prog, changedSlideIndex)
  let copyOfSlides: Array<Slide> = prog.currentPresentation.slides
  
  let elemToChange = copyOfSlides[changedSlideIndex].elements[changedElemIndex]

  if(isShapeObj(elemToChange)) {
    if (paramType == 'borderColor') {
      elemToChange.borderColor = newParam
    }
    if (paramType == 'fillColor') {
      elemToChange.fillColor = newParam
    }
  }
  copyOfSlides[changedSlideIndex].elements[changedElemIndex] = elemToChange
  return {
    ...prog,
    currentPresentation: {
        ...prog.currentPresentation,
        slides: copyOfSlides
    }
  }  
}

function resizeElement(prog: Programm, newWidth:number, newHeigth: number): Programm {  // add points for resize
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

