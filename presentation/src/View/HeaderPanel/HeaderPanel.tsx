import React, { useCallback } from 'react';
import './HeaderPanel.css';
import { Commands, MenuItem } from '../Commands/Commands';
import  Tools  from '../Tools/Tools';
import { useSetPopup, useSetIsVisiblePopup } from '../Popup/PopupContext';
import { PropsPopup } from '../Popup/Popup'
import { addSlide } from '../../Models/ActionCreators/slElActionCreators';
import { getProgram, savePresentationAsJSON, saveProgramAsPDF } from '../../Models/CommonFunctions/SetGetPresentation';
import { connect } from 'react-redux';
import { Programm } from '../../Models/CommonFunctions/types';
import { Dispatch } from 'redux';
import { Program } from 'typescript';




function HeaderPanel(props: {addSlide: () => void, state: Programm}) {
    const setPopup = useSetPopup();
    const setIsVisible = useSetIsVisiblePopup();

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

    const menu: Array<MenuItem> = [
      {title: "Файл", onClick: (e) => {
        setPopup({...defSubMenu, 
          items: [
            {
                caption: 'Добавить слайд',
                action: () => props.addSlide()
            },
            {
              caption: 'Открыть',
              action: () => {getProgram()}
            },
            {
                caption: 'Сохранить',
                action: () => savePresentationAsJSON()
            },
            {
              caption: 'Экспорт в PDF',
              action: () => saveProgramAsPDF()
          },
          ],
          pos: {
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
          },
        }); setIsVisible(true)}
      }, 
      {title: "Правка", onClick: (e) => console.log(e.currentTarget.offsetLeft, e.currentTarget.offsetTop, e.currentTarget.offsetHeight)}, 
      {title: "Вид", onClick: () => console.log('Вид')}, 
      {title: "Вставка", onClick: () => console.log('Вставка')}, 
      {title: "Формат", onClick: () => console.log('Формат')}, 
      {title: "Слайд", onClick: () => console.log('Слайд')}, 
      {title: "Объект", onClick: () => console.log('Объект')}, 
      {title: "Инструменты", onClick: () => console.log('Инструменты')}, 
      {title: "Дополнения", onClick: (e) => {
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
        }); setIsVisible(true)}
      }, 
      {title: "Справка", onClick: (e) => {
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
        }); setIsVisible(true)}
      }
    ];

    return (
      <div className="header-panel">
        <span className="title">{props.state.mainProg.currentPresentation.title}</span>
        <Commands menu={menu} />
        <Tools />
      </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSlide: () => dispatch(addSlide()),
  } 
}

function mapStateToProps(state: Programm) {
  return { state: state } 
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPanel);