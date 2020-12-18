import {
    Programm,
    Slide
} from './types';

import {createDefaultSlide,} from './slideMoveInProgramm'
import { createNewId } from './commonFunctionsConst';

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
        selectedElements: [],
        canDeleteSlides: false,
        elemsMoveCount: 0
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

