import React, {useEffect, useRef} from 'react'
import { changeElemPosition, setSelectedElement, resizeElement } from '../Models/changeSlideContent'
import { checkSecondSlideIsBeyond, checkSelectedElem, getCurrElemPosition, getCurrElemSize, searchChangedSlideIndexById } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import { moveSlide, setSelectedSlides } from '../Models/slideMoveInProgramm'
import {Point, Slide} from '../Models/types'

interface dragAndDropProps {
  setPos: React.Dispatch<React.SetStateAction<Point>>
  elemRef: React.MutableRefObject<SVGElement | null>
  mainSvgProps: DOMRect | undefined
} 

export function useDragAndDropElements(props: dragAndDropProps) {
  const mainSvgProps = props.mainSvgProps 
  const leftSvgBorder = Number(mainSvgProps?.x)
  const topSvgBorder = Number(mainSvgProps?.y)

  let startPos = {
    x: 0,
    y: 0
  }

  let newPos = {
    x: 0,
    y: 0
  }

  const prevPosRef = useRef({
    x: 0,
    y: 0
  })  



  useEffect(() => {
    props.elemRef.current?.addEventListener('mousedown', mouseDownHandler)
    return () => props.elemRef.current?.removeEventListener('mousedown', mouseDownHandler)  
  })

  const mouseDownHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented){
      startPos = {
        x: event.pageX - leftSvgBorder,
        y: event.pageY - topSvgBorder
      }

      if (!checkSelectedElem(actualProgState, String(props.elemRef.current?.id))) {  
        dispatch(setSelectedElement, ([String(props.elemRef.current?.id)])) 
      } 
      event.preventDefault()
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }  
  }

  const mouseMoveHandler = (event: React.MouseEvent | MouseEvent) => {
    const modelPos = {
      x: getCurrElemPosition(actualProgState).x,
      y: getCurrElemPosition(actualProgState).y
    }

    const delta = {
      x: event.pageX - leftSvgBorder - startPos.x,
      y: event.pageY - topSvgBorder - startPos.y
    }

    newPos = {
      x: modelPos.x + delta.x,
      y: modelPos.y + delta.y
    }

    props.setPos(newPos)
  }

  const mouseUpHandler = (event: React.MouseEvent | MouseEvent) => {
    if (prevPosRef.current.x !== newPos.x && prevPosRef.current.y !== newPos.y && newPos.x !== 0) {
      dispatch(changeElemPosition, {newX: newPos.x, newY: newPos.y})
    } 
    prevPosRef.current = newPos
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
}

interface resizeProps {
  setPos: React.Dispatch<React.SetStateAction<Point>>
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  mainSvgProps: DOMRect | undefined
}

export function useReSizeElem(props: resizeProps) {
  const mainSvgProps = props.mainSvgProps 
  const leftSvgBorder = Number(mainSvgProps?.x)
  const topSvgBorder = Number(mainSvgProps?.y)

  let newCursPos = {
    x: 0,
    y: 0
  }

  let newElemSize = {
    width: 0,
    height: 0
  }

  let newElemPos = {
    x: 0,
    y: 0
  }

  const prevSizeRef = useRef({
    width: 0,
    height: 0
  })

  let point = 0

  useEffect(() => {
      props.firstPointRef.current?.addEventListener('mousedown', mouseDownLeftTopHandler)
      props.secondPointRef.current?.addEventListener('mousedown', mouseDownRightTopHandler)
      props.thirdPointRef.current?.addEventListener('mousedown', mouseDownLeftBottomHandler)
      props.fourthPointRef.current?.addEventListener('mousedown', mouseDownRightBottomHandler)
      return () => {
        document.removeEventListener('mousedown', mouseDownLeftTopHandler)
        document.removeEventListener('mousedown', mouseDownRightTopHandler)
        document.removeEventListener('mousedown', mouseDownLeftBottomHandler)
        document.removeEventListener('mousedown', mouseDownRightBottomHandler)
      }
  })

  const addListnersPreventMouseDown = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      document.addEventListener('mousemove', mouseMoveResizeHandler)
      document.addEventListener('mouseup', mouseUpResizeHandler)
      event.preventDefault()
    }  
  }

  const mouseDownLeftTopHandler = (event: React.MouseEvent | MouseEvent) => {
    point = 1
    addListnersPreventMouseDown(event)
  }

  const mouseDownRightTopHandler = (event: React.MouseEvent | MouseEvent) => {
    point = 2
    addListnersPreventMouseDown(event)
  }

  const mouseDownLeftBottomHandler = (event: React.MouseEvent | MouseEvent) => {
    point = 3
    addListnersPreventMouseDown(event)
  }

  const mouseDownRightBottomHandler = (event: React.MouseEvent | MouseEvent) => {
    point = 4
    addListnersPreventMouseDown (event)
  }


  const mouseMoveResizeHandler = (event: React.MouseEvent | MouseEvent) => {
    newCursPos = {
      x: event.pageX - leftSvgBorder,
      y: event.pageY - topSvgBorder
    }

    if(point === 1) {
      newElemPos = newCursPos
    
      newElemSize = {
        width: getCurrElemSize(actualProgState).width + getCurrElemPosition(actualProgState).x - newCursPos.x,
        height: getCurrElemSize(actualProgState).height + getCurrElemPosition(actualProgState).y - newCursPos.y
      }
    }

    if(point === 2) {
      newElemPos = {
        x: getCurrElemPosition(actualProgState).x,
        y: newCursPos.y
      }
  
      newElemSize = {
        width: newCursPos.x - getCurrElemPosition(actualProgState).x,
        height: getCurrElemSize(actualProgState).height + (getCurrElemPosition(actualProgState).y - newCursPos.y)
      }
    }

    if(point === 3) {
      newElemPos = {
      x: newCursPos.x,
      y: getCurrElemPosition(actualProgState).y
      }

      newElemSize = {
        width: getCurrElemSize(actualProgState).width + getCurrElemPosition(actualProgState).x - newCursPos.x,
        height: newCursPos.y - getCurrElemPosition(actualProgState).y
      }
    }

    if(point === 4) {
      newElemPos = {
        x: getCurrElemPosition(actualProgState).x,
        y: getCurrElemPosition(actualProgState).y
      }

      newElemSize = {
        width: newCursPos.x - getCurrElemPosition(actualProgState).x,
        height: newCursPos.y - getCurrElemPosition(actualProgState).y
      }
    }

    if (newElemSize.width > 10 && newElemSize.height > 10) {
      props.setSize(newElemSize)
      props.setPos(newElemPos)
    }
  }

  const mouseUpResizeHandler = () => {
    if (prevSizeRef.current.width !== newElemSize.width && prevSizeRef.current.height !== newElemSize.height) {
      dispatch(changeElemPosition, {newX: newElemPos.x, newY: newElemPos.y})
      dispatch(resizeElement, {newWidth: newElemSize.width, newHeigth: newElemSize.height})  
    }
    prevSizeRef.current = newElemSize
    document.removeEventListener('mousemove', mouseMoveResizeHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler) 
  }
}


interface dragAndDropSlidesProps {
  currSlide: Slide
  svgRef: React.MutableRefObject<SVGSVGElement | null>
  isSmallSlide: boolean
} 

export function useDragAndDropSlides(props: dragAndDropSlidesProps) {

  useEffect(() => {
    if(props.isSmallSlide) {
      props.svgRef.current?.addEventListener('mousedown', mouseDownSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mousedown', mouseDownSelectSlide)
    }
  })

  const mouseDownSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      dispatch(setSelectedElement, [])
      if (!actualProgState.selectedSlides.includes(props.currSlide.id)) {
        dispatch(setSelectedSlides, ([props.currSlide.id])) // [...actualProgState.selectedSlides, currSlide.id])
      }
      event.preventDefault()
    }  
  }

  useEffect(() => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id) {
      props.svgRef.current?.addEventListener('mouseup', mouseUpSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mouseup', mouseUpSelectSlide)
    }
  })

  const mouseUpSelectSlide = (event: React.MouseEvent | MouseEvent) => {
      if (actualProgState.selectedElements.length === 0) {
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

export function useLighSlideInsertPlace(props: lighInsertPlaceProps) {

  useEffect(() => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id) {
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (event.defaultPrevented) {
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

