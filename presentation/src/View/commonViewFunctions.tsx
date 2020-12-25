import React from 'react'
import BigSlideElement, { SmallSlideElement } from './Element/Element'
import { isColor, isPictureObj, } from '../Models/CommonFunctions/supportFunctionsConst'
import { Color, Picture, SlideElements, Slide, MainProg, Programm } from '../Models/CommonFunctions/types'
import MainSlide from './Slide/Slide'
import { getState, dispatch } from '../index'


export {
  getSlideSvgElems,
  getSlideBackground,
  getListSlides,
  getDivSvgClassNames
}



function getDivSvgClassNames(isSmallSlide: boolean): {divClassName: string, svgClassName: string} {
  let classNames = {
    divClassName: 'mainSlideDiv',
    svgClassName: 'mainSlideSvg'
  }
  if (isSmallSlide) {
    classNames.divClassName = ''
    classNames.svgClassName = 'smallMainSlideSvg'
  }

  return classNames
}



function getSlideBackground(modelSlideBackground: Picture | Color): string {
  
  let svgSlideBackground: string = ''
  
  if(isColor(modelSlideBackground)) {
    svgSlideBackground = modelSlideBackground.hexColor
  }
  if (isPictureObj(modelSlideBackground)) {
    svgSlideBackground = modelSlideBackground.url
  }

  return svgSlideBackground
}



interface getSlideElemsPayload {
  modelSlideElems: SlideElements
  isSmallSlideElem: boolean
  svgRef: React.MutableRefObject<SVGSVGElement | null>
} 

function getSlideSvgElems(payload: getSlideElemsPayload): Array<JSX.Element> {

  let svgSlideElems: Array<JSX.Element> = []
  const modelSlideElems = {...payload.modelSlideElems}
  const modelSlideElemsLength = Object.keys(modelSlideElems).length
  
  for(let i = 0; i < modelSlideElemsLength; i++) {
    svgSlideElems.push(
      payload.isSmallSlideElem
        ? <SmallSlideElement key={modelSlideElems[i].id} {...modelSlideElems[i]}/>
        : <BigSlideElement key={modelSlideElems[i].id} shape={{...modelSlideElems[i]}} svgProps={payload.svgRef}/> 
    )
  }
  return svgSlideElems
}



interface getListSlidesProps {
  state: Programm
  slides: Array<Slide>
  selectedSlides: Array<string>
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}

function getListSlides(props: getListSlidesProps): Array<JSX.Element> {
  const actualProgState = props.state

  let slidesList: Array<JSX.Element> = []
  const slidesLength = Object.keys(props.slides).length

  function getDivClassname(i: number): string {
    let borderLight = actualProgState.mainProg.currentPresentation.slides[i].slideBorderLight
    let className = "slide-frame " + (props.selectedSlides.includes(props.slides[i].id) ? "slide-frame_selected" : "")
    if (borderLight == 'top') {
      className =  "slide-frame, slide-frame_selected__top"
    }
    return className
  }

  for(let i = 0; i < slidesLength; i++) {
    slidesList.push(
      <div key={props.slides[i].id} className={getDivClassname(i)}> 
        <span className="slide-frame__number">{i + 1}</span>
        <div className={"slide " + (props.selectedSlides.includes(props.slides[i].id) && actualProgState.commonDeps.canDeleteSlides ? "slide_selected" : "")}>
          <MainSlide key={props.slides[i].id} numberOfSlide={i} isSmallSlide={true} slidesPanelRef={props.slidesPanelRef}/>
        </div>
      </div>
    )
  }
  return slidesList
}

