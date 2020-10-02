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

//TODO: функция перемещения 
