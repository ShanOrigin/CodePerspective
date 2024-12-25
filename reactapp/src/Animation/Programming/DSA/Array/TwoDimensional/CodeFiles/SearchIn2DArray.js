
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText , waitForLength , clearCanvas , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';

export async function SearchIn2D({canvas}) {
    try {
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;
        let sr ,t1y , t1x, tempRect , array2D ,  traverseArray = [] , textNotify , title , textNotify0 , rectColor , element;


        const initialize = async () => {

        title = drawText({ canvas, text: "Search In Matrix ( 2D Array )", x: centerX, y: canvas.drawYPos / 2, fontSize: 1.1 , Return: true  , color: "#46099c" });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        array2D = await Rect.drawArray({ canvasHandler: canvas, array: null, cont: true, indexs: true, popover: true, type: "array2D", purpose: "input", range: [-1000, 1000, 3, -1] });

        if (canvas.abort) return;
        rectColor = Rect.boxes2D[0][0].rectElement.attr("fill");
        canvas.drawYPos += canvas.rectHeight * (array2D.length * 3);

         t1x = centerX * 0.70;
         t1y = canvas.drawYPos;

        }


        const execute = async ( task ) => {

        if( task == "S" ){
        sr = drawText({ canvas, text: "Search Element ->", x:centerX * 0.6 , y: canvas.drawYPos * 0.8  , Return: true , fontSize: 1 , color: "green" });
        const srB = sr.rect.getBBox();

        tempRect = new Rect({ canvasHandler: canvas, xposition: srB.x + srB.width*1.1 ,  yposition: srB.y - canvas.rectHeight/2 + srB.height/2 , content: "", index: -1, color: "#3498db" });

        element = await tempRect.inputRect({ rect: true, cont: true, ind: false });

        if (canvas.abort) return;
        await canvas.delay({ time: 700 });

        canvas.drawYPos += canvas.rectHeight * 7;

        drawText({ canvas, text: `Let's Search ( ${element} ) In Two Dimensional Array"` , x: centerX , y: t1y +  canvas.rectHeight * 0.5 ,  fontSize: 1.1, color: "purple" });
        }

        if (task == "T"){
        sr = drawText({ canvas, text: "Traversing Matrix ", x:centerX  , y: canvas.drawYPos * 0.8  , Return: true , fontSize: 1 , color: "green" });
        }

        if (canvas.abort) return;
        await canvas.delay({ time: 700 });

        let numRows = array2D.length;
        let numCols = array2D[0].length;

        const arrayPos  = (canvas.canvasWidth - ((numRows * numCols) * canvas.nextPos)) / 2;

        let iarrow = new Arrow({ canvasHandler: canvas, cont: "i", color: "green", direction: "left" });
        let jarrow = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });

        if (canvas.abort) return;

        for (let i = 0; i < numRows; i++) {
            await iarrow.drawArrow({ rectObj: Rect.boxes2D[i][0], fig: true, cont: true, popover: true });

            if (canvas.abort) return;

            for (let j = 0; j < numCols; j++) {
                await jarrow.drawArrow({ rectObj: Rect.boxes2D[i][j], fig: true, cont: true, popover: true });
                jarrow.arrowFig.attr({ opacity: 0.5 });

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                if( task == "S" ){
                tempRect.moveTo({ newX: Rect.boxes2D[i][j].rectElement.attr("x"), newY: Rect.boxes2D[i][j].rectElement.attr("y") });

                tempRect.rectElement.toFront();
                tempRect.textElement.toFront();

                if (array2D[i][j] == element) {
                    if (canvas.abort) return;

                    await canvas.delay({ time: 1000 });
                    tempRect.rectElement.attr({ fill: "green" });
                    Rect.boxes2D[i][j].rectElement.attr({ fill: "green" });
                   
                    drawText({ canvas, text: `😌Search Element Found At ( ${i},${j} ) Index` , x:centerX , y: t1y + canvas.rectHeight * 0.5 ,  fontSize: 1.1, color: "purple" });
                    const g = sr.rect.getBBox();
                    tempRect.moveTo({ newX: g.x + g.width*1.2  , newY: g.y });

                    jarrow.clearArrow();
                    iarrow.clearArrow();

                    return [i , j ];
                }
                }

                if (task == "T"){
                   
                    tempRect = new Rect({ canvasHandler: canvas, xposition: Rect.boxes2D[i][j].rectElement.attr("x") ,  yposition: Rect.boxes2D[i][j].rectElement.attr("y") , content: Rect.boxes2D[i][j].content , index: -1, color: "#3498db" });
                    tempRect.drawRect({rect : true , cont : true , ind : false, popover : false , popoverTextArray : null }) ;
                    traverseArray.push(tempRect);
                    const srB = sr.rect.getBBox();
                    await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth * 1.5  , newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX: tempRect.rectElement.attr("x") , newY: srB.y + canvas.rectWidth *1.5 });
                    await tempRect.moveTo({ newX: arrayPos + (numCols*i+j)* canvas.nextPos , newY: srB.y + canvas.rectWidth *1.5 });

                }

                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                if (canvas.abort) return;

                if (j < numCols - 1) {
                    await jarrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await jarrow.ShiftArrow({ steps: 1, direction: "right" });
                }

                if (canvas.abort) return;
                await canvas.delay({ time: 500 });
                jarrow.clearArrow();
            }

            if (i < numRows - 1) {
                iarrow.clearArrow({ fig: false, cont: true, dfba: false });
                await iarrow.ShiftArrow({ steps: 1.5, direction: "down" });
            }

            if (canvas.abort) return;
            await canvas.delay({ time: 1000 });
            iarrow.clearArrow();
        }
                  
        if(task == "S" )textNotify0 = drawText({ canvas, text: `😔Search Element Not Found In 2D Array` , x:centerX , y: t1y - canvas.rectHeight * 2 , fontSize: 1.2, color: "purple" });
    
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton1 , operationButton2 ;

        const createButtons = ( ) => {
            try {
              operationButton1 = createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Traverse Matrix"  });
              operationButton2 =  createButton({ canvas, x : canvas.canvasWidth/2 /2 - canvas.rectWidth * 2 , y : canvas.canvasHeight * 0.84, colorCode : 2 , textContent : "Search In Matrix"  });

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

       const toggleMenu = (show) => {
            try {
              if (show){
              operationButton1.enableButton();
              operationButton2.enableButton();
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              operationButton1.disableButton();
              operationButton2.disableButton();
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };
       let count = true , data ;
       const action = async (task) => {
            try {
             if (count) {
                 count = false;
                 toggleMenu(false);
                 task == "S" ? data = await execute(task) : await execute(task) ;
                  toggleMenu(true);
                 if( task == "S" ) operationButton1.disableButton();
                 if( task == "T" ) operationButton2.disableButton();
              } else {

               if( task == "S" ){
                 sr.text.remove();
                 sr.rect.remove();
                 tempRect.clearRect({ rect : true, cont : true, ind : false, dfba : false }) ;
                 Rect.boxes2D[data[0]][data[1]].rectElement.attr({ "fill" : rectColor  });
                 canvas.drawYPos -= canvas.rectHeight * 7;
               }

               if( task == "T" ){
                 sr.text.remove();
                 sr.rect.remove();
                 traverseArray.forEach( e =>  e.clearRect({ rect : true, cont : true, ind : false, dfba : false }) );
               }
          
              drawText({ canvas,  clear : true});

              operationButton1.enableButton();
              operationButton2.enableButton();
              count = true ;

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
               sr = null ;  tempRect = null ; 
               traverseArray = [] ; textNotify = null ; textNotify0 = null ; element = 0 ; 

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
               await initialize();
               toggleMenu(true);
               initializeClicks();
             } catch (error) {
                console.error( error);
             }
        };

        const initializeClicks = () => {
          try{
           operationButton1.addClickAction(()=> action("T"));
           operationButton2.addClickAction(()=> action("S"));

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

