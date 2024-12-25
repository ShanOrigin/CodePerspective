
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function SelectionSort({ canvas }) {
    try {
        if (canvas.abort) return console.log("Selection Sort aborted.");

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos ;

        const execute = async () => {
            try {
                //drawText({ canvas, text: "Selection Sort", x: centerX, y: centerY / 2, fontSize: 1.7, color: "#46099c" });
                canvas.drawYPos += canvas.rectHeight * 2.5 ;
                let sortedLine ;
                canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Selection Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : true });

                let  array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: true, popover: true, type: "array", purpose: "input" });
                if (canvas.abort) return;

                const minArrow = new Arrow({ canvasHandler: canvas, cont: "min", color: "red" });
                const arrow1 = new Arrow({ canvasHandler: canvas, cont: "j", color: "green" });
                const arrow2 = new Arrow({ canvasHandler: canvas, cont: "initial min", color: "blue" });

                for (let i = 0; i < array.length - 1; i++) {
                    if (i > 0) {
                        await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array", purpose: "print" });
                        if (canvas.abort) return;
                    }

                    let minIndex = i, cnt = 0;
                    await minArrow.drawArrow({ rectObj: Rect.boxes[minIndex], fig: true, cont: true, popover: true });
                    await canvas.delay({ time: 800 });

                    sortedLine = canvas.paper.path(`M${Rect.boxes[i].rectElement.attr("x") - 1.45},${Rect.boxes[i].rectElement.attr("y") - 2.5}V${Rect.boxes[i].rectElement.attr("y") + canvas.rectHeight + 2.5}`).attr({ "stroke": "purple" });

                    for (let j = i + 1; j < array.length; j++) {
                        await arrow1.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                        if (array[j] < array[minIndex]) {
                            const compText = `j(${array[j]}) < Min(${array[minIndex]})\nShift min to ${j}th Index`;
                            const CMP = new Comparator({ rectObj1: Rect.boxes[minIndex], rectObj2: Rect.boxes[j], color: "green", CompText: compText });
                            await CMP.drawComp({ fig: true, cont: true, popover: false });

                            if (canvas.abort) return;
                            await canvas.delay({ time: 1000 });

                            await minArrow.ShiftArrow({ steps: 0.5, direction: "up" });
                            await minArrow.ShiftArrow({ steps: j - minIndex, direction: "right" });
                            if (cnt === 0) await arrow2.drawArrow({ rectObj: Rect.boxes[i], fig: true, cont: true, popover: true });
                            cnt = 1;
                            if (canvas.abort) return;
                            await canvas.delay({ time: 1000 });
                            arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                            minArrow.clearArrow({ fig: true, cont: true, dfba: false });
                            CMP.clearComp({ fig: true, cont: true, dfba: false });

                            minIndex = j;
                            await minArrow.drawArrow({ rectObj: Rect.boxes[minIndex], fig: true, cont: true, popover: true });
                        } else {
                            const compText = `j(${array[j]}) > Min(${array[minIndex]})\nFind <= min `;
                            const CMP = new Comparator({ rectObj1: Rect.boxes[minIndex], rectObj2: Rect.boxes[j], color: "red", CompText: compText });
                            await CMP.drawComp({ fig: true, cont: true, popover: false });

                            await canvas.delay({ time: 1000 });
                            if (j < array.length - 2) {
                                await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                                await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                            }

                            if (canvas.abort) return;
                            await canvas.delay({ time: 1000 });

                            arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                            minArrow.clearArrow({ fig: true, cont: true, dfba: false });
                            CMP.clearComp({ fig: true, cont: true, dfba: false });
                            await minArrow.drawArrow({ rectObj: Rect.boxes[minIndex], fig: true, cont: true, popover: true });
                        }
                    }

                    if (minIndex !== i) {
                        const compText = `Swap Initial min ${array[i]} With Current min ${array[minIndex]}`;
                        const CMP = new Comparator({ rectObj1: Rect.boxes[i], rectObj2: Rect.boxes[minIndex], color: "green", CompText: compText });
                        await CMP.drawComp({ fig: true, cont: true, popover: false });

                        await canvas.delay({ time: 1000 });

                        await minArrow.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });

                        if (canvas.abort) return;

                        await Rect.swapping({ rect1: Rect.boxes[i], rect2: Rect.boxes[minIndex] });

                        [array[i], array[minIndex]] = [array[minIndex], array[i]];

                        if (canvas.abort) return;
                        await canvas.delay({ time: 700 });

                        arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                        arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                        minArrow.clearArrow({ fig: true, cont: true, dfba: false });
                        CMP.clearComp({ fig: true, cont: true, dfba: false });

                        if (canvas.abort) return;
                    }

                    minArrow.clearArrow({ fig: true, cont: true, dfba: false });
                    await sortedLine.animate({ transform: `t${canvas.rectWidth + 2.9},0` }, 400);

                    Rect.boxes = [];
                    canvas.drawYPos += canvas.rectHeight * 3;
                    if (canvas.abort) return;
                }
                await sortedLine.animate({ transform: `t${canvas.rectWidth + 2.9},0` }, 400);
            } catch (error) {
                console.log( error);
                // Propagate the error
            }
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Selection Sort"  });
              
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
             
                 drawText({ canvas, text: "Wait.......", x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 1.5   , color : "green"  });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Create new Sort 'click'  Reset Button" ,  x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 1.5 , color : "red" });

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

       ( async ()=> {

            await createButtons( );
            initializeClicks();
              toggleMenu(true);
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);

       })();


        console.log("Selection Sort completed successfully.");
    } catch (error) {
        console.log(error);
        console.log("Selection Sort ended.");
    }
}