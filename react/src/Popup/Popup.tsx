import React, { useState } from 'react';
import './Popup.css';
import { usePopup, useSetPopup } from './PopupContext'

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
    visible: boolean,
    width: number,
}

function Popup() {
    const props = usePopup();
    const setProps = useSetPopup();

    const style = {
        top: props.pos.y,
        left: props.pos.x,
        width: props.width
    }

    const className = "popup "+(props.visible ? "" : "popup_hide ")
    
    const listMenuItems = props.items.map((item, index) =>
        <li key={index} className="popup__menu__item" onClick = {item.action}>{item.caption}</li>
    );

    return (
        <div className = {className} style = {style} onClick={() => setProps({...props, visible: !props.visible})}>
            <ul className="popup__menu">
                {listMenuItems}
            </ul>
        </div>
    )
}

export {
    Popup,
}