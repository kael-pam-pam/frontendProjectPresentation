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

export {
    createProgram,
    addSlide,
    deleteSlide,
    changePresentationTitle,
    createDefaultSlide
}

function createProgram(): Programm {
    const currSlide: Slide = createDefaultSlide();

    return {
        currentPresentation: {
            title: 'Презентация без названия',
            slides: [currSlide]
        },
        selectedSlides: [currSlide.id],
        archive: {
            past: [],
            future: []
        },
        selectedElements: []
    }
}

function createNewId(): string {
    const currDate = new Date()
    const newId = String(currDate.getTime() % 10 ** 8)
    return newId
}

function createDefaultSlide(): Slide {  //createDefaulSlide
    return {
        id: createNewId(),
        background: {
            hexColor: 0,
            type: 'color'
        },
        elements: [],
    }
}

function addSlide(prog: Programm): Programm {         
    const curSlide: Slide = createDefaultSlide();

    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides,
                curSlide
            ]
        },
        selectedSlides: [curSlide.id]
    }    
}

function createPictureObj(): PictureObj { 
    return {
        id: createNewId(),
        position: {
            x: 10,
            y: 10    
        },
        height: 15,
        wigth: 15,
        url: 'tutututu',
        type: 'picture'
    }
}

function addPictureObj(prog: Programm): Programm {
    const newPictureObj = createPictureObj()
    let changedSlide: Slide = searchChangedSlide(prog)
    changedSlide = {
        ...changedSlide,
        elements: [newPictureObj]
    }
    return {
        ...prog,
        selectedSlides: [changedSlide.id]
    }           
}

function searchChangedSlide(prog: Programm): Slide {
    const slides = prog.currentPresentation.slides
    const selectedSlide = prog.selectedSlides[prog.selectedSlides.length - 1]
    let changedSlide: Slide = null
    for (let i = 0; i < slides.length; i++) {     
        if (slides[i].id == selectedSlide) {
            changedSlide = slides[i]
        }
    }
    return changedSlide
}

function supportSlidesWithoutSelectedSlides(slides: Array<Slide>, selectedSlides: Array<string>): Array<Slide> {
    return [
        ...slides.filter((e) => !selectedSlides.includes(e.id))                                                  // ?                   
    ]
}

function deleteSlide(prog: Programm): Programm {
    let oldPos: number = prog.currentPresentation.slides.length - 1;
    for (let i = 0; i < prog.currentPresentation.slides.length; i++) {
        if ((prog.selectedSlides.includes(prog.currentPresentation.slides[i].id)) && (oldPos > i)) { // .id
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
            (prog.currentPresentation.slides.length == 0) 
            ? []
            : (prog.currentPresentation.slides.length - 1 <= oldPos)
            ? [prog.currentPresentation.slides[oldPos].id]
            : [prog.currentPresentation.slides[prog.currentPresentation.slides.length - 1].id]
    }
}


function supportSortingSelectedSlides(slides: Array<Slide> , selectedSlides: Array<string>): Array<Slide> {
    let sortedSelectedSlides: Array<Slide> = [];
    for (let i = 0; i < slides.length; i++) {
        if (selectedSlides.includes(slides[i].id)){
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
                (posBefore == 0) 
                ? [...sortedSelectedSlides, ...slidesWithoutSelectedSlides]
                : (prog.currentPresentation.slides.length == posBefore)
                //TODO: не так как в оригинале!
                ? [...slidesWithoutSelectedSlides, ...sortedSelectedSlides]
                : [
                    ...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore),
                    ...sortedSelectedSlides,
                    ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore)
                  ]
        }
    }
}

function setSelectedSlides(prog: Programm, selectedSlides: Array<string>): Programm {
    return {
        ...prog,
        selectedSlides: selectedSlides
    }
}

function saveProject(prog: Programm): string {
    return JSON.stringify(prog);
}

function loadProject(prog: Programm, savedProject: string): Programm {
    return JSON.parse(savedProject);  // реализовать через blocker export pdf
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
    let changedSlide: Slide = searchChangedSlide(prog)     

    changedSlide = {
        ...changedSlide,
        background: newBackground
    }

    return {
        ...prog,
        selectedSlides: [changedSlide.id]
    }
}

function deleteSelectedElements(prog: Programm): Programm {
    let copySlides: Array<Slide> = prog.currentPresentation.slides;
    let newSlides: Array<Slide> = [];

    for (let i = 0; i < copySlides.length; i++) {
        newSlides.push({
            ...copySlides[i],
            elements: [...copySlides[i].elements.filter((e) => !prog.selectedElements.includes(e.id))]
        })
    }

    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [...newSlides]
        },
        selectedElements: []
    }
}


function goBackAchive(prog: Programm): Programm {
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