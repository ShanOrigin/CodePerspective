
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function BinarySearch({ canvas }) {
    try {
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let tempRectText = null , tempRect = null , rectColor = null , textNotify = null , statusText = null   ;
        let start , end , mid , array = []  ;

        const initialize = async () => {
            start = 0 ; array = [] ;
            drawText({ canvas, text: "Binary Search", x: centerX, y: centerY / 2, fontSize: 1.1 , Return: true , color: "#46099c" });

            canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : -1 });

            canvas.drawYPos += canvas.rectHeight * 3;
            array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: true, popover: true , type: "array", purpose: "input" });

            end = array.length - 1 ;
            if (canvas.abort) return;

            const sorted = array.every((element, index) => index === 0 || element >= array[index - 1]);
            const sortMessage = sorted ? 
                  "Your Given Array Is Already Sorted\nRemember: In Binary Search Array Must be sorted\nPlease Wait ....." :
                  "Your Given Array Is Not Sorted\nRemember: In Binary Search Array Must be sorted\nPlease Wait Sorting Going On.....";
        
            textNotify = drawText({ canvas, text: sortMessage, x: canvas.canvasWidth / 2, y: canvas.canvasHeight * 0.5, Return: true , fontSize: 1, color: "#46099c" });

            if (!sorted) array.sort((a, b) => a - b);
            await canvas.delay({ time: 4000 });
            remove(textNotify);

            canvas.drawYPos += canvas.rectHeight * 4;
            await Rect.drawArray({ canvasHandler: canvas, array: array, cont: true, indexs: true, popover: true , type: "array" });
            rectColor = Rect.boxes[0].rectElement.attr("fill");
        }

        const clearSearch = () => {
            if ( tempRectText) remove(tempRectText);
            
            tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
        }
        let found = false ;
        const execute = async () => {
            try {
                if (canvas.abort) return;

                if (found){
                   Rect.boxes.forEach( e =>  e.rectElement.attr({ fill : rectColor }) );
                   found = false ;
                }
                if (textNotify) remove(textNotify);
                
                start = 0 ;
                end = array.length - 1 ;
                tempRectText = drawText({ canvas, text: "Search Element -> ", x: centerX * 0.70, y: canvas.drawYPos + canvas.rectHeight*6  , Return:true,  fontSize: 1.1, color: "#46099c" });
                const g = tempRectText.rect.getBBox() ;
                tempRect = new Rect({ canvasHandler: canvas, xposition: g.x + g.width * 1.1 , yposition: g.y + g.height/2 - canvas.rectHeight/2 , content: "", index: -1, color: "#3498db" });
                const searchValue = await tempRect.inputRect({ rect: true, cont: true, ind: false, popover: false, inputType: "number", Range: [-1000, 1000], plc: "", popoverTextArray: null });

                const low = new Arrow({ canvasHandler: canvas, cont: "Low", color: "red", direction: "up" });
                const high = new Arrow({ canvasHandler: canvas, cont: "High", color: "blue", direction: "up" });
                const midArrow = new Arrow({ canvasHandler: canvas, cont: "Mid", color: "green", direction: "up" });

                while (start <= end) {
                    mid = Math.floor((start + end) / 2);

                    await low.drawArrow({ rectObj: Rect.boxes[start], fig: true, cont: true, popover: true });
                    await canvas.delay({ time: 400 });
                    await high.drawArrow({ rectObj: Rect.boxes[end], fig: true, cont: true, popover: true });
                    await canvas.delay({ time: 400 });
                    if ( textNotify) remove(textNotify);
                    
                    const compText = `mid = [start(${start}) + end(${end})] / 2 = ${start + end} / 2 = ${mid}`;
                    const comparator = new Comparator({ rectObj1: Rect.boxes[start], rectObj2: Rect.boxes[end], color: "green", CompText: compText });
                    await comparator.drawComp({ fig: true, cont: true, popover: false });
                    await canvas.delay({ time: 800 });

                    await midArrow.drawArrow({ rectObj: Rect.boxes[mid], fig: true, cont: true, popover: true });
                    await canvas.delay({ time: 800 });
                    await comparator.clearComp({ fig: true, cont: true, dfba: false });

                    await tempRect.moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") + canvas.rectHeight * 1.35 });
                    await canvas.delay({ time: 600 });
                    Rect.boxes[mid].rectElement.toFront();
                    Rect.boxes[mid].textElement.toFront();
                    await Rect.boxes[mid].moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") + canvas.rectHeight * 1.35 });
                    await canvas.delay({ time: 1500 });

                    if (array[mid] === searchValue) {

                        rectColor = Rect.boxes[mid].rectElement.attr("fill");
                        Rect.boxes[mid].rectElement.attr({ fill: "green" });

                        low.clearArrow({ fig: true, cont: true, dfba: false });
                        high.clearArrow({ fig: true, cont: true, dfba: false });
                        midArrow.clearArrow({ fig: true, cont: true, dfba: false });
                
                        await Rect.boxes[mid].moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.35 });
                        await tempRect.moveTo({ newX:  g.x + g.width * 1.1  , newY: g.y + g.height/2 - canvas.rectHeight/2 });
                        if ( textNotify) remove(textNotify);
                        
                       textNotify = drawText({ canvas, text: `😌 Search Element Found At ${mid} Index`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3 , fontSize: 1 , Return: true , color: "blue" });
                       clearSearch();
                       found = true ;
                       return;

                    } else if (array[mid] < searchValue) {

                        await Rect.boxes[mid].moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.35 });
                        await canvas.delay({ time: 1000 });

                        textNotify= drawText({ canvas, text: `Shift Start Pointer To Mid + 1 \n Because (${searchValue}) Greater Than Mid Value (${array[mid]})`, x: centerX , y: canvas.drawYPos + canvas.rectHeight * 3.5 , fontSize: 0.9, Return: true  , color: "red" });
 
                        if (mid + 1 < array.length - 1) {
                            await low.ShiftArrow({ steps: 0.5, direction: "up" });
                            await low.ShiftArrow({ steps: start + mid + 1, direction: "right" });
                        }
                        await canvas.delay({ time: 2500 });

                        low.clearArrow({ fig: true, cont: true, dfba: false });
                        midArrow.clearArrow({ fig: true, cont: true, dfba: false });
                        high.clearArrow({ fig: true, cont: true, dfba: false });
                        start = mid + 1;

                    } else {

                        await Rect.boxes[mid].moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.35 });
                        await canvas.delay({ time: 1000 });
                        textNotify= drawText({ canvas, text: `Shift End Pointer To Mid - 1 \n Because (${searchValue}) Less Than Mid Value (${array[mid]})`, x: centerX , y: canvas.drawYPos + canvas.rectHeight * 3.5 , fontSize: 0.9 , Return: true ,  color: "red" });
 
                        if (mid - 1 >= 0) {
                            await high.ShiftArrow({ steps: 0.5, direction: "up" });
                            await high.ShiftArrow({ steps: end - mid + 1, direction: "left" });
                        }
                        await canvas.delay({ time: 2500 });

                        low.clearArrow({ fig: true, cont: true, dfba: false });
                        midArrow.clearArrow({ fig: true, cont: true, dfba: false });
                        high.clearArrow({ fig: true, cont: true, dfba: false });
                        end = mid - 1;
                    }
                }

                if (start > end) {
                    //Rect.boxes[mid].moveTo({ newX: Rect.boxes[mid].rectElement.attr("x"), newY: Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.5 });
                    await canvas.delay({ time: 1000 });
                    if ( textNotify) remove(textNotify);
                    
                    textNotify = drawText({ canvas, text: `😔 Search Element Is Not Present In Given Array i.e ${searchValue}`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3, fontSize: 1, Return: true , color: "blue" });
                    low.clearArrow({ fig: true, cont: true, dfba: false });
                    high.clearArrow({ fig: true, cont: true, dfba: false });
                    midArrow.clearArrow({ fig: true, cont: true, dfba: false });
                    await tempRect.moveTo({ newX: g.x + g.width * 1.1, newY: g.y + g.height/2 - canvas.rectHeight/2  });
                    clearSearch();
                }
            } catch (e) {
                console.error(e);
            }
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.5   , colorCode :0 , textContent:"Binary Search" , padding : 7 }) 

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
    } finally {
        console.log("Execution finished");
    }
}