import {
    Programm,
/*
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
*/
} from './types'

export {
/*
    defaultPoint,
*/    
    createNewId,
    searchChangedSlideIndex,
/*
    searchChangedElemIndex,
    deepFreeze,
*/
    isProgramm,
/*
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
*/
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

function isProgramm(elem: any): elem is Programm {
    return elem.currentPresentation !== undefined
}

function createNewId(): string {
    const max = 300
    const min = 10
    const randomNum = Math.floor(Math.random() * (max - min)) + min
    const newId = String((new Date()).getTime() % 10 ** 8 + randomNum)
    return newId
  }
