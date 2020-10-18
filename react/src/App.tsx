import React from 'react';
import './App.css';
import { HeaderPanel } from './HeaderPanel/HeaderPanel';
import { SlidesPanel, Slide } from './SlidesPanel/SlidesPanel';
import { MainPanel } from './MainPanel/MainPanel';


const slid: Array<Slide> = [
  {
    id: '31',
    background: 'красный'
  },
  {
    id: '222',
    background: 'белый'
  },
  {
    id: '310',
    background: 'красный'
  },
  {
    id: '311',
    background: 'красный'
  },
  {
    id: '312',
    background: 'красный'
  },
  {
    id: '313',
    background: 'красный'
  },
  {
    id: '314',
    background: 'красный'
  },
  {
    id: '315',
    background: 'красный'
  },
  {
    id: '316',
    background: 'красный'
  },
  {
    id: '317',
    background: 'красный'
  }
]

function App() {
  return (
    <div className="App">
      <div className="App-header">      
        <HeaderPanel text={'Презентация без названия'} />
      </div>
      <div className="App-body">
        <SlidesPanel slides={slid}/>
        <MainPanel text={'Главная панель'} />
      </div>
      <div className="App-footer">
      </div>
    </div>
  );
}

export default App;
