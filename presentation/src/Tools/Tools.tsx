import { url } from 'inspector';
import ReactDOM from 'react-dom';
import App from '../App';
import { isDebuggerStatement } from 'typescript';
import React, { useEffect, useState } from 'react';

import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  SlideElements,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj
} from '../Models/types'

import './Tools.css';
import { addSlide } from '../Models/slideMoveInProgramm';
import { render } from '@testing-library/react';
import { KeyObject } from 'crypto';
import { addShapeObj, changeElemPosition, createShapeObj } from '../Models/changeSlideContent';
import { dispatch, actualProgState, dispatchTwoParams } from '../Models/dispatcher'

export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}

let textObj: TextObj 

let window: Window

function ShapeToolBox() {
  return (
    <div className="ToolShapeObj_shape"> 
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => dispatch(addShapeObj, ('rect'))} >Квадрат</span>
      <span className="ToolShapeObj_shape_elem " onClick={() => dispatch(addShapeObj, ('triangle'))} >Треугольник</span>
      <span className="ToolShapeObj_shape_elem " onClick={() => dispatch(addShapeObj, ('circle'))}>Круг</span>
    </div>
  )        
}


export function ToolElemWithToolBox() {
  const [toolBoxIsOpen, setShapeMenu] = useState(false)

  return (
    <div key={6} className='Tool ToolShapeObj' onClick={() => setShapeMenu(!toolBoxIsOpen)}>
      <span className="Tooltip">Фигуры</span> 
      {toolBoxIsOpen && <ShapeToolBox/>}
    </div>
  ) 
}



function Tools() {  
    
  return (                                                    
      <div className="Tools">
        <div key={0} className="Tool ToolAddSlide" onClick={() => dispatch(addSlide, ({}))}><span className="Tooltip">Новый слайд</span></div>
        <div key={1} className="Tool ToolBackHistory" onClick={() => console.log('Назад по истории')}><span className="Tooltip">Отменить</span></div>
        <div key={2} className="Tool ToolFutureHistory" onClick={() => console.log('Вперед по истории')}><span className="Tooltip">Повторить</span></div>
        <div key={3} className="Tool ToolCursor" onClick={() => console.log('Курсор')}><span className="Tooltip">Выбрать</span></div>
        <div key={4} className="Tool ToolTextObj" onClick={() => console.log('Текст')}><span className="Tooltip">Текстовое поле</span></div>
        <div key={5} className="Tool ToolPicObj" onClick={() => console.log('Картинка')}><span className="Tooltip">Вставить изображение</span></div>
        <ToolElemWithToolBox/>
      </div>
  )
}

export {
    Tools
}



/*
  PahaToolsFunction

  export type ToolsProps = {
  tools: Array<Tool>
  }

  const tools: Array<Tool> = props.tools;

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