import React, {useState, useEffect, useRef} from 'react'
import { changeElemPosition, setSelectedElement } from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import {Point} from '../Models/types'

interface dragAndDropProps {
  elemRef: React.MutableRefObject<SVGElement | null>
  setPos: React.Dispatch<React.SetStateAction<Point>>
  mainSvgProps: DOMRect | undefined
  elemWidth: number
  elemHeight: number 
} 

export function useDragAndDrop(props: dragAndDropProps) {
  const elemWidth = props.elemWidth
  const elemHeight = props.elemHeight
  const mainSvgProps = props.mainSvgProps 
  const leftSvgBorder = Number(mainSvgProps?.x)
  const topSvgBorder = Number(mainSvgProps?.y)
  const rightSvgBorder =  Number(mainSvgProps?.x) + Number(mainSvgProps?.width)
  const bottomSvgBorder = Number(mainSvgProps?.y) + Number(mainSvgProps?.height)

  let startPos = {
    x: 0,
    y: 0
  }

  let newPos = {
    x: 0,
    y: 0
  }

  const[canReselect, setReselect] = useState(false)
  const prevPosRef = useRef({
    x: 0,
    y: 0
  })

  function checkSvgBorder(newX: number, newY: number ): boolean {
    let inSvgBorder: boolean = false
    if (leftSvgBorder + newX >= leftSvgBorder && leftSvgBorder + newX + elemWidth <= rightSvgBorder
      && topSvgBorder + newY >= topSvgBorder && topSvgBorder + newY + elemHeight <= bottomSvgBorder) {
      inSvgBorder = true
    } 
    return inSvgBorder 
  }

  useEffect(() => {
    props.elemRef.current?.addEventListener('mousedown', mouseDownHandler)
  }, [canReselect]) 

  const mouseDownHandler = (event: React.MouseEvent | MouseEvent) => {
    event.preventDefault()
    startPos = {
      x: event.pageX - leftSvgBorder,
      y: event.pageY - topSvgBorder
    }
    if (!checkSelectedElem(actualProgState, String(props.elemRef.current?.id))) {
      dispatch(setSelectedElement, ([String(props.elemRef.current?.id)]))
    } 
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseDownResetHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      dispatch(setSelectedElement, ([]))
      props.elemRef.current?.removeEventListener('mousedown', mouseDownHandler)
      setReselect(!canReselect)
    }
    document.removeEventListener('mousedown', mouseDownResetHandler)
    event.preventDefault()
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

    //if(checkSvgBorder(newPos.x, newPos.y)) {
      props.setPos(newPos)
    //}  
  }

  const mouseUpHandler = (event: React.MouseEvent | MouseEvent) => {
    if (prevPosRef.current !== newPos && newPos.x !== 0) {
      dispatch(changeElemPosition, {newX: newPos.x, newY: newPos.y})
    }
    prevPosRef.current = newPos

    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.addEventListener('mousedown', mouseDownResetHandler)   
  }
}

