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
    ShapeObj
} from './types';

import { jsPDF } from "jspdf";  //npm install jspdf --save      or      yarn add jspdf

import { dispatch,  loadProgramm } from '../Models/dispatcher';

export {
    //createLoadedProgram,
    saveProgramAsPDF,
    savePresentationAsJSON,
    getProgram
}
const exportWidth = 1400;
const exportHeight = 850;

function savePresentationAsJSON(prog:Programm): Programm {
    const progName = prog.currentPresentation.title + '.json';
    let progFile = new Blob([JSON.stringify(prog)], {type: 'json'});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(progFile, progName);
    else {
        let a = document.createElement("a"),
            url = URL.createObjectURL(progFile);
        a.href = url;
        a.download = progName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
    return prog;
}

function getProgram() {
    let input = document.createElement("input");
    input.type = "file";
    input.id = "inputFile";
    document.body.appendChild(input);

    input.onchange = function () {
        let files = input.files as FileList;
        let f:File = files[0] as File;
        let reader = new FileReader();
        reader.onload = function (e) {
            let target: any = e.target;
            let data:Programm = JSON.parse(target.result) as Programm;
            dispatch(LoadPr, data);
            function LoadPr():Programm {
                return data
            }
        };
        reader.onerror = function (e) {
            alert("Error loading"); // Ошибка загрузки
        }
        reader.readAsText(f);
    };

    input.click();

    setTimeout(function () {
        document.body.removeChild(input);
    }, 0);
}

function saveDocPDF(prog:Programm, Path:string, doc:jsPDF){
    doc.save(Path + "/" + prog.currentPresentation.title + ".pdf");
}

function saveProgramAsPDF(prog:Programm, Path:string):Programm{
    let doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: /*"a4"*/ [exportWidth, exportHeight],
      });
      doc = setPDF(prog, doc);
      setTimeout(saveDocPDF, 1000, prog, Path, doc);
      return prog;
}

function setPDF(prog:Programm, doc:jsPDF){
    for (var i = 0; i < prog.currentPresentation.slides.length; i++){
        doc = setPagePDF(prog.currentPresentation.slides[i], doc);
        if (i + 1 < prog.currentPresentation.slides.length){
            doc.addPage([exportWidth, exportHeight], "landscape");
        }
    }
    return doc;
}

function setPagePDF(progSlide:Slide, doc:jsPDF){
    if (progSlide.background.type == "picture"){
        let imgData2 = progSlide.background.imgB64;//CanEl.toDataURL('image/png');
            doc.addImage(imgData2, 'PNG', +0, +0, +exportWidth, +exportHeight);
    }
    if (progSlide.background.type == "color"){
        doc.setFillColor(progSlide.background.hexColor);
        doc.rect(0, 0, exportWidth, exportHeight, "F");
    }
    for (var i = 0; i < progSlide.elements.length; i++){
        doc = setElementToPagePDF(progSlide.elements[i], doc);
    }
    return doc;
}

function setElementToPagePDF(progSlide:(PictureObj|ShapeObj|TextObj), doc:jsPDF){
    if (progSlide.type == "picture"){
        let imgData2 = progSlide.imgB64;//CanEl.toDataURL('image/png');
            doc.addImage(imgData2, 'PNG', +progSlide.position.x, +progSlide.position.y, +progSlide.wigth, +progSlide.height);
    }
    else if (progSlide.type == "text"){
        let CanEl:HTMLCanvasElement = document.createElement('canvas');
        CanEl.id = 'picID';
        let ctx = CanEl.getContext("2d");
        CanEl.width = progSlide.text.length * parseInt(progSlide.fontSize) * 0.6;//progSlide.wigth;
        CanEl.height = parseInt(progSlide.fontSize)*0.9;//progSlide.height;
        if (ctx != null) {
            /*ctx.fillStyle = "#00F";
            ctx.strokeStyle = "#F00";
            ctx.font = "italic 30pt Arial";*/
            ctx.font = progSlide.fontSize + "px " + progSlide.fontFamily;
            ctx.fillText(progSlide.text, 0, parseInt(progSlide.fontSize)*0.75/*progSlide.position.x, progSlide.position.y*/);
            //ctx.font = 'bold 30px sans-serif';
            //ctx.strokeText("Stroke text", 0, 50);
        }
        //document.body.prepend(CanEl); 
        let imgData2 = CanEl.toDataURL('image/png');
        doc.addImage(imgData2, 'PNG', +progSlide.position.x, +progSlide.position.y - CanEl.height, +CanEl.width, +CanEl.height);
    }
    else
    {
        if (progSlide.type ==  "circle"){
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.ellipse(+progSlide.position.x, +progSlide.position.y, +progSlide.wigth/2, +progSlide.height/2, "DF");
        }
        else if (progSlide.type ==  "triangle"){
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.triangle(+progSlide.position.x + +progSlide.wigth/2, +progSlide.position.y, 
                +progSlide.position.x, +progSlide.position.y + +progSlide.height, 
                +progSlide.position.x + +progSlide.wigth, +progSlide.position.y + +progSlide.height, "DF")
        }
        else {
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            doc.rect(+progSlide.position.x, +progSlide.position.y, +progSlide.wigth, +progSlide.height, "DF")
        }   
    }
    return doc;
}
