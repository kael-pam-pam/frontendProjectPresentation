import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import React, { useContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { render } from '../index';
import { saveStateToArchive } from '../Models/archive';
import { addShapeObj, changeElemPosition, changeTextObj, createShapeObj, deleteSelectedElements, setSelectedElement} from '../Models/changeSlideContent';
import { checkSelectedElem, getChangedElem, getCurrElemPosition, isPictureObj, isShapeObj, isTextObj, searchChangedElemIndex, searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { actualProgState, dispatch, dispatchTwoParams } from '../Models/dispatcher';
import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  SlideElements,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj
} from '../Models/types'

import './Element.css'


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

  return (svgElem)
}


interface BigSlideElementProps {
  shape: PictureObj | TextObj | ShapeObj
  svgProps: React.MutableRefObject<SVGSVGElement | null>
}


export function BigSlideElement(props: BigSlideElementProps) {

  let width = props.shape.wigth
  let height = props.shape.height
  let posX = props.shape.position.x  
  let posY = props.shape.position.y
  let id = props.shape.id
  let svgElem: any

  //add hook getSvgSize

  const mainSvgProps = props.svgProps.current?.getBoundingClientRect()
  const leftSvgBorder = Number(mainSvgProps?.x)
  const rightSvgBorder =  Number(mainSvgProps?.x) + Number(mainSvgProps?.width)
  const topSvgBorder = Number(mainSvgProps?.y)
  const bottomSvgBorder = Number(mainSvgProps?.y) + Number(mainSvgProps?.height)
  const [updateShapeCoordinates, setUpdateShapeCoordinates] = useState(false)
  
  
  let resetSelectElemsRef = useRef(false)

  let deltaCoordRef = useRef({
    x: 0,
    y: 0
  })


  function checkSvgBorder(newX: number, newY: number ): boolean {
    let inSvgBorder: boolean = false
    if (leftSvgBorder + newX >= leftSvgBorder && leftSvgBorder + newX + width <= rightSvgBorder
          && topSvgBorder + newY >= topSvgBorder && topSvgBorder + newY + height <= bottomSvgBorder) {
    inSvgBorder = true
    } 
    return inSvgBorder 
  }

  if (updateShapeCoordinates){
    onmousemove = (event) => {
    const currElemPos = getCurrElemPosition(actualProgState)
      deltaCoordRef.current = ({ 
        x: event.clientX - currElemPos.x, 
        y: event.clientY - currElemPos.y
      })
      setUpdateShapeCoordinates(false)   
    }  
  }

  function setDeltaCoordSelectElem(event: React.MouseEvent | MouseEvent, id: string): void {
    setUpdateShapeCoordinates(true) 
    if (!checkSelectedElem(actualProgState, id)) {
      deltaCoordRef.current = { 
        x: event.clientX - posX, 
        y: event.clientY - posY
      }
      dispatch(setSelectedElement, ([id]))
      document.addEventListener('mouseup', letListenMouseDown)
    }
    else {
      resetSelectElemsRef.current = false
      document.addEventListener('mousemove', moveShape)
      document.addEventListener('mouseup', stopShapeMove)
    }
  }

  useEffect(() => console.log('render'))

  onmousedown = () => {
    if (resetSelectElemsRef.current){
      console.log('reset Outline')
      dispatch(setSelectedElement, ([]))
      resetSelectElemsRef.current = false
    }  
  }  

  const letListenMouseDown = () => {
    resetSelectElemsRef.current = true
    document.removeEventListener('mouseup', letListenMouseDown)
  }

  const stopShapeMove = (event: any) => {
    let newX = event.clientX - deltaCoordRef.current.x
    let newY = event.clientY - deltaCoordRef.current.y
    let saveToArh = true
    if(checkSvgBorder(newX, newY)) {  
      dispatch(changeElemPosition, {newX, newY, saveToArh})
    } 
    document.removeEventListener('mousemove', moveShape)
    document.removeEventListener('mouseup', stopShapeMove)
    resetSelectElemsRef.current = true
  }

  const moveShape = (event: any) => { 
    let newX = event.clientX - deltaCoordRef.current.x
    let newY = event.clientY - deltaCoordRef.current.y
    let saveToArh = false
    if (checkSvgBorder(newX, newY)) {  
      dispatch(changeElemPosition, {newX, newY, saveToArh})
    }            
  }

  let outLineRect = <rect />
  if (checkSelectedElem(actualProgState, id)) {
    if (isPictureObj(props.shape)) {     
      let img = new Image();
      img.onload = () => {
      console.log(img.width + 'x' + img.height)
      }
    }
    outLineRect = 
    <rect
      id={id}
      x={posX}
      y={posY}  
      width={width}
      height={height}
      stroke='black'
      strokeWidth='1'
      strokeDasharray='10, 7'  
      fill='none'
    /> 
  }

  if (props.shape.type == 'triangle') {
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
    <>   
      {outLineRect}  
      <polygon      
        onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
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
      inputRef.current?.focus()
      setDeltaCoordSelectElem(new MouseEvent('mousedown'), id)
    }  
  }, [])

  /*function changeText(event: React.ChangeEvent<HTMLInputElement>) {
    const newParam = event.target.value
    const paramToChange = 'text'
    dispatch(changeTextObj, {newParam, paramToChange})
    setActualText(event.target.value)
  }*/ 

  const [actualText, setActualText] = useState(isTextObj(props.shape) ? props.shape.text : '')
 
  if (isTextObj(props.shape)) {
    svgElem =
      <>
        {outLineRect}
        <foreignObject
          onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}          
          id={id + '.txt'}
          x={posX}
          y={posY}
          width={width}
          height={height}
        >
          <input
            ref={inputRef}
            type="text"
            value={actualText}
            onChange={(event) => setActualText(event.target.value)}
            style={{
              width: width, 
              height: height, 
              outline: 'unset', 
              border: 'unset',
              fontSize: props.shape.fontSize + 'px',
              fontFamily: props.shape.fontFamily,
              background: 'unset'
          }}/>
        </foreignObject>
      </>  
  }

  if (isPictureObj(props.shape)) {
    svgElem =
      <>
        {outLineRect} 
        <image 
          onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
          x={posX}
          y={posY}
          width={width} 
          height={height}
          href={props.shape.url}        
        />
      </>  
      
  }

  if (isShapeObj(props.shape)) {
    if (props.shape.type == 'rect') { 
        svgElem = 
          <>
            {outLineRect} 
            <rect
              onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
              id={id}
              x={posX}
              y={posY}  
              width={width}
              height={height}
              stroke={props.shape.borderColor} 
              fill='rgba(0, 0, 255, 0.2)'
            />
          </>  
    }  

    if (props.shape.type == 'circle') {
      svgElem =
        <>
          {outLineRect} 
          <circle
            onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)} 
            id={id}
            cx={posX + width/2} 
            cy={posY + height/2} 
            r={width/2} 
            fill={props.shape.fillColor} 
            stroke={props.shape.borderColor} 
          /> 
        </>             
    }
  }
  return (svgElem)
}