import React, {useEffect} from 'react'


export {
  useNormalizeElemSize,
}


interface NormalizeImgProps {
  id: string,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) => void,
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
     
      props.resizeElement(newImgSize.width, newImgSize.height, 10, 10, props.id)
      props.setSize(newImgSize)
    } 
  }, [])
}