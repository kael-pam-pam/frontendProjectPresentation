import React from 'react';
import './MainPanel.css';
import { MainSlide } from '../Slide/Slide';

import { searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { actualProgState } from '../Models/dispatcher'
//<MainSlide text={"slide"} />

function MainPanel() {
    const selectedSlideIndex: number = searchChangedSlideIndex(actualProgState)
    return (
        <div className="MainPanel">
            <MainSlide slideIndex={selectedSlideIndex} />    
        </div>
    )
}

export {
    MainPanel,
}