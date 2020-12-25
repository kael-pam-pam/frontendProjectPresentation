import React, {useEffect, useRef} from 'react';
import './Slide.css';
import { MainProg, Programm, Slide} from '../../Models/CommonFunctions/types'
import { getSlideBackground, getSlideSvgElems, getDivSvgClassNames, } from '../commonViewFunctions';
import { useDragAndDropSlides, useLighSlideInsertPlace  } from '../../CustomHooks/SlideMouseEvents';
import { store, getState, dispatch } from '../../index';
import { Program } from 'typescript';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { removeOneElemFromSelectedSlides, setSelectedSlides } from '../../Models/ActionCreators/slidesActionCreators';
import { removeOneElemFromSelectedElems, setCanDeleteSlide, setSelectedElement } from '../../Models/ActionCreators/slideElemActionCreators';
import { moveSlide } from '../../Models/ActionCreators/slElActionCreators';



interface SlideProps  {
    state: Programm,
    moveSlide: (index: number) => void,
    setSelectedSlides: (slidesArr: Array<string>) => void,
    setCanDeleteSlide: (canDelete: boolean) => void,
    removeOneElemFromSelectedSlides: (slideId: string) => void,
    setSelectedElement: (elemsArr: Array<string>) => void,

    numberOfSlide: number,
    isSmallSlide: boolean,
    slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}
  
function MainSlide(props: SlideProps) {
    const actualProgState = props.state.mainProg  
  
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

    useDragAndDropSlides({
      state: props.state,
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
      mainProgState: props.state.mainProg, 
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

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      moveSlide: (index: number) => dispatch(moveSlide(index)),
      setSelectedSlides: (slidesArr: Array<string>) => dispatch(setSelectedSlides(slidesArr)),
      setCanDeleteSlide: (canDelete: boolean) => dispatch(setCanDeleteSlide(canDelete)),
      removeOneElemFromSelectedSlides: (slideId: string) => dispatch(removeOneElemFromSelectedSlides(slideId)),
      setSelectedElement: (elemsArr: Array<string>) => dispatch(setSelectedElement(elemsArr))
    } 
  }
  
  function mapStateToProps(state: Programm) {
    return { 
      state: state,
    } 
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainSlide);