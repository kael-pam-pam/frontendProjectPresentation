import React, {useEffect, useRef} from 'react';
import './Slide.css';
import { Slide} from '../../Models/CommonFunctions/types'
import { getSlideBackground, getSlideSvgElems, getDivSvgClassNames, } from '../commonViewFunctions';
import { useDragAndDropSlides, useLighSlideInsertPlace  } from '../../CustomHooks/SlideMouseEvents';
import { store, getState, dispatch } from '../../index';
import { Program } from 'typescript';
import { connect } from 'react-redux';


export {
  MainSlide
}


type SlideProps = {
    numberOfSlide: number
    isSmallSlide: boolean
    slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}
  
function MainSlide(props: SlideProps) {
    const actualProgState = getState().mainProg  
  
    let currSlide: Slide = actualProgState.currentPresentation.slides[props.numberOfSlide]
    const modelSlideBackground = currSlide.background
    const mainSvgRef = useRef<SVGSVGElement | null>(null)
    const mainDivRef = useRef<HTMLDivElement | null>(null)

    const divClassName = getDivSvgClassNames(props.isSmallSlide).divClassName
    const svgClassName = getDivSvgClassNames(props.isSmallSlide).svgClassName
    const svgSlideBackground: string = getSlideBackground(modelSlideBackground) 

    const svgSlideElems: Array<JSX.Element> = getSlideSvgElems({
      modelSlideElems: currSlide.elements,
      isSmallSlideElem: props.isSmallSlide,
      svgRef: mainSvgRef
    })

    // useDragAndDropSlides и useLighSlideInsertPlace работают только для маленького слайда
    // react не даёт обернуть в одно условие 

    useDragAndDropSlides({currSlide, svgRef: mainSvgRef, isSmallSlide: props.isSmallSlide})
    useLighSlideInsertPlace({currSlide, svgRef: mainSvgRef, divRef: mainDivRef, slidesPanelRef: props.slidesPanelRef, isSmallSlide: props.isSmallSlide})

    return (    
      <div id={currSlide.id} ref={mainDivRef} className={divClassName} style={{backgroundColor: svgSlideBackground}}>
        <svg ref={mainSvgRef} id={currSlide.id} className={svgClassName} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" >
          {svgSlideElems}   
        </svg>
      </div>
    )
  }