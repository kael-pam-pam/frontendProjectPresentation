import {
    Programm,
/*
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
    ChangedParams
*/  
} from './types';
import { goBackAchive, goForwardAchive, saveStateToArchive, } from './archive';

import { render } from '../index';
//import { /*isShapeObj, isTextObj, searchChangedSlideIndex, isSlide,*/ isProgramm, /*isSlideId, isPoint */} from './commonFunctionsConst';

export {
    actualProgState,
    dispatch,
}

let actualProgState: Programm = {
      currentPresentation: {
          title: "Пример",
          slides: [
            {
                id: "1",
                background: {
                    hexColor: "red", 
                    type: 'color',
                },
                elements: [
                    {
                        id: "43",
                        position: {
                            x: 10,
                            y: 20,
                        },
                        height: 30,
                        wigth: 100,
                        text: "Текст",
	                    fontFamily: "Arial",
	                    fontSize: 14,
                        type: 'text',
                    },
                    {
                        id: "57",
                        position: {
                            x: 100,
                            y: 207,
                        },
                        height: 50,
                        wigth: 150,
                        text: "Текст номер 2",
	                    fontFamily: "Arial",
	                    fontSize: 18,
                        type: 'text',
                    },
                ],
            },
            {
                id: "2",
                background: {
                    hexColor: "идгу", 
                    type: 'color',
                },
                elements: [
                    {
                        id: "434",
                        position: {
                            x: 10,
                            y: 20,
                        },
                        height: 30,
                        wigth: 100,
                        text: "Текст3",
	                    fontFamily: "Arial",
	                    fontSize: 14,
                        type: 'text',
                    },
                    {
                        id: "571",
                        position: {
                            x: 100,
                            y: 207,
                        },
                        height: 50,
                        wigth: 150,
                        text: "Текст номер 23",
	                    fontFamily: "Arial",
	                    fontSize: 18,
                        type: 'text',
                    },
                ],
            },
          ],
      },
      selectedSlides: [],
      selectedElements: [],
  }

function dispatch<T>(func: { (prog: Programm, obj?: T): Programm }, obj?: T): void { 
    /*
    if (isProgramm(obj)) {
      actualProgState  = obj
    } else {
    */
    actualProgState =  func(actualProgState, obj);
    if (func != goForwardAchive && func != goBackAchive) {
        saveStateToArchive();
    }
    /*
    }
    */  
    render()
  }