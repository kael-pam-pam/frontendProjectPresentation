import {
  Programm,
  Slide,
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
  deleteSlide,
  removeOneElemFromSelectedSlides
}

function createDefaultSlide(): Slide {  
  return {
      id: createNewId(),
      background: {
          hexColor: '#fff',
          type: 'color'
      },
      elements: []
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
      selectedSlides: [curSlide.id],
      selectedElements: []
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
      selectedSlides: selectedSlides,
      selectedElements: []
  }
}

function deleteSlide(prog: Programm): Programm {
  let oldPos: number = prog.currentPresentation.slides.length - 1;

  for (let i = 0; i < prog.currentPresentation.slides.length; i++) {
    if ((prog.selectedSlides.includes(prog.currentPresentation.slides[i].id)) && (oldPos >= i)) {
      oldPos = i;
    }
  }

  const slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides)

  return {
    ...prog,
    currentPresentation: {
    ...prog.currentPresentation,
    slides: slidesWithoutSelectedSlides
    },
    selectedSlides:
      (slidesWithoutSelectedSlides.length === 0) // временно 1(для работы с 1 слайдом), поменять на 0
      ? []
      : (slidesWithoutSelectedSlides.length - 1 < oldPos)
      ? [slidesWithoutSelectedSlides[oldPos - 1].id]
      : (slidesWithoutSelectedSlides.length - 1 == oldPos)
      ? [slidesWithoutSelectedSlides[oldPos].id]
      : [slidesWithoutSelectedSlides[slidesWithoutSelectedSlides.length - 1].id]
  } 
}


function removeOneElemFromSelectedSlides(prog: Programm, id: string): Programm {
  const selectedSlides: Array<string> = [...prog.selectedSlides]
  let newSlides: Array<string> = []
  for(let i = 0; i < selectedSlides.length; i++) {
    if (selectedSlides[i] !== id) {
      newSlides.push(selectedSlides[i])
    }
  }

  return {
      ...prog,
      selectedSlides: newSlides
  }
}


//id тоже копируется, получается 2 слайда с одинаковым id. Нужна копия всего слайда без айдишника
