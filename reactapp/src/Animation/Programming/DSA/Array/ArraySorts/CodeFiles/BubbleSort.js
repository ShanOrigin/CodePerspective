
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function BubbleSort({ canvas }) {
    try {
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const execute = async () => {
            //drawText({ canvas, text: "Bubble Sort", x: centerX, y: centerY / 2, Return: true  , fontSize: 1.1, color: "#46099c" });
            canvas.drawYPos += canvas.rectHeight * 2;

            canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Bubble Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : true });

            let array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: true, popover: true, type: "array", purpose: "input" });
            if (canvas.abort) return;
            
            const len = array.length;
            let sortedLine = null;

            const arrow1 = new Arrow({ canvasHandler: canvas, cont: "j", color: "red" });
            const arrow2 = new Arrow({ canvasHandler: canvas, cont: "j+1", color: "green" });

            for (let i = 0; i < len - 1; i++) {
                if (canvas.abort) return;

                if (i > 0) {
                    await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array" });
                    if (canvas.abort) return;
                    await canvas.delay({ time: (array.length + 1) * 200 });
                }

                sortedLine = canvas.paper.path(`M${Rect.boxes[len - 1 - i].rectElement.attr("x") + canvas.rectWidth + 1.45},${Rect.boxes[len - 1 - i].rectElement.attr("y") - 2.5}V${Rect.boxes[len - 1 - i].rectElement.attr("y") + canvas.rectHeight + 2.5}`)
                    .attr({ "stroke": "purple" });

                for (let j = 0; j < len - 1 - i; j++) {
                    if (canvas.abort) return;

                    await arrow1.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                    await arrow2.drawArrow({ rectObj: Rect.boxes[j + 1], fig: true, cont: true, popover: true });

                    if (canvas.abort) return;
                    await canvas.delay({ time: 50 });

                    const compT = array[j] > array[j + 1] ? `${array[j]} > ${array[j + 1]}\n Swap ${array[j]} With ${array[j + 1]}` : `${array[j]} <= ${array[j + 1]}\nDon't Swap ${array[j]} With ${array[j + 1]}`;
                    const CMP = new Comparator({ rectObj1: Rect.boxes[j], rectObj2: Rect.boxes[j + 1], color: "green", CompText: compT });

                    await CMP.drawComp({ fig: true, cont: true, popover: false });
                    await canvas.delay({ time: 500 });
                    await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });

                    if (array[j] > array[j + 1]) {
                        await Rect.swapping({ rect1: Rect.boxes[j], rect2: Rect.boxes[j + 1] });

                        if (canvas.abort) return;

                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        await canvas.delay({ time: 900 });
                    }

                    if (j + 2 < len - i) {
                        await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                        await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                        await CMP.moveTo({ steps: 1 });
                    }

                    await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                    await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                    await CMP.clearComp({ fig: true, cont: true, dfba: false });
                }

                sortedLine.animate({ transform: `t-${canvas.rectWidth + 2.9},0` }, 400);

                Rect.boxes = [];
                canvas.drawYPos += canvas.rectHeight * 3;
            }

            sortedLine.animate({ transform: `t-${canvas.rectWidth + 2.9},0` }, 400);
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Bubble Sort"  });
              
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
             
                 drawText({ canvas, text: "Wait.......", x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 2.5  , color : "green"  });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Create new Matrix 'click'  Reset Button" ,  x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 2.5 , color : "red" });

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

       await ( async ()=> {

            await createButtons( );
            await initializeClicks();
              toggleMenu(true);
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);

       })();


    } catch (error) {
        console.error(error);
    } finally {
        console.log("bubblesort end");
    }
}