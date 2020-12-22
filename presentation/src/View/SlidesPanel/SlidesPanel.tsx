import React, { useRef } from 'react';
import './SlidesPanel.css';
import { Slide } from '../../Models/CommonFunctions/types'
import { getListSlides } from '../commonViewFunctions';
import { getState } from '../../index';

export {
    SlidesPanel
}

function SlidesPanel() {
    const actualProgState = getState().mainProg
    const slides: Array<Slide> = actualProgState.currentPresentation.slides
    const selectedSlides: Array<string> = actualProgState.selectedSlides;
   
    const slidesPanelRef = useRef<HTMLDivElement | null>(null)

    const slidesList = getListSlides({slides, selectedSlides, slidesPanelRef})
    
    return (
        <div ref={slidesPanelRef} className="slides-panel">
            {slidesList}
        </div>
    )  
}