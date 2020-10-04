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

export {
    createProgram,
    addSlide,
    deleteSlide
}

function createProgram(): Programm {
    let curSlide: Slide = supportAddSlide();

    return {
        currentPresentation: {
            title: 'Презентация без названия',
            slides: [curSlide]
        },
        selectedSlides: [curSlide],
        archive: {
            past: [],
            future: []
        },
        selectedElements: []
    }
}

function supportAddSlide(): Slide {
    return {
        background: {
            hexColor: 0,
            type: 'color'
        },
        elements: [],
        isSkip: false 
    }
}

function addSlide(prog: Programm): Programm {
    let curSlide: Slide = supportAddSlide();

    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides,
                curSlide
            ]
        },
        selectedSlides : [curSlide]
    }
}

function supportSlidesWithoutSelectedSlides(slides: Array<Slide>, selectedSlides: Array<Slide>): Array<Slide> {
    return [
        ...slides.filter((e) => !selectedSlides.includes(e))
    ]
}

function deleteSlide(prog: Programm): Programm {
    let oldPos: number = prog.currentPresentation.slides.length - 1;
    for (let i = 0; i < prog.currentPresentation.slides.length; i++) {
        if ((prog.selectedSlides.includes(prog.currentPresentation.slides[i])) && (oldPos > i)) {
            oldPos = i;
        }
    }

    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides)
        },
        selectedSlides: 
            (prog.currentPresentation.slides.length == 0)? 
                []:
                (prog.currentPresentation.slides.length-1 <= oldPos)? 
                    [prog.currentPresentation.slides[oldPos]]: 
                    [prog.currentPresentation.slides[prog.currentPresentation.slides.length-1]]
    }
}

function supportSortingSelectedSlides(slides: Array<Slide> , selectedSlides: Array<Slide>): Array<Slide> {
    let sortedSelectedSlides: Array<Slide> = [];
    for (let i = 0; i < slides.length; i++) {
        if (selectedSlides.includes(slides[i])){
            sortedSelectedSlides = [...sortedSelectedSlides, slides[i]];
        }
    }

    return sortedSelectedSlides
}


function moveSlide(prog: Programm, posBefore: number): Programm {
    let sortedSelectedSlides: Array<Slide> = supportSortingSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
    let slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
    
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: 
                (posBefore == 0)?
                    [...sortedSelectedSlides, ...slidesWithoutSelectedSlides]:
                    (prog.currentPresentation.slides.length == posBefore)?
                        [...slidesWithoutSelectedSlides, ...sortedSelectedSlides]:
                        //TODO: не так как в оригинале!
                        [...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore),
                         ...sortedSelectedSlides,
                         ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore)
                        ]
        }
    }
}

function setSelectedSlides(prog: Programm, selectedSlides: Array<Slide>): Programm {
    return {
        ...prog,
        selectedSlides: selectedSlides
    }
}

function saveProject(prog: Programm): string {
    return JSON.stringify(prog);
}

function loadProject(prog: Programm, savedProject: string): Programm {
    return JSON.parse(savedProject);
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

function setSlideBackground(prog: Programm, newBackground: Picture | Color): Programm {
    let changedSlide: Slide = prog.selectedSlides[prog.selectedSlides.length - 1];
    changedSlide = {
        ...changedSlide,
        background: newBackground
    }

    return {
        ...prog,
        selectedSlides: [changedSlide]
    }
}

function setSlideIsSkip(prog: Programm, newIsSkip: boolean): Programm {
    let changedSlides: Array<Slide> = [...prog.selectedSlides];
    for (let i = 0; i < changedSlides.length; i++) {
        changedSlides[i].isSkip = newIsSkip; 
    }

    return {
        ...prog,
        selectedSlides: changedSlides
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