import React from 'react';
import App from '../App';

import { getAutomaticTypeDirectiveNames } from 'typescript';
import { BigSlideElement, SmallSlideElement } from '../Element/Element';
import '../Models/commonFunctionsConst'
import { createNewId, isColor, isPictureObj, searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { setSelectedSlides } from '../Models/slideMoveInProgramm';
import { dispatch, actualProgState } from '../Models/dispatcher'
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

type SlideProps = {
  numberOfSlide: number
  isSmallSlide: boolean
}

export function SlideMain(props: SlideProps) {
  
  let currSlide: Slide = actualProgState.currentPresentation.slides[props.numberOfSlide]
  let propsBackground = ''

  if(isColor(currSlide.background)) {
    propsBackground = currSlide.background.hexColor
  }

  if (isPictureObj(currSlide.background)) {
    propsBackground = currSlide.background.url
  }

  let width = '1400px'
  let height = '850px'
  
  if (props.isSmallSlide) {
    width = '140px'
    height = '85px'
  }

  const propsStyles = {
    backgroundColor: propsBackground,
    width: width,
    height: height,
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
    <div id={currSlide.id} onClick={() => dispatch(setSelectedSlides, ([...actualProgState.selectedSlides, currSlide.id]))} className="SlideCss"  style={propsStyles}>
        <svg id={createNewId()} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%">
          {slideElems}
        </svg>
    </div>
  )
}













