import {
    Programm,
    ArchiveOfState,
} from './types'; 
import { actualProgState } from './dispatcher';

export {
    goBackAchive,
    goForwardAchive,
    saveStateToArchive,
}

let actualArchiveOfState: ArchiveOfState = {
    past: [],
    future: [],
}

function goBackAchive(): Programm {
    //past: [...прощлые состояния, текущее состояние]
    //если в "прошлом" не было ни одной записи - возвращаем текущее состояние
    if (actualArchiveOfState.past.length != 1) {
        const oldCurrentState: Programm = actualArchiveOfState.past[actualArchiveOfState.past.length - 1];
        actualArchiveOfState = {
            past: [...actualArchiveOfState.past.filter((item, i) => i != actualArchiveOfState.past.length - 1)],
            future: [oldCurrentState, ...actualArchiveOfState.future],
        }
    }
    const newCurrentState: Programm = actualArchiveOfState.past[actualArchiveOfState.past.length - 1];
    return {
        ...newCurrentState,
    }
}

function goForwardAchive(): Programm {
    //если в "будущем" нет ни одной записи - возвращаем текущее состояние
    let state: Programm;
    if (actualArchiveOfState.future.length != 0) { 
        state = actualArchiveOfState.future[0];    
        actualArchiveOfState = {
            past: [...actualArchiveOfState.past, state],
            future: [...actualArchiveOfState.future.filter((item, i) => i != 0)],
        }
    } else {
        state = actualArchiveOfState.past[actualArchiveOfState.past.length - 1]
    }
    return {
        ...state,
    }
}

function saveStateToArchive(): void {
    //если в "будущем" есть записи и мы текущими действиями его не повторяем, то оно впредь нам уже не доступно.
    //теперь у нас новое будущее, которое неопределено.
    if (actualArchiveOfState.future.length != 0 && actualArchiveOfState.future[0] != actualProgState) {
        actualArchiveOfState = {
            past: [...actualArchiveOfState.past],
            future: [],
        }
                
    } 
    actualArchiveOfState = {
        past: [...actualArchiveOfState.past, {...actualProgState}],
        future: [...actualArchiveOfState.future],
    }   
}
