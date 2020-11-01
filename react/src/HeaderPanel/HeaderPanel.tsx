import React from 'react';
import './HeaderPanel.css';
import { Commands, MenuItem } from '../Commands/Commands';
import { Tools } from '../Tools/Tools';

import { actualProgState } from '../Models/dispatcher'

function HeaderPanel() {
    const menu: Array<MenuItem> = [
      {title: "Файл", onClick: () => console.log('Файл')}, 
      {title: "Правка", onClick: () => console.log('Правка')}, 
      {title: "Вид", onClick: () => console.log('Вид')}, 
      {title: "Вставка", onClick: () => console.log('Вставка')}, 
      {title: "Формат", onClick: () => console.log('Формат')}, 
      {title: "Слайд", onClick: () => console.log('Слайд')}, 
      {title: "Объект", onClick: () => console.log('Объект')}, 
      {title: "Инструменты", onClick: () => console.log('Инструменты')}, 
      {title: "Дополнения", onClick: () => console.log('Дополнения')}, 
      {title: "Справка", onClick: () => console.log('Справка')}
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