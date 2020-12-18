export type Programm = {
    currentPresentation: Presentation,
    selectedSlides: Array<string>,       
    selectedElements: Array<string>

    canDeleteSlides: boolean,
    elemsMoveCount: number
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
    elements: SlideElements,
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
    imgB64: string,
    type: 'picture',
}

export type PictureObj = ElementObj & Picture;

export type TextObj = ElementObj & {
    text: string,
    fillColor: string,
	fontFamily: string,
	fontSize: string,
	type: 'text',
}

export type Color = {
    hexColor: string, 
    type: 'color',
}

export type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle' | 'outlineRect',
    borderColor: string, //borderColor  string
    fillColor: string
}

export type ChangedObjPosType = {
    newX: number,
    newY: number,
    saveToArh: boolean
}

export type SlideId = string

export type ChangedParams = Programm | ShapeObj | TextObj | PictureObj | SlideId | null



//type Dispatch <Actions> = dispatch((prog:Programm, props:Actions): void, props:Actions): void) 



