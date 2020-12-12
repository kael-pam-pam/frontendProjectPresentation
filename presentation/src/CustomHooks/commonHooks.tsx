import React, {useEffect} from 'react'
import { BigSlideElement, SmallSlideElement } from '../Element/Element'
import { resizeElement, setSelectedElement } from '../Models/changeSlideContent'
import { checkSecondSlideIsBeyond, isColor, isPictureObj, } from '../Models/commonFunctionsConst'
import { actualProgState, dispatch } from '../Models/dispatcher'
import { Color, Picture, SlideElements, Slide } from '../Models/types'
import { MainSlide } from '../Slide/Slide'


export function useMouseDownDocumentListner(elemRef: React.MutableRefObject<SVGElement | null>) {  
  useEffect(() => {
    document.addEventListener('mousedown', mouseDownResetHandler)
    return () => document.removeEventListener('mousedown', mouseDownResetHandler)
  })
  
  const mouseDownResetHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      dispatch(setSelectedElement, ([]))
    }
  }
}



interface NormalizeImgProps {
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  elemWidth: number,
  elemHeight: number, 
  svgWidth: number, 
  svgHeight: number,
}

export function useNormalizeElemSize(props: NormalizeImgProps) { 
  useEffect(() => {
    if (props.elemWidth >= props.svgWidth || props.elemHeight >= props.svgHeight) {
      console.log(props.elemWidth)
      let newImgSize = {
        width: props.elemWidth,
        height: props.elemHeight
      } 
      let imgIndex = 0

      if (props.elemWidth >= props.elemHeight) {
        imgIndex = props.elemWidth / props.elemHeight
      } else {
        imgIndex = props.elemHeight / props.elemWidth
      }

      if (props.elemWidth >= props.svgWidth) { //большая сторона по меньшей стороне слайда
        newImgSize.width = props.svgWidth - 100
        newImgSize.height = newImgSize.width / imgIndex
      } 
      if (props.elemHeight >= props.svgHeight) {
        newImgSize.height = props.svgHeight - 100
        newImgSize.width = newImgSize.height / imgIndex
      }
      dispatch(resizeElement, {newWidth: newImgSize.width, newHeigth: newImgSize.height})
      props.setSize(newImgSize)
    } 
  })
}



export function useGetDivSvgClassNames(isSmallSlide: boolean): {divClassName: string, svgClassName: string} {
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



export function useGetSlideBackground(modelSlideBackground: Picture | Color): string {
  
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

export function useGetSlideSvgElems(payload: getSlideElemsPayload): Array<JSX.Element> {

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



interface lighInsertPlaceProps {
  currSlide: Slide
  svgRef: React.MutableRefObject<SVGSVGElement | null>
  divRef: React.MutableRefObject<HTMLDivElement | null>
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
  isSmallSlide: boolean
} 

export function useLighSlideInsertPlace(props: lighInsertPlaceProps) {

  useEffect(() => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id) {
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (event.defaultPrevented) {
      props.svgRef.current?.addEventListener('mouseenter', mouseEnterNotSelectSlide)
      props.divRef.current?.addEventListener('mouseleave', mouseLeaveNotSelectSlide)
      document.addEventListener('mouseup', mouseUpNotSelectSlide)
      event.preventDefault()
    }  
  }

  const mouseEnterNotSelectSlide = (event: MouseEvent) => {
    if (props.isSmallSlide && actualProgState.selectedSlides[0] !== props.currSlide.id){
      const selectedSlideId = actualProgState.selectedSlides[0]
      const otherSlideId = props.currSlide.id
      if (checkSecondSlideIsBeyond(actualProgState, selectedSlideId, otherSlideId)) {
        props.divRef.current?.classList.add('slide-frame_selected__bottom')
      } else {
        props.divRef.current?.classList.add('slide-frame_selected__top')
      }
    }
  }

  const mouseLeaveNotSelectSlide = () => {
    props.divRef.current?.classList.remove('slide-frame_selected__top')
    props.divRef.current?.classList.remove('slide-frame_selected__bottom')
  }

  const mouseUpNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    props.divRef.current?.classList.remove('slide-frame_selected__top')
    props.divRef.current?.classList.remove('slide-frame_selected__bottom')
    props.svgRef.current?.removeEventListener('mouseenter', mouseEnterNotSelectSlide)
    document.removeEventListener('mouseup', mouseUpNotSelectSlide)
  }
}


interface getListSlidesProps {
  slides: Array<Slide>
  selectedSlides: Array<string>
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}

export function useGetListSlides(props: getListSlidesProps): Array<JSX.Element> {
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
        <div className={"slide " + (props.selectedSlides.includes(props.slides[i].id) ? "slide_selected" : "")}>
          <MainSlide key={props.slides[i].id} numberOfSlide={i} isSmallSlide={true} slidesPanelRef={props.slidesPanelRef}/>
        </div>
      </div>
    )
  }
  return slidesList
}




