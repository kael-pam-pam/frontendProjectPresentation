import { Programm } from './types';
import { render } from '../index'
import { goBackAchive, goForwardAchive, saveStateToArchive } from './archive';
import { addPictureObj, changeElemPosition, resizeElement, setCanDeleteSlide } from './changeSlideContent';
import { useRef } from 'react';

export let globalActiveTool: number = 0;

export function setGlobalActiveTool(state: number): void {
    globalActiveTool = state;
} 

export let actualProgState: Programm

export function dispatch<T>(func: { (prog: Programm, obj: T): Programm }, obj: T ): void {   

  actualProgState = func(actualProgState, obj) 
  if (func !== goForwardAchive && func !== goBackAchive) {

    if (func.name == 'changeElemPosition') { 
      actualProgState.elemsMoveCount++ 
      if (actualProgState.elemsMoveCount == actualProgState.selectedElements.length) {
        saveStateToArchive()  
        actualProgState.elemsMoveCount = 0
      }
    } else if(func.name !== 'addPictureObj') {
      saveStateToArchive()
      console.log(func.name)
    }
  }
  render() 
}



export function loadProgramm(newProg: Programm): Programm {
  return newProg
}











