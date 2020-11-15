import React, { useCallback } from 'react';
import './HeaderPanel.css';
import { Commands, MenuItem } from '../Commands/Commands';
import { Tools } from '../Tools/Tools';

import { actualProgState } from '../Models/dispatcher'

import { useSetPopup } from '../Popup/PopupContext';
import { PropsPopup } from '../Popup/Popup'




function HeaderPanel() {
    const setPopup = useSetPopup();
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
      visible: true,
      width: 150,
    };

    const menu: Array<MenuItem> = [
      {title: "Файл", onClick: (e) => 
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
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
          },
        })
      }, 
      {title: "Правка", onClick: (e) => console.log(e.currentTarget.offsetLeft, e.currentTarget.offsetTop, e.currentTarget.offsetHeight)}, 
      {title: "Вид", onClick: () => console.log('Вид')}, 
      {title: "Вставка", onClick: () => console.log('Вставка')}, 
      {title: "Формат", onClick: () => console.log('Формат')}, 
      {title: "Слайд", onClick: () => console.log('Слайд')}, 
      {title: "Объект", onClick: () => console.log('Объект')}, 
      {title: "Инструменты", onClick: () => console.log('Инструменты')}, 
      {title: "Дополнения", onClick: (e) => 
        setPopup({...defSubMenu, 
          items: [
            {
                caption: 'Дополнение 1',
                action: () => {console.log('Дополнение 1')}
            },
            {
                caption: 'Дополнение 2',
                action: () => {console.log('Дополнение 2')}
            },
          ],
          pos: {
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
          },
        })
      }, 
      {title: "Справка", onClick: (e) => 
        setPopup({...defSubMenu, 
          items: [
              {
                  caption: 'Справка 1',
                  action: () => {console.log('Справка 1')}
              },
              {
                caption: 'Справка 2',
                action: () => {console.log('Справка 2')}
              },
              {
                caption: 'Справка 3',
                action: () => {console.log('Справка 3')}
              },
          ],
          pos: {
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
          },
        })
      }
    ];

    

    return (
      <div className="header-panel">
        <span className="title">{actualProgState.currentPresentation.title}</span>
        <Commands menu={menu} />
        <Tools />
      </div>
    )
}

export {
    HeaderPanel,
}