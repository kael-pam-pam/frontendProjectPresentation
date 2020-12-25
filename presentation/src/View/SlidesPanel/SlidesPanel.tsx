import React, { useRef } from 'react';
import './SlidesPanel.css';
import { Programm, Slide } from '../../Models/CommonFunctions/types'
import { getListSlides } from '../commonViewFunctions';
import { connect } from 'react-redux';


function SlidesPanel(props: {state: Programm}) {
    const actualProgState = props.state
    const slides: Array<Slide> = actualProgState.mainProg.currentPresentation.slides
    const selectedSlides: Array<string> = actualProgState.mainProg.selectedSlides;
   
    const slidesPanelRef = useRef<HTMLDivElement | null>(null)

    const slidesList = getListSlides({state: actualProgState, slides, selectedSlides, slidesPanelRef})
    
    return (
        <div ref={slidesPanelRef} className="slides-panel">
            {slidesList}
        </div>
    )  
}


function mapStateToProps(state: Programm) {
    return { state: state } 
};
  
export default connect(mapStateToProps)(SlidesPanel);