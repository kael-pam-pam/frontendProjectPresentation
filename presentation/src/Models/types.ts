
/*export {
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
    ShapeObj
}*/

export type Programm = {
    currentPresentation: Presentation,
    selectedSlides: Array<string>,         
    selectedElements: Array<string>,
}

export type Presentation = {
    title: string,
    slides: Array<Slide>, 
}

export type ArchiveOfState = {  
    past: Array<Programm>,   
    future: Array<Programm>, 
}

export type SlideElements = Array<PictureObj | ShapeObj | TextObj> 

export type Slide = {
    id: string,
    background: Picture | Color,
    elements: SlideElements
}

export type Point = {
    x: number,
    y: number,
}

export type ElementObj = {
    id: string,
    position: Point,
    height: number,
    wigth: number,
}

export type Picture = {
    url: string,
    type: 'picture',
}

export type PictureObj = ElementObj & Picture;

export type TextObj = ElementObj & {
    text: string,
	fontFamily: string,
	fontSize: string,
	type: 'text',
}

export type Color = {
    hexColor: string, 
    type: 'color',
}

export type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle' | 'empty',
    borderColor: string, //borderColor  string
    fillColor: string,
}

export type SlideId = string

export type ChangedParams = Programm | ShapeObj | TextObj | PictureObj | SlideId | null

//type Dispatch <Actions> = dispatch((prog:Programm, props:Actions): void, props:Actions): void) 

export type Actions =

  | "CREATE_NEW_PROGRAMM" 

  | "LOAD_PROGRAMM"

  | "ADD_NEW_SLIDE"

  | "SELECT_SLIDES"

  | "ADD_TEXT_OBJ"

  | "ADD_PICTURE"

  | "ADD_RECT"

  | "ADD_TRIANGLE"

  | "ADD_CIRCLE"  

  | "CHANGE_TEXT_IN_TEXT" 

  | "CHANGE_FONT_FAMILY_IN_TEXT" 

  | "CHANGE_FONT_SIZE_IN_TEXT" 







