import {
  Programm,
  Presentation,
  ArchiveOfState,
  Slide,
  Point,
  ElementObj,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
} from './types'

import {
  addTextObj,
  changeTextObj, 
} from './changeSlideContent'

import {
  createProgram, 
} from './functions'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  isTextObj,
  isShapeObj,
  isPictureObj
} from './commonFunctionsConst'


test('change_Text_In_TextObj', () => {

  let prog: Programm = createProgram()
  let newText: string = null
  const progWithText: Programm = addTextObj(prog) 

  if (isTextObj(progWithText.currentPresentation.slides[0].elements[0])) {
    newText = progWithText.currentPresentation.slides[0].elements[0].text
  }

  expect(newText).toEqual('введите текст')
})


/*
// supportAddSlide

test('support_Add_Slide', () => {
  const newSlideState = createDefaultSlide()
  expect(newSlideState).toMatchObject({
    background: {
      hexColor: 0,
      type: 'color',
    },
    elements: [],
  })
})


// create Program

test('create_Programm', () => {

  const newTittle = 'Презентация без названия';
  const currSlide: Slide = createDefaultSlide();
  
  const newProgState: Programm = createProgram()
	expect(newProgState).toMatchObject({
    currentPresentation: {
      title: newTittle,
      slides: [currSlide]      
    },
    selectedSlides: [currSlide],
    archive: {
      past: [],
      future: []
    },
    selectedElements: []  
  })
})


// change Presentation Tittle

test('change_Presentation_Title', () => {
  const newTittle = 'secondPresentation';
  const newProgState: Programm = changePresentationTitle(emptyProg, newTittle)
	expect(newProgState.currentPresentation.title).toEqual(newTittle)
})

// addSlide
test('add_New_Slide', () => {
  const newSlide = createDefaultSlide()

  const newProgState = addSlide(emptyProg)

  expect(newProgState).toEqual({
    ...emptyProg,
    currentPresentation: {
      ...emptyProg.currentPresentation,
      slides: [newSlide]
    },
    selectedSlides: [newSlide]
  })
})
// меняется selection новый слайд последний изменилась длинна


// deleteSlide

test('delete_Any_Slide', () => {  
  const firstProgState = createProgram();
  const secondProgState = addSlide(firstProgState)
  const newProgState = deleteSlide(secondProgState)
  expect(newProgState).toEqual(firstProgState)
})

// 

*/

