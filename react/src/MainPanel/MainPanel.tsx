import React, { useEffect, useState } from 'react';
import './MainPanel.css';
import { MainSlide, } from '../Slide/Slide';

import { searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { actualProgState, globalActiveTool } from '../Models/dispatcher'
//<MainSlide text={"slide"} />

function MainPanel() {
    const selectedSlideIndex: number = searchChangedSlideIndex(actualProgState)


    return (
        <div className={"MainPanel "+(globalActiveTool != 0 ? "MainPanel_createElement" : "")} onClick={() => {console.log(globalActiveTool)}}>
            <MainSlide slideIndex={selectedSlideIndex} />    
        </div>
    )
}

export {
    MainPanel,
}