import React, { useEffect, useRef} from 'react'
import { changeTextObj, setSelectedElement} from '../Models/changeSlideContent'
import { checkSelectedElem } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch} from '../Models/dispatcher'
import { PictureObj, TextObj, ShapeObj} from '../Models/types'
import './Element.css'

interface OutlineRectProps {
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  id: string
  posX: number
  posY: number
  width: number
  height: number
}

export function OutlineRect(props: OutlineRectProps) {
  let outLineRect: JSX.Element = <rect />
  outLineRect =
    <> 
      <rect   
        id={props.id}
        x={props.posX}
        y={props.posY}  
        width={props.width + 'px'}
        height={props.height + 'px'}
        stroke='black'
        strokeWidth='1'
        strokeDasharray='10, 7'  
        fill='none'
      />

      <circle key={1} id={'1'} ref={props.firstPointRef} cx={props.posX} cy={props.posY} r={5} fill='black' stroke='black'/>

      <circle key={2} id={'2'} ref={props.secondPointRef} cx={props.posX + props.width} cy={props.posY} r={5} fill='black' stroke='black'/>

      <circle key={3} id={'3'} ref={props.thirdPointRef} cx={props.posX} cy={props.posY + props.height} r={5} fill='black' stroke='black'/>

      <circle key={4} id={'4'} ref={props.fourthPointRef} cx={props.posX + props.width} cy={props.posY + props.height} r={5} fill='black' stroke='black'/>
    </>
  return outLineRect
}

interface ShapeObjProps {
  shape: PictureObj | TextObj | ShapeObj
  elemRef:  React.MutableRefObject<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>
  posX: number
  posY: number
  width: number
  height: number
  outlineRect: JSX.Element
}

export function ShapeObject(props: ShapeObjProps) {
  let svgElem: JSX.Element = <rect/>
  if (props.shape.type === 'triangle') {
    const leftPoint= {
      x: props.posX,
      y: Number(props.posY) + Number(props.height)
    }  
    const rightPoint = {
      x: Number(props.posX) + Number(props.width),
      y: Number(props.posY) + Number(props.height)
    } 
    const pickPoint = {
      x: Number(props.posX) + props.width / 2,
      y: props.posY
    }

    svgElem =
    <>   
      {props.outlineRect}  
      <polygon      
        ref={props.elemRef}
        id={props.shape.id}      
        points= {
          leftPoint.x + ' ' + leftPoint.y + ', ' +
          rightPoint.x + ' ' + rightPoint.y + ', ' +
          pickPoint.x + ' ' + pickPoint.y
        }
        fill={props.shape.fillColor} 
        stroke={props.shape.borderColor} 
      />
    </>  
  }

  if (props.shape.type === 'rect') {
    svgElem = 
      <>
        {props.outlineRect} 
        <rect
          ref={props.elemRef}
          id={props.shape.id}
          x={props.posX}
          y={props.posY}  
          width={props.width}
          height={props.height}
          stroke={props.shape.borderColor} 
          fill='rgba(0, 0, 255, 0.2)'
        />
      </>
  }  

  if (props.shape.type === 'circle') {
    svgElem =
      <>
        {props.outlineRect} 
        <ellipse
          ref={props.elemRef} 
          id={props.shape.id}
          cx={props.posX + props.width / 2} 
          cy={props.posY + props.height / 2} 
          rx={props.width / 2}
          ry={props.height / 2} 
          fill={props.shape.fillColor} 
          stroke={props.shape.borderColor} 
        /> 
      </>             
  }

  return svgElem
} 


interface ImgTextObjectProps {
  shape: PictureObj | TextObj | ShapeObj
  elemRef:  React.MutableRefObject<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>
  posX: number
  posY: number
  width: number
  height: number
  outlineRect: JSX.Element
}


export function ImgTextObject(props: ImgTextObjectProps) {
  let svgElem: JSX.Element = <rect/>
  let htmlElem: any

  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if(props.shape.type === 'text') {
      if (!checkSelectedElem(actualProgState, props.shape.id)) {
        dispatch(setSelectedElement, ([String(props.shape.id)]))
        inputRef.current?.focus()
      }
    }  
  }, [props.shape.id])

  if (props.shape.type === 'text') {
    htmlElem = 
      <textarea
        ref={inputRef}
        //type="text"
        onMouseDown={() => inputRef.current?.focus()}
        onChange={(event) => dispatch(changeTextObj, {newParam: event.target.value, paramToChange: 'text'})}
        style={{
          width: props.width, 
          height: props.height, 
          outline: 'unset', 
          border: 'unset',
          fontSize: props.shape.fontSize + 'px',
          fontFamily: props.shape.fontFamily,
          background: 'rgba(0, 0, 255, 0.2)'
        }}
      />
  }

  if (props.shape.type === 'picture') {
    htmlElem = 
      <img 
        src={props.shape.imgB64}
        alt='lis propal'
        style={{
          width: '100%', 
          height: '100%', 
        }}
      />
  } 

  svgElem =
      <>
        <foreignObject
          ref={props.elemRef}          
          id={props.shape.id}
          x={props.posX}
          y={props.posY}
          width={props.width}
          height={props.height}
        >
          {htmlElem}  
        </foreignObject>
        {props.outlineRect}
      </>

  return svgElem
}