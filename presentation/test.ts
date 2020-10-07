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
  Triangle,
  Rect,
  Circle
} from './types';
import {
  changePresentationTitle, 
  createProgram, 
  createDefaultSlide, 
  addSlide,
  deleteSlide
} from './functions';



const emptyProg: Programm = {
  currentPresentation: {
    title: null,
    slides: []
  },	
  selectedSlides: [],           
  archive: {
    past: [],
    future: []
  } ,
  selectedElements: [],
}


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



