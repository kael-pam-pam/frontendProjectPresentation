import React from 'react';
import { isPictureObj, isShapeObj, isTextObj } from '../Models/commonFunctionsConst';
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


export function SmallElementMain(props: PictureObj | TextObj | ShapeObj) {
  const elemId = props.id
  let elemStyles = {}
  let text = ''
  let commonStyles = {
    display: 'block',
    position: 'absolute',
    left: props.position.x / 10 + 'px',
    top: props.position.y / 10 + 'px', 
    width: props.wigth  / 10 + 'px',
    height: props.height / 10 + 'px',
  } 

  if (isTextObj(props)) {
    elemStyles = {
      ...commonStyles,  
      fontFamily: props.fontFamily,
      fontSize: Number(props.fontSize) / 10 + 'px',
      textAlign: 'center'
    }
    text = props.text
  }

  if (isPictureObj(props)) {
    elemStyles = {
      ...commonStyles,
      backgroundImage: props.url  
    }
  }

  if (isShapeObj(props)) {
    if (props.type == 'rect') {
      elemStyles = {
        ...commonStyles,
        borderColor: props.borderColor,
        backgroundColor: props.fillColor,
      }
    }  

    if (props.type == 'circle') {
      elemStyles = {
        ...commonStyles,
        borderColor: props.borderColor,
        backgroundColor: props.fillColor,
        borderRadius: '50%'
      }          
    }

    if (props.type == 'triangle') {
      elemStyles = {
        ...commonStyles,  
        width: '0',
        height: '0',
        left: props.position.x / 10 + 'px',
        top: props.position.y / 10 + 'px',     
        borderLeft: props.wigth / 20 + 'px solid transparent',
        borderRight: props.wigth / 20 + 'px solid transparent',
        borderBottom: props.wigth / 10 + 'px solid ' + props.fillColor,
        borderColor: props.borderColor,
      }          
    } 
  }

  return (
    <div id={elemId} style={elemStyles}>{text}</div>
  )
}



export function ElementMain(props: PictureObj | TextObj | ShapeObj) {
  const elemId = props.id
  let elemStyles = {}
  let text = ''
  let commonStyles = {
    display: 'block',
    position: 'absolute',
    left: props.position.x + 'px',
    top: props.position.y + 'px', 
    width: props.wigth + 'px',
    height: props.height + 'px',
  } 

  if (isTextObj(props)) {
    elemStyles = {
      ...commonStyles,  
      fontFamily: props.fontFamily,
      fontSize: props.fontSize + 'px',
      textAlign: 'center'
    }
    text = props.text
  }

  if (isPictureObj(props)) {
    elemStyles = {
      ...commonStyles,
      background: `url(${props.url})`  
    }
  }

  if (isShapeObj(props)) {
    if (props.type == 'rect') {
      elemStyles = {
        ...commonStyles,
        borderColor: props.borderColor,
        backgroundColor: props.fillColor,
      }
    }  

    if (props.type == 'circle') {
      elemStyles = {
        ...commonStyles,
        borderColor: props.borderColor,
        backgroundColor: props.fillColor,
        borderRadius: '50%'
      }          
    }

    if (props.type == 'triangle') {
      elemStyles = {
        ...commonStyles,  
        width: '0',
        height: '0',
        left: props.position.x + 'px',
        top: props.position.y + 'px',     
        borderLeft: props.wigth / 2 + 'px solid transparent',
        borderRight: props.wigth / 2 + 'px solid transparent',
        borderBottom: props.wigth + 'px solid ' + props.fillColor,
        borderColor: props.borderColor,
      }          
    } 
  }
  
  return (
  <div id={elemId}  style={elemStyles}>{text}</div>
  )
}