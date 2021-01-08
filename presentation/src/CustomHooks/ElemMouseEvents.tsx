import React, {useEffect, useRef} from 'react'
import { store } from '..'
import { checkSelectedElem, getCurrElemPosition, getCurrElemSize } from '../Models/CommonFunctions/supportFunctionsConst'
import { MainProg, Point, Programm, Slide } from '../Models/CommonFunctions/types'
import { setSelectedElemsInHook } from './supportHooksFunctions'


export {
  useDragAndDropElement,
  useReSizeElement
}


interface dragAndDropProps {
  id: string,
  slides: Array<Slide>,
  selectedElements: Array<string>,
  selectedSlides: Array<string>,
  canDeleteSlides: boolean,
  
  elemRef: React.MutableRefObject<SVGElement | null>
  mainSvgProps: DOMRect | undefined

  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  changeElemPosition: (newX: number, newY: number, id: string) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  setPos: React.Dispatch<React.SetStateAction<Point>>
} 

function useDragAndDropElement(props: dragAndDropProps) {
  const mainSvgProps = props.mainSvgProps 
  const leftSvgBorder = Number(mainSvgProps?.x)
  const topSvgBorder = Number(mainSvgProps?.y)

  const modelPos = {
    x: getCurrElemPosition(props.slides, props.selectedSlides, props.id).x,
    y: getCurrElemPosition(props.slides, props.selectedSlides, props.id).y
  }

  const selectedElemsLength = props.selectedElements.length

  let startPos = {
    x: 0,
    y: 0
  }

  let newPos = {
    x: 0,
    y: 0
  }

  useEffect(() => {
    if (selectedElemsLength > 1) {
      document.addEventListener('mousedown', mouseDownAllElemsHandler)
      return () => document.removeEventListener('mousedown', mouseDownAllElemsHandler)  
    }
  })

  const mouseDownAllElemsHandler = (event: React.MouseEvent | MouseEvent) => {
    if (event.defaultPrevented && checkSelectedElem(props.selectedElements, props.id)) {
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
    if (props.canDeleteSlides) {
      props.setCanDeleteSlide(false)
    }

    if (!event.defaultPrevented){
      startPos = {
        x: event.pageX - leftSvgBorder,
        y: event.pageY - topSvgBorder
      }

      setSelectedElemsInHook({
        selectedElements: props.selectedElements,
        setSelectedElement: props.setSelectedElement,
        removeOneElemFromSelectedElems: props.removeOneElemFromSelectedElems,
        event, 
        elemId: props.id
      })
      

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      event.preventDefault()
    }  
  }


  const mouseMoveHandler = (event: React.MouseEvent | MouseEvent) => {


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

  const mouseUpHandler = () => {
    if (startPos.x !== newPos.x && startPos.y !== newPos.y && newPos.x !== 0) {
      props.changeElemPosition(newPos.x, newPos.y, props.id) 
    } 
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
}

interface resizeProps {
  id: string,
  selectedElements: Array<string>,
  selectedSlides: Array<string>,
  slides: Array<Slide>,  

  setSelectedElement: (elemsArr: Array<string>) => void,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) => void,
  setPos: React.Dispatch<React.SetStateAction<Point>>,
  setSize: React.Dispatch<React.SetStateAction<{width: number, height: number}>>,

  firstPointRef: React.MutableRefObject<SVGCircleElement | null>,
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>,
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>,
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>,
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
    const selectedElemsLength = props.selectedElements.length
    if (!event.defaultPrevented) {
      if (selectedElemsLength > 1) {
        props.setSelectedElement([props.id])
      }
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
  
    const modelProgState = store.getState().mainProg
    const slides = modelProgState.currentPresentation.slides
    const selectedSlides = modelProgState.selectedSlides

    const modelElemSize = getCurrElemSize(slides, selectedSlides, props.id)
    const modelElemPosition = getCurrElemPosition(slides, selectedSlides, props.id)

    newCursPos = {
      x: event.pageX - leftSvgBorder,
      y: event.pageY - topSvgBorder
    }

    if(point === 1) {
      newElemPos = newCursPos
    
      newElemSize = {
        width: modelElemSize.width + modelElemPosition.x - newCursPos.x,
        height: modelElemSize.height + modelElemPosition.y - newCursPos.y
      }
    }

    if(point === 2) {
      newElemPos = {
        x: modelElemPosition.x,
        y: newCursPos.y
      }
  
      newElemSize = {
        width: newCursPos.x - modelElemPosition.x,
        height: modelElemSize.height + modelElemPosition.y - newCursPos.y
      }
    }

    if(point === 3) {
      newElemPos = {
        x: newCursPos.x,
        y: modelElemPosition.y
      }

      newElemSize = {
        width: modelElemSize.width + modelElemPosition.x - newCursPos.x,
        height: newCursPos.y - modelElemPosition.y
      }
    }

    if(point === 4) {
      newElemPos = {
        x: modelElemPosition.x,
        y: modelElemPosition.y
      }

      newElemSize = {
        width: newCursPos.x - modelElemPosition.x,
        height: newCursPos.y - modelElemPosition.y
      }
    }

    if (newElemSize.width > 10 && newElemSize.height > 10) {
      props.setSize(newElemSize)
      props.setPos(newElemPos)
    }
    
  }

  const mouseUpResizeHandler = () => {
    
    if (prevSizeRef.current.width !== newElemSize.width && prevSizeRef.current.height !== newElemSize.height) {
          console.log('resize')
          props.resizeElement(
            newElemSize.width, 
            newElemSize.height, 
            newElemPos.x,
            newElemPos.y, 
            props.id
          )  
    }
    prevSizeRef.current = newElemSize
    document.removeEventListener('mousemove', mouseMoveResizeHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler) 
  }
}


