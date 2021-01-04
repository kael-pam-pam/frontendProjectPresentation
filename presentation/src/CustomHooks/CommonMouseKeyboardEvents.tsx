import React, {useEffect} from 'react'
//import { dispatch, getState } from '..'

import { CommonDeps, MainProg, Programm } from '../Models/CommonFunctions/types'


export {
  useDeleteSelectedElems,
  useDeleteSelectedSlides,
  useMouseDownDocumentListner
}


function useDeleteSelectedSlides(canDeleteSlides: boolean, deleteSlide: () => void) {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && canDeleteSlides) {
      deleteSlide()
    } 
  }
}


function useDeleteSelectedElems(selectedElements: Array<string>, deleteSelectedElements: () => void) {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const selectedElemsLength = selectedElements.length
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && selectedElemsLength !== 0) {
      deleteSelectedElements()
    } 
  }
}



interface useMouseDownProps {
  canDeleteSlides: boolean,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setSelectedElement: (elemsArr: Array<string>) => void
}

function useMouseDownDocumentListner(props: useMouseDownProps) {  
  useEffect(() => {
    document.addEventListener('mousedown', mouseDownResetHandler)
    return () => document.removeEventListener('mousedown', mouseDownResetHandler)
  })

  
  const mouseDownResetHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      const selectedElemsLength = props.selectedElements.length
      const selectedSlidesLength = props.selectedSlides.length
      const firstSlideId = props.selectedSlides[0]
      if (props.canDeleteSlides) {
        props.setCanDeleteSlide(false)
      }
      if (selectedElemsLength !== 0) {
        props.setSelectedElement([])
      }  
      if (selectedSlidesLength > 1) {
        props.setSelectedSlides([firstSlideId])
      }
    }  
  }
}