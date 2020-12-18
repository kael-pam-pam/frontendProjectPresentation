import React, {useEffect} from 'react'
import { deleteSelectedElements, setCanDeleteSlide, setSelectedElement } from '../Models/changeSlideContent'
import { deleteSlide, setSelectedSlides } from '../Models/slideMoveInProgramm'
import { actualProgState, dispatch } from '../Models/dispatcher'


export {
  useDeleteSelectedElems,
  useDeleteSelectedSlides,
  useMouseDownDocumentListner
}


function useDeleteSelectedSlides() {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && actualProgState.canDeleteSlides) {
      dispatch(deleteSlide, {})
    } 
  }
}


function useDeleteSelectedElems() {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && actualProgState.selectedElements.length !== 0) {
      dispatch(deleteSelectedElements, {})
    } 
  }
}


function useMouseDownDocumentListner() {  
  useEffect(() => {
    document.addEventListener('mousedown', mouseDownResetHandler)
    return () => document.removeEventListener('mousedown', mouseDownResetHandler)
  })

  
  const mouseDownResetHandler = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented) {
      if (actualProgState.canDeleteSlides) {
        dispatch(setCanDeleteSlide, false)
      }
      if (actualProgState.selectedElements.length !== 0) {
        dispatch(setSelectedElement, ([]))
      }  
      if (actualProgState.selectedSlides.length > 1) {
        dispatch(setSelectedSlides, ([actualProgState.selectedSlides[0]]))
      }
    }  
  }
}