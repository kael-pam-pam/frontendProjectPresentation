import React, { useState, useEffect, useRef} from 'react'
import { changeElemPosition,resizeElement, setSelectedElement} from '../Models/changeSlideContent'
import { checkSelectedElem, getCurrElemPosition, getCurrElemSize, isPictureObj, isShapeObj, isTextObj} from '../Models/commonFunctionsConst'
import { actualProgState, dispatch} from '../Models/dispatcher'
import { PictureObj, TextObj, ShapeObj} from '../Models/types'
import './Element.css'
import { useDragAndDrop } from '../CustomHooks/dragAndDrop'
import { useNormalizeImgSize, useReSizeElem, useUpdateElemAfterSlideChanged } from '../CustomHooks/commonHooks'


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

  const mainSvgProps = props.svgProps.current?.getBoundingClientRect()
  let id = props.shape.id

  const elemRef = useRef<any | null>(null)
  const[pos, setPos] = useState({x: props.shape.position.x, y: props.shape.position.y})
  useDragAndDrop({elemRef, setPos, mainSvgProps})

  
  const firstPointRef = useRef<SVGCircleElement | null>(null)
  const secondPointRef = useRef<SVGCircleElement | null>(null)
  const thirdPointRef = useRef<SVGCircleElement | null>(null)
  const fourthPointRef = useRef<SVGCircleElement | null>(null)

  
  const[elemSize, setSize] = useState({width: props.shape.wigth, height: props.shape.height})

  useReSizeElem ({
    firstPointRef, 
    secondPointRef, 
    thirdPointRef, 
    fourthPointRef, 
    setSize, 
    setPos,
    mainSvgProps
  })

  useNormalizeImgSize({
    imgWidth: elemSize.width,
    imgHeight: elemSize.height, 
    svgWidth: Number(mainSvgProps?.width), 
    svgHeight: Number(mainSvgProps?.height),
    setSize
  })


  useUpdateElemAfterSlideChanged({
    setPos, 
    setSize, 
    elemPosX: props.shape.position.x, 
    elemPosY: props.shape.position.y,
    elemWidth: props.shape.wigth,
    elemHeight: props.shape.height
  })  
  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />
  if (checkSelectedElem(actualProgState, id)) {
    outLineRect =
    <> 
      <rect
        id={id}
        x={pos.x}
        y={pos.y}  
        width={elemSize.width + 'px'}
        height={elemSize.height + 'px'}
        stroke='black'
        strokeWidth='1'
        strokeDasharray='10, 7'  
        fill='none'
      />

      <circle key={1} id={'1'} ref={firstPointRef} cx={pos.x} cy={pos.y} r={5} fill='black' stroke='black'/>

      <circle key={2} id={'2'} ref={secondPointRef} cx={pos.x + elemSize.width} cy={pos.y} r={5} fill='black' stroke='black'/>

      <circle key={3} id={'3'} ref={thirdPointRef} cx={pos.x} cy={pos.y + elemSize.height} r={5} fill='black' stroke='black'/>

      <circle key={4} id={'4'} ref={fourthPointRef} cx={pos.x + elemSize.width} cy={pos.y + elemSize.height} r={5} fill='black' stroke='black'/>
    </>
  }

  if (props.shape.type == 'triangle') {
    const leftPoint= {
      x: pos.x,
      y: Number(pos.y) + Number(elemSize.height)
    }  
    const rightPoint = {
      x: Number(pos.x) + Number(elemSize.width),
      y: Number(pos.y) + Number(elemSize.height)
    } 
    const pickPoint = {
      x: Number(pos.x) + elemSize.width / 2,
      y: pos.y
    }

    svgElem =
    <>   
      {outLineRect}  
      <polygon      
        ref={elemRef}
        //onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
        id={id}      
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

  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if(isTextObj(props.shape)) {
      dispatch(setSelectedElement, ([String(elemRef.current?.id)]))
      inputRef.current?.focus()
    }  
  }, [props.shape])
 
  const [actualText, setActualText] = useState(isTextObj(props.shape) ? props.shape.text : '')
 
  if (isTextObj(props.shape)) {
    svgElem =
      <>
        {outLineRect}
        <foreignObject
          ref={elemRef}          
          id={id}
          x={pos.x}
          y={pos.y}
          width={elemSize.width}
          height={elemSize.height}
        >
          <input
            ref={inputRef}
            type="text"
            value={actualText}
            //onMouseDown={() => inputRef.current?.focus()}
            onChange={(event) => setActualText(event.target.value)}
            style={{
              width: elemSize.width, 
              height: elemSize.height, 
              outline: 'unset', 
              border: 'unset',
              fontSize: props.shape.fontSize + 'px',
              fontFamily: props.shape.fontFamily,
              background: 'rgba(0, 0, 255, 0.2)'
          }}/>
        </foreignObject>
      </>  
  }

  if (isPictureObj(props.shape)) {
    const src = props.shape.imgB64
  
    svgElem =
      <>
        <image
          ref={elemRef} 
          id={id}
          x={pos.x}
          y={pos.y}
          width={elemSize.width} 
          height={elemSize.height}
          href={src}        
        />
        {outLineRect} 
      </>  
  }

  if (isShapeObj(props.shape)) {
    if (props.shape.type == 'rect') { 
      svgElem = 
        <>
          {outLineRect} 
          <rect
            ref={elemRef}
            id={id}
            x={pos.x}
            y={pos.y}  
            width={elemSize.width}
            height={elemSize.height}
            stroke={props.shape.borderColor} 
            fill='rgba(0, 0, 255, 0.2)'
          />
        </>  
    }  

    if (props.shape.type === 'circle') {
      svgElem =
        <>
          {outLineRect} 
          <ellipse
            ref={elemRef} 
            id={id}
            cx={pos.x + elemSize.width / 2} 
            cy={pos.y + elemSize.height / 2} 
            rx={elemSize.width / 2}
            ry={elemSize.height / 2} 
            fill={props.shape.fillColor} 
            stroke={props.shape.borderColor} 
          /> 
        </>             
    }
  }
  //svgElem.ref={elemRef}
  return (svgElem)
}