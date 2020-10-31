import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { changeElemPosition, setSelectedElement } from '../Models/changeSlideContent';
import { isPictureObj, isShapeObj, isTextObj } from '../Models/commonFunctionsConst';
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
          cx={posX} 
          cy={posY} 
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



export function BigSlideElement(props: PictureObj | TextObj | ShapeObj) {

  const elemId = props.id
  let width = props.wigth
  let height = props.height
  let posX = props.position.x  
  let posY = props.position.y
  let id = props.id
  let svgElem: any

  const mainSvgProps = document.querySelector('.mainSlideSvg')?.getBoundingClientRect()
  const leftSvgBorder = Number(mainSvgProps?.x)
  const rightSvgBorder =  Number(mainSvgProps?.x) +  Number(mainSvgProps?.width)
  const topSvgBorder = Number(mainSvgProps?.y)
  const bottomSvgBorder = Number(mainSvgProps?.y) +  Number(mainSvgProps?.height)

  const [deltaCoord, setDeltaCoord] = useState({x: 0, y: 0})

  function setDeltaCoordSelectElem(event: React.MouseEvent, id: string): void {  
    dispatch(setSelectedElement, ([id]));
    setDeltaCoord ({ 
      x: event.clientX - posX, 
      y: event.clientY - posY
    })
  }

  function getNewCoordChangeElemPos(event: React.MouseEvent): void {
    let newX = event.clientX - deltaCoord.x
    let newY = event.clientY - deltaCoord.y
    if (
        leftSvgBorder + newX >= leftSvgBorder
        && leftSvgBorder + newX + width <= rightSvgBorder
        && topSvgBorder + newY >= topSvgBorder
        && topSvgBorder + newY + height <= bottomSvgBorder
      ) {
      dispatchTwoParams(changeElemPosition, newX, newY)
    }
  }

  onmouseup = () => dispatch(setSelectedElement, ([]))

  if (isTextObj(props)) {
    svgElem =
      <text
        onMouseDown = {() => dispatch(setSelectedElement, ([id]))} 
        id={id + '.txt'}
        x={posX}
        y={posY}
        width={width}
        height={height}
        fontFamily={props.fontFamily}
        fontSize={props.fontSize}
      >
        {props.text}
      </text>
  }

  if (isPictureObj(props)) {
    svgElem =
      <image 
        onMouseDown = {() => dispatch(setSelectedElement, ([id]))}
        x={posX}
        y={posY}
        width={width} 
        height={height}
        href={props.url} 
      />
  }

  if (isShapeObj(props)) {
    if (props.type == 'rect') {
      svgElem = 
        <rect
          onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
          onMouseMove = {(event) => getNewCoordChangeElemPos(event)}
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
          onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)} 
          onMouseMove = {(event) => getNewCoordChangeElemPos(event)}
          id={id}
          cx={posX} 
          cy={posY} 
          r={props.wigth/2} 
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
          onMouseDown = {(event) => setDeltaCoordSelectElem(event, id)}
          onMouseMove = {(event) => getNewCoordChangeElemPos(event)}
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