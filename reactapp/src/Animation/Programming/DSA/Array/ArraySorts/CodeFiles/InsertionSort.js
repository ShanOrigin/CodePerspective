
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function InsertionSort({ canvas }) {
    try {
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let sortedLine , array ; 
        const drawInitialArray = async () => {
            // drawText({ canvas, text: "Insertion Sort", x: centerX, y: centerY / 2, fontSize: 1.1 , Return: true , color: "#46099c" });
            canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Insertion Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : true });

            canvas.drawYPos += canvas.rectHeight * 2.5 ;
            let array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: false, popover: true, type: "array", purpose: "input" });
            await canvas.delay({ time: 2000 });
            Rect.boxes.forEach(box => box.clearRect({ rect: true, cont: false, ind: true, dfba: true }));
            Rect.boxes = [];
            return array;
        };

        const execute = async (array) => {
            const keyArrow = new Arrow({ canvasHandler: canvas, cont: "key", color: "red" });
            const arrow1 = new Arrow({ canvasHandler: canvas, cont: "j", color: "green" });
            const arrow2 = new Arrow({ canvasHandler: canvas, cont: "j+1", color: "blue" });

            for (let i = 1; i < array.length; i++) {
                let key = array[i];
                array.push(key);
                await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array" });
                
                Rect.boxes[array.length - 1].rectElement.hide();
                Rect.boxes[array.length - 1].textElement.hide();
                await Rect.boxes[array.length - 1].indexTextElement.hide();

                if (canvas.abort) return;

                sortedLine = canvas.paper.path(`M${Rect.boxes[i - 1].rectElement.attr("x") + canvas.rectWidth + 1.45},${Rect.boxes[i - 1].rectElement.attr("y") - 2.5}V${Rect.boxes[i - 1].rectElement.attr("y") + canvas.rectHeight + 2.5}`)
                    .attr({ "stroke": "purple" });

                await Rect.Shifter({ rect1: Rect.boxes[i], rect2: Rect.boxes[array.length - 1], where: "right" });
                await Rect.boxes[array.length - 1].indexTextElement.hide();

                await Rect.boxes[array.length - 1].rectElement.attr({ fill: "green" });
                await canvas.delay({ time: 200 });

                await keyArrow.drawArrow({ rectObj: Rect.boxes[array.length - 1], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 800 });

                let j = i - 1;
                while (j >= 0 && array[j] > key) {
                    await arrow1.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                    await arrow2.drawArrow({ rectObj: Rect.boxes[j + 1], fig: true, cont: true, popover: true });
                    await canvas.delay({ time: 800 });

                    const compT = `${array[j]} > Key(${key})\nPlace ${array[j]} at ${j + 1} place`;
                    const CMP = new Comparator({ rectObj1: Rect.boxes[j], rectObj2: Rect.boxes[array.length - 1], color: "green", CompText: compT });
                    await CMP.drawComp({ fig: true, cont: true, popover: false });

                    await canvas.delay({ time: 1800 });

                    await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });

                    await Rect.Shifter({ rect1: Rect.boxes[j], rect2: Rect.boxes[j + 1], where: "right" });
                    await canvas.delay({ time: 1000 });
                    array[j + 1] = array[j];
                    await arrow1.ShiftArrow({ steps: 1, direction: "left" });
                    await canvas.delay({ time: 1000 });
                    await arrow2.ShiftArrow({ steps: 1, direction: "left" });

                    arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                    arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                    CMP.clearComp({ fig: true, cont: true, dfba: false });

                    j--;
                }

                if (j >= 0) await arrow1.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                await arrow2.drawArrow({ rectObj: Rect.boxes[j + 1], fig: true, cont: true, popover: true });

                const compT = ` Key(${key}) < ${array[j + 1]} \n Place key(${key}) at ${j + 1} place`;
                const CMP = new Comparator({ rectObj1: Rect.boxes[j + 1], rectObj2: Rect.boxes[array.length - 1], color: "green", CompText: compT });
                await CMP.drawComp({ fig: true, cont: true, popover: false });

                await canvas.delay({ time: 1400 });

                await Rect.Shifter({ rect1: Rect.boxes[j + 1], rect2: Rect.boxes[array.length - 1], where: "left" });

                await Rect.boxes[j+1].indexTextElement.show();
                Rect.boxes[array.length - 1].rectElement.hide();
                Rect.boxes[array.length - 1].textElement.hide();
                await Rect.boxes[array.length - 1].indexTextElement.hide();

                array[j + 1] = key;
                await canvas.delay({ time: 1000 });

                arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                keyArrow.clearArrow({ fig: true, cont: true, dfba: false });
                CMP.clearComp({ fig: true, cont: true, dfba: false });

                canvas.drawYPos += canvas.rectHeight * 3;
                array.pop();
                Rect.boxes = [];
            }

            sortedLine.animate({ transform: `t${canvas.rectWidth + 2.9},0` }, 400);
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Insertion Sort"  });
              
            } catch (error) {
               console.log( error);
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
               console.log(error);
            }
       };
       let count = true ;
       const action = async () => {
            try {
             if (count) {
                 count = false;
                 toggleMenu(false);
                 array = await drawInitialArray();
                 await execute(array);
              
                 toggleMenu(true);
              } else {
             
                 drawText({ canvas, text: "Wait.......", x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 1.5  , color : "green"  });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Create new Sort 'click'  Reset Button" ,  x: centerX, y: canvas.canvasHeight - canvas.rectHeight * 1.5 , color : "red" });

                 operationButton.enableButton();
              }

            } catch (error) {
               console.log(error);
               toggleMenu(true);
            }
        };

        const clearAll = () => {
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [];
               Rect.boxes = [];
               array = [] ;
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


        console.log("Insertion sort executed successfully");
    } catch (error) {
        console.error(error);
        console.log("Insertion sort end");
    }
}