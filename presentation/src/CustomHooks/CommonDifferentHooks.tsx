import React, {useEffect} from 'react'
import { BigSlideElement, SmallSlideElement } from '../View/Element/Element'
import { resizeElement} from '../Models/changeSlideContent'
import { isColor, isPictureObj, } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import { Color, Picture, SlideElements, Slide } from '../Models/types'
import { MainSlide } from '../View/Slide/Slide'


export {
  useNormalizeElemSize,
  useGetSlideSvgElems,
  useGetSlideBackground,
  useGetListSlides,
  useGetDivSvgClassNames
}


interface NormalizeImgProps {
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  elemWidth: number,
  elemHeight: number, 
  svgWidth: number, 
  svgHeight: number,
}

function useNormalizeElemSize(props: NormalizeImgProps) { 
  useEffect(() => {
    if (props.elemWidth >= props.svgWidth || props.elemHeight >= props.svgHeight) {
      let newImgSize = {
        width: props.elemWidth,
        height: props.elemHeight
      } 
      if (props.elemWidth > props.elemHeight) {
        newImgSize = {
          width: 900,
          height: 700
        }
      }
      if (props.elemWidth < props.elemHeight) {
        newImgSize = {
          width: 700,
          height: 900
        }
      }
      if (props.elemWidth == props.elemHeight) {
        newImgSize = {
          width: 800,
          height: 800
        }
      }
     
      dispatch(resizeElement, {newWidth: newImgSize.width, newHeigth: newImgSize.height, newPosX: 10, newPosY: 10})
      props.setSize(newImgSize)
    } 
  }, [])
}



function useGetDivSvgClassNames(isSmallSlide: boolean): {divClassName: string, svgClassName: string} {
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



function useGetSlideBackground(modelSlideBackground: Picture | Color): string {
  
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

function useGetSlideSvgElems(payload: getSlideElemsPayload): Array<JSX.Element> {

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
  slides: Array<Slide>
  selectedSlides: Array<string>
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}

function useGetListSlides(props: getListSlidesProps): Array<JSX.Element> {
  let slidesList: Array<JSX.Element> = []
  const slidesLength = Object.keys(props.slides).length

  function getDivClassname(i: number): string {
    let className = "slide-frame " + (props.selectedSlides.includes(props.slides[i].id) ? "slide-frame_selected" : "")
    return className
  }

  for(let i = 0; i < slidesLength; i++) {
    slidesList.push(
      <div key={props.slides[i].id} className={getDivClassname(i)}> 
        <span className="slide-frame__number">{i + 1}</span>
        <div className={"slide " + (props.selectedSlides.includes(props.slides[i].id) && actualProgState.canDeleteSlides ? "slide_selected" : "")}>
          <MainSlide key={props.slides[i].id} numberOfSlide={i} isSmallSlide={true} slidesPanelRef={props.slidesPanelRef}/>
        </div>
      </div>
    )
  }
  return slidesList
}




