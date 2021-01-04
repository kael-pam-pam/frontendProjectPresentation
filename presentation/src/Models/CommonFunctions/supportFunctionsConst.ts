import { connect } from 'react-redux'

import {
  Programm,
  MainProg,
  Slide,
  SlideId,
  Point,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
  ChangedObjPosType,
} from './types'


export {
  defaultPoint,
  createNewId,
  createSlideId,
  checkSecondSlideIsBeyond,
  searchChangedSlideIndexById,
  searchChangedElemIndexById,
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
  isChangedElemPosType,
  checkSelectedElem,
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
  getElemsWithChangedElem,
  getCurrElemPosition,
  getCurrElemSize
}


export let globalActiveTool: number = 0;

export function setGlobalActiveTool(state: number): void {
    globalActiveTool = state;
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

function createSlideId(isSmallSlide: boolean): string {
  let id: string = createNewId()
  if (isSmallSlide) {
    id += '.small'
  }
  return id
}

function checkSecondSlideIsBeyond(slides: Array<Slide>, firstSlideId: string, secondSlideId: string): boolean {
  let secondSlideIsBeyond = false;
  const firstSlideIndex = searchChangedSlideIndexById(slides, firstSlideId)
  const secondSlideIndex = searchChangedSlideIndexById(slides, secondSlideId)
  if (secondSlideIndex > firstSlideIndex) {
    secondSlideIsBeyond = true
  }
  return secondSlideIsBeyond
}

function searchChangedSlideIndexById(slides: Array<Slide>, id: string): number {
  const searchSlideId = id
  let changedSlideIndex: number = 0
  for (let i = 0; i < slides.length; i++) {     
      if (slides[i].id == searchSlideId) {
          changedSlideIndex = i
      }
  }
  return changedSlideIndex
}


function searchChangedSlideIndex(slides: Array<Slide>, selectedSlides: Array<string>): number {
  const selectedSlide = selectedSlides[0]
  let changedSlideIndex: number = 0
  for (let i = 0; i < slides.length; i++) {     
      if (slides[i].id == selectedSlide) {
          changedSlideIndex = i
      }
  }
  return changedSlideIndex
}


function searchChangedElemIndex(prog: MainProg, changedSlideIndex: number): number {
  const elems = prog.currentPresentation.slides[changedSlideIndex].elements
  let selectedElem = prog.selectedElements[prog.selectedElements.length - 1]
  let changedElemIndex: number = -1
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id == selectedElem) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}

function searchChangedElemIndexById(slides: Array<Slide>, changedSlideIndex: number, id: string): number {
  const elems = slides[changedSlideIndex].elements
  let changedElemIndex: number = -1
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id === id) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}

function getCurrElemPosition(slides: Array<Slide>, selectedSlides: Array<string>, id: string): Point {
  let elemX: number = 0
  let elemY: number = 0
  const changedSlideIndex = searchChangedSlideIndex(slides, selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(slides, changedSlideIndex, id)
  let changedElem = getChangedElem(slides, changedSlideIndex, changedElemIndex)
  if (changedElem != undefined) {
    elemX = changedElem.position.x
    elemY = changedElem.position.y
  } 
  return {
    x: elemX,
    y: elemY
  }
}

function getCurrElemSize(slides: Array<Slide>, selectedSlides: Array<string>, id: string): {width: number, height: number} {
  
  let width: number = 0
  let height: number = 0
  const changedSlideIndex = searchChangedSlideIndex(slides, selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(slides, changedSlideIndex, id)
  let changedElem = getChangedElem(slides, changedSlideIndex, changedElemIndex)
  if (changedElem != undefined) {
    width = changedElem.wigth
    height = changedElem.height
  } 
  return {
    width: width,
    height: height
  }
}

function checkSelectedElem(selectedElements: Array<String>, currElemId: string): boolean {
  let elemIsSelected: boolean = false
  let selectedElemId: string = '-1'
  
  if (selectedElements.includes(currElemId))
  {
    elemIsSelected = true
  }

  return elemIsSelected
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

function isProgramm(elem: any): elem is MainProg {
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

function isChangedElemPosType(obj: any): obj is {newX: number, newY: number, id: string} {
  return obj.newX !== undefined && obj.newY !== undefined && obj.id !== undefined
}


function getChangedSlideObj(prog: MainProg, changedSlideIndex: number): Slide {
  return {...prog.currentPresentation.slides[changedSlideIndex]}
}

function getSlidesWithoutChangedSlide(prog: MainProg, changedSlideIndex: number): Array<Slide> {
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

function getElemsWithoutChangedElem(prog: MainProg, changedElemIndex: number, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements.filter((elem) => 
  elem != prog.currentPresentation.slides[changedSlideIndex].elements[changedElemIndex])] 
}

function getElemsWithNewElem(prog: MainProg, newElem: PictureObj | TextObj | ShapeObj, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements, newElem]
}

function getChangedElem(slides: Array<Slide>, changedSlideIndex: number, changedElemIndex: number): PictureObj | TextObj | ShapeObj {
  return slides[changedSlideIndex].elements[changedElemIndex]
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

function getNewResizedElem(changedElem: PictureObj | TextObj | ShapeObj, newWidth: number, newHeigth: number, newPosX: number, newPosY: number): PictureObj | TextObj | ShapeObj {
  return {
    ...changedElem,
    position: {
      x: newPosX,
      y: newPosY
    },
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

function getSlideWithNewBackground(prog: MainProg, changedSlideIndex: number, newBackground: Picture | Color): Slide {
  return {
    ...prog.currentPresentation.slides[changedSlideIndex],
    background: newBackground
  }
}

function getSlidesWithChangedSlide(prog: MainProg, changedSlide: Slide, changedSlideIndex: number): Array<Slide> {
  let slidesWithChangedSlide: Array<Slide> = [] 
  for(let i = 0; i < prog.currentPresentation.slides.length; i++) {
    i == changedSlideIndex
      ? slidesWithChangedSlide[i] = changedSlide
      : slidesWithChangedSlide[i] = prog.currentPresentation.slides[i]
  }
  return slidesWithChangedSlide
}

function getElemsWithChangedElem(prog: MainProg, changedSlideIndex: number, changedElemIndex: number, changedElem: PictureObj | TextObj | ShapeObj): Array<PictureObj | TextObj | ShapeObj> {
  let changedElemsArr: Array<PictureObj | TextObj | ShapeObj> = []

  for(let i = 0; i < prog.currentPresentation.slides[changedSlideIndex].elements.length; i++) {
    i === changedElemIndex
      ? changedElemsArr[i] = changedElem
      : changedElemsArr[i] = prog.currentPresentation.slides[changedSlideIndex].elements[i]
  }

  return changedElemsArr
} 
