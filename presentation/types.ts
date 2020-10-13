
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
    archive: ArchiveOfState,  // архив вынести
    selectedElements: Array<string>,
};

export type Presentation = {
    title: string,
    slides: Array<Slide>, 
};

export type ArchiveOfState = {  
    past: Array<Programm>,   
    future: Array<Programm>, 
};

export type Slide = {
    id: string,
    background: Picture | Color,
    elements: Array<PictureObj | ShapeObj | TextObj>, //make one type   in isObject
};

export type Point = {
    x: number,
    y: number,
};

export type ElementObj = {
    id: string,
    position: Point,
    height: number,
    wigth: number,
};

export type Picture = {
    url: string,
    type: 'picture',
};

export type PictureObj = ElementObj & Picture;

export type TextObj = ElementObj & {
    text: string,
	fontFamily: string,
	fontSize: string,
	type: 'text',
};

export type Color = {
    hexColor: string, //string
    type: 'color',
};

export type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle' | 'empty',
    borderColor: string, //borderColor  string
    fillColor: string,
};



