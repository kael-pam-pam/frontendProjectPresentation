import {
    Programm,
    Presentation,
    ArchiveOfState,
    Slide,
    Point,
    ElementObj,
    Picture,
    PictureObj,
    TextObj,
    Color,
    ShapeObj,
} from './types';

import {createDefaultSlide,} from './slideMoveInProgramm'

export {
    createProgram,
    changePresentationTitle,
    saveProject,
    loadProject,
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

function changePresentationTitle(prog: Programm, newTitle: string): Programm {
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            title: newTitle
        }
    }
}


function saveProject(prog: Programm): string {
    return JSON.stringify(prog);
}

function loadProject(prog: Programm, savedProject: string): Programm {
    return JSON.parse(savedProject);  // реализовать через blocker export pdf
}

