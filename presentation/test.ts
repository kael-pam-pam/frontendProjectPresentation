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
  createProgram,
  changePresentationTitle,
  saveProject,
  loadProject,
  goBackAchive,
  goForwardAchive
} from './functions'

import {
  setSlideBackground,
  createPictureObj,
  addPictureObj,
  createEmtyTextObj,
  addTextObj,
  changeTextObj,
  createShapeObj,
  addShapeObj,
  changeShapeObj,
  resizeElement,
  changeElemPosition,
  setSelectedElement,
  deleteSelectedElements
} from './changeSlideContent'

import {
  createDefaultSlide,
  addSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  moveSlide,
  setSelectedSlides,
  deleteSlide
} from './slideMoveInProgramm'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  isTextObj,
  isShapeObj,
  isPictureObj
} from './commonFunctionsConst'


test('createProgramm', () => {     
  const newTittle = 'Презентация без названия'
  const newProgState: Programm = createProgram()

  expect(newProgState.currentPresentation.title).toEqual(newTittle)
  expect(newProgState.currentPresentation.slides.length).toEqual(1)
})

test('changePresentationTitle', () => {
  const newTittle = 'secondPresentation'
  const prog: Programm = createProgram()
  const newProgState: Programm = changePresentationTitle(prog, newTittle)
	expect(newProgState.currentPresentation.title).toEqual(newTittle)
})

test('setSlideBackgroundAsPicture', () => {
  const newBackground: PictureObj = createPictureObj('newUrl') 
  const prog = createProgram()
  const newProgState = setSlideBackground(prog, newBackground)
  expect(newProgState.currentPresentation.slides[0].background).toMatchObject(newBackground)
})

test('setSlideBackgroundAsColor', () => {
  const newBackground: Color = {
    hexColor: '100',
    type: 'color'
  } 
  const prog = createProgram()
  const newProgState = setSlideBackground(prog, newBackground)
  expect(newProgState.currentPresentation.slides[0].background).toMatchObject(newBackground)
})

test('createPictureObj', () => {
  const newPictureObj = createPictureObj('newUrl')
  expect(newPictureObj.wigth).toEqual(15)
  expect(newPictureObj.url).toEqual('newUrl')
})

test('addPictureObj', () => {
  const prog = createProgram()
  const newProgState = addPictureObj(prog, 'newUrl')
  if(isPictureObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].url).toEqual('newUrl')
  }
})

test('createEmtyTextObj', () => {
  const newTextObj = createEmtyTextObj()
  expect(newTextObj.type).toEqual('text')  
})

test('addTextObj' , () => {
  const prog = createProgram()
  const newProgState = addTextObj(prog)
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].type).toEqual('text')
    expect(newProgState.currentPresentation.slides[0].elements[0].text).toEqual('введите текст')
  }
})

test('searchChangedSlideIndex', () => {
  const prog = createProgram()
  expect(prog.selectedSlides.length).toEqual(1)
})

test('searchChangedElemIndex', () => {
  let prog = createProgram()
  prog = addTextObj(prog)
  expect(prog.selectedElements.length).toEqual(1)
})

test('changeTextObj', () => {
  let prog = createProgram()
  prog = addTextObj(prog)

  let newProgState = changeTextObj(prog, 'новый текст', 'text')
  

  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].text).toEqual('новый текст')
  }

  newProgState = changeTextObj(prog, '20', 'fontSize')
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fontSize).toEqual('20')
  }

  newProgState = changeTextObj(prog, 'Arial', 'fontFamily')
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fontFamily).toEqual('Arial')
  }
})

test('createShapeObj', () => {
  let prog = createProgram()
  let shapeObj = createShapeObj('rect')
  expect(shapeObj.type).toEqual('rect')

  shapeObj = createShapeObj('circle')
  expect(shapeObj.type).toEqual('circle')

  shapeObj = createShapeObj('triangle')
  expect(shapeObj.type).toEqual('triangle')
})

test('addShapeObj', () => {
  let prog = createProgram()

  prog = addShapeObj(prog, 'rect')
  if(isShapeObj(prog.currentPresentation.slides[0].elements[0])) {
    expect(prog.currentPresentation.slides[0].elements[0].type).toEqual('rect')  
  }
  
  prog = addShapeObj(prog, 'circle')
  if(isShapeObj(prog.currentPresentation.slides[0].elements[1])) {
    expect(prog.currentPresentation.slides[0].elements[1].type).toEqual('circle')  
  }

  prog = addShapeObj(prog, 'triangle')
  if(isShapeObj(prog.currentPresentation.slides[0].elements[2])) {
    expect(prog.currentPresentation.slides[0].elements[2].type).toEqual('triangle')  
  }  
})

test('changeShapeObj', () => {
  let prog = createProgram()
  prog = addShapeObj(prog, 'rect')

  let newProgState = changeShapeObj(prog, 'FFFFF', 'borderColor')
  if(isShapeObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].borderColor).toEqual('FFFFF')
  }

  newProgState = changeShapeObj(prog, '11111', 'fillColor')
  if(isShapeObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fillColor).toEqual('11111')
  }
})

test('resizeElement', () => {
  let prog = createProgram()

  prog = addPictureObj(prog, 'newUrl')
  let newWidth = 30
  let newHeigth = 20
  prog = resizeElement(prog, newWidth, newHeigth)
  expect(prog.currentPresentation.slides[0].elements[0].wigth).toEqual(newWidth)
  expect(prog.currentPresentation.slides[0].elements[0].height).toEqual(newHeigth)

  prog = addTextObj(prog)
  newWidth = 50
  newHeigth = 20
  prog = resizeElement(prog, newWidth, newHeigth)
  expect(prog.currentPresentation.slides[0].elements[1].wigth).toEqual(newWidth)
  expect(prog.currentPresentation.slides[0].elements[1].height).toEqual(newHeigth)

  prog = addShapeObj(prog, 'rect')
  newWidth = 15
  newHeigth = 10
  prog = resizeElement(prog, newWidth, newHeigth)
  expect(prog.currentPresentation.slides[0].elements[2].wigth).toEqual(newWidth)
  expect(prog.currentPresentation.slides[0].elements[2].height).toEqual(newHeigth)
})

test('changeElemPosition', () => {
  let prog = createProgram()

  prog = addPictureObj(prog, 'newUrl')
  let newX = 10
  let newY = 15
  prog = changeElemPosition(prog, newX, newY)
  expect(prog.currentPresentation.slides[0].elements[0].position.x).toEqual(newX)
  expect(prog.currentPresentation.slides[0].elements[0].position.y).toEqual(newY)

  prog = addTextObj(prog)
  newX = 30
  newY = 20
  prog = changeElemPosition(prog, newX, newY)
  expect(prog.currentPresentation.slides[0].elements[1].position.x).toEqual(newX)
  expect(prog.currentPresentation.slides[0].elements[1].position.y).toEqual(newY)

  prog = addShapeObj(prog, 'rect')
  newX = 10
  newY = 5
  prog = changeElemPosition(prog, newX, newY)
  expect(prog.currentPresentation.slides[0].elements[2].position.x).toEqual(newX)
  expect(prog.currentPresentation.slides[0].elements[2].position.y).toEqual(newY)
})

test('setSelectedElement', () => {
  let prog = createProgram()
  const arrOfIdOfSelectedElems = ['21324', '37464', '76564', '84756', '38475']
 
  prog = setSelectedElement(prog, arrOfIdOfSelectedElems)
  expect(prog.selectedElements.length).toEqual(arrOfIdOfSelectedElems.length)
})

test('deleteSelectedElements', () => {
  let prog = createProgram()
  prog = addPictureObj(prog, 'newUrl')
  const firstId = prog.currentPresentation.slides[0].elements[0].id

  prog = addTextObj(prog)
  const secondId = prog.currentPresentation.slides[0].elements[1].id

  prog = addShapeObj(prog, 'rect')
  const thirdId = prog.currentPresentation.slides[0].elements[2].id

  
  expect(secondId).toEqual(thirdId)

  prog.selectedElements = [firstId, secondId, thirdId]

  expect(prog.currentPresentation.slides[0].elements.length).toEqual(3)
  expect(prog.selectedElements.length).toEqual(3)

  prog = deleteSelectedElements(prog)

  expect(prog.currentPresentation.slides[0].elements.length).toEqual(0)
  expect(prog.selectedElements.length).toEqual(0)
})
