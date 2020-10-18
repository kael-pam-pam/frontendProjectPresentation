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


/*function goBackAchive(prog: Programm): Programm {
    //TODO: а если истории нет, всю перемотали?
    let state: Programm = prog.archive.past[prog.archive.past.length - 1];

    return {
        ...state,
        archive: {
            ...state.archive,
            future: [
                {...prog},
                ...state.archive.future
            ]
        }
    }
}

function goForwardAchive(prog: Programm): Programm {
    //TODO: а если истории нет, всю перемотали?    
    return prog.archive.future[0]
}
*/

//то что выяснили в пятницу в Zoom'е
//TODO: Programm.selectedSlide это массив слайдов
//TODO: в массиве Programm.selectedSlide последний слайд отображается на экране (АКТИВНЫЙ СЛАЙД)
//TODO: функция перемещения selectedSlide внутри массива слайдов

//TODO: Programm.selectedElement это массив элементов
//TODO: у массива Programm.selectedElement (если там несколько элементов) можно менять ТОЛЬКО положение и масштабировать и удалять
//TODO: Programm.selectedElement может быть null

//TODO: внести поправки в функцию deleteSlide исходя из того, что Programm.selectedSlide это массив
//TODO: currentPresentation.slides может быть null, если все слайды удалили
//TODO: после удаления слайда активным слайдом становится [шедший за ним], или если удаленный слайд был последний - [предыдущий]

//функции Programm
//TODO: exportPDF()
//TODO: setCurrentSlide()
//TODO: saveProject()
//TODO: loadProject()
//функции Presentation
//TODO: changeTitle()
//функции Slide
//TODO: setBackground()
//TODO: setIsSkip()
//функции элементов
//TODO: addElement()
//TODO: deleteSelectedElement()
//TODO: changePositionSelectedElement()
//TODO: changeHeightAndWidthSelectedElement()
//TODO: changeTextObj()
//TODO: changeShapeObj()
//TODO: changeTriangle()
//TODO: changeRect()
//TODO: changeCircle()
//функции ArchiveOfState
//TODO: goBack()
//TODO: goForward()
//TODO: saveToArchive()