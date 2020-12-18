import React, { useRef } from 'react';
import './SlidesPanel.css';
import { Slide } from '../../Models/types'
import { actualProgState } from '../../Models/dispatcher'
import { useGetListSlides } from '../../CustomHooks/CommonDifferentHooks';

export {
    SlidesPanel
}

function SlidesPanel() {
    const slides: Array<Slide> = actualProgState.currentPresentation.slides
    const selectedSlides: Array<string> = actualProgState.selectedSlides;
   
    const slidesPanelRef = useRef<HTMLDivElement | null>(null)

    const slidesList = useGetListSlides({slides, selectedSlides, slidesPanelRef})
    
    return (
        <div ref={slidesPanelRef} className="slides-panel">
            {slidesList}
        </div>
    )  
}

