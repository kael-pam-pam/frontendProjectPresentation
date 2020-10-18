import React from 'react';
import './SlidesPanel.css';

export type Slide = {
    id: string,
    background: string
}

type SlidesPanelProps = {
    slides: Array<Slide>
}
//margin: "0 auto", marginRight: "10px",
function SlidesPanel(props: SlidesPanelProps) {
    const slides: Array<Slide> = props.slides;
    const listSlides = slides.map((item, index) =>
        <div key={item.id} style={{display: "flex", padding: "8px 0 8px 5px"}} onClick={() => console.log('Слайд '+Number(index+1))}>
            <span style={{display: "block", font: "14px sans-serif", paddingRight: "10px", width: "20px", textAlign: "right"}}>{index+1}</span>
            <div className="Slide"></div>
        </div>
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