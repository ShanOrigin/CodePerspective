// Function for Drawing Animation of Quick Sort 

import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , createButton } from '../../../../../Source/Utilities/utilities.js';

async function partition(canvas, array, start, end , col ) {
    try {
        const pivot = array[start];
        const pvt = new Arrow({ canvasHandler: canvas, cont: "pivot", color: "red" });
        const Start = new Arrow({ canvasHandler: canvas, cont: "start", color: "green" });
        const End = new Arrow({ canvasHandler: canvas, cont: "end", color: "blue" });

        await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array" , color : "purple" });
        if (canvas.abort) return console.log("quick sort end");

        for (let j = start ; j <= end  ; j++){
                Rect.boxes[j].rectElement.attr({ "fill": col });
        }

        await canvas.delay({ time: (array.length + 1) * 200 });
        await pvt.drawArrow({ rectObj: Rect.boxes[start] });

        let i = start + 1;
        let j = end;
        let temp;

        do {
            while (array[i] <= pivot) {
                await canvas.delay({ time: 1000 });
                await Start.drawArrow({ rectObj: Rect.boxes[i] });
                const compT = `${array[i]} <= Pivot (${pivot})\nFind greater than Pivot(${pivot})(Start++)`;
                const CMP = new Comparator({ rectObj1: Rect.boxes[start], rectObj2: Rect.boxes[i], color: "green", CompText: compT });
                CMP.drawComp({ fig: true, cont: true });
                await canvas.delay({ time: 1000 });
                if (canvas.abort) return console.log("quick sort end");
              

                if (i < array.length - 1) {
                    await Start.ShiftArrow({ steps: 0.5, direction: "up" });
                    await canvas.delay({ time: 50 });
                    await Start.ShiftArrow({ steps: 1, direction: "right" });
                }

                if (canvas.abort) return console.log("quick sort end");
                await canvas.delay({ time: 2000 });

                Start.clearArrow({ fig: true, cont: true });
                CMP.clearComp({ fig: true, cont: true });

                i++;
            }

            if(i <= end )await Start.drawArrow({ rectObj: Rect.boxes[i] });
            if (canvas.abort) return console.log("quick sort end");

            while (array[j] > pivot) {
                await canvas.delay({ time: 1000 });
                await End.drawArrow({ rectObj: Rect.boxes[j] });
                const compT = `(${array[j]}) > Pivot(${pivot})\nFind Lesser than Pivot(${pivot})(End--)`;
                const CMP = new Comparator({ rectObj1: Rect.boxes[start], rectObj2: Rect.boxes[j], color: "green", CompText: compT });
                CMP.drawComp({ fig: true, cont: true });
                await canvas.delay({ time: 1000 });
                if (canvas.abort) return console.log("quick sort end");

                if (j > 0) {
                    await End.ShiftArrow({ steps: 0.5, direction: "up" });
                    await canvas.delay({ time: 50 });
                    await End.ShiftArrow({ steps: 1, direction: "left" });
                }

                if (canvas.abort) return console.log("quick sort end");
                await canvas.delay({ time: 2000 });

                End.clearArrow({ fig: true, cont: true });
                CMP.clearComp({ fig: true, cont: true });

                j--;
            }

            await End.drawArrow({ rectObj: Rect.boxes[j] });

            if (i < j) {
                if (canvas.abort) return console.log("quick sort end");

                await canvas.delay({ time: 1000 });
                const compT = `(i)=${array[i]} < (j)=${array[j]}\nSwap ${array[i]} With ${array[j]}`;
                const CMP = new Comparator({ rectObj1: Rect.boxes[i], rectObj2: Rect.boxes[j], color: "green", CompText: compT });
                CMP.drawComp({ fig: true, cont: true });

                if (canvas.abort) return console.log("quick sort end");
                await canvas.delay({ time: 1000 });
                await Rect.swapping({ rect1: Rect.boxes[i], rect2: Rect.boxes[j] });

                if (canvas.abort) return console.log("quick sort end");
               
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;

                if (canvas.abort) return console.log("quick sort end");

                await Start.clearArrow({ fig: true, cont: true });
                await End.clearArrow({ fig: true, cont: true });
                await CMP.clearComp({ fig: true, cont: true });
            }

            await Start.clearArrow({ fig: true, cont: true });
            await End.clearArrow({ fig: true, cont: true });

        } while (i < j);

        if(i <= end ) await Start.drawArrow({ rectObj: Rect.boxes[i] });
        await End.drawArrow({ rectObj: Rect.boxes[j] });

        const compT = `Swap Pivot(${array[start]}) With j (${array[j]})`;
        const CMP = new Comparator({ rectObj1: Rect.boxes[start], rectObj2: Rect.boxes[j], color: "green", CompText: compT });
        CMP.drawComp({ fig: true, cont: true });

        await canvas.delay({ time: 700 });
        await Rect.swapping({ rect1: Rect.boxes[start], rect2: Rect.boxes[j] });

        if (canvas.abort) return console.log("quick sort end");
    
        temp = array[start];
        array[start] = array[j];
        array[j] = temp;

        Start.clearArrow({ fig: true, cont: true });
        End.clearArrow({ fig: true, cont: true });
        pvt.clearArrow({ fig: true, cont: true });
        CMP.clearComp({ fig: true, cont: true });

        if (canvas.abort) return console.log("quick sort end");

        Rect.boxes = [];
        return j;
    } catch (error) {
        console.log(error);
        console.log("quick sort end");
        return;
    }
}

async function quickSort(canvas, array, start = 0, end = array.length - 1 , col = "purple" , st = true ) {
    try {
        if (start < end) {
            if (canvas.abort) return console.log("quick sort end");

            canvas.drawYPos += canvas.rectHeight * 1.5;
            const partitionIndex = await partition( canvas, array , start, end , col );
            if (canvas.abort) return console.log("quick sort end");

            canvas.drawYPos += canvas.rectHeight * 1.5;
            
            await quickSort( canvas, array, start, partitionIndex - 1 ,"green");
            if (canvas.abort) return console.log("quick sort end");
            
            await quickSort( canvas, array, partitionIndex + 1, end , "red" , false );
        }

        
        return;
    } catch (error) {
        console.log("An error occurred:" + error);
        console.log("quick sort end");
        return;
    }
}

export async function QuickSort({ canvas }) {
    try {
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const execute = async () => {
           try{ 
              canvas.drawYPos += canvas.rectHeight * 2.5 ;

              canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Quick Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : true });

              const array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: false, popover: true, type: "array", purpose: "input" });
              if (canvas.abort) return;

              await canvas.delay({ time: (array.length + 1) * 300 });

              canvas.drawYPos -= canvas.rectHeight * 1.5 ;

              Rect.boxes.forEach(box => box.clearRect({ rect: true, cont: true }));
              Rect.boxes = [];

             await quickSort( canvas, array );

         }catch(e){
            console.log(e);
         }
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Quick Sort"  });
              
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
                 drawText({ canvas, text: "Create new Sort 'click'  Reset Button" ,  x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 2.5 , color : "red" });

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


    } catch (error) {
        console.log(error);
    }
}