import React, { useState, useRef, useEffect} from 'react'
import { checkSelectedElem } from '../../Models/CommonFunctions/supportFunctionsConst'

import { PictureObj, TextObj, ShapeObj, Programm} from '../../Models/CommonFunctions/types'
import './Element.css'
import { useDragAndDropElement, useReSizeElement} from '../../CustomHooks/ElemMouseEvents'
import { ImgTextObject, OutlineRect, ShapeObject } from './SvgElems'
import { useNormalizeElemSize } from '../../CustomHooks/CommonDifferentHooks'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { changeElemPosition, removeOneElemFromSelectedElems, resizeElement, setCanDeleteSlide, setSelectedElement } from '../../Models/ActionCreators/slideElemActionCreators'

export {
  SmallSlideElement
}


function SmallSlideElement(shape: PictureObj | TextObj | ShapeObj) {
  let width = shape.wigth / 10
  let height = shape.height / 10
  let posX = shape.position.x  / 10
  let posY = shape.position.y  / 10

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)

  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (shape.type === 'rect' || shape.type === 'triangle'  || shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      outlineRect={outLineRect}
    />
  }

  if (shape.type === 'picture' || shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      outlineRect={outLineRect}
      isSmallElem={true}
    />
  }

  return (svgElem)
}


interface BigSlideElementProps {
  state: Programm,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  changeElemPosition: (newX: number, newY: number, id: string) => void,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  shape: PictureObj | TextObj | ShapeObj
  svgProps: React.MutableRefObject<SVGSVGElement | null>
}

function BigSlideElement(props: BigSlideElementProps) {
  const actualProgState = props.state.mainProg 

  const id = props.shape.id

  const mainSvgProps = props.svgProps.current?.getBoundingClientRect()
  const svgWidth = Number(mainSvgProps?.width)
  const svgHeight = Number(mainSvgProps?.height)

  const elemPosX = props.shape.position.x
  const elemPosY = props.shape.position.y
  const elemWidth = props.shape.wigth
  const elemHeight = props.shape.height

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)
  const firstPointRef = useRef<SVGCircleElement | null>(null)
  const secondPointRef = useRef<SVGCircleElement | null>(null)
  const thirdPointRef = useRef<SVGCircleElement | null>(null)
  const fourthPointRef = useRef<SVGCircleElement | null>(null)

  const[pos, setPos] = useState({x: elemPosX, y: elemPosY})

  const[elemSize, setSize] = useState({width: elemWidth, height: elemHeight})


  useNormalizeElemSize({resizeElement: props.resizeElement, setSize, elemWidth, elemHeight, svgWidth, svgHeight})

  useDragAndDropElement({
    state: props.state,
    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedElement: props.setSelectedElement,
    changeElemPosition: props.changeElemPosition,
    resizeElement: props.resizeElement,
    removeOneElemFromSelectedElems: props.removeOneElemFromSelectedElems,
    id: props.shape.id,
    pos, 
    setPos, 
    elemRef, 
    mainSvgProps
  })

  useReSizeElement ({
    mainProgState: props.state.mainProg,
    setSelectedElement: props.setSelectedElement,
    resizeElement: props.resizeElement,
    id: props.shape.id, 
    setPos,
    setSize, 
    firstPointRef, secondPointRef, thirdPointRef, fourthPointRef,
    mainSvgProps
  })  

  useEffect(() => {
      setPos({x: elemPosX, y: elemPosY})
      setSize({width: elemWidth, height: elemHeight})
  }, [actualProgState])
  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (checkSelectedElem(actualProgState, id)) {
    outLineRect = <OutlineRect 
      firstPointRef={firstPointRef}
      secondPointRef={secondPointRef}
      thirdPointRef={thirdPointRef}
      fourthPointRef={fourthPointRef}
      id={id}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
    />
  }

  if (props.shape.type === 'rect' || props.shape.type === 'triangle'  || props.shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      outlineRect={outLineRect}
    />
  }

  if (props.shape.type === 'picture' || props.shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      outlineRect={outLineRect}
      isSmallElem={false}
    />
  }
  
  return (svgElem)
}



const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCanDeleteSlide: (canDelete: boolean) => dispatch(setCanDeleteSlide(canDelete)),
    setSelectedElement: (elemsArr: Array<string>) => dispatch(setSelectedElement(elemsArr)),
    changeElemPosition: (newX: number, newY: number, id: string) => dispatch(changeElemPosition({newX, newY, id})),
    resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number) => dispatch(resizeElement({newWidth, newHeigth, newPosX, newPosY})),
    removeOneElemFromSelectedElems: (elemId: string) => dispatch(removeOneElemFromSelectedElems(elemId))
    
  } 
}

function mapStateToProps(state: Programm) {
  return { 
    state: state,
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(BigSlideElement)
