import React, {useState} from 'react';
import './Tools.css';
import { addSlide } from '../../Models/slideMoveInProgramm';
import { dispatch, setGlobalActiveTool } from '../../Models/dispatcher';
import { /*actualArchiveOfState,*/ goBackAchive, goForwardAchive} from '../../Models/archive';
import { addPictureObj, addShapeObj, addTextObj, setCanDeleteSlide } from '../../Models/changeSlideContent';


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

interface ToolElemWithToolBoxProps {
  activeTool: number
  setActiveTool: React.Dispatch<React.SetStateAction<number>>
}


function ToolElemWithToolBox(props: ToolElemWithToolBoxProps) {

  const [toolBoxIsOpen, setShapeMenu] = useState(false)

  const mouseUpHandler = () => {
    setShapeMenu(false)
    document.removeEventListener('mouseup', mouseUpHandler)
  }
  
  return (
    <div key={6} className={" tool tool_shape-obj " + (props.activeTool == 3 ? "tool_active" : "")} 
    onClick={() => {setShapeMenu(!toolBoxIsOpen); props.setActiveTool(3);  setGlobalActiveTool(3); document.addEventListener('mouseup', mouseUpHandler)}}>
      <span className="tool__tooltip">Фигуры</span> 
      {toolBoxIsOpen && <ShapeToolBox/>}
    </div>
  ) 
}

function getBase64 (file: any, callback: any) {

  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result))

  reader.readAsDataURL(file);
}

function loadPicFromComp() {
  let input = document.createElement("input")
  input.type = "file"
  input.id = "inputFile"
  document.body.appendChild(input)
  input.click()
  input.onchange = () => {
    if (input.files?.item(0)?.type && input.files?.item(0)?.type.indexOf('image') === -1) {
      console.log('File is not an image.')
    } else {
        const src = URL.createObjectURL(input.files?.item(0))
        const img = new Image()
        img.onload = function() {
          getBase64(input.files?.item(0), function(base64Data: string){
            dispatch(addPictureObj, ({url:src, width: img.width, height: img.height, imgB64: base64Data}))
          })
        }
        img.src = src
    }
  }
}

function PictureToolBox() {
  return (
      <div className="ToolShapeObj_shape"> 
        <span className="ToolShapeObj_shape_elem " onClick={() => null} >по ссылке</span>
        <span className="ToolShapeObj_shape_elem " onMouseDown={() => loadPicFromComp()} >с компьютера</span>
      </div>
  )        
}

interface PictureElemWithToolBoxProps {
  activeTool: number
  setActiveTool: React.Dispatch<React.SetStateAction<number>>
}

function PictureElemWithToolBox(props: PictureElemWithToolBoxProps) {
  const [toolBoxIsOpen, setShapeMenu] = useState(false)
  
  const mouseUpHandler = () => {
    setShapeMenu(false)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  return (
    <div key={5} className={" tool tool_pic-obj " + (props.activeTool == 2 ? "tool_active" : "")}
      onClick={() => {setShapeMenu(!toolBoxIsOpen); props.setActiveTool(2);  setGlobalActiveTool(2); document.addEventListener('mouseup', mouseUpHandler)}}>
      <span className="tool__tooltip">Вставить изображение</span> 
      {toolBoxIsOpen && <PictureToolBox/>}
    </div>
  ) 
}

function Tools() {
    const [activeTool, setActiveTool] = useState(0) 

    return (
        <div className="tools" onClick={() => console.log("ты в инструментах")}>
          <div key={0} className="tool tool_add-slide" onClick={
            () => {dispatch(addSlide, {}); dispatch(setCanDeleteSlide, true)}}>
            <span className="tool__tooltip">Новый слайд</span>
          </div>
          <div key={1} className="tool tool_back-history" onMouseDown={(event) => {dispatch(goBackAchive, {}); event.preventDefault()}}>
            <span className="tool__tooltip">Отменить</span>
          </div>
          <div key={2} className="tool tool_future-history" onMouseDown={(event) => {dispatch(goForwardAchive, {}); event.preventDefault()}}>
            <span className="tool__tooltip">Повторить</span>
          </div>
          <div key={3} className={"tool tool_cursor "+(activeTool == 0 ? "tool_active" : "")} onClick={() => {setActiveTool(0); setGlobalActiveTool(0); console.log('Курсор')}}>
            <span className="tool__tooltip">Выбрать</span>
          </div>
          <div key={4} className={"tool tool_text-obj "+(activeTool == 1 ? "tool_active" : "")} onClick={() => {dispatch(addTextObj, {}); setActiveTool(1); setGlobalActiveTool(1)}}>
            <span className="tool__tooltip">Текстовое поле</span>
          </div>
          <PictureElemWithToolBox activeTool={activeTool} setActiveTool={setActiveTool}/>
          <ToolElemWithToolBox activeTool={activeTool} setActiveTool={setActiveTool}/>
          <div key={7} className="splitter"></div>
        </div>    
      )
}

export {
    Tools
}