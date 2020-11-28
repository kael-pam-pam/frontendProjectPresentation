import React, {useEffect} from 'react'
import {Point} from '../Models/types'

interface checkSizeProps {
  width: number, 
  height: number, 
  mainSvgProps:  DOMRect | undefined
}

export function useCheckSizeSetNewSize(props: checkSizeProps): boolean {
  let sizeIsChanged = false 
  const mainSvgWidth = Number(props.mainSvgProps?.width)
  const mainSvgHeight = Number(props.mainSvgProps?.height)
  let resizeNum = 20
  if (props.width > 1800 || props.height >= 1000) {
    resizeNum = 30
  }
  if (props.width > 2400 || props.height > 1500) {
    resizeNum = 40
  }
  if (props.width > 3000 || props.height > 2000) {
    resizeNum = 60
  }
  if (props.width > 4000 || props.height > 2500) {
    resizeNum = 75
  }

  console.log(mainSvgHeight, "",  mainSvgWidth)
  if (props.height >= mainSvgHeight || props.width >= mainSvgWidth)
  { 
    props.height = props.height - (props.height / 100 * resizeNum)
    props.width = props.width - (props.width / 100 * resizeNum)
    sizeIsChanged = true  
  }
  return sizeIsChanged
}



interface resizeProps {
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  pos: Point
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  setPos: React.Dispatch<React.SetStateAction<Point>>
}

export function useReSizeElem(props: resizeProps) {
  useEffect(() => {
    props.firstPointRef.current?.addEventListener('mousedown', (event) => mouseDownHandler(event , props.firstPointRef.current?.id))
    props.secondPointRef.current?.addEventListener('mousedown', (event) => mouseDownHandler(event , props.secondPointRef.current?.id))
    props.firstPointRef.current?.addEventListener('mousedown', (event) => mouseDownHandler(event , props.thirdPointRef.current?.id))
    props.secondPointRef.current?.addEventListener('mousedown', (event) => mouseDownHandler(event , props.fourthPointRef.current?.id))
  }, )

  const mouseDownHandler = (event: React.MouseEvent | MouseEvent, key: string | undefined) => {
    event.preventDefault()
    if (key === '1') {
      console.log(1)
    }
    if (key === '2') {
      console.log(2)
    }
  }
}
