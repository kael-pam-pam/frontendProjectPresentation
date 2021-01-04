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

import { getSlideWithChangedBorderLight } from '../Reducers/slideElemReducers'
import { createProgram } from 'typescript'

export {
  createDefaultSlide,
  re_addSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  re_moveSlide,
  re_setSelectedSlides,
  re_deleteSlide,
  re_removeOneElemFromSelectedSlides
}

function createDefaultSlide(): Slide {  
  return {
      id: createNewId(),
      background: {
          hexColor: '#fff',
          type: 'color'
      },
      elements: [],
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

function re_setSelectedSlides(state: MainProg, action: ActionType) {
  return {
      ...state,
      selectedSlides: action.payload,
      selectedElements: []
  }
}

function re_deleteSlide(state: MainProg) {


  let oldPos: number = state.currentPresentation.slides.length - 1;

  for (let i = 0; i < state.currentPresentation.slides.length; i++) {
    if ((state.selectedSlides.includes(state.currentPresentation.slides[i].id)) && (oldPos >= i)) {
      oldPos = i;
    }
  }

  const slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(state.currentPresentation.slides, state.selectedSlides)

  return {
    ...state,
    currentPresentation: {
    ...state.currentPresentation,
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


function re_removeOneElemFromSelectedSlides(state: MainProg, action: ActionType) {

  const selectedSlides: Array<string> = [...state.selectedSlides]
  let newSlides: Array<string> = []
  for(let i = 0; i < selectedSlides.length; i++) {
    if (selectedSlides[i] !== action.payload) {
      newSlides.push(selectedSlides[i])
    }
  }

  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES,
    payload: {
      ...state,
      selectedSlides: newSlides
    }  
  }
}

export function setSlideBorderLight(state: MainProg, borderLight: borderLightType, slideId: string) {
  const changedSlideIndex: number = searchChangedSlideIndexById(state.currentPresentation.slides, slideId)
  const slideWithChangedBorder: Slide = getSlideWithChangedBorderLight(state, borderLight, changedSlideIndex)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedBorder, changedSlideIndex)
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
      ...state,
      currentPresentation: {
      ...state.currentPresentation,
      slides: slidesWithChangedSlide
      }
    } 
  }
}

