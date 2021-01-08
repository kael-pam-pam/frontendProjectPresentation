import React, { useState, useRef, useEffect} from 'react'
import { checkSelectedElem, getCurrElemPosition } from '../../Models/CommonFunctions/supportFunctionsConst'

import { PictureObj, TextObj, ShapeObj, Programm, Slide} from '../../Models/CommonFunctions/types'
import './Element.css'
import { useDragAndDropElement, useReSizeElement} from '../../CustomHooks/ElemMouseEvents'
import { OutlineRect,  ImgTextObject, ShapeObject } from './SvgElems'
import { useNormalizeElemSize } from '../../CustomHooks/CommonDifferentHooks'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { changeElemPosition, resizeElement, setSelectedElement, setCanDeleteSlide, removeOneElemFromSelectedElems } from '../../Models/ActionCreators/actionCreators'
import { store } from '../..'
import { Program } from 'typescript'

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
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  changeElemPosition: (newX: number, newY: number, id: string) => void,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  shape: PictureObj | TextObj | ShapeObj,
  svgProps: React.MutableRefObject<SVGSVGElement | null>
}

function BigSlideElement(props: BigSlideElementProps) {

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


  //useNormalizeElemSize({id, resizeElement: props.resizeElement, setSize, elemWidth, elemHeight, svgWidth, svgHeight})

  //console.log(props.slides[0]?.elements[0].position)
  //console.log(store.getState().mainProg.currentPresentation.slides[0]?.elements[0].position)

  useDragAndDropElement({
    id: props.shape.id,
    slides: props.slides,
    selectedElements: props.selectedElements,
    selectedSlides: props.selectedSlides,
    canDeleteSlides: props.canDeleteSlides,
    elemRef, 
    mainSvgProps,

    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedElement: props.setSelectedElement,
    changeElemPosition: props.changeElemPosition,
    removeOneElemFromSelectedElems: props.removeOneElemFromSelectedElems,
    setPos
  })


  useReSizeElement ({
    id: props.shape.id, 
    firstPointRef, secondPointRef, thirdPointRef, fourthPointRef,
    mainSvgProps,
    slides: props.slides,
    selectedElements: props.selectedElements,
    selectedSlides: props.selectedSlides,
    setSelectedElement: props.setSelectedElement,
    resizeElement: props.resizeElement,
    setPos,
    setSize
  })  

  useEffect(() => {
      setPos({x: elemPosX, y: elemPosY})
      setSize({width: elemWidth, height: elemHeight})
  }, [props.slides])
  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect/>

  if (checkSelectedElem(props.selectedElements, id)) {
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



const mapDispatchToProps = {
    setCanDeleteSlide,
    setSelectedElement,
    changeElemPosition,
    resizeElement,
    removeOneElemFromSelectedElems
}

const mapStateToProps = (state: Programm) => {
  return {
    slides: state.mainProg.currentPresentation.slides,
    selectedElements: state.mainProg.selectedElements,
    selectedSlides: state.mainProg.selectedSlides,
    canDeleteSlides: state.commonDeps.canDeleteSlides
}}

export default connect(mapStateToProps, mapDispatchToProps)(BigSlideElement)
