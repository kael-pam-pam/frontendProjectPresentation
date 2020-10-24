import { url } from 'inspector';
import ReactDOM from 'react-dom';
import App from '../App';
import { isDebuggerStatement } from 'typescript';
import React, { useEffect, useState } from 'react';
import './Tools.css';
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
import { addSlide } from '../Models/slideMoveInProgramm';
import { render } from '@testing-library/react';
import { KeyObject } from 'crypto';
import { addShapeObj } from '../Models/changeSlideContent';

export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}

function renderProgWithNewSlide(props: Programm) {
  let newProg = addSlide(props)
  ReactDOM.render(
    <React.StrictMode>
      <App {...newProg}/>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

function renderProgWithNewShape(shapeType: 'rect' | 'triangle' | 'circle', prog: Programm) {
  let newProg = addShapeObj(prog, shapeType)
  ReactDOM.render(
    <React.StrictMode>
      <App {...newProg}/>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

function ShapeCheckBox(props: Programm) {
  return (
    <div className="ToolShapeObj_shape">
      <span className="ToolShapeObj_shape_elem " onClick={() => renderProgWithNewShape('rect', {...props})} >Квадрат</span>
      <span className="ToolShapeObj_shape_elem " onClick={() => renderProgWithNewShape('triangle', {...props})} >Треугольник</span>
      <span className="ToolShapeObj_shape_elem " onClick={() => renderProgWithNewShape('circle', {...props})} >Круг</span>
    </div>
  )        
}


export function ShapesMenu(props: Programm) {
  const [ShapeCheckBoxIsOpen, setShapeMenu] = useState(0);   // state

  if (ShapeCheckBoxIsOpen === 1) {
   return (
    <div key={6} className="Tool ToolShapeObj" onClick={() => setShapeMenu(0)}>
      <span className="Tooltip">Фигуры</span> 
      <ShapeCheckBox {...props}/>
    </div>
  )} else {
    return (
      <div key={6} className="Tool ToolShapeObj" onClick={() => setShapeMenu(1)}>
        <span className="Tooltip">Фигуры</span>
      </div>
    )
  } 
}

function Tools(props: Programm) {  
    return (
        <div className="Tools">
          <div key={0} className="Tool ToolAddSlide" onClick={() => renderProgWithNewSlide(props)}><span className="Tooltip">Новый слайд</span></div>
          <div key={1} className="Tool ToolBackHistory" onClick={() => console.log('Назад по истории')}><span className="Tooltip">Отменить</span></div>
          <div key={2} className="Tool ToolFutureHistory" onClick={() => console.log('Вперед по истории')}><span className="Tooltip">Повторить</span></div>
          <div key={3} className="Tool ToolCursor" onClick={() => console.log('Курсор')}><span className="Tooltip">Выбрать</span></div>
          <div key={4} className="Tool ToolTextObj" onClick={() => console.log('Текст')}><span className="Tooltip">Текстовое поле</span></div>
          <div key={5} className="Tool ToolPicObj" onClick={() => console.log('Картинка')}><span className="Tooltip">Вставить изображение</span></div>
          <ShapesMenu {...props}/>
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