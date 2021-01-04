import React, { useEffect, useState } from 'react';
import './MainPanel.css';
import MainSlide from '../Slide/Slide';

import { searchChangedSlideIndex } from '../../Models/CommonFunctions/supportFunctionsConst';
import { globalActiveTool } from '../../Models/CommonFunctions/supportFunctionsConst'
import { useSetPopup, useSetIsVisiblePopup } from '../Popup/PopupContext';
import { PropsPopup } from '../Popup/Popup'
import { connect } from 'react-redux';
import { Programm, Slide } from '../../Models/CommonFunctions/types';


function MainPanel(props: {slides: Array<Slide>, selectedSlides: Array<string>}) {
    const changedSlideIndex = searchChangedSlideIndex(props.slides, props.selectedSlides)
    const setPopup = useSetPopup();
    const setIsVisible = useSetIsVisiblePopup(); 

    let mainSlide: JSX.Element = 
        <div className='MainSlide'>
            <svg className='mainSlideSvg'/>    
        </div>    

    if(props.slides.length !== 0)
    {
        mainSlide = <MainSlide numberOfSlide={changedSlideIndex} isSmallSlide={false} slidesPanelRef={null}/> 
    }

    return (
        <div className={"MainPanel "+(globalActiveTool != 0 ? "MainPanel_createElement" : "")} onClick={() => ''} 
            onContextMenu={(e) => {
                const defSubMenu: PropsPopup = {
                    items: [
                      {
                          caption: '<Пусто>',
                          action: () => {}
                      },
                    ],
                    pos: {
                      x: 0,
                      y: 0,
                    },
                    width: 150,
                };
                e.preventDefault();
                setPopup({...defSubMenu, 
                    items: [
                      {
                          caption: 'Добавить слайд',
                          action: () => {console.log('Добавить слайд')}
                      },
                      {
                          caption: 'Сохранить',
                          action: () => {console.log('Сохранить')}
                      },
                      {
                        caption: 'Экспорт в PDF',
                        action: () => {console.log('Экспорт в PDF')}
                    },
                    ],
                    pos: {
                      x: e.clientX,
                      y: e.clientY,
                    },
                  }); setIsVisible(true)
                
            }}>    
            {mainSlide}    
        </div>
    )
}



const mapStateToProps = (state: Programm) => ({
    slides: state.mainProg.currentPresentation.slides,
    selectedSlides: state.mainProg.selectedSlides 
})

export default connect(mapStateToProps)(MainPanel);