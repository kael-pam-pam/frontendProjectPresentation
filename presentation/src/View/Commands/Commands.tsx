import React from 'react';
import './Commands.css';
import { useSetIsVisiblePopup } from '../Popup/PopupContext';


export { Commands }
export type MenuItem = {
  title: string,
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}


type CommandsProps = {
  menu: Array<MenuItem>
}

function Commands(props: CommandsProps) {
    const menuItems: Array<MenuItem> = props.menu;
    const setIsVisiblePopup = useSetIsVisiblePopup();

    const mouseUpHandler = () => {
      setIsVisiblePopup(false);
      document.removeEventListener('mouseup', mouseUpHandler);
    }


    const listMenuItems = menuItems.map((item, index) =>
      <span key={index} className="menu-item" onClick={(e) => {item.onClick(e); document.addEventListener('mouseup', mouseUpHandler)}}>{item.title}</span>

    );


    return (
        <div className="commands">
          {listMenuItems}
        </div>
    )
}
