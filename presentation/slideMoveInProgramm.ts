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
  createNewId
} from './commonFunctionsConst'

export {
  createDefaultSlide,
  addSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  moveSlide,
  setSelectedSlides,
  deleteSlide
}

function createDefaultSlide(): Slide {  
  return {
      id: createNewId(),
      background: {
          hexColor: 0,
          type: 'color'
      },
      elements: [],
  }
}

function addSlide(prog: Programm): Programm {         
  const curSlide: Slide = createDefaultSlide();

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: [
              ...prog.currentPresentation.slides,
              curSlide
          ]
      },
      selectedSlides: [curSlide.id]
  }    
}


function supportSlidesWithoutSelectedSlides(slides: Array<Slide>, selectedSlides: Array<string>): Array<Slide> {
  return [
      ...slides.filter((e) => !selectedSlides.includes(e.id))                                                  // ?                   
  ]
}

function supportSortingSelectedSlides(slides: Array<Slide> , selectedSlides: Array<string>): Array<Slide> {
  let sortedSelectedSlides: Array<Slide> = [];
  for (let i = 0; i < slides.length; i++) {
      if (selectedSlides.includes(slides[i].id)){
          sortedSelectedSlides = [...sortedSelectedSlides, slides[i]];
      }
  }
  return sortedSelectedSlides
}


function moveSlide(prog: Programm, posBefore: number): Programm {
  let sortedSelectedSlides: Array<Slide> = supportSortingSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
  let slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
  
  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: 
              (posBefore == 0) 
              ? [...sortedSelectedSlides, ...slidesWithoutSelectedSlides]
              : (prog.currentPresentation.slides.length == posBefore)
              //TODO: не так как в оригинале!
              ? [...slidesWithoutSelectedSlides, ...sortedSelectedSlides]
              : [
                  ...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore),
                  ...sortedSelectedSlides,
                  ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore)
                ]
      }
  }
}

function setSelectedSlides(prog: Programm, selectedSlides: Array<string>): Programm {
  return {
      ...prog,
      selectedSlides: selectedSlides
  }
}

function deleteSlide(prog: Programm): Programm {
  let oldPos: number = prog.currentPresentation.slides.length - 1;
  for (let i = 0; i < prog.currentPresentation.slides.length; i++) {
      if ((prog.selectedSlides.includes(prog.currentPresentation.slides[i].id)) && (oldPos > i)) { // .id
          oldPos = i;
      }
  }

  return {
      ...prog,
      currentPresentation: {
          ...prog.currentPresentation,
          slides: supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides)
      },
      selectedSlides: 
          (prog.currentPresentation.slides.length == 0) 
          ? []
          : (prog.currentPresentation.slides.length - 1 <= oldPos)
          ? [prog.currentPresentation.slides[oldPos].id]
          : [prog.currentPresentation.slides[prog.currentPresentation.slides.length - 1].id]
  }
}

