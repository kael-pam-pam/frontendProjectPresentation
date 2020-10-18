import React from 'react';
import './SlidesPanel.css';

export type Slide = {
    id: string,
    background: string
}

type SlidesPanelProps = {
    slides: Array<Slide>
}

function SlidesPanel(props: SlidesPanelProps) {
    const slides: Array<Slide> = props.slides;
    const listSlides = slides.map((item, index) =>
      <div key={index} className="Slide"></div>
    );
    return (
        <div className="SlidesPanel">
            {listSlides}
        </div>
    )
}

export {
    SlidesPanel,
}