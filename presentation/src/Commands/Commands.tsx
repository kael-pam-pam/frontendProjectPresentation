import React from 'react';
import './Commands.css';

export type MenuItem = {
  title: string,
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}

type CommandsProps = {
  menu: Array<MenuItem>
}

function Commands(props: CommandsProps) {
    const menuItems: Array<MenuItem> = props.menu;
    const listMenuItems = menuItems.map((item, index) =>
      <span key={index} className="menu-item" onClick={item.onClick}>{item.title}</span>
    );

    return (
        <div className="commands">
          {listMenuItems}
        </div>
    )
}

export {
    Commands,
}