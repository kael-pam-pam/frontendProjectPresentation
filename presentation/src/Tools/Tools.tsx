import React from 'react';
import './Tools.css';
import { addSlide } from '../Models/slideMoveInProgramm';
import { dispatch, setGlobalActiveTool } from '../Models/dispatcher';
import { /*actualArchiveOfState,*/ goBackAchive, goForwardAchive} from '../Models/archive';
import { useState, useContext } from 'react';
import { addShapeObj, addTextObj } from '../Models/changeSlideContent';

export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}

function ShapeToolBox() {
  return (
    <div className="ToolShapeObj_shape"> 
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => dispatch(addShapeObj, 'rect')} >Квадрат</span>
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => dispatch(addShapeObj, 'triangle')} >Треугольник</span>
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => dispatch(addShapeObj, 'circle')}>Круг</span>
    </div>
  )        
}


function ToolElemWithToolBox(activeTool: number) {

  const [toolBoxIsOpen, setShapeMenu] = useState(false)

  const mouseUpHandler = () => {
    setShapeMenu(false)
    document.removeEventListener('click', mouseUpHandler)
  }
  
  return (
    <div key={6} className={" tool tool_shape-obj " + (activeTool == 3 ? "tool_active" : "")} 
    onClick={() => {setShapeMenu(!toolBoxIsOpen); document.addEventListener('mouseup', mouseUpHandler)}}>
      <span className="tool__tooltip">Фигуры</span> 
      {toolBoxIsOpen && <ShapeToolBox/>}
    </div>
  ) 
}


function Tools() {
    const [activeTool, setActiveTool] = useState(0);
    return (
        <div className="tools" onClick={() => console.log("ты в инструментах")}>
          <div key={0} className="tool tool_add-slide" onClick={() => dispatch(addSlide, {})}>
            <span className="tool__tooltip">Новый слайд</span>
          </div>
          <div key={1} className="tool tool_back-history" onClick={() => dispatch(goBackAchive, {})}>
            <span className="tool__tooltip">Отменить</span>
          </div>
          <div key={2} className="tool tool_future-history" onClick={() => dispatch(goForwardAchive, {})}>
            <span className="tool__tooltip">Повторить</span>
          </div>
          <div key={3} className={"tool tool_cursor "+(activeTool == 0 ? "tool_active" : "")} onClick={() => {setActiveTool(0); setGlobalActiveTool(0); console.log('Курсор')}}>
            <span className="tool__tooltip">Выбрать</span>
          </div>
          <div key={4} className={"tool tool_text-obj "+(activeTool == 1 ? "tool_active" : "")} onClick={() => {dispatch(addTextObj, {}); setActiveTool(1); setGlobalActiveTool(1)}}>
            <span className="tool__tooltip">Текстовое поле</span>
          </div>
          <div key={5} className={"tool tool_pic-obj "+(activeTool == 2 ? "tool_active" : "")} onClick={() => {setActiveTool(2); setGlobalActiveTool(2); console.log('Картинка')}}>
            <span className="tool__tooltip">Вставить изображение</span>
          </div>
          <ToolElemWithToolBox {...activeTool} onMouseDown={() => {setActiveTool(3); setGlobalActiveTool(3)} }/>
          <div key={7} className="splitter"></div>
        </div>    
      )
}

export {
    Tools,
}