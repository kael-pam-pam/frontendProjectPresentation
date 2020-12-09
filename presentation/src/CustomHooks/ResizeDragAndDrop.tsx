import React, {useEffect, useRef} from 'react'
import { changeElemPosition, setSelectedElement, resizeElement } from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition, getCurrElemSize } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import {Point} from '../Models/types'

interface dragAndDropProps {
  setPos: React.Dispatch<React.SetStateAction<Point>>
  elemRef: React.MutableRefObject<SVGElement | null>
  mainSvgProps: DOMRect | undefined
} 

export function useDragAndDrop(props: dragAndDropProps) {
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


