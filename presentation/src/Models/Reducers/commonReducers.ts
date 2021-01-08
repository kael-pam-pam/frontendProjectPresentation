import { re_addPictureObj, re_addShapeObj, re_addTextObj, re_changeElemPosition, re_changeTextObj, re_deleteSelectedElements, re_removeOneElemFromSelectedElems, re_resizeElement, re_setCanDeleteSlide, re_setSelectedElement, re_setSlideBackground } from "./slideElemReducers";
import { re_addSlide, re_deleteSlide, re_moveSlide, re_setSelectedSlides } from "./slidesReducers";
import { createProgram } from "../CommonFunctions/mainProgOperations";
import { borderLightType, CommonDeps, MainProg, StateTypes } from "../CommonFunctions/types";
import { ActionType, Programm } from "../CommonFunctions/types";
import { re_goBackArchive, re_goForwardArchive} from "../CommonFunctions/archive";



export function mainReducer(state: Programm = createProgram(), action: ActionType) {
  switch (action.type) {

    case StateTypes.GO_BACK_ARCHIVE:
        return re_goBackArchive()
        
    case StateTypes.GO_FORWARD_ARCHIVE:
        return re_goForwardArchive()

    default:    
        return {
            mainProg: mainProgState(state.mainProg, action),
            commonDeps: {
              canDeleteSlides: canDeleteSlide(state.commonDeps, action),
              elemsMoveCount: elemsMoveCount(state, action),
              saveToArch: saveToArch(state, action),
              slideBorderLight: state.commonDeps.slideBorderLight
            }   
        }    
  }
}

function mainProgState(state: MainProg, action: ActionType): MainProg {
  switch (action.type) {
      case StateTypes.ADD_SLIDE:
        return re_addSlide(state, action)

      case StateTypes.LOAD_PROJECT:
        return action.payload

      case StateTypes.SET_SELECTED_SLIDES:
        return re_setSelectedSlides(state, action)
        
      case StateTypes.DELETE_SLIDE:
        return re_deleteSlide(state, action)

      case StateTypes.MOVE_SLIDE:
        return re_moveSlide(state, action)

      case StateTypes.ADD_SHAPE_OBJ:
        return re_addShapeObj(state, action)
         
      case StateTypes.SET_SELECTED_ELEMENT:
        return re_setSelectedElement(state, action)       

      case StateTypes.CHANGE_ELEM_POSITION:
          return re_changeElemPosition(state, action)    

      case StateTypes.ADD_TEXT_OBJ:
        return re_addTextObj(state, action)

      case StateTypes.SET_SLIDE_BACKGROUND:
        return re_setSlideBackground(state, action)

      case StateTypes.ADD_PICTURE_OBJ:
        return re_addPictureObj(state, action)

      case StateTypes.CHANGE_TEXT_OBJ:
        return re_changeTextObj(state, action)

      //case StateTypes.CHANGE_SHAPE_OBJ:
        //return action.payload

      case StateTypes.RESIZE_ELEMENT:        
        return re_resizeElement(state, action)

      case StateTypes.DELETE_SELECTED_ELEMENTS:
        return re_deleteSelectedElements(state, action)

      case StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS:
        return re_removeOneElemFromSelectedElems(state, action)  

      /*case StateTypes.TOP_SLIDE_BORDER_LIGHT:
          return action.payload
      case StateTypes.BOTTOM_SLIDE_BORDER_LIGHT:
          return action.payload
      case StateTypes.RESET_SLIDE_BORDER_LIGHT:
            return action.payload*/

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


export function canDeleteSlide(state: CommonDeps, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.SET_CAN_DELETE_SLIDE:
      return re_setCanDeleteSlide(state, action).canDeleteSlides
    default:
        return state.canDeleteSlides
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
    case StateTypes.CHANGE_ELEM_POSITION:

        let iterCount = state.commonDeps.elemsMoveCount
        const selectedEelemLength = state.mainProg.selectedElements.length
        iterCount = calcElemsIterations(iterCount, selectedEelemLength)

        return iterCount
    default:
        return state.commonDeps.elemsMoveCount
  }
}