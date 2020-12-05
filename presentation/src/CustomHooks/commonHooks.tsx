import React, {useEffect, useRef} from 'react'
import { changeElemPosition, resizeElement } from '../Models/changeSlideContent'
import { getCurrElemPosition, getCurrElemSize, isPictureObj, searchChangedElemIndex, searchChangedSlideIndex } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import {PictureObj, Point, ShapeObj, TextObj} from '../Models/types'


interface UpdateElemProps {
  setPos: React.Dispatch<React.SetStateAction<Point>>
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  elemPosX: number,
  elemPosY: number, 
  elemWidth: number,
  elemHeight: number
}

export function useUpdateElemAfterSlideChanged(props: UpdateElemProps) {
  useEffect(() => {
    props.setPos({
      x: props.elemPosX,
      y: props.elemPosY
    }) 
    props.setSize({
      width: props.elemWidth,
      height: props.elemHeight
    })
  }, [actualProgState.selectedSlides])
} 

interface NormalizeImgProps {
  imgWidth: number,
  imgHeight: number, 
  svgWidth: number, 
  svgHeight: number,
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
}

export function useNormalizeImgSize(props: NormalizeImgProps){
  useEffect(() => {    
    if (props.imgWidth >= props.svgWidth || props.imgHeight >= props.svgHeight) {
      let newImgSize = {
        width: props.imgWidth,
        height: props.imgHeight
      }
      let imgIndex = 0

      if (props.imgWidth >= props.imgHeight) {
        imgIndex = props.imgWidth / props.imgHeight
      } else {
        imgIndex = props.imgHeight / props.imgWidth
      }

      if (props.imgWidth >= props.svgWidth) {
        newImgSize.width = props.svgWidth - 100
        newImgSize.height = newImgSize.width / imgIndex
      } else {
        newImgSize.height = props.svgHeight - 100
        newImgSize.width = newImgSize.height / imgIndex
      }
      props.setSize(newImgSize)
    }
  }) 
}


interface resizeProps {
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  setPos: React.Dispatch<React.SetStateAction<Point>>
  mainSvgProps: DOMRect | undefined
  elemRef: React.MutableRefObject<SVGElement | null>
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
  }, [props.firstPointRef.current])

  const addListnersPreventMouseDown = (event: React.MouseEvent | MouseEvent) => {
    document.addEventListener('mousemove', mouseMoveResizeHandler)
    document.addEventListener('mouseup', mouseUpResizeHandler)
    event.preventDefault()
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
    let index = Number((640 / 480).toFixed(2))
    let newIndex = Number((newElemSize.height / newElemSize.width).toFixed(2))

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
    if (point === 1) {
      document.removeEventListener('mousedown', mouseDownLeftTopHandler)
    }
    if (point === 2) {
      document.removeEventListener('mousedown', mouseDownRightTopHandler)
    }
    if (point === 3) {
      document.removeEventListener('mousedown', mouseDownLeftBottomHandler)
    }
    if (point === 4) {
      document.removeEventListener('mousedown', mouseDownRightBottomHandler)
    }
    document.removeEventListener('mouseup', mouseUpResizeHandler) 
  }
}
