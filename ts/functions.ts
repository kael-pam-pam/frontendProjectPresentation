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
        selectedSlides: [curSlide],
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
    prog.selectedSlides = [];
    prog.selectedSlides.push(curSlide);
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides,
                curSlide
            ]
        }
    }
}

function deleteSlide(prog:Programm): Programm {
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: [
                ...prog.currentPresentation.slides.filter(
                      item => prog.selectedSlides.indexOf(item) < 0
                )
            ]
        },
        selectedSlides: []   //TODO: здесь будет следующий слайд после удаленного
    }
}
//let missing = a1.filter(item => a2.indexOf(item) < 0);
//то что выяснили в пятницу в Zoom'е
//TODO: Programm.selectedSlide это массив слайдов
//TODO: в массиве Programm.selectedSlide последний слайд отображается на экране (АКТИВНЫЙ СЛАЙД)
//TODO: функция перемещения selectedSlides внутри массива слайдов, можно переносить несколько слайдов
function moveSlides(prog:Programm, newPosition:number): Programm {
    let newArray = [];
    for(var i = 0; i < prog.currentPresentation.slides.length; i++) {
        let state = 1;
        for(var i3 = 0; i3 < prog.selectedSlides.length; i3++) {
            if (i == newPosition) {
                newArray.push(prog.selectedSlides[i3])
            }
            if (prog.currentPresentation.slides[i] == prog.selectedSlides[i3]) state = 0
        }
        if (state) newArray.push(prog.currentPresentation.slides[i])
    } 
    
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            slides: newArray
        }
    }
}

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
function changeTitle(prog:Programm, newTitle:string): Programm {
    return {
        ...prog,
        currentPresentation: {
            ...prog.currentPresentation,
            title : newTitle
        }
    }
}
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