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
  SlideElements
} from './types'


export {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  deepFreeze,
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
}

const defaultPoint: Point = {
  x: 10,
  y: 10 
}

function createNewId(): string {
  const max = 300
  const min = 10
  const randomNum = Math.floor(Math.random() * (max - min)) + min
  const newId = String((new Date()).getTime() % 10 ** 8 + randomNum)
  return newId
}

function searchChangedSlideIndex(prog: Programm): number {
  const slides = prog.currentPresentation.slides
  const selectedSlide = prog.selectedSlides[prog.selectedSlides.length - 1]
  let changedSlideIndex: number = 0
  for (let i = 0; i < slides.length; i++) {     
      if (slides[i].id == selectedSlide) {
          changedSlideIndex = i
      }
  }
  return changedSlideIndex
}

function searchChangedElemIndex(prog: Programm, changedSlideIndex: number): number {
  const elems = prog.currentPresentation.slides[changedSlideIndex].elements
  const selectedElem = prog.selectedElements[prog.selectedElements.length - 1]
  let changedElemIndex: number = 0
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id == selectedElem) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}

function deepFreeze (o: any) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};

/*function deepFreeze(obj) {
  let propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(function(name) {
    let prop = obj[name]

    if (typeof prop == 'object' && prop !== null) {
      deepFreeze(prop)
    }  
  })
  return Object.freeze(obj);
}*/

/*function deepCopy(inputObject) {
  if (!inputObject) {
    return inputObject;
  }

  let elemValue;

  let outputObject = Array.isArray(inputObject) ? [] : {};
  for (const elem in inputObject) {
    elemValue = inputObject[elem];
    outputObject[elem] = (typeof elemValue === "object") ? deepCopy(elemValue) : elemValue;
  }

  return outputObject;
}*/


function getCopyOfSlidesArr(slideArr: Array<Slide>): Array<Slide> {
  return JSON.parse(JSON.stringify(slideArr))
}

function isTextObj(elem: any): elem is TextObj {
  return elem.text !== undefined && elem.fontFamily !== undefined;
}

function isShapeObj(elem: any): elem is ShapeObj {
  return elem.borderColor !== undefined && elem.fillColor !== undefined;
}

function isPictureObj(elem: any): elem is PictureObj {
  return elem.url !== undefined
}


function getChangedSlideObj(prog: Programm, changedSlideIndex: number): Slide {
  return {...prog.currentPresentation.slides[changedSlideIndex]}
}

function getSlidesWithoutChangedSlide(prog: Programm, changedSlideIndex: number): Array<Slide> {
  return [...prog.currentPresentation.slides.filter((elem) => !prog.currentPresentation.slides[changedSlideIndex])]
}

function getNewTextElem(changedElem: TextObj, newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily'): TextObj {
  let newElem = changedElem
  if (paramToChange === 'text') {
    newElem = {
      ...changedElem,
      text: newParam
    }
  }
  if (paramToChange === 'fontFamily') {
    newElem = {
      ...changedElem,
      fontFamily: newParam
    }
  }
  if (paramToChange === 'fontSize') {
    newElem =
    {
      ...changedElem,
      fontSize: newParam
    }
  }
  return newElem
}

function getElemsWithoutChangedElem(prog: Programm, changedElemIndex: number, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements.filter((elem) => 
  elem != prog.currentPresentation.slides[changedSlideIndex].elements[changedElemIndex])] 
}

function getElemsWithNewElem(prog: Programm, newElem: PictureObj | TextObj | ShapeObj, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements, newElem]
}

function getChangedElem(prog: Programm, changedSlideIndex: number, changedElemIndex: number): PictureObj | TextObj | ShapeObj {
  return prog.currentPresentation.slides[changedSlideIndex].elements[changedElemIndex]
}

function getNewShapeElem(changedElem: ShapeObj, newParam: string, paramToChange: 'borderColor' | 'fillColor'): ShapeObj {
  let newElem = changedElem
  if (paramToChange == 'borderColor') {
    newElem = {
      ...changedElem,
      borderColor: newParam
    }
  }
  if (paramToChange == 'fillColor') {
    newElem = {
      ...changedElem,
      fillColor: newParam
    }
  }
  return newElem
}

function getNewResizedElem(changedElem: PictureObj | TextObj | ShapeObj, newWidth: number, newHeigth: number): PictureObj | TextObj | ShapeObj {
  return {
    ...changedElem,
    wigth: newWidth,
    height: newHeigth
  }
}

function getNewElemWithNewPosition(changedElem: PictureObj | TextObj | ShapeObj, newX: number, newY: number): PictureObj | TextObj | ShapeObj {
  return {
    ...changedElem,
    position: {
      x: newX,
      y: newY
    }
  }
}