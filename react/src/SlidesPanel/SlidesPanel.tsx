import React from 'react';
import './SlidesPanel.css';
import {
/*
    Programm,
    Presentation,
    ArchiveOfState,
*/
    Slide,
/*
    Point,
    ElementObj,
    SlideElements,
    Picture,
    PictureObj,
    TextObj,
    Color,
    ShapeObj
*/
} from '../Models/types'
import { actualProgState } from '../Models/dispatcher'

function SlidesPanel() {
    const slides: Array<Slide> = actualProgState.currentPresentation.slides;
    const selectedSlides: Array<string> = actualProgState.selectedSlides;
    const listSlides = slides.map((item, index) =>
        <div key={item.id} className={"slide-frame "+(selectedSlides.includes(item.id) ? "slide-frame_selected" : "")} onClick={() => console.log('Слайд '+Number(index+1))}>
            <span className="slide-frame__number">{index+1}</span> 
            <div className={"slide "+(selectedSlides.includes(item.id) ? "slide_selected" : "")}></div>
        </div>
    );
    return (
        <div className="slides-panel">
            {listSlides}
        </div>
    )
}

export {
    SlidesPanel,
}