import React from 'react';
import './Commands.css';

export type MenuItem = {
  title: string,
  onClick: () => void,
}

type CommandsProps = {
  menu: Array<MenuItem>
}

function Commands(props: CommandsProps) {
    const menuItems: Array<MenuItem> = props.menu;
    const liseMenuItems = menuItems.map((item, index) =>
      <span key={index} className="MenuItem" onClick={item.onClick}>{item.title}</span>
    );

    return (
        <div className="Commands">
          {liseMenuItems}
        </div>
    )
}

export {
    Commands,
}