import { url } from 'inspector';
import React from 'react';
import './Tools.css';
import { addSlide } from '../Models/slideMoveInProgramm';
import { dispatch, } from '../Models/dispatcher';
import { /*actualArchiveOfState,*/ goBackAchive, goForwardAchive} from '../Models/archive';
import { useState } from 'react';

export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}

//          <div key={1} className="tool tool_back-history" onClick={() => actualArchiveOfState.past.length == 1 ? undefined : dispatch(goBackAchive)}>
//          <div key={2} className="tool tool_future-history" onClick={() => actualArchiveOfState.future.length == 0 ? console.log("нельзя") : dispatch(goForwardAchive)}>

function Tools() {
    const [activeTool, setActiveTool] = useState(0);
    return (
        <div className="tools" onClick={() => console.log("ты в инструментах")}>
          <div key={0} className="tool tool_add-slide" onClick={() => dispatch(addSlide)}>
            <span className="tool__tooltip">Новый слайд</span>
          </div>
          <div key={1} className="tool tool_back-history" onClick={() => dispatch(goBackAchive)}>
            <span className="tool__tooltip">Отменить</span>
          </div>
          <div key={2} className="tool tool_future-history" onClick={() => dispatch(goForwardAchive)}>
            <span className="tool__tooltip">Повторить</span>
          </div>
          <div key={3} className={"tool tool_cursor "+(activeTool == 0 ? "tool_active" : "")} onClick={() => {setActiveTool(0); console.log('Курсор')}}>
            <span className="tool__tooltip">Выбрать</span>
          </div>
          <div key={4} className={"tool tool_text-obj "+(activeTool == 1 ? "tool_active" : "")} onClick={() => {setActiveTool(1); console.log('Текст')}}>
            <span className="tool__tooltip">Текстовое поле</span>
          </div>
          <div key={5} className={"tool tool_pic-obj "+(activeTool == 2 ? "tool_active" : "")} onClick={() => {setActiveTool(2); console.log('Картинка')}}>
            <span className="tool__tooltip">Вставить изображение</span>
          </div>
          <div key={6} className={"tool tool_shape-obj "+(activeTool == 3 ? "tool_active" : "")} onClick={() => {setActiveTool(3); console.log('Фигура')}}>
            <span className="tool__tooltip">Фигура</span>
          </div>
          <div key={7} className="splitter"></div>
        </div>    
      )
}

export {
    Tools,
}