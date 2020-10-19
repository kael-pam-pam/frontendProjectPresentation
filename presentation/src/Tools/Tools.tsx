import { url } from 'inspector';
import React from 'react';
import './Tools.css';

export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}
/*
export type ToolsProps = {
  tools: Array<Tool>
}
*/
function Tools() {
  //const tools: Array<Tool> = props.tools;
/*
  const listTools = tools.map((item, index) =>
    <div key={index} className="Tool" onClick={item.onClick}></div>
  );
*/  
  //background-image: url("./pic/cursor.png");
  //backgroundImage: `url("../pic/cursor.png")`
  //style={{backgroundImage: `url("/src/Tools/cursor.png")`, width: "204px", height: "204px"}}
/*
  const tools: Array<Tool> = [
    {hint: "Новый слайд", pic: "addSlide.png", onClick: () => console.log('Новый слайд')}
  ];
            {listTools}
*/
    return (
        <div className="Tools">
          <div key={0} className="Tool ToolAddSlide" onClick={() => console.log('Добавить слайд')}><span className="Tooltip">Новый слайд</span></div>
          <div key={1} className="Tool ToolBackHistory" onClick={() => console.log('Назад по истории')}><span className="Tooltip">Отменить</span></div>
          <div key={2} className="Tool ToolFutureHistory" onClick={() => console.log('Вперед по истории')}><span className="Tooltip">Повторить</span></div>
          <div key={3} className="Tool ToolCursor" onClick={() => console.log('Курсор')}><span className="Tooltip">Выбрать</span></div>
          <div key={4} className="Tool ToolTextObj" onClick={() => console.log('Текст')}><span className="Tooltip">Текстовое поле</span></div>
          <div key={5} className="Tool ToolPicObj" onClick={() => console.log('Картинка')}><span className="Tooltip">Вставить изображение</span></div>
          <div key={6} className="Tool ToolShapeObj" onClick={() => console.log('Фигура')}><span className="Tooltip">Фигура</span></div>
        </div>
    )
}

export {
    Tools,
}