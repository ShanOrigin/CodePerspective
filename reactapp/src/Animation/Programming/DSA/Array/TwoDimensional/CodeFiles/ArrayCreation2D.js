
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText , waitForLength , clearCanvas , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';

function create2DArrayFrom1D(array, cols, rows) {
    const result = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(array[i * cols + j]);
        }
        result.push(row);
    }
    return result;
}

function generate2DCombinationsString(arr) {
    const len = arr.length;
    const result = [];
    // Find all possible dimensions
    for (let i = 1; i <= len; i++) {
        if (len % i === 0) {
            const rows = i;
            const cols = len / i;
            result.push(`{${rows}x${cols}}`);
        }
    }
    return result.join(', ');
}

export async function CreateArray2D({canvas}) {
    try {
        let array1D;
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;
        let title = [] ;
        const execute =async () => {
        
        title.push( drawText({ canvas, text: "your 1D Array", x: centerX, y: canvas.drawYPos / 2, fontSize: 1.1, color: "#46099c" , Return: true }));

        canvas.drawYPos += canvas.rectHeight * 2 ;

        const n = await waitForLength({canvas , umin : 0, umax : 1}) ;

        array1D = new Array( n ).fill(0);
        
        array1D = await Rect.drawArray({ canvasHandler: canvas,  array: array1D, cont: true, indexs: true, popover : true  , type: "array", purpose: "input"  });
        if (canvas.abort) return;
      
        canvas.drawYPos += canvas.rectHeight * 2;
        
        title.push( drawText({ canvas, text: "Possibilities: "+ generate2DCombinationsString(array1D) , x: centerX  , y: canvas.drawYPos - canvas.rectHeight *0.4 , Return : true , fontSize: 1, color: "#46099c" }));
        title.push( drawText({ canvas, text: "Rows X Cols :", x: centerX , y: canvas.drawYPos + canvas.rectHeight*0.4 , Return: true , fontSize: 1, color: "#46099c" }))

        let row , col;
        let isIndexValid = false;
        const bb = title[2].rect.getBBox();
        const rowRect = new Rect({ canvasHandler: canvas,  xposition: bb.x + bb.width*0.05, yposition: bb.y +bb.height*1.3 ,  content: "", index: -1, color: "#3498db" });
        const colRect = new Rect({ canvasHandler: canvas, xposition: bb.x + bb.width*0.55, yposition: bb.y +bb.height*1.3, content: array1D.length / col,  index: -1, color: "#3498db" });

        let validRow = false , validCol = false ;
        while ((!validRow) || (!validCol)) {
     
            row = await rowRect.inputRect({rect: true, cont: true, ind: false });
            col = await colRect.inputRect({rect: true, cont: true,ind: false });

            if (array1D.length == col*row ) {
               validCol =true;
               validRow = true;
            } else {
                const str = `Cannot Create 2D Array Od Dimensions.\nRow{${row}} X Col{${col}}\n please Enter Any Given Above Possibilitie`
                const t2 = drawText({ canvas, text: str , x: centerX , y: canvas.drawYPos + canvas.rectHeight*3, fontSize: 1, color: "red" , Return: true});

                await canvas.delay({ time: 5000 });
                t2.text.remove();
                t2.rect.remove();
                colRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                rowRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            }
        }

        canvas.drawYPos += canvas.rectHeight * 4 ;
        let position = centerX , matrixPosition = 3  ; 
        if ( row == n && col == 1 && n> 6){
           position = centerX * 0.65 ;
           matrixPosition =  2 ;
        }

        const array2D = create2DArrayFrom1D(array1D, col, row)

        title.push( drawText({ canvas, text: "Let's Create Two Dimensional Array" , x: position  , y: canvas.drawYPos * 0.9, fontSize: 0.96 , Return: true ,   color: "purple" }));
        title.push( drawText({ canvas, text: `Dimension= {R x C} = [ ${row} X ${col} ]` , x: position , y: canvas.drawYPos, fontSize:0.96, Return: true, color: "green" }));
        title.push(drawText({ canvas, text: `Formula : 2D [ i ][ j ] = 1D [ i * numCols + j ] ` , x: position , y:canvas.drawYPos *1.08  , padding: 8, Return: true , fontSize:0.96,  color: "red" }));

        if (canvas.abort) return;
        await canvas.delay({ time: 700 });

        matrixPosition == 3 ? canvas.drawYPos += canvas.rectHeight * 2.5 : canvas.drawYPos -= canvas.rectHeight * 2 ;
        await Rect.drawArray({ canvasHandler: canvas, array: array2D, cont: true , indexs: true, type: "array2D",  range : [-1000, 1000, matrixPosition , 0 ] , hideR : true });

        if (canvas.abort) return;
     
        const numRows = array2D.length;
        const numCols = array2D[0].length;

        const indexarrow = new Arrow({ canvasHandler: canvas, cont: "index", color: "red" });
        const iarrow = new Arrow({   canvasHandler: canvas, cont: "i",  color: "green", direction: "left" });
        const jarrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });

        if (canvas.abort) return;

        for (let i = 0; i < numRows; i++) {
            await iarrow.drawArrow({ rectObj: Rect.boxes2D[i][0] });

            if (canvas.abort) return;
            await canvas.delay({ time: 600 });

            for (let j = 0; j < numCols; j++) {
                const index = i * numCols + j;
                await jarrow.drawArrow({ rectObj: Rect.boxes2D[i][j] });
 
                title[title.length-1].text.attr({ text : `2D [ ${i} ][ ${j} ] = 1D [ ${ i * numCols + j } ] ` , fill: "green"});
                await canvas.delay({ time: 800 });
                await indexarrow.drawArrow({ rectObj: Rect.boxes[index] });

                const tempRect = new Rect({  canvasHandler: canvas, xposition: Rect.boxes[index].rectElement.attr("x"), yposition: Rect.boxes[index].rectElement.attr("y"), content: Rect.boxes[index].content,index: -1, color: "#3498db" });
 
                tempRect.drawRect({ rect: true, cont: true, ind: false });

                Rect.boxes[index]. rectElement.attr({ "fill": "#3498db" });

                await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: tempRect.rectElement.attr("y") + tempRect.rectElement.attr("height")*1.3});

                if ( matrixPosition == 3 ){
                if(  index < Math.floor((0 + array1D.length) / 2)  ){
                   await tempRect.moveTo({ newX: centerX*0.10, newY: tempRect.rectElement.attr("y") });
                   await tempRect.moveTo({ newX: centerX*0.10, newY: Rect.boxes2D[i][j].rectElement.attr("y") });
                }else{
                   await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                   await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: Rect.boxes2D[i][j].rectElement.attr("y") });
                }
                }else{
                   await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                   await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: Rect.boxes2D[i][j].rectElement.attr("y") });
                }
                await tempRect.moveTo({
                    newX: Rect.boxes2D[i][j].rectElement.attr("x"),
                    newY: Rect.boxes2D[i][j].rectElement.attr("y")
                });
                Rect.boxes2D[i][j].textElement.show();
                title[title.length-1].text.attr({ text : `2D [ i ][ j ] = 1D [ i * numCols + j ] ` , fill : "red" });
 
                if (canvas.abort) return;
                await canvas.delay({ time: 800 });
                tempRect.clearRect({ rect: true, cont: true, ind: false });
 
                if (canvas.abort) return;

                if (index < array1D.length - 1) {
                    await indexarrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await indexarrow.ShiftArrow({ steps: 1, direction: "right" });
                    if (canvas.abort) return;
                }

                if (j < numCols - 1) {
                    await jarrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await jarrow.ShiftArrow({ steps: 1, direction: "right" });
                }

                if (canvas.abort) return;
                await canvas.delay({ time: 700 });
                jarrow.clearArrow({ fig: true, cont: true, dfba: false });
                indexarrow.clearArrow({ fig: true, cont: true, dfba: false });

                drawText({ canvas, clear : true });

            }

            if (i < numRows - 1) {
                iarrow.clearArrow({ fig: false, cont: true, dfba: false });
                await iarrow.ShiftArrow({ steps: 1.35, direction: "down" });
            }
            if (canvas.abort) return;
            await canvas.delay({ time: 800 });

            iarrow.clearArrow({ fig: true, cont: true, dfba: false });
        }

        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Create Matrix"  });
              
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
             
                 drawText({ canvas, text: "Wait.......", x: centerX, y: canvas.canvasHeight - canvas.rectHeight  , color : "green"  });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Create new Matrix 'click'  Reset Button" ,  x: centerX, y: canvas.canvasHeight - canvas.rectHeight  , color : "red" });

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
               array1D =[];
               title = [] ;
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               await createButtons();
               toggleMenu(false);
          
               count = true;
               clearAll();

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