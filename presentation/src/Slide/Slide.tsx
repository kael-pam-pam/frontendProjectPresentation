import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { getAutomaticTypeDirectiveNames } from 'typescript';
import { BigSlideElement, SmallSlideElement } from '../Element/Element';
import '../Models/commonFunctionsConst'
import { createNewId, isColor, isPictureObj, searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { setSelectedSlides } from '../Models/slideMoveInProgramm';


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

function renderProgWithNewSelectedSlide(props: Programm, checkedSlideId: string) {
  const changedSlideIndex = searchChangedSlideIndex(props)
  const newProgState = setSelectedSlides(props, [checkedSlideId])
  ReactDOM.render(
    <React.StrictMode>
      <App {...newProgState}/>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

type SlideProps = {
  prog: Programm,
  numberOfSlide: number
  isSmallSlide: boolean
}

export function SlideMain(props: SlideProps) {
  
  let currSlide: Slide = props.prog.currentPresentation.slides[props.numberOfSlide]
  let propsBackground = ''
  if(isColor(currSlide.background)) {
    propsBackground = currSlide.background.hexColor
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
    <div id={currSlide.id} onClick={() => renderProgWithNewSelectedSlide(props.prog, currSlide.id)} className="SlideCss"  style={propsStyles}>
        <svg id={createNewId()} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="100%" height="100%">
          {slideElems}
        </svg>
    </div>
  )
}













