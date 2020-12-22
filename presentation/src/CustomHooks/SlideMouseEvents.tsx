import React, { useEffect } from 'react'
import { store, getState, dispatch } from '..'
import { checkSecondSlideIsBeyond, getSlidesWithChangedSlide, searchChangedSlideIndex, searchChangedSlideIndexById } from '../Models/CommonFunctions/supportFunctionsConst'
import { moveSlide } from '../Models/ActionCreators/slidesActionCreators'
import { borderLightType, Slide, StateTypes } from '../Models/CommonFunctions/types'
import { checkSlideForReplace, setSelectedSlidesInHook } from './supportHooksFunctions'
import { setSlideBorderLight } from '../Models/ActionCreators/slidesActionCreators'

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
      setSelectedSlidesInHook(event, props.currSlide.id)
      event.preventDefault()
    }  
  }

  useEffect(() => {
    const selectedSlides = getState().mainProg.selectedSlides
    if (props.isSmallSlide && !selectedSlides.includes(props.currSlide.id)) {
      props.svgRef.current?.addEventListener('mouseup', mouseUpSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mouseup', mouseUpSelectSlide)
    }
  })

  const mouseUpSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (checkSlideForReplace(event, props.svgRef, props.currSlide.id)) {

      const secondSlideId: string = props.currSlide.id 
      const index = searchChangedSlideIndexById(secondSlideId)
      dispatch(moveSlide(index))

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
    const selectedSlides = getState().mainProg.selectedSlides
    if (props.isSmallSlide && selectedSlides[0] !== props.currSlide.id) {
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    const selectedSlides = getState().mainProg.selectedSlides
    if (event.defaultPrevented && selectedSlides.length === 1) {

      props.svgRef.current?.addEventListener('mouseenter', mouseEnterNotSelectSlide)
      props.divRef.current?.addEventListener('mouseleave', mouseLeaveNotSelectSlide)
      document.addEventListener('mouseup', mouseUpNotSelectSlide)

      
    }  
  }


  const mouseEnterNotSelectSlide = (event: MouseEvent) => {
    const selectedSlides = getState().mainProg.selectedSlides

    if (props.isSmallSlide && selectedSlides[0] !== props.currSlide.id){
      const selectedSlideId = selectedSlides[0]
      const otherSlideId = props.currSlide.id
      if (checkSecondSlideIsBeyond(selectedSlideId, otherSlideId)) {
        console.log(checkSlideForReplace(event, props.svgRef, props.currSlide.id))
        props.divRef.current?.classList.add('slide-frame_selected__bottom')
      } else {
        //dispatch(setSlideBorderLight('top', props.currSlide.id))
        props.divRef.current?.classList.add('slide-frame_selected__top')
      }
    }
  }

  const mouseLeaveNotSelectSlide = () => {
    //dispatch(setSlideBorderLight('unset', props.currSlide.id))
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