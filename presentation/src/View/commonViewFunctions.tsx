import React from 'react'
import BigSlideElement, { SmallSlideElement } from './Element/Element'
import { isColor, isPictureObj, } from '../Models/CommonFunctions/supportFunctionsConst'
import { Color, Picture, SlideElements, Slide, MainProg, Programm } from '../Models/CommonFunctions/types'
import MainSlide from './Slide/Slide'


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
    svgSlideBackground = modelSlideBackground.imgB64
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
  slideBorderLight: string,
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  canDeleteSlides: boolean,
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}

function getListSlides(props: getListSlidesProps): Array<JSX.Element> {

  const selectedSlides = props.selectedSlides
  const slides = props.slides
  const canDeleteSlides = props.canDeleteSlides
  const slideBorderLight = props.slideBorderLight
  const slidesPanelRef = props.slidesPanelRef

  let slidesList: Array<JSX.Element> = []
  const slidesLength = Object.keys(slides).length

  function getDivClassname(i: number): string {
    
    let className = "slide-frame " + (selectedSlides.includes(slides[i].id) ? "slide-frame_selected" : "")
    if (slideBorderLight == 'top') {
      className =  "slide-frame, slide-frame_selected__top"
    }
    return className
  }

  for(let i = 0; i < slidesLength; i++) {
    slidesList.push(
      <div key={slides[i].id} className={getDivClassname(i)}> 
        <span className="slide-frame__number">{i + 1}</span>
        <div className={"slide " + (selectedSlides.includes(slides[i].id) && canDeleteSlides ? "slide_selected" : "")}>
          <MainSlide key={slides[i].id} numberOfSlide={i} isSmallSlide={true} slidesPanelRef={slidesPanelRef}/>
        </div>
      </div>
    )
  }
  return slidesList
}

