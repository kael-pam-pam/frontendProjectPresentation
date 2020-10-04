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
    Triangle,
    Rect,
    Circle
}

type Programm = {
    currentPresentation: Presentation,
    selectedSlides: Array<Slide>,           
    archive: ArchiveOfState,
    selectedElements: Array<PictureObj | TextObj | Triangle | Rect | Circle>,
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
    background: Picture | Color,
    elements: Array<PictureObj | TextObj | Triangle | Rect | Circle>,   
    isSkip: boolean,
};

type Point = {
    x: number,
    y: number,
};

type ElementObj = {
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
    hexColor: number,
    type: 'color',
};

type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle',
    hexColorCircuit: number,
    hexColorFill: number,
};

type Triangle = ShapeObj & {
	type: 'triangle',
	v1: Point,
	v2: Point,
	v3: Point,  
};

type Rect = ShapeObj & {
	type: 'rect',
	v1: Point,
	v2: Point,
    v3: Point,
    v4: Point,  
};

type Circle = ShapeObj & {
	type: 'circle',
	centre: Point,
	radius: number,
};

