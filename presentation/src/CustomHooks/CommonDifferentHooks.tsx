import React, {useEffect} from 'react'
import { resizeElement} from '../Models/ActionCreators/slideElemActionCreators'
import { dispatch } from '../index'


export {
  useNormalizeElemSize,
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
     
      dispatch(resizeElement({newWidth: newImgSize.width, newHeigth: newImgSize.height, newPosX: 10, newPosY: 10}))
      props.setSize(newImgSize)
    } 
  }, [])
}