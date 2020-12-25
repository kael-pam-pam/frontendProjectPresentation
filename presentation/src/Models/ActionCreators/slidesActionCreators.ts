import {
  StateTypes,
  Slide,
  borderLightType,
  Programm,
  ActionType,
  MainProg,
} from '../CommonFunctions/types'

import {
  createNewId, getSlidesWithChangedSlide, searchChangedSlideIndex, searchChangedSlideIndexById
} from '../CommonFunctions/supportFunctionsConst'

import { getState } from '../../index'
import { getSlideWithChangedBorderLight } from './slideElemActionCreators'
import { createProgram } from 'typescript'

export {
  createDefaultSlide,
  re_addSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  re_moveSlide,
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
      elements: [],
      slideBorderLight: 'unset'
  }
}



function re_addSlide(state: MainProg, action: ActionType) { 
  switch (action.type) {
    case StateTypes.ADD_SLIDE: 
      const prevProgState = state     
      const curSlide: Slide = createDefaultSlide();
      console.log('add')
      return {
          ...prevProgState,
          currentPresentation: {
              ...prevProgState.currentPresentation,
              slides: [
                  ...prevProgState.currentPresentation.slides,
                  curSlide
              ]
          },
          selectedSlides: [curSlide.id],
          selectedElements: []
      }
    default:
      return {...state}     
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

function re_moveSlide(state: MainProg, action: ActionType) {

  switch (action.type) {
    case StateTypes.MOVE_SLIDE:
      const prog = state
      const posBefore = action.payload

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
              ? [...slidesWithoutSelectedSlides, ...sortedSelectedSlides]
              : [
                  ...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore),
                  ...sortedSelectedSlides,
                  ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore)
                ]
        }
      }
    default:
      return {...state}  
  }
}

function setSelectedSlides(selectedSlides: Array<string>) {
  const prevProgState = getState().mainProg
  return {
    type: StateTypes.SET_SELECTED_SLIDES,
    payload: {
      ...prevProgState,
      selectedSlides: selectedSlides,
      selectedElements: []
    }  
  }
}

function deleteSlide() {

  const prevProgState = getState().mainProg

  let oldPos: number = prevProgState.currentPresentation.slides.length - 1;

  for (let i = 0; i < prevProgState.currentPresentation.slides.length; i++) {
    if ((prevProgState.selectedSlides.includes(prevProgState.currentPresentation.slides[i].id)) && (oldPos >= i)) {
      oldPos = i;
    }
  }

  const slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(prevProgState.currentPresentation.slides, prevProgState.selectedSlides)

  return {
    type: StateTypes.DELETE_SLIDE,
    payload: {
      ...prevProgState,
      currentPresentation: {
      ...prevProgState.currentPresentation,
      slides: slidesWithoutSelectedSlides
      },
      selectedSlides:
        (slidesWithoutSelectedSlides.length === 0) 
        ? []
        : (slidesWithoutSelectedSlides.length - 1 < oldPos)
        ? [slidesWithoutSelectedSlides[oldPos - 1].id]
        : (slidesWithoutSelectedSlides.length - 1 == oldPos)
        ? [slidesWithoutSelectedSlides[oldPos].id]
        : [slidesWithoutSelectedSlides[slidesWithoutSelectedSlides.length - 1].id]
    }    
  } 
}


function removeOneElemFromSelectedSlides(id: string) {

  const prevProgState = getState().mainProg

  const selectedSlides: Array<string> = [...prevProgState.selectedSlides]
  let newSlides: Array<string> = []
  for(let i = 0; i < selectedSlides.length; i++) {
    if (selectedSlides[i] !== id) {
      newSlides.push(selectedSlides[i])
    }
  }

  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES,
    payload: {
      ...prevProgState,
      selectedSlides: newSlides
    }  
  }
}

export function setSlideBorderLight(prevProgState: MainProg, borderLight: borderLightType, slideId: string) {
  const changedSlideIndex: number = searchChangedSlideIndexById(prevProgState, slideId)
  const slideWithChangedBorder: Slide = getSlideWithChangedBorderLight(borderLight, changedSlideIndex)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(prevProgState, slideWithChangedBorder, changedSlideIndex)
  let borderLightAction = StateTypes.RESET_SLIDE_BORDER_LIGHT

  if (borderLight == 'top') {
    borderLightAction = StateTypes.TOP_SLIDE_BORDER_LIGHT
  }
  if (borderLight == 'bottom') {
    borderLightAction = StateTypes.BOTTOM_SLIDE_BORDER_LIGHT
  }
  
  return {
    type: borderLightAction,
    payload: {
      ...prevProgState,
      currentPresentation: {
      ...prevProgState.currentPresentation,
      slides: slidesWithChangedSlide
      }
    } 
  }
}

