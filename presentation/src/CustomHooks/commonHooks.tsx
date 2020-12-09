import React, {useEffect} from 'react'
import { resizeElement, setSelectedElement } from '../Models/changeSlideContent'
import { dispatch } from '../Models/dispatcher'


export function useMouseDownDocumentListner(elemRef: React.MutableRefObject<SVGElement | null>) {  // mousedown
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


