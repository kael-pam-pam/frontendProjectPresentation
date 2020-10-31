import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import App from '../App';

import { getAutomaticTypeDirectiveNames } from 'typescript';
import { BigSlideElement, SmallSlideElement } from '../Element/Element';
import '../Models/commonFunctionsConst'
import { createNewId, isColor, isPictureObj, searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { setSelectedSlides } from '../Models/slideMoveInProgramm';
import { dispatch, actualProgState, dispatchTwoParams} from '../Models/dispatcher'
import { render } from '../index'


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

import './Slide.css'
import { changeElemPosition, setSelectedElement } from '../Models/changeSlideContent';
import { ReactComponent } from '*.svg';

type SlideProps = {
  numberOfSlide: number
  isSmallSlide: boolean
}

export function SlideMain(props: SlideProps) {
  
  let currSlide: Slide = actualProgState.currentPresentation.slides[props.numberOfSlide]
  let propsBackground = ''
  let divClassName = 'mainSlideDiv'
  let svgClassName = 'mainSlideSvg'


  if(isColor(currSlide.background)) {
    propsBackground = currSlide.background.hexColor
  }

  if (isPictureObj(currSlide.background)) {
    propsBackground = currSlide.background.url
  }

  if (props.isSmallSlide) {
    divClassName = 'mainSlideDiv_small'
    svgClassName = 'smallMainSlideSvg'
  }

  const propsStyles = {
    backgroundColor: propsBackground
  }

  const elems = currSlide.elements
  let slideElems: any = []
  const elemsLength = Object.keys(elems).length
  for(let i = 0; i < elemsLength; i++) {
    slideElems.push(
      props.isSmallSlide
      ? <SmallSlideElement {...currSlide.elements[i]}/>
      : <BigSlideElement {...currSlide.elements[i]}/> 
    )
  }
  
  const slideElements = [currSlide.elements]

  return (    
    <div id={currSlide.id} className={divClassName} 
      onClick={() => dispatch(setSelectedSlides, ([...actualProgState.selectedSlides, currSlide.id]))}
      style={propsStyles}
    >
      <svg id={createNewId()} className={svgClassName} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" >
        {slideElems}
      </svg>
    </div>
  )
}













