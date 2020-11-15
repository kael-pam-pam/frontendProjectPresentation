import {

    Programm,
/*
    Presentation,
    ArchiveOfState,
*/
    Slide,
/*
    Point,
    ElementObj,
    Picture,
    PictureObj,
    TextObj,
    Color,
    ShapeObj
*/
} from './types'

import {
    createNewId
  } from './commonFunctionsConst'

export {
    createDefaultSlide,
    addSlide,
/*
    supportSlidesWithoutSelectedSlides,
    supportSortingSelectedSlides,
    moveSlide,
    setSelectedSlides,
    deleteSlide
*/
}

  function createDefaultSlide(): Slide {  
    return {
        id: createNewId(),
        background: {
            hexColor: '#e0c7c1',
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
        selectedSlides: [curSlide.id],
        selectedElements: []
    }    
  }