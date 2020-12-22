import React  from 'react'
import { removeOneElemFromSelectedElems, setCanDeleteSlide, setSelectedElement} from '../Models/ActionCreators/slideElemActionCreators'
import { getState, dispatch } from '../index'
import { removeOneElemFromSelectedSlides, setSelectedSlides } from '../Models/ActionCreators/slidesActionCreators'
import { checkSecondSlideIsBeyond, checkSelectedElem } from '../Models/CommonFunctions/supportFunctionsConst'


export {
  setSelectedElemsInHook,
  setSelectedSlidesInHook,
  checkSlideForReplace
}


function setSelectedElemsInHook(event: React.MouseEvent | MouseEvent, elemId: string) {
  const prevProgState = getState().mainProg
  if (!checkSelectedElem(elemId)) {
    if (event.ctrlKey) { 
      dispatch(setSelectedElement([...prevProgState.selectedElements, elemId])) 
    } else {
      dispatch(setSelectedElement([elemId]))
    } 
  } else if (event.ctrlKey) {
    dispatch(removeOneElemFromSelectedElems(elemId))
  }
}


function setSelectedSlidesInHook(event: React.MouseEvent | MouseEvent, slideId: string) {
  const canDeleteSlides = getState().commonDeps.canDeleteSlides
  const selectedSlides = getState().mainProg.selectedSlides
  const selectedElements = getState().mainProg.selectedElements
  if (!canDeleteSlides) {   
    dispatch(setCanDeleteSlide(true))
  }

  if (!selectedSlides.includes(slideId)) {  
    if (event.ctrlKey) { 
      dispatch(setSelectedSlides([...selectedSlides, slideId]))
    } else {
      dispatch(setSelectedSlides([slideId]))
    }
  } else if (selectedSlides.length > 1) {
    if (event.ctrlKey) {
      dispatch(removeOneElemFromSelectedSlides(slideId))  
    } else {
      dispatch(setSelectedSlides([slideId]))
    }
  }   
  
  if (selectedElements.length !== 0) {
    dispatch(setSelectedElement([]))
  }
}


function checkSlideForReplace(event: React.MouseEvent | MouseEvent, svgRef: React.MutableRefObject<SVGSVGElement | null>, slideId: string): boolean {
  let canMoveSlide = false;
  let correctCursorPos = false;
  const mousePosY = event.pageY
  const svgPosY = Number(svgRef.current?.getBoundingClientRect().y)
  const svgHeight = Number(svgRef.current?.getBoundingClientRect().height)
  const selectedSlideId = getState().mainProg.selectedSlides[0]
  const otherSlideId = slideId
  const otherSlideIsBeyond = checkSecondSlideIsBeyond(selectedSlideId, otherSlideId)

  const elemsArrLength = getState().mainProg.selectedElements.length
  const slidesArrLength = getState().mainProg.selectedSlides.length

  const slideHeightLimit = svgPosY + (svgHeight / 2)

  if ((!otherSlideIsBeyond && mousePosY < slideHeightLimit) || (otherSlideIsBeyond && mousePosY > slideHeightLimit)) {
    correctCursorPos = true
  }

  if(correctCursorPos && elemsArrLength === 0 && slidesArrLength === 1 && !event.ctrlKey) {
    canMoveSlide = true
  } 
  
  return canMoveSlide
}