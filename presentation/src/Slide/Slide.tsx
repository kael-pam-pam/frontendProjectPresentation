import React, {useRef} from 'react';
import { dispatch, actualProgState } from '../Models/dispatcher'
import { BigSlideElement, SmallSlideElement } from '../Element/Element';
import './Slide.css';
import { Slide } from '../Models/types'
import { createNewId, isColor, isPictureObj } from '../Models/commonFunctionsConst';
import { setSelectedSlides } from '../Models/slideMoveInProgramm';
import { setSelectedElement } from '../Models/changeSlideContent';

type SlideProps = {
    numberOfSlide: number
    isSmallSlide: boolean
}
  
export function MainSlide(props: SlideProps) {
    
    let currSlide: Slide = actualProgState.currentPresentation.slides[props.numberOfSlide]
    let propsBackground = ''
    let divClassName = 'mainSlideDiv'
    let svgClassName = 'mainSlideSvg'
  
    const svgRef = useRef<SVGSVGElement | null>(null) 
    
    if(isColor(currSlide.background)) {
      propsBackground = currSlide.background.hexColor
    }
  
    if (isPictureObj(currSlide.background)) {
      propsBackground = currSlide.background.url
    }
  
    if (props.isSmallSlide) {
      divClassName = ''
      svgClassName = 'smallMainSlideSvg'
    }
  
    const propsStyles = {
      backgroundColor: propsBackground
    }
  
    const elems = currSlide.elements
    let slideElems: any = []
    const elemsLength = Object.keys(elems).length
    for(let i = 0; i < elemsLength; i++) {
      slideElems.push(
        props.isSmallSlide
        ? <SmallSlideElement {...currSlide.elements[i]}/>
        : <BigSlideElement shape={{...currSlide.elements[i]}} svgProps={svgRef}/> 
      )
    }
    
    const slideElements = [currSlide.elements]
    
    function actionOnMouseDown(event: React.MouseEvent | MouseEvent) {
      if(props.isSmallSlide) {
        event.preventDefault()
        dispatch(setSelectedSlides, ([currSlide.id])) // [...actualProgState.selectedSlides, currSlide.id])
      }
    } 
  
    function createId(): string {
      let id: string = createNewId()
      if (props.isSmallSlide) {
        id += '.small'
      }
      return id
    }
  
    return (    
      <div id={currSlide.id} className={divClassName} 
        onMouseDown={(event) => actionOnMouseDown(event)}
        style={propsStyles}
      >
        <svg ref={svgRef} id={createId()} className={svgClassName} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" >
          {slideElems}   
        </svg>
      </div>
    )
  }

/*interface SlideProps {
    slideIndex: number,
}

function MainSlide(props: SlideProps) {
    const currSlide: Slide = actualProgState.currentPresentation.slides[props.slideIndex];
    //?! а если пусто
    return (
        <div className="MainSlide">
        </div>
    )
}*/