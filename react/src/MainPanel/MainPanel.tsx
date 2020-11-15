import React, { useEffect, useState } from 'react';
import './MainPanel.css';
import { MainSlide, } from '../Slide/Slide';

import { searchChangedSlideIndex } from '../Models/commonFunctionsConst';
import { actualProgState, globalActiveTool } from '../Models/dispatcher'
import { useSetPopup, useSetIsVisiblePopup } from '../Popup/PopupContext';
import { PropsPopup } from '../Popup/Popup'


function MainPanel() {

    const changedSlideIndex = searchChangedSlideIndex(actualProgState)
    const setPopup = useSetPopup();
    const setIsVisible = useSetIsVisiblePopup(); 

    return (
        <div className={"MainPanel "+(globalActiveTool != 0 ? "MainPanel_createElement" : "")} onClick={() => console.log(globalActiveTool)} 
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
            <MainSlide numberOfSlide={changedSlideIndex} isSmallSlide={false}/>      
        </div>
    )
}

export {
    MainPanel,
}