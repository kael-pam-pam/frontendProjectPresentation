import {
    Programm,
/*
    Presentation,
    ArchiveOfState,
*/
    Slide,
/*
    Point,
    ElementObj,
    Picture,
    PictureObj,
    TextObj,
    Color,
    ShapeObj,
*/
} from './types';

import {createDefaultSlide,} from './slideMoveInProgramm'

export {
    createProgram,
/*
    changePresentationTitle,
    saveProject,
    loadProject,
*/
}

function createProgram(): Programm {
    const currSlide: Slide = createDefaultSlide();
    return {
        currentPresentation: {
            title: 'Презентация без названия',
            slides: [currSlide]
        },
        selectedSlides: [currSlide.id],
        selectedElements: []
    }
}