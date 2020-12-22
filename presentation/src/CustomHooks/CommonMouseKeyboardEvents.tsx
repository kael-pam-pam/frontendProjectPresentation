import React, {useEffect} from 'react'
import { dispatch, getState } from '..'
import { deleteSelectedElements, setCanDeleteSlide, setSelectedElement } from '../Models/ActionCreators/slideElemActionCreators'
import { deleteSlide, setSelectedSlides } from '../Models/ActionCreators/slidesActionCreators'


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
    if (event.key === 'Delete' && getState().commonDeps.canDeleteSlides) {
      dispatch(deleteSlide())
    } 
  }
}


function useDeleteSelectedElems() {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const selectedElemsLength = getState().mainProg.selectedElements.length
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && selectedElemsLength !== 0) {
      dispatch(deleteSelectedElements())
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
      const canDeleteSlides = getState().commonDeps.canDeleteSlides
      const selectedElemsLength = getState().mainProg.selectedElements.length
      const selectedSlidesLength = getState().mainProg.selectedSlides.length
      const firstSlideId = getState().mainProg.selectedSlides[0]
      if (canDeleteSlides) {
        dispatch(setCanDeleteSlide(false))
      }
      if (selectedElemsLength !== 0) {
        dispatch(setSelectedElement([]))
      }  
      if (selectedSlidesLength > 1) {
        dispatch(setSelectedSlides([firstSlideId]))
      }
    }  
  }
}