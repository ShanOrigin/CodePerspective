

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, generateColors ,  clearCanvas , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';

export async function MultiplicationOf2D({canvas}) {
    try {
        let tempArray1 = [],
            tempArray2 = [];
        let calcX, calcY , OC , colors;
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;
        let mul = null,
            plus = null;

        let ind = 0 , array1 ,  array2 ,  resultArray , dis , mat3 , resultmat;
        let operatorArray = [] , array1BoxCoordinates = [] , array2BoxCoordinates = [];

        const initialize = async () => {

        drawText({ canvas, text: "Multiplication Of Matrix (2D Array)", x: centerX, y: centerY / 2, fontSize: 1.01 ,  color: "#46099c" });

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;
        canvas.drawYPos += canvas.rectHeight * 2.5;

        const array1data = await Rect.drawArray({ canvasHandler: canvas, array: [] , cont: true, indexs: true, type: "array2D", purpose: "input", range: [-1000, 1000, 1, -1] });
        array1 = array1data[0];
        if (canvas.abort) return;
        OC = Rect.boxes2D[0][0].rectElement.attr("fill");

        tempArray1 = Rect.boxes2D;
        Rect.boxes2D = [];

        drawText({ canvas, text: "Matrix 1", x: canvas.drawXPos + canvas.nextPos, y: canvas.drawYPos - canvas.rectHeight , Return: true, fontSize: 1 ,  color: "blue" });

        const tx = drawText({ canvas, text: "Enter Matrix 2 Columns?" , x : centerX ,  y: canvas.canvasHeight * 0.5 , Return: true, fontSize: 1 ,  color: "blue" });

        const rowRect = new Rect({ canvasHandler: canvas, xposition: centerX - canvas.rectWidth, yposition: canvas.canvasHeight * 0.55, content: array1[0].length, color: "#3498db" });
        rowRect.drawRect({ rect: true, cont: true, popover: false });

        const colRect = new Rect({ canvasHandler: canvas, xposition: centerX + canvas.rectWidth * 0.3, yposition: canvas.canvasHeight * 0.55, content: "", color: "#3498db" });
        const Matrix2col = await colRect.inputRect({ rect: true, cont: true, popover: false , Range : [1 , 3] });

        array2 = Array(array1[0].length).fill().map(() => Array(Matrix2col).fill(0));

        tx.text.remove();
        tx.rect.remove();
        rowRect.clearRect({ rect: true, cont: true, ind: false, dfba: false });
        colRect.clearRect({ rect: true, cont: true, ind: false, dfba: false });

        const array2data = await Rect.drawArray({ canvasHandler: canvas, array: array2, cont: true, indexs: true, type: "array2D", purpose: "input", range: [-1000, 1000, 2, 1] });
        array2 = array2data[0];
        if (canvas.abort) return;

        tempArray2 = Rect.boxes2D;
        Rect.boxes2D = [];

        drawText({ canvas, text: "Matrix 2", x: canvas.drawXPos + canvas.nextPos, y: canvas.drawYPos - canvas.rectHeight , Return: true , fontSize: 1 ,  color: "blue" });

        resultArray = Array(array1.length).fill().map(() => Array(array2[0].length).fill(0));

        canvas.drawYPos += canvas.rectHeight * 8;
        Rect.boxes2D = [];

        dis = (((canvas.canvasWidth - canvas.rectWidth * (array2.length + array1[0].length + 1)) / 2) / (array2.length + array1[0].length + 2)) * 2;
        calcY = canvas.drawYPos - canvas.rectHeight * 2.5;
        calcX = dis;

        for (let i = 0; i < array1.length; i++) {
            let b = [];
            for (let j = 0; j < array1[i].length; j++) {
                b.push([tempArray1[i][j].rectElement.attr("x"), tempArray1[i][j].rectElement.attr("y")]);
                if (canvas.abort) return;
            }
            array1BoxCoordinates.push(b);
        }

        for (let i = 0; i < array2.length; i++) {
            let b = [];
            for (let j = 0; j < array2[i].length; j++) {
                b.push([tempArray2[i][j].rectElement.attr("x"), tempArray2[i][j].rectElement.attr("y")]);
                if (canvas.abort) return;
            }
            array2BoxCoordinates.push(b);
        }

     };

      
const execute = async () => {

  try {
        resultmat = await  Rect.drawArray({ canvasHandler: canvas, array: resultArray, cont: true, indexs: true, type: "array2D", purpose: "print", range: [-1000, 1000, 3, -1] });
        if (canvas.abort) return;

        mat3 = drawText({ canvas, text: "Result Array", x: canvas.drawXPos + canvas.nextPos, y: canvas.drawYPos + canvas.rectHeight * 1.5 *( resultArray.length + 0.5), Return: true, fontSize: 1 ,  color: "blue" });

        if (canvas.abort) return;


    const i1arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
    const k1arrow = new Arrow({ canvasHandler: canvas, cont: "k", color: "red" });
    const k2arrow = new Arrow({ canvasHandler: canvas, cont: "k", color: "green", direction: "left" });
    const j2arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });
    const i3arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
    const j3arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });

    for (let i = 0; i < array1.length; i++) {

        await i1arrow.drawArrow({ rectObj: tempArray1[i][0], fig: true, cont: true, popover: true });
        await canvas.delay({ time: 200 });

        await i3arrow.drawArrow({ rectObj: Rect.boxes2D[i][0], fig: true, cont: true, popover: true });
        await canvas.delay({ time: 200 });
        if (canvas.abort) return;
     
        for (let j = 0; j < array2[0].length; j++) {

            await j2arrow.drawArrow({ rectObj: tempArray2[0][j], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            if (canvas.abort)return;
            let result = 0;

            for (let k = 0; k < array2.length; k++) {
                colors = await generateColors(array1.length);
                // arrow k in array 1

                await k1arrow.drawArrow({ rectObj: tempArray1[i][k], fig: true, cont: true, popover: true });
                await k2arrow.drawArrow({ rectObj: tempArray2[k][j], fig: true, cont: true, popover: true });

                tempArray1[i][k].rectElement.attr({ "fill": colors[k] });
                await tempArray1[i][k].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: tempArray1[i][k].rectElement.attr("y") });
                await canvas.delay({ time: 100 });
                await tempArray1[i][k].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });

                tempArray1[i][k].moveTo({ newX: calcX + (canvas.rectWidth + dis) * ind, newY: calcY });

                if (canvas.abort) return;
     
                await canvas.delay({ time: 500 });
                mul = canvas.paper.text(calcX + ((canvas.rectWidth + dis) * (ind + 1)) - dis / 2, calcY + canvas.rectHeight * 0.5, "*").attr({ "font-size": canvas.cfontSize * 1.6, fill: "blue" });
                operatorArray.push(mul);

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });
  
                // arrow k in array 2
                tempArray2[k][j].rectElement.attr({ "fill": colors[k] });
                await tempArray2[k][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: tempArray2[k][j].rectElement.attr("y") });
                await canvas.delay({ time: 100 });
                await tempArray2[k][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });

                tempArray2[k][j].moveTo({ newX: calcX + (canvas.rectWidth + dis) * (ind + 1), newY: calcY });

                if (canvas.abort)return;
                await canvas.delay({ time: 500 });

                if (k < array2.length - 1) {
                    plus = canvas.paper.text(calcX + ((canvas.rectWidth + dis) * (ind + 2)) - dis / 2, calcY + canvas.rectHeight * 0.5, "+").attr({ "font-size": canvas.cfontSize * 1.6, fill: "blue" });
                    operatorArray.push(plus);
                }
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                result += array1[i][k] * array2[k][j];
                ind += 2;

                if (k < array2.length - 1) {
                   // k2arrow.clearArrow({ cont: false, fig: true, popover: false });
                    await k1arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await k1arrow.ShiftArrow({ steps: 1, direction: "right" });
                    await k2arrow.ShiftArrow({ steps: 0.5, direction: "left" });
                    await k2arrow.ShiftArrow({ steps: 1.5, direction: "down" });

                    if (canvas.abort)return;
                    await canvas.delay({ time: 1000 });
                }
              
                k1arrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                k2arrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
            }

            let equal = canvas.paper.text(calcX + (canvas.rectWidth + dis) * (array2.length * 2) - dis / 2, calcY + canvas.rectHeight * 0.5, "=").attr({ "font-size": canvas.cfontSize * 1.6, fill: "blue" });
            operatorArray.push(equal);

            if (canvas.abort)return;
            await canvas.delay({ time: 500 });

            await j3arrow.drawArrow({ rectObj: Rect.boxes2D[i][j], fig: true, cont: true, popover: true });
            j3arrow.arrowFig.attr({ opacity: 0.5 });

            resultArray[i][j] = result;
            await canvas.delay({ time: 200 });
            const tempRect = new Rect({ canvasHandler: canvas, xposition:  equal.getBBox().x + equal.getBBox().width*2  , yposition: calcY, content: result, index: -1, color: "#3498db" });
            await tempRect.drawRect({ "rect": true, "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });
            if (canvas.abort) return;
            await canvas.delay({ time: 900 });

            await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: Rect.boxes2D[i][j].rectElement.attr("y") });
            await tempRect.moveTo({ newX: Rect.boxes2D[i][j].rectElement.attr("x"), newY: Rect.boxes2D[i][j].rectElement.attr("y") });
            Rect.boxes2D[i][j].textElement.attr({"text": result });
            Rect.boxes2D[i][j].popoverRect[3].attr({ text: `Index = ${ Rect.boxes2D[i][j].index } , Value = ${ result }` });
            Rect.boxes2D[i][j].popoverText[3].attr({ text: ` My Value is = ${ resultArray[i][j] }` });
            Rect.boxes2D[i][j].rectElement.attr({ "fill": "#3498db" });

            tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 
            if (canvas.abort)return;
            await canvas.delay({ time: 1000 });
            ind = 0;

            for (let k = array2.length - 1; k >= 0; k--) {
                operatorArray[operatorArray.length - 1].remove();
                operatorArray.splice(operatorArray.length - 1, 1);

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                await tempArray2[k][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });
                await tempArray2[k][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: array2BoxCoordinates[k][j][1] });
                await canvas.delay({ time: 100 });
                tempArray2[k][j].rectElement.attr({ "fill": OC });

                tempArray2[k][j].moveTo({ newX: array2BoxCoordinates[k][j][0], newY: array2BoxCoordinates[k][j][1] });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                operatorArray[operatorArray.length - 1].remove();
                operatorArray.splice(operatorArray.length - 1, 1);

                await tempArray1[i][k].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });
                await tempArray1[i][k].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: array1BoxCoordinates[i][k][1] });
                await canvas.delay({ time: 100 });
                tempArray1[i][k].rectElement.attr({ "fill": OC });

                tempArray1[i][k].moveTo({ newX: array1BoxCoordinates[i][k][0], newY: array1BoxCoordinates[i][k][1] });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });
            }

            if (j < array2[0].length - 1) {
                await j2arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                await j2arrow.ShiftArrow({ steps: 1, direction: "right" });

                if (canvas.abort) return;
                await canvas.delay({ time: 800 });
                await j3arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                await j3arrow.ShiftArrow({ steps: 1, direction: "right" });
            }

            if (canvas.abort)return;
            j2arrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
            j3arrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
        }

        if (i < array1.length - 1) {
            await i1arrow.ShiftArrow({ steps: 1.5, direction: "down" });

            if (canvas.abort) return;
            await canvas.delay({ time: 800 });
            await i3arrow.ShiftArrow({ steps: 1.5, direction: "down" });
        }

        if (canvas.abort)return;
        await canvas.delay({ time: 1000 });
        i1arrow.clearArrow();
        i3arrow.clearArrow();
    }

  }catch(e){
  console.log(e)
}

};


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Multiplication Of Matrix"  });
              
            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

       const toggleMenu = (show) => {
            try {
              if (show){
              operationButton.enableButton();
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              operationButton.disableButton();
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };
       let count = true ;
       const action = async () => {
            try {
             if (count) {
                 count = false;
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              } else {
  
                 Rect.boxes2D.forEach(( e ) => {
                   e.forEach( f  =>  f.clearRect({ rect : true, cont : true, ind : true , dfba : false }));
                 });

                 for (let i = 0 ; i < resultArray.length ; i++){
                    for (let j = 0 ; j < resultArray[0].length ; j++){
                         resultArray[i][j] = 0 ;
                    }
                 }
                 resultmat[1].remove();
                 resultmat[2].remove();
                 resultmat[3].remove();
            
                 mat3.text.remove();
                 mat3.rect.remove();
                 Rect.boxes2D = [] ;
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);

                 operationButton.enableButton();
              }

            } catch (error) {
               console.log("Error in action:", error);
               toggleMenu(true);
            }
        };

        const clearAll = () => {

               mat3 = null ; 
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [] ; Rect.boxes = [] ; Rect.boxes2D = [] ; Arrow.ArrowArray = [];
               tempArray1 = [] ; tempArray2 = [];
               calcX = null ;  calcY = null ; dis = null; OC = null ; colors = null ; mul =  null; plus = null;
               array1 = [] ; array2 = [] ;resultArray = [];  operatorArray = [];  array1BoxCoordinates = [] ;array2BoxCoordinates = [];
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               await createButtons();
               toggleMenu(false);
          
               count = true;
               clearAll();
               await initialize();
               toggleMenu(true);
               initializeClicks();
             } catch (error) {
                console.error( error);
             }
        };

        const initializeClicks = () => {
          try{
           operationButton.addClickAction(action);
          }catch(e){
          console.log(e)
          }
        };

       ( async ()=> {
            await initialize();
            await createButtons( );
            initializeClicks();
              toggleMenu(true);
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);

       })();

    } catch (error) {

  console.log(error)

    }
}

