import {
    StateTypes,
    Programm,
    Slide,
    MainProg
} from '../CommonFunctions/types';

import {createDefaultSlide,} from '../Reducers/slidesReducers'

export {
    createProgram,
    changePresentationTitle,
}

function createProgram(): Programm {
    const currSlide: Slide = createDefaultSlide();
    return {
        mainProg: {
            currentPresentation: {
                title: 'Презентация без названия',
                slides: [currSlide]
            },
            selectedSlides: [currSlide.id],
            selectedElements: []
        },
        commonDeps: {    
            canDeleteSlides: false,
            elemsMoveCount: 0,
            saveToArch: true,
            slideBorderLight: 'unset',
        }    
    }
}

function changePresentationTitle(prevProgState: MainProg, newTitle: string) {
    
    return {
        type: StateTypes.CHANGE_PRESENTATION_TITLE,
        payload: {
            ...prevProgState,
            currentPresentation: {
                ...prevProgState.currentPresentation,
                title: newTitle
            }
        }    
    }
}