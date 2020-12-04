import React, {useEffect, useRef} from 'react'
import { render } from '../index'
import { changeElemPosition, setSelectedElement } from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import {Point} from '../Models/types'

interface dragAndDropProps {
  elemRef: React.MutableRefObject<SVGElement | null>
  setPos: React.Dispatch<React.SetStateAction<Point>>
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
    document.addEventListener('mousedown', mouseDownResetHandler)  
  }, [actualProgState.selectedElements]) 


  const mouseDownHandler = (event: React.MouseEvent | MouseEvent) => {
      startPos = {
        x: event.pageX - leftSvgBorder,
        y: event.pageY - topSvgBorder
      }

      if (!checkSelectedElem(actualProgState, String(props.elemRef.current?.id))) {  
        dispatch(setSelectedElement, ([String(props.elemRef.current?.id)])) 
        render()
      }

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      event.preventDefault()  
  }

  const mouseDownResetHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented && checkSelectedElem(actualProgState, String(props.elemRef.current?.id))) {
      dispatch(setSelectedElement, ([]))
      props.elemRef.current?.removeEventListener('mousedown', mouseDownHandler)
      document.removeEventListener('mousedown', mouseDownResetHandler)
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

