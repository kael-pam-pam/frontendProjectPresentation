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
} from './types'


export {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  isTextObj,
  isShapeObj,
  isPictureObj
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
  let changedSlideIndex: number = null
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
  let changedElemIndex: number = null
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id == selectedElem) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}

function isTextObj(elem: any): elem is TextObj {
  return elem.text !== undefined && elem.fontSize !== undefined
}

function isShapeObj(elem: any): elem is ShapeObj {
  return elem.borderColor !== undefined && elem.fillColor !== undefined;
}

function isPictureObj(elem: any): elem is PictureObj {
  return elem.url !== undefined
}


