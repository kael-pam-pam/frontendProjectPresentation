import {
    StateTypes,
    Programm,
    Slide
} from '../CommonFunctions/types';

import {createDefaultSlide,} from '../ActionCreators/slidesActionCreators'
import { getState } from '../../index';

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
        }    
    }
}

function changePresentationTitle(newTitle: string) {
    const prevProgState = getState().mainProg
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