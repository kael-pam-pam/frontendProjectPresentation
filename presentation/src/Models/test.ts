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
} from './CommonFunctions/types'



import {
  setSlideBackground,
  createPictureObj,
  createEmtyTextObj,
  changeTextObj,
  createShapeObj,
  changeShapeObj,
} from './Reducers/slideElemReducers'

import {
  createDefaultSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,

} from './Reducers/slidesReducers'

import {
  defaultPoint,
  createNewId,
  searchChangedSlideIndex,
  searchChangedElemIndex,
  isTextObj,
  isShapeObj,
  isPictureObj
} from './CommonFunctions/supportFunctionsConst'


/*test('createProgramm', () => {     
  const newTittle = 'Презентация без названия'
  let newProgState: Programm = createProgram()

  expect(newProgState.currentPresentation.title).toEqual(newTittle)
  expect(newProgState.currentPresentation.slides.length).toEqual(1)
})

test('changePresentationTitle', () => {
  const newTittle = 'secondPresentation'
  const prog: Programm = createProgram()
  const newProgState: Programm = changePresentationTitle(prog, newTittle)
  expect(newProgState.currentPresentation.title).toEqual(newTittle)
  expect(prog.currentPresentation.title).toEqual('Презентация без названия')
})

test('setSlideBackgroundAsPicture', () => {
  const newBackground: PictureObj = createPictureObj('newUrl') 
  const prog = createProgram()
  const newProgState = setSlideBackground(prog, newBackground)
  expect(newProgState.currentPresentation.slides[0].background).toMatchObject(newBackground)
  expect(prog.currentPresentation.slides[0].background).not.toMatchObject(newBackground)
})

test('setSlideBackgroundAsColor', () => {
  const newBackground: Color = {
    hexColor: '100',
    type: 'color'
  } 
  let prog = createProgram()
  prog = addSlide(prog)
  const newProgState = setSlideBackground(prog, newBackground)
  expect(newProgState.currentPresentation.slides[1].background).toMatchObject(newBackground)
  expect(prog.currentPresentation.slides[1].background).not.toMatchObject(newBackground)
})

test('createPictureObj', () => {
  const newPictureObj = createPictureObj('newUrl')
  expect(newPictureObj.wigth).toEqual(100)
  expect(newPictureObj.url).toEqual('newUrl')

})

test('addPictureObj', () => {
  const prog = createProgram()
  const newProgState = addPictureObj(prog, 'newUrl')
  if(isPictureObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].url).toEqual('newUrl')
  }
  expect(prog.currentPresentation.slides[0].elements.length).toEqual(0)
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
  expect(prog.currentPresentation.slides[0].elements.length).toEqual(0)
})

test('searchChangedSlideIndex', () => {
  const firstProgState  = createProgram()

  const secondProgState = addSlide(firstProgState)
  let changedSlideIndex = searchChangedSlideIndex(secondProgState)
  expect(changedSlideIndex).toEqual(1)

  const thirdProgState = addSlide(secondProgState)
  changedSlideIndex = searchChangedSlideIndex(thirdProgState)
  expect(changedSlideIndex).toEqual(2)
})

test('searchChangedElemIndex', () => {
  const firstProgState  = createProgram()

  const secondProgState = addTextObj(firstProgState)

  let changedSlideIndex = searchChangedSlideIndex(secondProgState)
  let changedElemIndex = searchChangedElemIndex(secondProgState, changedSlideIndex)
  expect(changedElemIndex).toEqual(0)

  const thirdProgState = addTextObj(secondProgState)
  changedSlideIndex = searchChangedSlideIndex(thirdProgState)
  changedElemIndex = searchChangedElemIndex(thirdProgState, changedSlideIndex)

  expect(changedElemIndex).toEqual(1)
})

test('changeTextObj', () => {
  let prog = createProgram()
  let secondProg = addTextObj(prog)

  let newProgState = changeTextObj(secondProg, 'новый текст', 'text')
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].text).toEqual('новый текст')
  }

  newProgState = changeTextObj(secondProg, '20', 'fontSize')
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fontSize).toEqual('20')
  }

  newProgState = changeTextObj(secondProg, 'Arial', 'fontFamily')
  if(isTextObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fontFamily).toEqual('Arial')
  }

  if(isTextObj(secondProg.currentPresentation.slides[0].elements[0])){
    expect(secondProg.currentPresentation.slides[0].elements[0].text).toEqual('введите текст')
    expect(secondProg.currentPresentation.slides[0].elements[0].fontFamily).toEqual('oblique')
    expect(secondProg.currentPresentation.slides[0].elements[0].fontSize).toEqual('50')
  }
})

test('createShapeObj', () => {
  let shapeObj = createShapeObj('rect')
  expect(shapeObj.type).toEqual('rect')

  shapeObj = createShapeObj('circle')
  expect(shapeObj.type).toEqual('circle')

  shapeObj = createShapeObj('triangle')
  expect(shapeObj.type).toEqual('triangle')
})

test('addShapeObj', () => {
  const prog = createProgram()

  let newProg = addShapeObj(prog, 'rect')
  if(isShapeObj(newProg.currentPresentation.slides[0].elements[0])) {
    expect(newProg.currentPresentation.slides[0].elements[0].type).toEqual('rect')  
  }
  
  newProg = addShapeObj(newProg, 'circle')
  if(isShapeObj(newProg.currentPresentation.slides[0].elements[1])) {
    expect(newProg.currentPresentation.slides[0].elements[1].type).toEqual('circle')  
  }

  newProg = addShapeObj(newProg, 'triangle')
  if(isShapeObj(newProg.currentPresentation.slides[0].elements[2])) {
    expect(newProg.currentPresentation.slides[0].elements[2].type).toEqual('triangle')  
  }  

  expect(prog.currentPresentation.slides[0].elements.length).not.toEqual(newProg.currentPresentation.slides[0].elements.length)
})

test('changeShapeObj', () => {
  const firstProg = createProgram()
  const secondProg = addShapeObj(firstProg, 'rect')

  let newProgState = changeShapeObj(secondProg, 'FFFFF', 'borderColor')
  if(isShapeObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].borderColor).toEqual('FFFFF')
  }

  newProgState = changeShapeObj(secondProg, '11111', 'fillColor')
  if(isShapeObj(newProgState.currentPresentation.slides[0].elements[0]))
  {
    expect(newProgState.currentPresentation.slides[0].elements[0].fillColor).toEqual('11111')
  }

  expect(firstProg.currentPresentation.slides[0].elements.length).toEqual(0)
})

test('resizeElement', () => {
  let prog = createProgram()

  let newProg = addPictureObj(prog, 'newUrl')
  let newWidth = 30
  let newHeigth = 20
  newProg = resizeElement(newProg, newWidth, newHeigth)
  expect(newProg.currentPresentation.slides[0].elements[0].wigth).toEqual(newWidth)
  expect(newProg.currentPresentation.slides[0].elements[0].height).toEqual(newHeigth)

  newProg = addTextObj(newProg)
  newWidth = 50
  newHeigth = 20
  newProg = resizeElement(newProg, newWidth, newHeigth)
  expect(newProg.currentPresentation.slides[0].elements[1].wigth).toEqual(newWidth)
  expect(newProg.currentPresentation.slides[0].elements[1].height).toEqual(newHeigth)

  newProg = addShapeObj(newProg, 'rect')
  newWidth = 15
  newHeigth = 10
  newProg = resizeElement(newProg, newWidth, newHeigth)
  expect(newProg.currentPresentation.slides[0].elements[2].wigth).toEqual(newWidth)
  expect(newProg.currentPresentation.slides[0].elements[2].height).toEqual(newHeigth)

  expect(prog.currentPresentation.slides[0].elements.length).toEqual(0)
})

test('changeElemPosition', () => {
  let firstProg = createProgram()

  let prog = addPictureObj(firstProg, 'newUrl')
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

  expect(firstProg.currentPresentation.slides[0].elements.length).toEqual(0)
})

test('setSelectedElement', () => {
  let firstProg = createProgram()
  const arrOfIdOfSelectedElems = ['21324', '37464', '76564', '84756', '38475']
  const secondProg = setSelectedElement(firstProg, arrOfIdOfSelectedElems)
  expect(secondProg.selectedElements.length).toEqual(arrOfIdOfSelectedElems.length)
  expect(firstProg.selectedElements.length).toEqual(0)
})

test('deleteSelectedElements', () => {
  let prog = createProgram()
  prog = addPictureObj(prog, 'newUrl')
  const firstId = prog.currentPresentation.slides[0].elements[0].id

  prog = addTextObj(prog)
  const secondId = prog.currentPresentation.slides[0].elements[1].id

  prog = addShapeObj(prog, 'rect')
  const thirdId = prog.currentPresentation.slides[0].elements[2].id

  prog.selectedElements = [firstId, secondId, thirdId]

  const newProg = deleteSelectedElements(prog)

  expect(newProg.currentPresentation.slides[0].elements.length).toEqual(0)
  expect(newProg.selectedElements.length).toEqual(0)

  expect(prog.currentPresentation.slides[0].elements.length).toEqual(3)
  expect(prog.selectedElements.length).toEqual(3)

})

//========================================================================

test('setSelectedSlides', () => {     
  const prog = createProgram();
  const currSlide1: Slide = createDefaultSlide();
  const currSlide2: Slide = createDefaultSlide();
  const currSlide3: Slide = createDefaultSlide();
  const currSlide4: Slide = createDefaultSlide();
  const currSlide5: Slide = createDefaultSlide();
  prog.currentPresentation.slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5];
  
  const newProgState: Programm = setSelectedSlides(prog, [currSlide2.id, currSlide4.id]);

  expect(newProgState.selectedSlides.length).toEqual(2)
  expect(newProgState.selectedSlides[0]).toEqual(currSlide2.id)
  expect(newProgState.selectedSlides[1]).toEqual(currSlide4.id)
})

test('addSlide', () => {     
  let prog = createProgram();
  const currSlide1: Slide = createDefaultSlide();
  const currSlide2: Slide = createDefaultSlide();
  const currSlide3: Slide = createDefaultSlide();
  const currSlide4: Slide = createDefaultSlide();
  const currSlide5: Slide = createDefaultSlide();
  prog.currentPresentation.slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5];

  prog = addSlide(prog);

  expect(prog.selectedSlides.length).toEqual(1)
  expect(prog.selectedSlides[0]).toEqual(prog.currentPresentation.slides[prog.currentPresentation.slides.length - 1].id)
  expect(prog.currentPresentation.slides.length).toEqual(6)
})

//supportSlidesWithoutSelectedSlides(slides: Array<Slide>, selectedSlides: Array<string>): Array<Slide>

test('supportSortingSelectedSlides', () => {
  let slides: Array<Slide> = [];
  let selectedSlides: Array<string> = [];
  const currSlide1: Slide = createDefaultSlide()
  const currSlide2: Slide = createDefaultSlide()
  const currSlide3: Slide = createDefaultSlide()
  const currSlide4: Slide = createDefaultSlide()
  const currSlide5: Slide = createDefaultSlide()

  slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5]
  selectedSlides = [currSlide4.id, currSlide1.id, currSlide2.id]

  const sortedSelectSlides = supportSortingSelectedSlides(slides, selectedSlides)

  expect(sortedSelectSlides.length).toEqual(3)
  expect(sortedSelectSlides[0]).toEqual(currSlide1)
  expect(sortedSelectSlides[1]).toEqual(currSlide2)
  expect(sortedSelectSlides[2]).toEqual(currSlide4)
})

test('supportSlidesWithoutSelectedSlides', () => {     
  let slides: Array<Slide> = [];
  let selectedSlides: Array<string> = [];
  const currSlide1: Slide = createDefaultSlide();
  const currSlide2: Slide = createDefaultSlide();
  const currSlide3: Slide = createDefaultSlide();
  const currSlide4: Slide = createDefaultSlide();
  const currSlide5: Slide = createDefaultSlide();
  slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5];
  selectedSlides = [currSlide2.id, currSlide4.id];

  const newSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(slides, selectedSlides);
  expect(newSlides.length).toEqual(3);
  expect(newSlides[0].id).toEqual(currSlide1.id);
  expect(newSlides[1].id).toEqual(currSlide3.id);
  expect(newSlides[2].id).toEqual(currSlide5.id);
})


test('deleteSlide', () => {     
  let prog = createProgram();
  const currSlide1: Slide = createDefaultSlide();
  const currSlide2: Slide = createDefaultSlide();
  const currSlide3: Slide = createDefaultSlide();
  const currSlide4: Slide = createDefaultSlide();
  const currSlide5: Slide = createDefaultSlide();
  prog.currentPresentation.slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5];
  prog.selectedSlides = [currSlide5.id, currSlide1.id];

  const newProg = deleteSlide(prog); // add such tests 

  expect(newProg.selectedSlides.length).toEqual(1)
  expect(newProg.selectedSlides[0]).toEqual(currSlide4.id)
  expect(newProg.currentPresentation.slides.length).toEqual(3)
  expect(newProg.currentPresentation.slides[0].id).toEqual(currSlide2.id)
  expect(newProg.currentPresentation.slides[1].id).toEqual(currSlide3.id)
  expect(newProg.currentPresentation.slides[2].id).toEqual(currSlide4.id)

  expect(prog.currentPresentation.slides.length).toEqual(5)
  expect(prog.selectedSlides.length).toEqual(2)
})


// moveSlide(prog: Programm, posBefore: number)
test('moveSlide', () => {     
  let prog = createProgram();
  const currSlide1: Slide = createDefaultSlide();
  const currSlide2: Slide = createDefaultSlide();
  const currSlide3: Slide = createDefaultSlide();
  const currSlide4: Slide = createDefaultSlide();
  const currSlide5: Slide = createDefaultSlide();
  prog.currentPresentation.slides = [currSlide1, currSlide2, currSlide3, currSlide4, currSlide5];
  prog.selectedSlides = [currSlide3.id, currSlide5.id];

  const newProg = moveSlide(prog, 1); // add some tests

  expect(newProg.currentPresentation.slides[0].id).toEqual(currSlide1.id)
  expect(newProg.currentPresentation.slides[1].id).toEqual(currSlide3.id)
  expect(newProg.currentPresentation.slides[2].id).toEqual(currSlide5.id)
  expect(newProg.currentPresentation.slides[3].id).toEqual(currSlide2.id)
  expect(newProg.currentPresentation.slides[4].id).toEqual(currSlide4.id)

  expect(prog.currentPresentation.slides[0].id).toEqual(currSlide1.id)
  expect(prog.currentPresentation.slides[1].id).toEqual(currSlide2.id)
  expect(prog.currentPresentation.slides[2].id).toEqual(currSlide3.id)
  expect(prog.currentPresentation.slides[3].id).toEqual(currSlide4.id)
  expect(prog.currentPresentation.slides[4].id).toEqual(currSlide5.id)

})*/