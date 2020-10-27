import React from 'react';
import './SlidesPanel.css';
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
import { SlideMain } from '../Slide/Slide';
import { dispatch, actualProgState } from '../Models/dispatcher'


function SlidesPanel() {
    const slides = actualProgState.currentPresentation.slides
    let listSlides: any = []
    const slidesLength = Object.keys(slides).length
    for(let i = 0; i < slidesLength; i++) {
      listSlides.push(
        <div className="SmallSlide"> 
          <span className="SlideNum">{i + 1}</span>
          <SlideMain numberOfSlide={i} isSmallSlide={true}/>
        </div>
      )
    } 
    
    return (
        <div className="SlidesPanel">
          {listSlides}
        </div>
    )
}

export {
    SlidesPanel,
}