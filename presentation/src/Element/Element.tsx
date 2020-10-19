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
    marginLeft: props.position.x / 10 + 'px',
    marginTop: props.position.y / 10 + 'px', 
    width: props.wigth / 10 + 'px',
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
    elemStyles = {
      ...commonStyles,
      borderColor: props.borderColor,
      backgroundColor: props.fillColor
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
    marginLeft: props.position.x + 'px',
    marginTop: props.position.y + 'px', 
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
      backgroundImage: props.url  
    }
  }

  if (isShapeObj(props)) {
    elemStyles = {
      ...commonStyles,
      borderColor: props.borderColor,
      backgroundColor: props.fillColor
    }
  }
  
  return (
  <div id={elemId} style={elemStyles}>{text}</div>
  )
}