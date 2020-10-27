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

import html2canvas from 'html2canvas';

export {
    createLoadedProgram,
    saveProgram
}
const exportWidth = 1400;
const exportHeight = 580;



function getProgram (fileName:string):Presentation {

    let Pres:Presentation = require('../importFiles/testPresent2.json');
    /*let request = new XMLHttpRequest();
    let Pres:Presentation;
    request.open('GET', fileName);

    request.onloadend = function() {

        Pres = JSON.parse(request.responseText);
    }
    request.send();*/
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
    let doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: /*"a4"*/ [exportWidth, exportHeight],
      });
      doc = setPDF(prog, doc);

      doc.save(Path + "/" + prog.currentPresentation.title + ".pdf");
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
    //let canvas = plot.getCanvas();
    if (progSlide.background.type == "picture"){
        //let src = canvas.toDataURL(prog.currentPresentation.slides[0].background.url);
        let src = progSlide.background.url;
        // add method for canvas with color
        if (progSlide.background.url.substr(-4,4).toUpperCase( ) == "JPEG")
            doc.addImage(src, 'JPEG', 0, 0, exportWidth, exportHeight);
        if (progSlide.background.url.substr(-3,3).toUpperCase( ) == "PNG")
            doc.addImage(src, 'PNG', 0, 0, exportWidth, exportHeight);
    }
    if (progSlide.background.type == "color"){
        // to think
        doc.setFillColor(progSlide.background.hexColor);
        doc.rect(0, 0, exportWidth, exportHeight, "F")
    }
    for (var i = 0; i < progSlide.elements.length; i++){
        doc = setElementToPagePDF(progSlide.elements[i], doc);
    }
    return doc;
}

function setElementToPagePDF(progSlide:(PictureObj|ShapeObj|TextObj), doc:jsPDF){
    if (progSlide.type == "picture"){
        let src = progSlide.url;
        //if ((progSlide.url.substr(-4,4).toUpperCase( ) == "JPG") || (progSlide.url.substr(-4,4).toUpperCase( ) == "jpg") )
        //    doc.addImage(src, 'JPEG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
       // if (progSlide.url.substr(-3,3).toUpperCase( ) == "PNG")
        //    doc.addImage(src, 'PNG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
        //if (progSlide.url.substr(-3,3).toUpperCase( ) == "JPG")
        //    doc.addImage(src, 'JPG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
    }
    else if (progSlide.type == "text"){
        /*doc.setFont(progSlide.fontFamily);
        doc.setFontSize(+progSlide.fontSize);
        doc.text(progSlide.text, progSlide.position.x, progSlide.position.y);*/

        // document.getElementById(progSlide.id);
        //doc.addImage(document.getElementById(progSlide.id), 'JPEG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height, 'alias', 'MEDIUM', 0);
        //html2canvas(document.querySelector('#' + progSlide.id)).then(function(canvas){
        //const img = document.querySelector('#'+progSlide.id) as HTMLCanvasElement;

        
        window.scrollTo(0,0);   
        /*const img = document.getElementById(progSlide.id+'.txt') as HTMLCanvasElement;
        html2canvas(img, {
            allowTaint: true,
            useCORS: true,
            logging: false}).then(function(canvas){   
            var imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
          });*/
        /*const img = document.getElementById('root') as HTMLImageElement;// HTMLCanvasElement;
        html2canvas(img).then(function(canvas){   
              //var imgData = canvas.toDataURL('image/png');
              doc.addImage(canvas, 'PNG', 0, 0, 1400, 850);
              console.log(canvas);
            });*/
        
        //const img = document.getElementById(progSlide.id+'.txt').getElementsByClassName('MainPanel') as HTMLCanvasElement;
        const img = document.getElementById(progSlide.id+'.txt') as HTMLCanvasElement;
        //const img = document.getElementById('3') as HTMLCanvasElement;
        html2canvas(img).then(async function(canvas){   
            var imgData = canvas.toDataURL('image/png');
            doc.addImage(atob(imgData), 'PNG',  progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
            console.log(atob(imgData));
        });
        
        /*var canvas = document.createElement('canvas');
        canvas.id     = "CursorLayer";
        canvas.width  = 1224;
        canvas.height = 768;
        canvas.style.zIndex   = '8';
        canvas.style.position = "absolute";
        canvas.style.border   = "1px solid";

        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI*2, true); 
        ctx.fill();
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false); 
        ctx.closePath() 
        ctx.stroke();

        window.onload = function() {
            const img = document.getElementById('CursorLayer') as HTMLCanvasElement;
            html2canvas(img).then(async function(canvas){   
            var imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG',  progSlide.position.x, progSlide.position.y, progSlide.wigth, progSlide.height);
            console.log(imgData);
        });
        }*/
        
        /*let img = new Image;
        let data: string;
        img.src = "https://nastol.net/wallpaper/big/2/8377058-kote-fon-kotyara-koshak-vzglyad-koshki.jpg";
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.width = img.width;
            canvas.height = img.height;
    
            var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.drawImage(img, 0, 0);
            // Grab the image as a jpeg encoded in base64, but only the data
            data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
            // Convert the data to binary form
            data = atob(data)
            document.body.removeChild(canvas);
        
        

        doc.addImage(data, 'JPEG', 10, 10, 50, 50);*/
    }
    else
    {
        if (progSlide.type ==  "circle"){
            doc.setFillColor(progSlide.fillColor);
            doc.setDrawColor(progSlide.borderColor);
            //doc.circle(+progSlide.position.x, +progSlide.position.y, +progSlide.wigth, "DF");
            doc.ellipse(+progSlide.position.x, +progSlide.position.y, +progSlide.wigth, +progSlide.height, "DF");
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

// npm install --save html2canvas        or         yarn add html2canvas
// npm install canvas
