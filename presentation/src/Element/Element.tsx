import React, { useState, useEffect, useRef} from 'react'
import { changeElemPosition,changeTextObj,resizeElement, setSelectedElement} from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition, getCurrElemSize, isPictureObj, isShapeObj, isTextObj} from '../Models/commonFunctionsConst'
import { actualProgState, dispatch} from '../Models/dispatcher'
import { PictureObj, TextObj, ShapeObj} from '../Models/types'
import './Element.css'
import { useDragAndDrop, useReSizeElem } from '../CustomHooks/ResizeDragAndDrop'
import { useMouseDownDocumentListner, useNormalizeElemSize} from '../CustomHooks/commonHooks'
import { ImgTextObject, OutlineRect, ShapeObject } from './SvgElems'


export function SmallSlideElement(props: PictureObj | TextObj | ShapeObj) {
  const elemId = props.id
  let width = props.wigth / 10
  let height = props.height / 10
  let posX = props.position.x  / 10
  let posY = props.position.y  / 10
  let id = props.id
  let svgElem: any

  if (isTextObj(props)) {
    svgElem =
      <text 
        id={id + '.txt'}
        x={posX}
        y={posY}
        width={width}
        height={height}
        fontFamily={props.fontFamily}
        fontSize={Number(props.fontSize) / 10}
      >
        {props.text}
      </text>
  }

  if (isPictureObj(props)) {
    svgElem =
      <image 
        x={posX}
        y={posY}
        width={width} 
        height={height}
        href={props.url} 
      />
  }

  if (isShapeObj(props)) {
    if (props.type == 'outlineRect') {
      svgElem = 
        <rect
        />
    }

    if (props.type == 'rect') {
      svgElem = 
        <rect
          id={id}
          x={posX}
          y={posY}  
          width={width}
          height={height}
          stroke={props.borderColor} 
          fill={props.fillColor}
        />
    }  

    if (props.type == 'circle') {
      svgElem = 
        <circle 
          id={id}
          cx={posX + width/2} 
          cy={posY + height/2} 
          r={width/2} 
          fill={props.fillColor} 
          stroke={props.borderColor} 
        />          
    }

    if (props.type == 'triangle') {
      const leftPoint= {
        x: posX,
        y: Number(posY) + Number(height)
      }  
      const rightPoint = {
        x: Number(posX) + Number(width),
        y: Number(posY) + Number(height)
      } 
      const pickPoint = {
        x: Number(posX) + width/2,
        y: posY
      }

      svgElem = 
        <polygon 
          id={id}      
          points= {
            leftPoint.x + ' ' + leftPoint.y + ', ' +
            rightPoint.x + ' ' + rightPoint.y + ', ' +
            pickPoint.x + ' ' + pickPoint.y
          }
          fill={props.fillColor} 
          stroke={props.borderColor} 
        />         
    } 
  }

  return (<polygon/>)
}


interface BigSlideElementProps {
  shape: PictureObj | TextObj | ShapeObj
  svgProps: React.MutableRefObject<SVGSVGElement | null>
}

export function BigSlideElement(props: BigSlideElementProps) {
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

  useMouseDownDocumentListner(elemRef)

  useDragAndDrop({setPos, elemRef, mainSvgProps})

  useReSizeElem ({setPos, setSize, firstPointRef, secondPointRef, thirdPointRef, fourthPointRef, mainSvgProps})  

  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (checkSelectedElem(actualProgState, id)) {
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
    />
  }
  
  return (svgElem)
}


