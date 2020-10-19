import React from 'react';
import './MainPanel.css';
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

interface MainPanelProps {
    text: string,
    slide: Slide
}

function MainPanel(props: Slide) {
    return (
        <div className="MainPanel">
            <SlideMain slide={props} isSmallSlide={false}/>      
        </div>
    )
}

export {
    MainPanel,
}