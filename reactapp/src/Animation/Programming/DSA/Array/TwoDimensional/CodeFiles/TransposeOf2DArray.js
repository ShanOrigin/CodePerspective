

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, generateColors ,  clearCanvas , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';

export async function TransposeOf2DArray({ canvas }) {
    try {
        let tempArray1 = [];
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;
        let letresultArray = []  , mat3 , array2D = [] , resultmat , resultArray , colors; 




        const initialize = async () => {


        drawText({ canvas, text: "Transpose Of Matrix ( 2D Array )", x: centerX, y: canvas.drawYPos / 2, fontSize: 1 , Return: true , color: "#46099c" });

        canvas.drawYPos += canvas.rectHeight * 2.5;
 
        const array2Ddata= await Rect.drawArray({ canvasHandler: canvas, array: null, cont: true, indexs: true, popover: true, type: "array2D", purpose: "input", range: [-1000, 1000, 3, -1] });

        array2D = array2Ddata[0] ;

        colors = await generateColors((array2D.length+1) * (array2D[0].length+1) );
  
        if (canvas.abort) return;
     
        tempArray1 = Rect.boxes2D;
        Rect.boxes2D = [];
        resultArray = Array(array2D[0].length).fill().map(() => Array(array2D.length).fill(0));

        if (canvas.abort) return;
        await canvas.delay({ time: 700 });

        drawText({ canvas, text: "Original", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 1.6, Return: true , fontSize: 1 , color: "blue" });

        canvas.drawYPos += canvas.rectHeight * 6 ;

        if (canvas.abort) return;
 


        }
        const execute = async () =>{

        resultmat = await Rect.drawArray({ canvasHandler: canvas, array: resultArray, cont: true, indexs: true, popover: true, type: "array2D", purpose: "print", range: [-1000, 1000, 3, 0] });

        mat3 = drawText({ canvas, text: "Transpose", x: centerX, y: canvas.drawYPos + canvas.rectHeight * (resultArray.length + 2.5), fontSize: 1 , Return: true , color: "blue" });

        const i1arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
        const j1arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });
        const i2arrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green" });
        const j2arrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red", direction: "left" });

        for (let i = 0; i < array2D.length; i++) {
            await i1arrow.drawArrow({ rectObj: tempArray1[i][0], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            await i2arrow.drawArrow({ rectObj: Rect.boxes2D[0][i], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 200 });

            if (canvas.abort) return;

            for (let j = 0; j < array2D[0].length; j++) {
                const index = i * array2D.length + j;
                await j1arrow.drawArrow({ rectObj: tempArray1[i][j], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 200 });
                j1arrow.arrowFig.attr({ opacity: 0.5 });

                await j2arrow.drawArrow({ rectObj: Rect.boxes2D[j][i], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 200 });

                if (canvas.abort) return;

                const tempRect = new Rect({
                    canvasHandler: canvas,
                    xposition: tempArray1[i][j].rectElement.attr("x"),
                    yposition: tempArray1[i][j].rectElement.attr("y"),
                    content: tempArray1[i][j].content,
                    index: -1,
                    color: colors[index]
                });

                resultArray[j][i] = array2D[i][j];

                tempRect.drawRect({ rect: true, cont: true, ind: false, popover: false });

                tempArray1[i][j].rectElement.attr({ fill: colors[index] });

                if(  j < Math.floor((0 + array2D[0].length) / 2)  ){
                    await tempRect.moveTo({ newX: centerX*0.10, newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX: centerX*0.10, newY: Rect.boxes2D[j][i].rectElement.attr("y")});
                }else{
                    await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: Rect.boxes2D[j][i].rectElement.attr("y")});
                }

                await tempRect.moveTo({ newX: Rect.boxes2D[j][i].rectElement.attr("x"), newY: Rect.boxes2D[j][i].rectElement.attr("y"), ind: false });

                Rect.boxes2D[j][i].textElement.attr({"text": array2D[i][j] });
                Rect.boxes2D[j][i].popoverRect[3].attr({ text: `Index = ${ Rect.boxes2D[j][i].index } , Value = ${ resultArray[j][i] }` });
                Rect.boxes2D[j][i].popoverText[3].attr({ text: ` My Value is = ${ resultArray[j][i] }` });
                Rect.boxes2D[j][i].rectElement.attr({ "fill": colors[index] });

                tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 





                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                
                if (j < array2D[i].length - 1) {
                    await j1arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await j1arrow.ShiftArrow({ steps: 1, direction: "right" });
                    j2arrow.clearArrow({ fig: false, cont: true, dfba: false });
                    await j2arrow.ShiftArrow({ steps: 1.5, direction: "down" });
                    await canvas.delay({ time: 200 });

                    if (canvas.abort) return;
                }
                j1arrow.clearArrow({ fig: true, cont: true, dfba: false });
                j2arrow.clearArrow({ fig: true, cont: true, dfba: false });
            }

            if (i < array2D.length - 1) {
                i1arrow.clearArrow({ fig: false, cont: true, dfba: false });
                await i1arrow.ShiftArrow({ steps: 1.5, direction: "down" });
                await canvas.delay({ time: 200 });
                await i2arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                await i2arrow.ShiftArrow({ steps: 1, direction: "right" });

                if (canvas.abort) return;
            }
            i1arrow.clearArrow({ fig: true, cont: true, dfba: false });
            i2arrow.clearArrow({ fig: true, cont: true, dfba: false });
        }



        };




 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Transpose Of Matrix"  });
              
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
               tempArray1 = []; array2D =[] ; resultArray = [] ;
               mat3 = null ; 
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


/*

        const [ow, oh] = [canvas.rectWidth, canvas.rectHeight];
        canvas.rectWidth *= 4 ;
        canvas.rectHeight *= 0.7;

        const transposeArray2DButton = new Rect({ canvasHandler: canvas, xposition: centerX - canvas.rectWidth / 2, yposition: canvas.drawYPos, content: "Transpose 2D Array", index: "", color: "#3498db" });
        await transposeArray2DButton.drawRect({ rect: true, cont: true, ind: false, popover: false });

        canvas.rectWidth = ow;
        canvas.rectHeight = oh;

        let running = true;

        const transpose2DA = async () => {
            try {
                if (running) {
                    transposeArray2DButton.rectElement.hide();
                    transposeArray2DButton.textElement.hide();
                    await executeTranspose2DArray();
                    running = false;
                    transposeArray2DButton.rectElement.show();
                    transposeArray2DButton.textElement.show();
                } else {
                    clearCanvas(canvas.paper);
                    running = true;

                    canvas.rectWidth *= 4;
                    canvas.rectHeight *= 0.7;
                    await transposeArray2DButton.drawRect({ rect: true, cont: true, ind: false, popover: false });

                    canvas.rectWidth = ow;
                    canvas.rectHeight = oh;
                    canvas.drawYPos = centerY;
                    Rect.AllBoxe = [];
                    Rect.boxes = [];
                    Rect.boxes2D = [] ;
                    Arrow.ArrowArray = [];
                   tempArray1 = [] ;
                    

                    transposeArray2DButton.rectElement.click(transpose2DA);
                    transposeArray2DButton.textElement.click(transpose2DA);
                }
            } catch (error) {
                console.log(error);
            }
        };

        transposeArray2DButton.rectElement.click(transpose2DA);
        transposeArray2DButton.textElement.click(transpose2DA);

*/
    } catch (e) {
        console.log(e);
    }
}