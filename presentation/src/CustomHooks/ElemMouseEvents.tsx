import React, {useEffect, useRef} from 'react'
import { changeElemPosition, setSelectedElement, resizeElement, removeOneElemFromSelectedElems, setCanDeleteSlide } from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition, getCurrElemSize } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import { setSelectedSlides } from '../Models/slideMoveInProgramm'
import { Point } from '../Models/types'


export {
  useDragAndDropElement,
  useReSizeElement
}



interface dragAndDropProps {
  id: string,
  pos: {x: number, y:number}
  setPos: React.Dispatch<React.SetStateAction<Point>>
  elemRef: React.MutableRefObject<SVGElement | null>
  mainSvgProps: DOMRect | undefined
} 

function useDragAndDropElement(props: dragAndDropProps) {
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

  useEffect(() => {
    if (actualProgState.selectedElements.length > 1) {
      document.addEventListener('mousedown', mouseDownAllElemsHandler)
      return () => document.removeEventListener('mousedown', mouseDownAllElemsHandler)  
    }
  })

  const mouseDownAllElemsHandler = (event: React.MouseEvent | MouseEvent) => {
    if (event.defaultPrevented && checkSelectedElem(actualProgState, props.id)) {
      startPos = {
        x: event.pageX - leftSvgBorder,
        y: event.pageY - topSvgBorder
      }

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }  
  }
  
  
  useEffect(() => {
    props.elemRef.current?.addEventListener('mousedown', mouseDownHandler)
    return () => props.elemRef.current?.removeEventListener('mousedown', mouseDownHandler)  
  })

  const mouseDownHandler = (event: React.MouseEvent | MouseEvent) => {
    if (actualProgState.canDeleteSlides) {
      dispatch(setCanDeleteSlide, false)
    }

    if (!event.defaultPrevented){
      startPos = {
        x: event.pageX - leftSvgBorder,
        y: event.pageY - topSvgBorder
      }
      
      if (!checkSelectedElem(actualProgState, props.id)) {
        if (event.ctrlKey) { 
          dispatch(setSelectedElement, ([...actualProgState.selectedElements, props.id])) 
        } else {
          dispatch(setSelectedElement, ([props.id]))
        } 
      } else if (event.ctrlKey) {
        dispatch(removeOneElemFromSelectedElems, props.id)
      }

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      event.preventDefault()
    }  
  }


  const mouseMoveHandler = (event: React.MouseEvent | MouseEvent) => {
    const modelPos = {
      x: getCurrElemPosition(actualProgState, props.id).x,
      y: getCurrElemPosition(actualProgState, props.id).y
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
    if (startPos.x !== newPos.x && startPos.y !== newPos.y && newPos.x !== 0) {
      dispatch(changeElemPosition, {newX: newPos.x, newY: newPos.y, id: props.id}) 
    } 
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
}

interface resizeProps {
  id: string
  setPos: React.Dispatch<React.SetStateAction<Point>>
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  mainSvgProps: DOMRect | undefined
}

function useReSizeElement(props: resizeProps) {
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
    if (!event.defaultPrevented && actualProgState.selectedElements.length === 1) {
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
        width: getCurrElemSize(actualProgState).width + getCurrElemPosition(actualProgState, props.id).x - newCursPos.x,
        height: getCurrElemSize(actualProgState).height + getCurrElemPosition(actualProgState, props.id).y - newCursPos.y
      }
    }

    if(point === 2) {
      newElemPos = {
        x: getCurrElemPosition(actualProgState, props.id).x,
        y: newCursPos.y
      }
  
      newElemSize = {
        width: newCursPos.x - getCurrElemPosition(actualProgState, props.id).x,
        height: getCurrElemSize(actualProgState).height + (getCurrElemPosition(actualProgState, props.id).y - newCursPos.y)
      }
    }

    if(point === 3) {
      newElemPos = {
      x: newCursPos.x,
      y: getCurrElemPosition(actualProgState, props.id).y
      }

      newElemSize = {
        width: getCurrElemSize(actualProgState).width + getCurrElemPosition(actualProgState, props.id).x - newCursPos.x,
        height: newCursPos.y - getCurrElemPosition(actualProgState, props.id).y
      }
    }

    if(point === 4) {
      newElemPos = {
        x: getCurrElemPosition(actualProgState, props.id).x,
        y: getCurrElemPosition(actualProgState, props.id).y
      }

      newElemSize = {
        width: newCursPos.x - getCurrElemPosition(actualProgState, props.id).x,
        height: newCursPos.y - getCurrElemPosition(actualProgState, props.id).y
      }
    }

    if (newElemSize.width > 10 && newElemSize.height > 10) {
      props.setSize(newElemSize)
      props.setPos(newElemPos)
    }
  }

  const mouseUpResizeHandler = () => {
    if (prevSizeRef.current.width !== newElemSize.width && prevSizeRef.current.height !== newElemSize.height) {
      dispatch(resizeElement, {
        newWidth: newElemSize.width, 
        newHeigth: newElemSize.height, 
        newPosX: newElemPos.x, newPosY: newElemPos.y
      })  
    }
    prevSizeRef.current = newElemSize
    document.removeEventListener('mousemove', mouseMoveResizeHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler) 
  }
}


