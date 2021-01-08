import React, {useState} from 'react';
import './Tools.css';
import { addSlide, addPictureObj, addTextObj, addShapeObj, setCanDeleteSlide } from '../../Models/ActionCreators/actionCreators';
import { setGlobalActiveTool } from '../../Models/CommonFunctions/supportFunctionsConst';
import { /*actualArchiveOfState,*/ goBackArchive, goForwardArchive} from '../../Models/ActionCreators/actionCreators';
import { MainProg, Programm } from '../../Models/CommonFunctions/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


export type Tool = {
  hint: string,
  pic: string,
  onClick: () => void,
}

function ShapeToolBox(props: {addShapeObj: (shape: 'rect' | 'triangle' | 'circle') => void}) {
  return (
    <div className="ToolShapeObj_shape"> 
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => props.addShapeObj('rect')} >Квадрат</span>
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => props.addShapeObj('triangle')} >Треугольник</span>
      <span className="ToolShapeObj_shape_elem " onMouseDown={() => props.addShapeObj('circle')}>Круг</span>
    </div>
  )        
}





interface ToolElemWithToolBoxProps {
  activeTool: number
  setActiveTool: React.Dispatch<React.SetStateAction<number>>,
  addShapeObj: (shape: 'rect' | 'triangle' | 'circle') => void
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
      {toolBoxIsOpen && <ShapeToolBox addShapeObj={props.addShapeObj}/>}
    </div>
  ) 
}

function getBase64 (file: any, callback: any) {

  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result))

  reader.readAsDataURL(file);
}

function loadPicFromComp(addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void) {
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
        img.onload = () => {
          getBase64(input.files?.item(0), 
          (base64Data: string) => addPictureObj({width: img.width, height: img.height, imgB64: base64Data}))
        }
        img.src = src
    }
  }
}

function PictureToolBox(props: {addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void}) {
  return (
      <div className="ToolShapeObj_shape"> 
        <span className="ToolShapeObj_shape_elem " onClick={() => null} >по ссылке</span>
        <span className="ToolShapeObj_shape_elem " onMouseDown={() => loadPicFromComp(props.addPictureObj)} >с компьютера</span>
      </div>
  )        
}

interface PictureElemWithToolBoxProps {
  activeTool: number,
  setActiveTool: React.Dispatch<React.SetStateAction<number>>,
  addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void
}

function PictureElemWithToolBox(props: PictureElemWithToolBoxProps) {
  const [toolBoxIsOpen, setShapeMenu] = useState(false)
  
  const mouseUpHandler = () => {
    setShapeMenu(false)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  return (
    <div key={5} className={" tool tool_pic-obj " + (props.activeTool == 2 ? "tool_active" : "")}
      onClick={() => {
        setShapeMenu(!toolBoxIsOpen); 
        props.setActiveTool(2); 
        setGlobalActiveTool(2); 
        document.addEventListener('mouseup', mouseUpHandler)
    }}>
      <span className="tool__tooltip">Вставить изображение</span> 
      {toolBoxIsOpen && <PictureToolBox addPictureObj={props.addPictureObj}/>}
    </div>
  ) 
}


interface toolsProps {
  addSlide: () => void,
  addTextObj: () => void,
  addShapeObj: (shape: 'rect' | 'triangle' | 'circle') => void,
  addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void,
  goBackArchive: () => void,
  goForwardArchive: () => void,
  setCanDeleteSlide: (canDelete: boolean) => void
}

function Tools(props: toolsProps) {
    const [activeTool, setActiveTool] = useState(0) 

    return (
        <div className="tools" onClick={() => console.log("ты в инструментах")}>
          <div key={0} className="tool tool_add-slide" onClick={
            () => {props.addSlide(); props.setCanDeleteSlide(true)}}> 
            <span className="tool__tooltip">Новый слайд</span>
          </div>
          <div key={1} className="tool tool_back-history" onMouseDown={(event) => {props.goBackArchive(); event.preventDefault()}}>
            <span className="tool__tooltip">Отменить</span>
          </div>
          <div key={2} className="tool tool_future-history" onMouseDown={(event) => {props.goForwardArchive(); event.preventDefault()}}>
            <span className="tool__tooltip">Повторить</span>
          </div>
          <div key={3} className={"tool tool_cursor "+(activeTool == 0 ? "tool_active" : "")} onClick={() => {setActiveTool(0); setGlobalActiveTool(0); console.log('Курсор')}}>
            <span className="tool__tooltip">Выбрать</span>
          </div>
          <div key={4} className={"tool tool_text-obj "+(activeTool == 1 ? "tool_active" : "")} onClick={() => {props.addTextObj(); setActiveTool(1); setGlobalActiveTool(1)}}>
            <span className="tool__tooltip">Текстовое поле</span>
          </div>
          <PictureElemWithToolBox activeTool={activeTool} setActiveTool={setActiveTool} addPictureObj={props.addPictureObj}/>
          <ToolElemWithToolBox activeTool={activeTool} setActiveTool={setActiveTool} addShapeObj={props.addShapeObj}/>
          <div key={7} className="splitter"></div>
        </div>    
      )
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSlide: () => dispatch(addSlide()),
    addTextObj: () => dispatch(addTextObj()),
    addShapeObj: (shape: 'rect' | 'triangle' | 'circle') => dispatch(addShapeObj(shape)),
    addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => dispatch(addPictureObj(imgData)),
    goBackArchive: () => dispatch(goBackArchive()),
    goForwardArchive: () => dispatch(goForwardArchive()),
    setCanDeleteSlide: (canDelete: boolean) => dispatch(setCanDeleteSlide(canDelete))
  } 
}

function mapStateToProps(state: Programm) {
  return { state: state } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);