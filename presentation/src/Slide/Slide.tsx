import React from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { ElementMain, SmallElementMain } from '../Element/Element';
import '../Models/commonFunctionsConst'
import { isColor, isPictureObj } from '../Models/commonFunctionsConst';


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
  slide: Slide,
  isSmallSlide: boolean
}

export function SlideMain(props: SlideProps) {
  
  let propsBackground = ''
  if(isColor(props.slide.background)) {
    propsBackground = props.slide.background.hexColor
  }

  let width = '1520px'
  let height = '850px'
  
  if (props.isSmallSlide) {
    width = '152px'
    height = '85px'
  }

  const propsStyles = {
    backgroundColor: propsBackground,
    width: width,
    height: height,
  }

  const elems = props.slide.elements
  let slideElems: any = []
  const elemsLength = Object.keys(elems).length
  for(let i = 0; i < elemsLength; i++) {
    slideElems.push(
      props.isSmallSlide
      ? <SmallElementMain {...props.slide.elements[i]}/>
      : <ElementMain {...props.slide.elements[i]}/> 
    )
  }
  
     

  const slideElements = [props.slide.elements]

  return (    
    <div id={props.slide.id} className="SlideCss"  style={propsStyles}>
      {slideElems}
    </div>
  )
}






/*SlidesPanel(props: SlidesPanelProps) {
  const slides: Array<Slide> = props.slides;
  const listSlides = slides.map((item, index) =>
    <div key={index} className="Slide"></div>
  );
  return (
      <div className="SlidesPanel">
          {listSlides}
      </div>
  )
}*/









