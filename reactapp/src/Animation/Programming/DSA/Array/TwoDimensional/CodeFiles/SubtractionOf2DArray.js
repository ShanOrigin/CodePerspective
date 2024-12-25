


import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';

export async function SubtractionOf2D({canvas}) {
    try {
        let tempArray1 = [], tempArray2 = [] , array1 =[] , array2 = [] , resultArray , resultmat;
        let calcX, calcY , title , mat1 , mat2 , mat3 ; 
        let centerX = canvas.canvasWidth / 2, centerY = canvas.drawYPos;

        const initialize = async () => {

        canvas.drawYPos += canvas.rectHeight ;
        title = drawText({ canvas, text: "Substraction Of Matrix (2D Array)", x: centerX, y: canvas.drawYPos / 2, Return: true ,  fontSize: 1.1, color: "#46099c" });

        const t1x = centerX * 0.70, t1y = canvas.drawYPos;

        canvas.drawYPos += canvas.rectHeight * 2.5;

        const array1data  = await Rect.drawArray({ canvasHandler: canvas, array: array1, cont: true, indexs: true, popover: true, type: "array2D", purpose: "input", range: [-1000, 1000, 1, -1] });
        array1 = array1data[0];
        if (canvas.abort) return;

        tempArray1 = Rect.boxes2D;
        Rect.boxes2D = [];

        mat1 = drawText({ canvas, text: "Matrix 1", x: canvas.drawXPos + canvas.nextPos  , y: canvas.drawYPos - canvas.rectHeight , fontSize: 1 , Return: true ,  color: "#46099c" });

        array2 = Array(array1.length).fill().map(() => Array(array1[0].length).fill(0));

        const array2data = await Rect.drawArray({ canvasHandler: canvas, array: array2, cont: true, indexs: true, popover: true, type: "array2D", purpose: "input", range: [-1000, 1000, 2, 0] });
        array2 = array2data[0];

        if (canvas.abort) return;

        tempArray2 = Rect.boxes2D;
        Rect.boxes2D = [];

        mat2 = drawText({ canvas, text: "Matrix 2", x: canvas.drawXPos + canvas.nextPos  , y: canvas.drawYPos - canvas.rectHeight  , fontSize: 1 , Return: true , color: "#46099c" });
     
        resultArray = Array(array1.length).fill().map(() => Array(array1[0].length).fill(0));

        canvas.drawYPos += canvas.rectHeight * 8.5;
        Rect.boxes2D = [];
     
        }

        const execute = async () => {

        resultmat = await Rect.drawArray({ canvasHandler: canvas, array: resultArray, cont: true, indexs: true, popover: true, type: "array2D", purpose: "print", range: [-1000, 1000, 3, 0] });

        if (canvas.abort) return;

        mat3 = drawText({ canvas, text: "Result Array", x: canvas.drawXPos + canvas.nextPos  , y: canvas.drawYPos - canvas.rectHeight , Return: true ,  fontSize: 1 , color: "#46099c" })

        calcY = Rect.boxes2D[0][0].rectElement.attr("y") - canvas.rectHeight * 3;
        calcX = (canvas.canvasWidth - canvas.nextPos * 5) / 2;

        const i1arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
        const j1arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });
        const i2arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
        const j2arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });
        const i3arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
        const j3arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });

        if (canvas.abort) return;

        for (let i = 0; i < array1.length; i++) {
            await i1arrow.drawArrow({ rectObj: tempArray1[i][0], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            if (canvas.abort) return;

            await i2arrow.drawArrow({ rectObj: tempArray2[i][0], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            await i3arrow.drawArrow({ rectObj: Rect.boxes2D[i][0], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            if (canvas.abort) return;

            for (let j = 0; j < array1[i].length; j++) {
                let b1x = tempArray1[i][j].rectElement.attr("x");
                let b1y = tempArray1[i][j].rectElement.attr("y");

                await j1arrow.drawArrow({ rectObj: tempArray1[i][j], fig: true, cont: true, popover: true });
                
                if (canvas.abort) return;
                await canvas.delay({ time: 200 });
                
                await tempArray1[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: tempArray1[i][j].rectElement.attr("y") });
                await canvas.delay({ time: 100 });
                await tempArray1[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });

                await tempArray1[i][j].moveTo({ newX: calcX, newY: calcY });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                let plus = canvas.paper.text(calcX + canvas.nextPos * 1.5, calcY + canvas.rectHeight * 0.5, " - ").attr({
                    "font-size": canvas.cfontSize * 1.6,
                    fill: "blue"
                });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                let b2x = tempArray2[i][j].rectElement.attr("x");
                let b2y = tempArray2[i][j].rectElement.attr("y");

                await j2arrow.drawArrow({ rectObj: tempArray2[i][j], fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time: 200 });

                await tempArray2[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: tempArray2[i][j].rectElement.attr("y") });
                await canvas.delay({ time: 100 });
                await tempArray2[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });
                await tempArray2[i][j].moveTo({ newX: calcX + canvas.nextPos * 2, newY: calcY });
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                let equal = canvas.paper.text(calcX + canvas.nextPos * 3.5, calcY + canvas.rectHeight * 0.5, "=").attr({
                    "font-size": canvas.cfontSize * 1.6,
                    fill: "blue"
                });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                const tempRect = new Rect({ canvasHandler: canvas, xposition: calcX + canvas.nextPos * 4, yposition: calcY, content: "", index: -1, color: "#3498db" });
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                resultArray[i][j] = array1[i][j] -  array2[i][j];
                tempRect.content = resultArray[i][j];
                tempRect.drawRect({ rect: true, cont: true, ind: false, popover: true });

                await j3arrow.drawArrow({ rectObj: Rect.boxes2D[i][j], fig: true, cont: true, popover: true });

                if (canvas.abort) return;
                await canvas.delay({ time: 800 });

                await tempRect.moveTo({ newX: Rect.boxes2D[i][j].rectElement.attr("x"), newY: Rect.boxes2D[i][j].rectElement.attr("y") });
                if (canvas.abort) return;

                Rect.boxes2D[i][j].textElement.attr({"text":resultArray[i][j] });
                Rect.boxes2D[i][j].popoverRect[3].attr({ text: `Index = ${ Rect.boxes2D[i][j].index } , Value = ${ resultArray[i][j] }` });
                Rect.boxes2D[i][j].popoverText[3].attr({ text: ` My Value is = ${ resultArray[i][j] }` });
                Rect.boxes2D[i][j].rectElement.attr({ "fill": "#3498db" });

                tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 
                equal.remove();
                if (canvas.abort) return;
                await canvas.delay({ time: 200 });

                await tempArray2[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });
                await tempArray2[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: b2y });
                await canvas.delay({ time: 100 });

                await tempArray2[i][j].moveTo({ newX: b2x, newY: b2y });
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                plus.remove();
                await canvas.delay({ time: 200 });

                await tempArray1[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: calcY });
                await canvas.delay({ time: 100 });
                await tempArray1[i][j].moveTo({ newX: centerX - canvas.rectWidth/2 , newY: b1y });
                await canvas.delay({ time: 100 });
                await tempArray1[i][j].moveTo({ newX: b1x, newY: b1y });

                if (canvas.abort) return;
            

                if (j < array1[i].length - 1) {
                    await j1arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await j1arrow.ShiftArrow({ steps: 1, direction: "right" });
                    if (canvas.abort) return;

                    await j2arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await j2arrow.ShiftArrow({ steps: 1, direction: "right" });
                    await j3arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await j3arrow.ShiftArrow({ steps: 1, direction: "right" });
                }

                await canvas.delay({ time: 900 });
                j1arrow.clearArrow({ fig: true, cont: true, dfba: false });
                j2arrow.clearArrow({ fig: true, cont: true, dfba: false });
                j3arrow.clearArrow({ fig: true, cont: true, dfba: false });
            } // j loop

            if (i < array1.length - 1) {
                i1arrow.clearArrow({ fig: false, cont: true, dfba: false });
                await i1arrow.ShiftArrow({ steps: 1.5, direction: "down" });
                await canvas.delay({ time: 200 });

                i2arrow.clearArrow({ fig: false, cont: true, dfba: false });
                await i2arrow.ShiftArrow({ steps: 1.5, direction: "down" });
                await canvas.delay({ time: 200 });

                i3arrow.clearArrow({ fig: false, cont: true, dfba: false });
                await i3arrow.ShiftArrow({ steps: 1.5, direction: "down" });
                await canvas.delay({ time: 200 });
            }

            await canvas.delay({ time: 500 });
            i1arrow.clearArrow({ fig: true, cont: true, dfba: false });
            i2arrow.clearArrow({ fig: true, cont: true, dfba: false });
            i3arrow.clearArrow({ fig: true, cont: true, dfba: false });
        } // i loop


        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Substraction Of Matrix"  });
              
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
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [];
               Rect.boxes = [];
               Rect.boxes2D = [] ;

               tempArray1 = []; tempArray2 = [] ; array1 =[] ;array2 = [] ; resultArray = [] ;
               title = null ; mat1 = null ; mat2 = null ; mat3 = null ; 
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

    } catch (e) {
        console.log(e);
    }
}
