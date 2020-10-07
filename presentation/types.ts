export {
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
}

type Programm = {
    currentPresentation: Presentation,
    selectedSlides: Array<string>,         
    archive: ArchiveOfState,  // архив вынести
    selectedElements: Array<string>,
};

type Presentation = {
    title: string,
    slides: Array<Slide>, 
};

type ArchiveOfState = {  
    past: Array<Programm>,   
    future: Array<Programm>, 
};

type Slide = {
    id: string,
    background: Picture | Color,
    elements: Array<PictureObj | TextObj | ShapeObj>,   
};

type Point = {
    x: number,
    y: number,
};

type ElementObj = {
    id: string,
    position: Point,
    height: number,
    wigth: number,
};

type Picture = {
    url: string,
    type: 'picture',
};

type PictureObj = ElementObj & Picture;

type TextObj = ElementObj & {
    text: string,
	fontFamily: string,
	fontSize: number,
	type: 'text',
};

type Color = {
    hexColor: number, //string
    type: 'color',
};

type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle',
    borderColor: number, //borderColor  string
    fillColor: number,
};



