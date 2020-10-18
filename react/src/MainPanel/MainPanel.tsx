import React from 'react';
import './MainPanel.css';

interface MainPanelProps {
    text: string,
}

function MainPanel(props: MainPanelProps) {
    return (
        <div className="MainPanel">{props.text}</div>
    )
}

export {
    MainPanel,
}