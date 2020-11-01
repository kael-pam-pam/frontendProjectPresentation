import React from 'react';
import './Slide.css';

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

import {actualProgState} from '../Models/dispatcher'

interface SlideProps {
    slideIndex: number,
}

function MainSlide(props: SlideProps) {
    const currSlide: Slide = actualProgState.currentPresentation.slides[props.slideIndex];
    //?! а если пусто
    return (
        <div className="MainSlide"></div>
    )
}

export {
    MainSlide,
}