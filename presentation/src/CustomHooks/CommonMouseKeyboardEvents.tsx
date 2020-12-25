import React, {useEffect} from 'react'
//import { dispatch, getState } from '..'
import { deleteSelectedElements, setCanDeleteSlide, setSelectedElement } from '../Models/ActionCreators/slideElemActionCreators'
import { deleteSlide, setSelectedSlides } from '../Models/ActionCreators/slidesActionCreators'
import { CommonDeps, MainProg, Programm } from '../Models/CommonFunctions/types'


export {
  useDeleteSelectedElems,
  useDeleteSelectedSlides,
  useMouseDownDocumentListner
}


function useDeleteSelectedSlides(commonDepsState: CommonDeps, deleteSlide: () => void) {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && commonDepsState.canDeleteSlides) {
      deleteSlide()
    } 
  }
}


function useDeleteSelectedElems(mainProgState: MainProg, deleteSelectedElements: () => void) {
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  })

  const selectedElemsLength = mainProgState.selectedElements.length
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && selectedElemsLength !== 0) {
      deleteSelectedElements()
    } 
  }
}



interface useMouseDownProps {
  state: Programm,
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
      const canDeleteSlides = props.state.commonDeps.canDeleteSlides
      const selectedElemsLength = props.state.mainProg.selectedElements.length
      const selectedSlidesLength = props.state.mainProg.selectedSlides.length
      const firstSlideId = props.state.mainProg.selectedSlides[0]
      if (canDeleteSlides) {
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