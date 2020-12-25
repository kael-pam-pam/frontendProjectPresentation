import { getState } from "../../index";
import { re_addShapeObj } from "../ActionCreators/slideElemActionCreators";
import { re_addSlide, re_moveSlide } from "../ActionCreators/slidesActionCreators";
import { createProgram } from "../CommonFunctions/mainProgOperations";
import { borderLightType, MainProg, StateTypes } from "../CommonFunctions/types";
import { ActionType, Programm } from "../CommonFunctions/types";



export function mainReducer(state: Programm = createProgram(), action: ActionType): Programm {
  return {
      mainProg: mainProgState(state.mainProg, action),
      commonDeps: {
        canDeleteSlides: canDeleteSlide(state.commonDeps.canDeleteSlides, action),
        elemsMoveCount: elemsMoveCount(state, action),
        saveToArch: saveToArch(state, action)
      }   
  }
}

export function mainProgState(state: MainProg, action: ActionType): MainProg {
  switch (action.type) {
      case StateTypes.ADD_SLIDE:
        return re_addSlide(state, action)

      case StateTypes.LOAD_PROJECT:
        return action.payload
      case StateTypes.GO_BACK_ARCHIVE:
        return action.payload.mainProg
      case StateTypes.GO_FORWARD_ARCHIVE:
        return action.payload.mainProg 

      case StateTypes.SET_SELECTED_SLIDES:
          return action.payload
      case StateTypes.DELETE_SLIDE:
        return action.payload
      case StateTypes.MOVE_SLIDE:
        return re_moveSlide(state, action)

      case StateTypes.ADD_SHAPE_OBJ:
        return re_addShapeObj(state, action)
        
      case StateTypes.CHANGE_ELEM_POSITION:
        return action.payload  
      case StateTypes.SET_SELECTED_ELEMENT:
        return action.payload       
      case StateTypes.ADD_TEXT_OBJ:
        return action.payload
      case StateTypes.SET_SLIDE_BACKGROUND:
        return action.payload
      case StateTypes.ADD_PICTURE_OBJ:
        return action.payload
      case StateTypes.CHANGE_TEXT_OBJ:
        return action.payload
      case StateTypes.CHANGE_SHAPE_OBJ:
        return action.payload
      case StateTypes.RESIZE_ELEMENT:
        return action.payload
      case StateTypes.CHANGE_ELEM_POSITION:
        return action.payload
      case StateTypes.DELETE_SELECTED_ELEMENTS:
        return action.payload
      case StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS:
        return action.payload  

      case StateTypes.TOP_SLIDE_BORDER_LIGHT:
          return action.payload
      case StateTypes.BOTTOM_SLIDE_BORDER_LIGHT:
          return action.payload
      case StateTypes.RESET_SLIDE_BORDER_LIGHT:
            return action.payload

      default:
          return state
  }
}

export function slideBorderLight(state: borderLightType, action: ActionType): borderLightType {
  switch (action.type) {
    case StateTypes.TOP_SLIDE_BORDER_LIGHT:
        return action.payload
    case StateTypes.BOTTOM_SLIDE_BORDER_LIGHT:
        return action.payload
    case StateTypes.RESET_SLIDE_BORDER_LIGHT:
          return action.payload    
    default:
        return 'unset'
  }  
}


function saveToArch(state: Programm, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.ADD_PICTURE_OBJ:
      return false
    case StateTypes.GO_FORWARD_ARCHIVE: 
      return false
    case StateTypes.GO_BACK_ARCHIVE: 
      return false 
    case StateTypes.CHANGE_ELEM_POSITION:
      let saveToArch = true
      let selectElemsArrLength = state.mainProg.selectedElements.length
      let elemsMoveCount = state.commonDeps.elemsMoveCount
      if (selectElemsArrLength > 1 && elemsMoveCount < selectElemsArrLength) {
        saveToArch = false
      }
      return saveToArch     
    default:
      return true
  }
}


export function canDeleteSlide(state: boolean, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.GO_BACK_ARCHIVE:
        console.log(action.payload)
        return action.payload.commonDeps.canDeleteSlides
    case StateTypes.GO_FORWARD_ARCHIVE:
        return action.payload.commonDeps.canDeleteSlides  
    case StateTypes.SET_CAN_DELETE_SLIDE:
      return action.payload.canDeleteSlides
    default:
        return state
  }
}

function calcElemsIterations(iterCount: number, elemsCount:number): number {
  let count: number = iterCount
  if (count == elemsCount || elemsCount == 1) {
    count = 0
  } 
  if (count < elemsCount) {
    count++
  }

  return count
}

function elemsMoveCount(state: Programm, action: ActionType): number {
  switch (action.type) {
    case StateTypes.GO_BACK_ARCHIVE:
        return action.payload.commonDeps.elemsMoveCount
    case StateTypes.GO_FORWARD_ARCHIVE:
        return action.payload.commonDeps.elemsMoveCount 
    case StateTypes.CHANGE_ELEM_POSITION:

        let iterCount = state.commonDeps.elemsMoveCount
        const selectedEelemLength = state.mainProg.selectedElements.length
        iterCount = calcElemsIterations(iterCount, selectedEelemLength)

        return iterCount
    default:
        return state.commonDeps.elemsMoveCount
  }
}