import React, {useEffect, useRef} from 'react';
import './Slide.css';
import { MainProg, Programm, Slide} from '../../Models/CommonFunctions/types'
import { getSlideBackground, getSlideSvgElems, getDivSvgClassNames, } from '../commonViewFunctions';
import { useDragAndDropSlides, useLighSlideInsertPlace  } from '../../CustomHooks/SlideMouseEvents';
import { connect } from 'react-redux';
import { moveSlide, setSelectedElement, setCanDeleteSlide, removeOneElemFromSelectedSlides, setSelectedSlides } from '../../Models/ActionCreators/actionCreators';
import { saveStateToArchive } from '../../Models/CommonFunctions/archive';



interface SlideProps  {
    slides: Array<Slide>,
    selectedSlides: Array<string>,
    selectedElements: Array<string>,
    canDeleteSlides: boolean,
    numberOfSlide: number,
    isSmallSlide: boolean,
    slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null,

    moveSlide: (index: number) => void,
    setSelectedSlides: (slidesArr: Array<string>) => void,
    setCanDeleteSlide: (canDelete: boolean) => void,
    removeOneElemFromSelectedSlides: (slideId: string) => void,
    setSelectedElement: (elemsArr: Array<string>) => void,
}



function MainSlide(props: SlideProps) {
  
    let currSlide: Slide = props.slides[props.numberOfSlide]
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

    useDragAndDropSlides({
      slides: props.slides,
      selectedSlides: props.selectedSlides,
      selectedElements: props.selectedElements,
      canDeleteSlides: props.canDeleteSlides,
      moveSlide: props.moveSlide, 
      setSelectedSlides: props.setSelectedSlides,
      setCanDeleteSlide: props.setCanDeleteSlide,
      removeOneElemFromSelectedSlides: props.removeOneElemFromSelectedSlides,
      setSelectedElement: props.setSelectedElement,
      currSlide,
      svgRef: mainSvgRef,
      isSmallSlide: props.isSmallSlide
    })
    useLighSlideInsertPlace({
      slides: props.slides,
      selectedSlides: props.selectedSlides,
      currSlide, svgRef: mainSvgRef, 
      divRef: mainDivRef, 
      slidesPanelRef: props.slidesPanelRef, 
      isSmallSlide: props.isSmallSlide
    })

    return (    
      <div id={currSlide.id} ref={mainDivRef} className={divClassName} style={{backgroundColor: svgSlideBackground}}>
        <svg ref={mainSvgRef} id={currSlide.id} className={svgClassName} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" >
          {svgSlideElems}   
        </svg>
      </div>
    )
  }

  const mapDispatchToProps = {
      moveSlide,
      setSelectedSlides,
      setCanDeleteSlide,
      removeOneElemFromSelectedSlides,
      setSelectedElement
  }
  
  const mapStateToProps = (state: Programm) => ({
    slides: state.mainProg.currentPresentation.slides,
    selectedSlides: state.mainProg.selectedSlides,
    selectedElements: state.mainProg.selectedElements,

    canDeleteSlides: state.commonDeps.canDeleteSlides
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainSlide);