import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Popup.css';
import { usePopup, useSetPopup, IsVisiblePopup, useSetIsVisiblePopup } from './PopupContext'

export type PopupItem  = {
    caption: string,
    action: () => void,
}

export type Pos = {
    x: number,
    y: number,
}

export type PropsPopup = {
    items: Array<PopupItem>,
    pos: Pos,
    width: number,
}

export {
    Popup
}


function Popup() {
    const props = usePopup();
    const setProps = useSetPopup();
    const isVisible = IsVisiblePopup();
    const setIsVisible = useSetIsVisiblePopup();

    const style = {
        top: props.pos.y,
        left: props.pos.x,
        width: props.width
    }

    const className = "popup "+(isVisible ? "" : "popup_hide ")
    
    const listMenuItems = props.items.map((item, index) =>
        <li key={index} className="popup__menu__item" onClick = {item.action}>{item.caption}</li>
    );

    return (
        <div className = {className} style = {style} onClick={() => {setProps({...props}); setIsVisible(false)}}>
            <ul className="popup__menu">
                {listMenuItems}
            </ul>
        </div>
    )
}
