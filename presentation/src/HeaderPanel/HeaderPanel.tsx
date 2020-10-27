import React from 'react';
import './HeaderPanel.css';
import { Commands, MenuItem } from '../Commands/Commands';
import { Tool, Tools } from '../Tools/Tools';
import { Program } from 'typescript';
import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  SlideElements,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj
} from '../Models/types'

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
      <div className="HeaderPanel">
        <span className="Title">{actualProgState.currentPresentation.title}</span>
        <Commands menu={menu} />
        <Tools/>
      </div>
    )
}

export {
    HeaderPanel,
}


/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/

/*
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/