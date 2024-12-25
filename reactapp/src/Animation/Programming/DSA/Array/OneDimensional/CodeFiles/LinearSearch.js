
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function LinearSearch({ canvas }) {
    try {
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let textNotify = null , rectColor = null , array ;

        const initialize = async () => {
       drawText({ canvas, text: "Linear Search", x: centerX, y: centerY / 2, fontSize: 1 , Return: true , color: "#46099c" });

           canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : -1});

           canvas.drawYPos += canvas.rectHeight * 3 ; 
           array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: true, popover: true, type: "array", purpose: "input" });
           if (canvas.abort) return;
           rectColor = Rect.boxes[0].rectElement.attr("fill");

           canvas.drawYPos += canvas.rectHeight * 3;
        }
        const execute = async () => {
            if (textNotify){
              remove(textNotify);
              Rect.boxes.forEach( e =>  e.rectElement.attr({ fill : rectColor }) );
            }
            if (canvas.abort) return;

            const tempRectText = drawText({ canvas, text: "Search Element -> ", x: centerX * 0.70, y: canvas.drawYPos + canvas.rectHeight * 3 , fontSize: 1.1 , Return: true , color: "#46099c" });
            const g = tempRectText.rect.getBBox(); 
            const tempRect = new Rect({ canvasHandler: canvas, xposition: g.x + g.width * 1.2   , yposition:  g.y + g.height /2 - canvas.rectWidth /2  , content: "", index: -1, color: "#3498db" });
            const searchValue = await tempRect.inputRect({ rect: true, cont: true, ind: false, popover: false, inputType: "number", Range: [-1000, 1000], plc: "", popoverTextArray: null });

            const arrow = new Arrow({ canvasHandler: canvas, cont: "Element", color: "red", direction: "up" });

            for (let i = 0; i < array.length; i++) {
                if (canvas.abort) return;
                arrow.Atext = `Array[${i}] = ${array[i]}`;
                await arrow.drawArrow({ rectObj: Rect.boxes[i], fig: true, cont: true, popover: true });

                if (canvas.abort) return;
                await canvas.delay({ time: 700 });
                await tempRect.moveTo({ newX: canvas.drawXPos + canvas.nextPos * i, newY: Rect.boxes[i].rectElement.attr("y") + canvas.rectHeight * 1.5 });

                if (canvas.abort) return;
                await canvas.delay({ time: 1000 });

                Rect.boxes[i].rectElement.toFront();
                Rect.boxes[i].textElement.toFront();
                await Rect.boxes[i].moveTo({ newX: Rect.boxes[i].rectElement.attr("x"), newY: Rect.boxes[i].rectElement.attr("y") + canvas.rectHeight * 1.5 });

                if (array[i] === searchValue) {

                    if (canvas.abort) return;
                    await canvas.delay({ time: 700 });

                    Rect.boxes[i].rectElement.attr({ fill: "green" });
                    await tempRect.moveTo({ newX:  g.x + g.width * 1.2 , newY: g.y + g.height /2 - canvas.rectWidth /2 });

                    arrow.clearArrow({ fig: true, cont: true, dfba: false });
                    textNotify = drawText({ canvas, text: `😌 , Search Element Found At ${i} Index`, x: centerX, y: canvas.drawYPos + canvas.rectHeight ,  fontSize: 1.1 , Return: true, color: "blue" });

                    await Rect.boxes[i].moveTo({ newX: Rect.boxes[i].rectElement.attr("x"), newY: Rect.boxes[i].rectElement.attr("y") - canvas.rectHeight * 1.5 });

                    await canvas.delay({ time: 800 });
                    tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    remove(tempRectText);
                    return;
                }

                const t = (i < array.length - 1) ? drawText({ canvas, text: `Search Element( ${searchValue} ) != Array[ ${i} ]  -->  Do  i++ `, x: centerX, y: canvas.drawYPos +  canvas.rectHeight * 0.5 , Return: true ,  fontSize: 1, color: "red" }) 
                      : drawText({ canvas, text: `Search Element( ${searchValue} ) != Array[${i}] --> Do Not i++ `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 0.5 , Return : true , fontSize: 1, color: "red" });

                if (canvas.abort) return;
                await canvas.delay({ time: 1000 });
                await Rect.boxes[i].moveTo({ newX: Rect.boxes[i].rectElement.attr("x"), newY: Rect.boxes[i].rectElement.attr("y") - canvas.rectHeight * 1.5 });

                if (i < array.length - 1) {
                    await arrow.ShiftArrow({ steps: 0.5, direction: "up" });
                    await arrow.ShiftArrow({ steps: 1, direction: "right" });

                    if (canvas.abort) return;
                    await canvas.delay({ time: 900 });
                    arrow.clearArrow({ fig: true, cont: true, dfba: false });
                }
                remove(t);
            }

            arrow.clearArrow({ fig: true, cont: true, dfba: false });
            textNotify = drawText({ canvas, text: `😔 , Search Element ${searchValue} Not Present In Array`, x: centerX, y: canvas.drawYPos + canvas.rectHeight  , fontSize: 1, Return: true ,  color: "red" });
            await tempRect.moveTo({ newX:  g.x + g.width * 1.2 , newY: g.y + g.height /2 - canvas.rectWidth /2 });
            await canvas.delay({ time: 100 });
            await tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

            remove(tempRectText);
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.5   , colorCode :0 , textContent:"Linear Search" , padding : 7 }) 

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

                 count = false;
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);

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
               count = true;
               clearAll();

               await initialize();
               await createButtons();
          
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

            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await initialize();
            await createButtons( );
            initializeClicks();
            toggleMenu(true);

       })();

    } catch (error) {
        console.error(error);
        return;
    } finally {
        console.log("Execution finished");
    }
}