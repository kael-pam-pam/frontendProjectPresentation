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
import { dispatch, actualProgState } from '../Models/dispatcher'


function MainPanel() {
    const changedSlideIndex = searchChangedSlideIndex(actualProgState)
    return (
        <div className="MainPanel">
            <SlideMain numberOfSlide={changedSlideIndex} isSmallSlide={false}/>      
        </div>
    )
}

export {
    MainPanel,
}