import React, { useEffect } from 'react'
import { setSelectedElement, setCanDeleteSlide } from '../Models/changeSlideContent'
import { checkSecondSlideIsBeyond, searchChangedSlideIndexById } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import { moveSlide, removeOneElemFromSelectedSlides, setSelectedSlides } from '../Models/slideMoveInProgramm'
import { Slide } from '../Models/types'

export {
  useDragAndDropSlides,
  useLighSlideInsertPlace
}


interface dragAndDropSlidesProps {
  currSlide: Slide
  svgRef: React.MutableRefObject<SVGSVGElement | null>
  isSmallSlide: boolean
} 

function useDragAndDropSlides(props: dragAndDropSlidesProps) {

  useEffect(() => {
    if(props.isSmallSlide) {
      props.svgRef.current?.addEventListener('mousedown', mouseDownSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mousedown', mouseDownSelectSlide)
    }
  })


  const mouseDownSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    
    if (!event.defaultPrevented ) {
      if (!actualProgState.canDeleteSlides) {   
        dispatch(setCanDeleteSlide, true)
      }

      if (!actualProgState.selectedSlides.includes(props.currSlide.id)) {  
        if (event.ctrlKey) { 
          dispatch(setSelectedSlides, ([...actualProgState.selectedSlides, props.currSlide.id]))
        } else {
          dispatch(setSelectedSlides, ([props.currSlide.id]))
        }
      } else if (actualProgState.selectedSlides.length > 1) {
        if (event.ctrlKey) {
          dispatch(removeOneElemFromSelectedSlides, props.currSlide.id)  
        } else {
          dispatch(setSelectedSlides, ([props.currSlide.id]))
        }
      }   
      
      if (actualProgState.selectedElements.length !== 0) {
        dispatch(setSelectedElement, ([]))
      }

      event.preventDefault()
    }  
  }

  useEffect(() => {
    if (props.isSmallSlide && !actualProgState.selectedSlides.includes(props.currSlide.id)) {
      props.svgRef.current?.addEventListener('mouseup', mouseUpSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mouseup', mouseUpSelectSlide)
    }
  })

  function checkMousePosOverSlide(event: React.MouseEvent | MouseEvent): boolean {
    let canMoveSlide = false;
    const mousePosY = event.pageY
    const svgPosY = Number(props.svgRef.current?.getBoundingClientRect().y)
    const svgHeight = Number(props.svgRef.current?.getBoundingClientRect().height)
    const selectedSlideId = actualProgState.selectedSlides[0]
    const otherSlideId = props.currSlide.id
    const otherSlideIsBeyond = checkSecondSlideIsBeyond(actualProgState, selectedSlideId, otherSlideId)

    const slideHeightLimit = svgPosY + (svgHeight / 2)
  
    console.log(otherSlideIsBeyond, mousePosY, svgPosY + (svgHeight / 2))
    if ((!otherSlideIsBeyond && mousePosY < slideHeightLimit) || (otherSlideIsBeyond && mousePosY > slideHeightLimit)) {
      canMoveSlide = true
    }


    return canMoveSlide
  }

  const mouseUpSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    const elemsArrLength = actualProgState.selectedElements.length
    const slidesArrLength = actualProgState.selectedSlides.length 


    if (checkMousePosOverSlide(event) && elemsArrLength === 0 && slidesArrLength === 1 && !event.ctrlKey) {
  
      const secondSlideId: string = props.currSlide.id 
      const index = searchChangedSlideIndexById(actualProgState, secondSlideId)
      dispatch(moveSlide, index)
    }
  } 
} 



interface lighInsertPlaceProps {
  currSlide: Slide
  svgRef: React.MutableRefObject<SVGSVGElement | null>
  divRef: React.MutableRefObject<HTMLDivElement | null>
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
  isSmallSlide: boolean
} 

function useLighSlideInsertPlace(props: lighInsertPlaceProps) {   //переделать через модель

  useEffect(() => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id) {
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (event.defaultPrevented && actualProgState.selectedSlides.length === 1) {
      props.svgRef.current?.addEventListener('mouseenter', mouseEnterNotSelectSlide)
      props.divRef.current?.addEventListener('mouseleave', mouseLeaveNotSelectSlide)
      document.addEventListener('mouseup', mouseUpNotSelectSlide)
      event.preventDefault()
    }  
  }

  const mouseEnterNotSelectSlide = (event: MouseEvent) => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id){
      const selectedSlideId = actualProgState.selectedSlides[0]
      const otherSlideId = props.currSlide.id
      if (checkSecondSlideIsBeyond(actualProgState, selectedSlideId, otherSlideId)) {
        props.divRef.current?.classList.add('slide-frame_selected__bottom')
      } else {
        props.divRef.current?.classList.add('slide-frame_selected__top')
      }
    }
  }

  const mouseLeaveNotSelectSlide = () => {
    props.divRef.current?.classList.remove('slide-frame_selected__top')
    props.divRef.current?.classList.remove('slide-frame_selected__bottom')
  }

  const mouseUpNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    props.divRef.current?.classList.remove('slide-frame_selected__top')
    props.divRef.current?.classList.remove('slide-frame_selected__bottom')
    props.svgRef.current?.removeEventListener('mouseenter', mouseEnterNotSelectSlide)
    document.removeEventListener('mouseup', mouseUpNotSelectSlide)
  }
}