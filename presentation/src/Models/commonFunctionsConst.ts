import { setSelectedSlides } from './slideMoveInProgramm'
import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  SlideId,
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
  isProgramm,
  isSlideId,
  isTextObj,
  isShapeObj,
  isPictureObj,
  isColor,
  isSlide,
  isPoint,
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
  let changedElemIndex: number = -1
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

function isProgramm(elem: any): elem is Programm {
  return elem.currentPresentation !== undefined
}

function isSlideId(elem: any): elem is SlideId {
  return typeof elem == "string"
}

function isSlide(elem: any): elem is Slide {
  return elem.elements !== undefined
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

function isColor(elem: any): elem is Color {
  return elem.hexColor !== undefined
}

function isPoint(elem: any): elem is Point {
  return elem.x !== undefined
}


function getChangedSlideObj(prog: Programm, changedSlideIndex: number): Slide {
  return {...prog.currentPresentation.slides[changedSlideIndex]}
}

function getSlidesWithoutChangedSlide(prog: Programm, changedSlideIndex: number): Array<Slide> {
  return [...prog.currentPresentation.slides.filter((elem) => elem != prog.currentPresentation.slides[changedSlideIndex])]
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

function getSlideWithNewBackground(prog: Programm, changedSlideIndex: number, newBackground: Picture | Color): Slide {
  return {
    ...prog.currentPresentation.slides[changedSlideIndex],
    background: newBackground
  }
}

function getSlidesWithChangedSlide(prog: Programm, changedSlide: Slide, changedSlideIndex: number): Array<Slide> {
  let slidesWithChangedSlide: Array<Slide> = [] 
  for(let i = 0; i < prog.currentPresentation.slides.length; i++) {
    i == changedSlideIndex
    ? slidesWithChangedSlide[i] = changedSlide
    : slidesWithChangedSlide[i] = prog.currentPresentation.slides[i]
  }
  return slidesWithChangedSlide
}

function getElemsWithChangedElem(prog: Programm, changedSlideIndex: number, changedElemIndex: number, changedElem: PictureObj | TextObj | ShapeObj): Array<PictureObj | TextObj | ShapeObj> {
  let changedElemsArr: Array<PictureObj | TextObj | ShapeObj> = []

  for(let i = 0; i < prog.currentPresentation.slides[changedSlideIndex].elements.length; i++) {
    i == changedElemIndex
    ? changedElemsArr[i] = changedElem
    : changedElemsArr[i] = prog.currentPresentation.slides[changedSlideIndex].elements[i]
  }

  return changedElemsArr
} 
