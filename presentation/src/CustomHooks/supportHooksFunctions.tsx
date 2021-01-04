import React  from 'react'
import { checkSecondSlideIsBeyond, checkSelectedElem } from '../Models/CommonFunctions/supportFunctionsConst'
import { MainProg, Programm, Slide } from '../Models/CommonFunctions/types'


export {
  setSelectedElemsInHook,
  setSelectedSlidesInHook,
  checkSlideForReplace
}


interface setSelectedElemsProps {
  selectedElements: Array<string>,
  setSelectedElement: (elemsArr: Array<string>) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  event: React.MouseEvent | MouseEvent, 
  elemId: string
}


function setSelectedElemsInHook(props: setSelectedElemsProps) {
  if (!checkSelectedElem(props.selectedElements, props.elemId)) {
    if (props.event.ctrlKey) { 
      props.setSelectedElement([...props.selectedElements, props.elemId]) 
    } else {
      props.setSelectedElement([props.elemId])
    } 
  } else if (props.event.ctrlKey) {
    //props.removeOneElemFromSelectedElems(props.elemId)
  }
}

interface setSelectedSlidesProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  removeOneElemFromSelectedSlides: (slideId: string) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  
  event: React.MouseEvent | MouseEvent, 
  slideId: string
}

function setSelectedSlidesInHook(props: setSelectedSlidesProps) {
  const canDeleteSlides = props.canDeleteSlides
  const selectedSlides = props.selectedSlides
  const selectedElements = props.selectedElements
  if (!canDeleteSlides) {   
    props.setCanDeleteSlide(true)
  }

  if (!selectedSlides.includes(props.slideId)) {  
    if (props.event.ctrlKey) { 
      props.setSelectedSlides([...selectedSlides, props.slideId])
    } else {
      props.setSelectedSlides([props.slideId])
    }
  } else if (selectedSlides.length > 1) {
    if (props.event.ctrlKey) {
      props.removeOneElemFromSelectedSlides(props.slideId)  
    } else {
      props.setSelectedSlides([props.slideId])
    }
  }   
  
  if (selectedElements.length !== 0) {
    props.setSelectedElement([])
  }
}



interface chekSlideReplaceProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  event: React.MouseEvent | MouseEvent,
  svgRef: React.MutableRefObject<SVGSVGElement | null>, 
  slideId: string
}


function checkSlideForReplace(props: chekSlideReplaceProps): boolean {
  let canMoveSlide = false;
  let correctCursorPos = false;
  const mousePosY = props.event.pageY
  const svgPosY = Number(props.svgRef.current?.getBoundingClientRect().y)
  const svgHeight = Number(props.svgRef.current?.getBoundingClientRect().height)
  const selectedSlideId = props.selectedSlides[0]
  const otherSlideId = props.slideId
  const otherSlideIsBeyond = checkSecondSlideIsBeyond(props.slides, selectedSlideId, otherSlideId)

  const elemsArrLength = props.selectedElements.length
  const slidesArrLength = props.selectedSlides.length

  const slideHeightLimit = svgPosY + (svgHeight / 2)

  if ((!otherSlideIsBeyond && mousePosY < slideHeightLimit) || (otherSlideIsBeyond && mousePosY > slideHeightLimit)) {
    correctCursorPos = true
  }

  if(correctCursorPos && elemsArrLength === 0 && slidesArrLength === 1 && !props.event.ctrlKey) {
    canMoveSlide = true
  } 
  
  return canMoveSlide
}