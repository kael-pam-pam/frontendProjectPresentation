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
    Triangle,
    Rect,
    Circle
} from './types';

function createProgram(prog:Programm): Programm {
    let curSlide: Slide = addPAHASlide();

    return {
        currentPresentation: {
            title: 'Презентация без названия',
            slides: [curSlide]
        },
        selectedSlide: curSlide,
        archive: {
            past: [],
            future: []
        },
        selectedElement: null,
    }
}

function addPAHASlide(): Slide {
    return {
        background: {
            hexColor: 0,
            type: 'color'
        },
        elements: [],
        isSkip: false 
    }
}

function addSlide(prog:Programm): Programm {
    let curSlide: Slide = addPAHASlide();

    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides,
                curSlide
            ]
        },
        selectedSlide : curSlide
    }
}

function deleteSlide(prog:Programm): Programm {
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides.filter(function(e) {
                    return e !== prog.selectedSlide
                })
            ]
        },
        selectedSlide : null    //TODO: здесь будет следующий слайд после удаленного
    }
}

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