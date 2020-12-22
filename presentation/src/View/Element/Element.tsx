import React, { useState, useRef, useEffect} from 'react'
import { checkSelectedElem, searchChangedSlideIndex } from '../../Models/CommonFunctions/supportFunctionsConst'

import { PictureObj, TextObj, ShapeObj} from '../../Models/CommonFunctions/types'
import './Element.css'
import { useDragAndDropElement, useReSizeElement} from '../../CustomHooks/ElemMouseEvents'
import { useMouseDownDocumentListner} from '../../CustomHooks/CommonMouseKeyboardEvents'
import { ImgTextObject, OutlineRect, ShapeObject } from './SvgElems'
import { useNormalizeElemSize } from '../../CustomHooks/CommonDifferentHooks'
import { getState } from '../../index'

export {
  SmallSlideElement,
  BigSlideElement
}


function SmallSlideElement(shape: PictureObj | TextObj | ShapeObj) {
  let width = shape.wigth / 10
  let height = shape.height / 10
  let posX = shape.position.x  / 10
  let posY = shape.position.y  / 10

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)

  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (shape.type === 'rect' || shape.type === 'triangle'  || shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      outlineRect={outLineRect}
    />
  }

  if (shape.type === 'picture' || shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      outlineRect={outLineRect}
      isSmallElem={true}
    />
  }

  return (svgElem)
}


interface BigSlideElementProps {
  shape: PictureObj | TextObj | ShapeObj
  svgProps: React.MutableRefObject<SVGSVGElement | null>
}

function BigSlideElement(props: BigSlideElementProps) {
  const actualProgState = getState().mainProg 

  const id = props.shape.id

  const mainSvgProps = props.svgProps.current?.getBoundingClientRect()
  const svgWidth = Number(mainSvgProps?.width)
  const svgHeight = Number(mainSvgProps?.height)

  const elemPosX = props.shape.position.x
  const elemPosY = props.shape.position.y
  const elemWidth = props.shape.wigth
  const elemHeight = props.shape.height

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)
  const firstPointRef = useRef<SVGCircleElement | null>(null)
  const secondPointRef = useRef<SVGCircleElement | null>(null)
  const thirdPointRef = useRef<SVGCircleElement | null>(null)
  const fourthPointRef = useRef<SVGCircleElement | null>(null)

  const[pos, setPos] = useState({x: elemPosX, y: elemPosY})

  const[elemSize, setSize] = useState({width: elemWidth, height: elemHeight})


  useNormalizeElemSize({setSize, elemWidth, elemHeight, svgWidth, svgHeight})

  useDragAndDropElement({id: props.shape.id, pos, setPos, elemRef, mainSvgProps})

  useReSizeElement ({id: props.shape.id, setPos, setSize, firstPointRef, secondPointRef, thirdPointRef, fourthPointRef, mainSvgProps})  

  useEffect(() => {
      setPos({x: elemPosX, y: elemPosY})
      setSize({width: elemWidth, height: elemHeight})
  }, [actualProgState])
  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (checkSelectedElem(id)) {
    outLineRect = <OutlineRect 
      firstPointRef={firstPointRef}
      secondPointRef={secondPointRef}
      thirdPointRef={thirdPointRef}
      fourthPointRef={fourthPointRef}
      id={id}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
    />
  }

  if (props.shape.type === 'rect' || props.shape.type === 'triangle'  || props.shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      outlineRect={outLineRect}
    />
  }

  if (props.shape.type === 'picture' || props.shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      outlineRect={outLineRect}
      isSmallElem={false}
    />
  }
  
  return (svgElem)
}

