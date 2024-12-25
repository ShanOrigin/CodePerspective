// Function for Drawing Animation of count Sort  Saturday 1:24 am 

import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, generateColors ,  clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function CountSort({ canvas }) {
    try {
        let inputArray = [], updateArray = [], updatedArray = [];
        let centerX = canvas.canvasWidth / 2, centerY = canvas.drawYPos;

        const execute = async () => {

            const [ow, oh] = [canvas.rectWidth, canvas.rectHeight];
            canvas.rectWidth *= 0.8;
            canvas.rectHeight *= 0.8;
            canvas.nextPos = canvas.rectWidth + 3;
            canvas.drawYPos += canvas.rectHeight * 3;

            canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Count Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : false});
            const note = drawText({ canvas, text : "Enter only  0 Up to 9 digits only ", x : centerX, y:centerY  * 1.75 ,   fontSize : 0.8 , color : "red"  , Return : true}) ;

            let Input = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: true, popover: true, type: "array", purpose: "input", range: [0, 9, 2, 5] });
            const colors = await generateColors(Input.length);
            if (canvas.abort) return;
            remove(note);
            drawText({ canvas, text : "Input Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) ;

            inputArray = Rect.boxes;
            inputArray.forEach((rect, j) => rect.rectElement.attr({ "fill": colors[j] }));

            const k = Math.max(...Input), update = new Array(k + 1).fill(0);
            canvas.drawYPos += canvas.rectHeight * 4 ;
            await Rect.drawArray({ canvasHandler: canvas, array: update, cont: true, indexs: true, popover: true, type: "array" });

            drawText({ canvas, text : "Count Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) ;

            if (canvas.abort) return;
            updateArray = Rect.boxes;

            const [arrow1, arrow2] = [new Arrow({ canvasHandler: canvas, cont: "i", color: "red" }), new Arrow({ canvasHandler: canvas, cont: "++1", color: "green" })];

            for (let i = 0; i < Input.length; i++) {

                arrow1.Atext = `i ( ${Input[ i ]} )`
                arrow2.Atext = `++1 , At Count[ Input[ ${ i} ] ] `

                await arrow1.drawArrow({ rectObj: inputArray[i], fig: true, cont: true, popover: true });
                await arrow2.drawArrow({ rectObj: updateArray[Input[i]], fig: true, cont: true, popover: true });

                update[Input[i]] += 1;
                updateArray[Input[i]].rectElement.attr({ "fill": "#3498db" });
                updateArray[Input[i]].textElement.attr({ "text": update[Input[i]] });
                updateArray[Input[i]].popoverRect[3].attr({ text: `Index = ${updateArray[Input[i]].index} , Value = ${update[Input[i]]}` });
                updateArray[Input[i]].popoverText[3].attr({ text: ` My Value is = ${update[Input[i]]}` });

                if (canvas.abort) return;
                await canvas.delay({ time: 800 });

                if (i < Input.length - 1) {
                    await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow1.ShiftArrow({ steps: 1, direction: "right" });

                    let nextind = Math.abs(Input[i] - Input[i + 1]);
                    let direction = Input[i] > Input[i + 1] ? "left" : "right";

                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow2.ShiftArrow({ steps: nextind, direction });
                }

                arrow1.clearArrow({ fig: true, cont: true });
                arrow2.clearArrow({ fig: true, cont: true });
            }

            canvas.drawYPos += canvas.rectHeight * 4;
            Rect.boxes = [];
            await Rect.drawArray({ canvasHandler: canvas, array: update, cont: true, indexs: true, popover: true, type: "array" });
            drawText({ canvas, text : "Count Updated Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) ;

            if (canvas.abort) return;
            updatedArray = Rect.boxes;

            for (let i = 1; i <= k; i++) {
                arrow2.Atext = `${update[i - 1]} + ${update[i]}`;
                arrow2.Atext = `Count[ i - 1 ] + Count[ i ] = ${update[i - 1]} + ${update[i]}`;

                await arrow2.drawArrow({ rectObj: updatedArray[i], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 800 });

                update[i] += update[i - 1];
                updatedArray[i].rectElement.attr({ "fill": "#3498db" });
                updatedArray[i].textElement.attr({ "text": update[i] });
                updatedArray[i].popoverRect[3].attr({ text: `Index = ${updatedArray[i].index} , Value = ${update[i]}` });
                updatedArray[i].popoverText[3].attr({ text: ` My Value is = ${update[i]}` });

                if (canvas.abort) return;
                await canvas.delay({ time: 800 });

                if (i < k) {
                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                }

                arrow2.clearArrow({ fig: true, cont: true });
            }

            const Output = new Array(Input.length).fill(0);
            canvas.drawYPos += canvas.rectHeight * 4 ;
            Rect.boxes = [];
            await Rect.drawArray({ canvasHandler: canvas, array: Output, cont: true, indexs: true, popover: true, type: "array", hideR: true });
            drawText({ canvas, text : "Output Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) ;

            if (canvas.abort) return;
            const arrow3 = new Arrow({ canvasHandler: canvas, cont: "Place", color: "blue" });

            for (let i = Input.length - 1; i >= 0; i--) {
                arrow1.Atext = `i ( ${Input[i]} )`;
                await arrow1.drawArrow({ rectObj: inputArray[i], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 800 });

                //arrow2.Atext = `Index = ${update[Input[i]]} - 1 = ${update[Input[i]] - 1}`;
                arrow2.Atext = `Count[ Input[ i ] ] = Count[ ${Input[ i ]} ]  = ${update[Input[ i ]]} `;

                await arrow2.drawArrow({ rectObj: updatedArray[Input[i]], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 800 });

                arrow3.Atext = `Output[ Count[ Input[ i ] ] - 1 ] = ${update[Input[ i ]]} - 1 = ${update[Input[ i ]] -1 }`;

                await arrow3.drawArrow({ rectObj: Rect.boxes[update[Input[i]] - 1], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 800 });

                if (canvas.abort) return;

                const tempRect = new Rect({ canvasHandler: canvas, xposition: inputArray[i].rectElement.attr("x"), yposition: inputArray[i].rectElement.attr("y"), content: inputArray[i].content, index: -1, color: "#3498db" });
                tempRect.drawRect({ rect: true, cont: true });
                await canvas.delay({ time: 800 });

                await tempRect.moveTo({ newX: Rect.boxes[update[Input[i]] - 1].rectElement.attr("x"), newY: Rect.boxes[update[Input[i]] - 1].rectElement.attr("y") });
                await tempRect.clearRect({ rect: true, cont: true });
                Rect.boxes[update[Input[i]] - 1].textElement.attr({ "text": Input[i] });
                Rect.boxes[update[Input[i]] - 1].rectElement.attr({ "fill": inputArray[i].rectElement.attr("fill") });
                Rect.boxes[update[Input[i]] - 1].textElement.show();
                Rect.boxes[update[Input[i]] - 1].popoverRect[3].attr({ text: `Index = ${Rect.boxes[update[Input[i]] - 1].index} , Value = ${Input[i]}` });
                Rect.boxes[update[Input[i]] - 1].popoverText[3].attr({ text: ` My Value is = ${Input[i]}` });

                await canvas.delay({ time: 800 });

                update[Input[i]] -= 1;
                await canvas.delay({ time: 500 });
                updatedArray[Input[i]].textElement.attr({ text: update[Input[i]] });

                if (i < Input.length - 1) {
                    await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow1.ShiftArrow({ steps: 1, direction: "left" });
                    await canvas.delay({ time: 800 });

/*

                    let nextind = Math.abs(update[Input[i]] - update[Input[i - 1]]);
                    let direction = update[Input[i]] > update[Input[i - 1]] ? "left" : "right";

                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow2.ShiftArrow({ steps: nextind, direction });

*/
                }

                arrow1.clearArrow({ fig: true, cont: true });
                arrow3.clearArrow({ fig: true, cont: true });

                arrow2.clearArrow({ fig: true, cont: true });
                if (canvas.abort) return;
            }

            canvas.rectWidth = ow;
            canvas.rectHeight = oh;
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Counting Sort"  });
              
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
               inputArray = [];
               updateArray = [];
               updatedArray = [];
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


        console.log("count sort end successfully");
    } catch (error) {
        console.log(error);
        console.log("count sort end with error");
    }
}