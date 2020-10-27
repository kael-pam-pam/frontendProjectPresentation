import {
    Programm,
    Presentation,
    Slide,
    ArchiveOfState,
    Point,
    ElementObj,
    Picture,
    PictureObj,
    TextObj,
    Color,
    ShapeObj,
} from './types';

export {
    createLoadedProgram,
    saveProgram
}

/*const PDFDocument = require('pdfkit');
const fs = require('fs');*/
const exportWidth = 1400;
const exportHeight = 580;



function getProgram (fileName:string):Presentation {

    let Pres:Presentation = require('../importFiles/testPresent2.json');
    return Pres;
}

function createLoadedProgram(Path:string): Programm {
    const loadedPres = getProgram(Path); 
    return {
        currentPresentation: loadedPres,
        selectedSlides: [loadedPres.slides[0].id],
        selectedElements: []
    }
}

function saveProgram(prog:Programm, Path:string){
    const fs = require('fs');
const PDFDocument = require('pdfkit');

let options = {
 margins: 50
// you pdf settings here.
}
const doc = new PDFDocument(options);
let out = fs.createWriteStream('output.pdf')
doc.pipe(out);
doc.text('Hellow World.')
doc.end();
out.on('finish', function() {
    // what you want to do with the file.
});

}
