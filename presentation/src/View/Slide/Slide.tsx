import React, {useEffect, useRef} from 'react';
import { actualProgState } from '../../Models/dispatcher'
import './Slide.css';
import { Slide} from '../../Models/types'
import { useGetSlideBackground, useGetSlideSvgElems, useGetDivSvgClassNames, } from '../../CustomHooks/CommonDifferentHooks';
import { useDragAndDropSlides, useLighSlideInsertPlace  } from '../../CustomHooks/SlideMouseEvents';


export {
  MainSlide
}


type SlideProps = {
    numberOfSlide: number
    isSmallSlide: boolean
    slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}
  
function MainSlide(props: SlideProps) {
    
    let currSlide: Slide = actualProgState.currentPresentation.slides[props.numberOfSlide]
    const modelSlideBackground = currSlide.background
    const mainSvgRef = useRef<SVGSVGElement | null>(null)
    const mainDivRef = useRef<HTMLDivElement | null>(null)

    const divClassName = useGetDivSvgClassNames(props.isSmallSlide).divClassName
    const svgClassName = useGetDivSvgClassNames(props.isSmallSlide).svgClassName
    const svgSlideBackground: string = useGetSlideBackground(modelSlideBackground) 

    const svgSlideElems: Array<JSX.Element> = useGetSlideSvgElems({
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










