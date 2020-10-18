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

import { jsPDF } from "jspdf";  //npm install jspdf --save      or      yarn add jspdf

export {
    createLoadedProgram,
    saveProgram
}

function getProgram (fileName:string):Presentation {

    let request = new XMLHttpRequest();
    let Pres:Presentation;
    request.open('GET', fileName);

    request.onloadend = function() {

        Pres = JSON.parse(request.responseText);
    }
    request.send();
    return Pres;
}

function createLoadedProgram(Path:string): Programm {
    const loadedPres = getProgram(Path); 
    return {
        currentPresentation: loadedPres,
        selectedSlides: [loadedPres.slides[0].id],
        archive: {
            past: [],
            future: []
        },
        selectedElements: []
    }
}

function saveProgram(prog:Programm, Path:string){
    let doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4"
      });
      doc = setPDF(prog, doc);

      doc.save(Path + "/" + prog.currentPresentation.title + ".pdf");
}

function setPDF(prog:Programm, doc:jsPDF){
    for (var i = 0; i < prog.currentPresentation.slides.length; i++){
        doc = setPagePDF(prog.currentPresentation.slides[i], doc);
        if (i + 1 < prog.currentPresentation.slides.length){
            doc.addPage("a4", "landscape");
        }
    }
    return doc;
}

function setPagePDF(progSlide:Slide, doc:jsPDF){
    //let canvas = plot.getCanvas();
    if (progSlide.background.type == "picture"){
        //let src = canvas.toDataURL(prog.currentPresentation.slides[0].background.url);
        let src = progSlide.background.url;
        // add method for canvas with color
        if (progSlide.background.url.substr(-4,4).toUpperCase( ) == "JPEG")
            doc.addImage(src, 'JPEG', 0, 0, 800, 600);
        if (progSlide.background.url.substr(-3,3).toUpperCase( ) == "PNG")
            doc.addImage(src, 'PNG', 0, 0, 800, 600);
    }
    if (progSlide.background.type == "color"){
        // to think
    }
    for (var i = 0; i < progSlide.elements.length; i++){
        doc = setElementToPagePDF(progSlide.elements[i], doc);
    }
    return doc;
}

function setElementToPagePDF(progSlide:(PictureObj|ShapeObj|TextObj), doc:jsPDF){
    if (progSlide.type == "picture"){
        let src = progSlide.url;
        if (progSlide.url.substr(-4,4).toUpperCase( ) == "JPEG")
            doc.addImage(src, 'JPEG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
        if (progSlide.url.substr(-3,3).toUpperCase( ) == "PNG")
            doc.addImage(src, 'PNG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
    }
    else if (progSlide.type ==  "text"){
        doc.setFont(progSlide.fontFamily);
        doc.setFontSize(progSlide.fontSize);
        doc.text(progSlide.text, progSlide.position.x, progSlide.position.y);
    }
    else
    {
        if (progSlide.type ==  "circle"){
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.circle(progSlide.position.x, progSlide.position.y, progSlide.wigth/2, "DF")
        }
        else if (progSlide.type ==  "triangle"){
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.triangle(progSlide.position.x + progSlide.wigth/2, progSlide.position.y, 
                progSlide.position.x, progSlide.position.y + progSlide.height, 
                progSlide.position.x + progSlide.wigth, progSlide.position.y + progSlide.height, "DF")
        }
        else {
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.rect(progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height, "DF")
        }   
    }
}