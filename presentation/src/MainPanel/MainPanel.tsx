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
import { searchChangedSlideIndex } from '../Models/commonFunctionsConst';


function MainPanel(props: Programm) {
    const changedSlideIndex = searchChangedSlideIndex(props)
    return (
        <div className="MainPanel">
            <SlideMain prog={props} numberOfSlide={changedSlideIndex} isSmallSlide={false}/>      
        </div>
    )
}

export {
    MainPanel,
}