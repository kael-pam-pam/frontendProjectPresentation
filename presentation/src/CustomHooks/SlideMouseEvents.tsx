import React, { useEffect } from 'react'
import { checkSecondSlideIsBeyond, searchChangedSlideIndexById } from '../Models/CommonFunctions/supportFunctionsConst'
import { borderLightType, MainProg, Programm, Slide, StateTypes } from '../Models/CommonFunctions/types'
import { checkSlideForReplace, setSelectedSlidesInHook } from './supportHooksFunctions'

export {
  useDragAndDropSlides,
  useLighSlideInsertPlace
}


interface dragAndDropSlidesProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  moveSlide: (index: number) => void,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  removeOneElemFromSelectedSlides: (slideId: string) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  currSlide: Slide,
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
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

      setSelectedSlidesInHook({
        event, 
        slideId: props.currSlide.id,
        slides: props.slides,
        selectedSlides: props.selectedSlides,
        selectedElements: props.selectedElements,
        canDeleteSlides: props.canDeleteSlides,
        setSelectedSlides: props.setSelectedSlides,
        setCanDeleteSlide: props.setCanDeleteSlide,
        removeOneElemFromSelectedSlides: props.removeOneElemFromSelectedSlides,
        setSelectedElement: props.setSelectedElement
      })

      event.preventDefault()
    }  
  }

  useEffect(() => {
    const selectedSlides = props.selectedSlides
    if (props.isSmallSlide && !selectedSlides.includes(props.currSlide.id)) {
      props.svgRef.current?.addEventListener('mouseup', mouseUpSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mouseup', mouseUpSelectSlide)
    }
  })

  const mouseUpSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (checkSlideForReplace({
        slides: props.slides,
        selectedSlides: props.selectedSlides,
        selectedElements: props.selectedElements,
        event, 
        svgRef: props.svgRef, 
        slideId: props.currSlide.id
        })) {
      const secondSlideId: string = props.currSlide.id 
      const index = searchChangedSlideIndexById(props.slides, secondSlideId)
      console.log(index)
      props.moveSlide(index)

    }
  } 
}


interface lighInsertPlaceProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  currSlide: Slide,
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
  divRef: React.MutableRefObject<HTMLDivElement | null>,
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null,
  isSmallSlide: boolean
} 

function useLighSlideInsertPlace(props: lighInsertPlaceProps) {   //переделать через модель

  useEffect(() => {
    const selectedSlides = props.selectedSlides
    if (props.isSmallSlide && selectedSlides[0] !== props.currSlide.id) {
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    const selectedSlides = props.selectedSlides
    if (event.defaultPrevented && selectedSlides.length === 1) {

      props.svgRef.current?.addEventListener('mouseenter', mouseEnterNotSelectSlide)
      props.divRef.current?.addEventListener('mouseleave', mouseLeaveNotSelectSlide)
      document.addEventListener('mouseup', mouseUpNotSelectSlide)

      
    }  
  }


  const mouseEnterNotSelectSlide = (event: MouseEvent) => {
    const selectedSlides = props.selectedSlides

    if (props.isSmallSlide && selectedSlides[0] !== props.currSlide.id){
      const selectedSlideId = selectedSlides[0]
      const otherSlideId = props.currSlide.id
      if (checkSecondSlideIsBeyond(props.slides, selectedSlideId, otherSlideId)) {
      
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