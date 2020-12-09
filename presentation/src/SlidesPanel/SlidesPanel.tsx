import React from 'react';
import './SlidesPanel.css';
import { Slide } from '../Models/types'
import { MainSlide } from '../Slide/Slide';
import { actualProgState } from '../Models/dispatcher'

function SlidesPanel() {
    const slides: Array<Slide> = actualProgState.currentPresentation.slides
    const selectedSlides: Array<string> = actualProgState.selectedSlides;
    let listSlides: any = []
    const slidesLength = Object.keys(slides).length
    for(let i = 0; i < slidesLength; i++) {
      listSlides.push(
        <div key={slides[i].id} className={"slide-frame "+(selectedSlides.includes(slides[i].id) ? "slide-frame_selected" : "")}> 
          <span className="slide-frame__number">{i + 1}</span>
          <div className={"slide " + (selectedSlides.includes(slides[i].id) ? "slide_selected" : "")}>
            <MainSlide key={slides[i].id} numberOfSlide={i} isSmallSlide={true}/>
          </div>
        </div>
      )
    }    
    return (
        <div className="slides-panel">
            {listSlides}
        </div>
    )  
}

export {
  SlidesPanel,
}