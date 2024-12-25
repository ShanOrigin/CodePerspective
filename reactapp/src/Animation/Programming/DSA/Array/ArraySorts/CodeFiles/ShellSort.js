
import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function ShellSort({ canvas }) {
    try {
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos , array ;
        let orgColor ;
        const drawInitialArray = async () => {
            try {
                canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Shell Sort" , umin : -1 , umax : -2 , Y : 0.5 , defFactor : [ 0.5 , 2 ]  , canvasDimensionaChange : true });

                canvas.drawYPos += canvas.rectHeight * 2.5;
                array = await Rect.drawArray({ canvasHandler: canvas, array: [], cont: true, indexs: false, popover: true, type: "array", purpose: "input" });
                await canvas.delay({ time: 2000 });
                orgColor = Rect.boxes[0].rectElement.attr("fill");
                Rect.boxes.forEach(box => box.clearRect({ rect: true, cont: false, ind: true, dfba: true }));
                Rect.boxes = [];
                return array;
            } catch (e) {
                console.log(e); // do not use error ()
            }
        };

        const execute = async (array) => {
            try {
                let len = array.length;
                let gap = Math.floor(len / 2);

                const tempArrow = new Arrow({ canvasHandler: canvas, cont: "temp", color: "red" });
                const arrow1 = new Arrow({ canvasHandler: canvas, cont: "j", color: "green" });
                const arrow2 = new Arrow({ canvasHandler: canvas, cont: "j-gap", color: "blue" });

                while (gap > 0) {
                    for (let i = gap; i < len; i++) {
                        let temp = array[i];
                        array.push(temp);
                        if (i === gap) {
                            await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array" });
                        }
                        drawText({ canvas, text: "gap = "+gap, x: centerX* 0.9 , y: canvas.drawYPos + canvas.rectHeight*1.4 ,  fontSize: 0.81 , padding:  6 , Return: true , color: "#46099c" });

                        if (canvas.abort) return;
                        Rect.boxes[array.length - 1].rectElement.hide();
                        Rect.boxes[array.length - 1].textElement.hide();
                        await Rect.boxes[array.length - 1].indexTextElement.hide();

                        await Rect.Shifter({ rect1: Rect.boxes[i], rect2: Rect.boxes[array.length - 1], where: "right", distance: canvas.rectHeight * 1.2 });

                        if (canvas.abort) return;
                        await Rect.boxes[array.length - 1].indexTextElement.hide();
                        await Rect.boxes[array.length - 1].rectElement.attr({ fill: "red" });
                        if (canvas.abort) return;
                        await canvas.delay({ time: 200 });
                        await tempArrow.drawArrow({ rectObj: Rect.boxes[array.length - 1], fig: true, cont: true, popover: true });

                        if (canvas.abort) return;
                        await canvas.delay({ time: 400 });
                        let j = i;
                        while (j >= gap) {
                            await arrow1.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                            if (array[j - gap] > temp) {
                                await arrow2.drawArrow({ rectObj: Rect.boxes[j - gap], fig: true, cont: true, popover: true });
                                const compT = `${array[j - gap]} > Temp(${temp})\nShift ${array[j - gap]} to ${j}th Index`;
                                const CMP = new Comparator({ rectObj1: Rect.boxes[j - gap], rectObj2: Rect.boxes[array.length - 1], color: "green", CompText: compT });
                                await CMP.drawComp({ fig: true, cont: true, popover: true });

                                if (canvas.abort) return;
                                await canvas.delay({ time: 2400});
                                if (j - gap >= 0) {
                                    await Rect.Shifter({ rect1: Rect.boxes[j - gap], rect2: Rect.boxes[j], where: "right", distance: canvas.rectHeight * 1.2 });
                                }
                                array[j] = array[j - gap];
                                await canvas.delay({ time: 700 });
                                if (canvas.abort) return;

                                await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });

                                await arrow1.ShiftArrow({ steps: gap , direction: "left" });
                                await canvas.delay({ time: 1000 });
       
                                if( j - gap >= gap){ 
                                   await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                                   await arrow2.ShiftArrow({ steps: gap , direction: "left" });
                                }

                                await canvas.delay({ time: 1000 });

                                await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                                await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                                tempArrow.clearArrow({ fig: true, cont: true, dfba: false });
                                CMP.clearComp({ fig: true, cont: true, dfba: false });
                                j -= gap;
                            } else {
                                if (j >= 0 && j - gap >= -1) {
                                    await arrow2.drawArrow({ rectObj: Rect.boxes[j - gap], fig: true, cont: true, popover: true });
                                    const compT = `(${array[j - gap]}) !> Temp(${temp})\nFind greater Element than Temp(${temp})`;
                                    const CMP = new Comparator({ rectObj1: Rect.boxes[j - gap], rectObj2: Rect.boxes[array.length - 1], color: "green", CompText: compT });
                                    CMP.drawComp({ fig: true, cont: true, popover: true });

                                    await canvas.delay({ time: 1000 });
                                    await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                                    await arrow2.ShiftArrow({ steps: gap , direction: "right" });
                                
                                    if (canvas.abort) return;
                                    await canvas.delay({ time: 2400 });
                                    await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                                    await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                                    CMP.clearComp({ fig: true, cont: true, dfba: false });
                                }
                                break;
                            }
                        }
                        await arrow2.drawArrow({ rectObj: Rect.boxes[j], fig: true, cont: true, popover: true });
                        const compT = `Shift Temp(${temp}) To ${j}th place`;
                        const CMP = new Comparator({ rectObj1: Rect.boxes[j], rectObj2: Rect.boxes[array.length - 1], color: "green", CompText: compT });
                        await CMP.drawComp({ fig: true, cont: true, popover: true });

                        if (canvas.abort) return;
                        await canvas.delay({ time: 1700 });
                        await Rect.Shifter({ rect1: Rect.boxes[j], rect2: Rect.boxes[array.length - 1], where: "left", distance: canvas.rectHeight * 1.2 });
                        if (canvas.abort) return;
                        Rect.boxes[j].rectElement.attr({ "fill" : orgColor});
                        await Rect.boxes[j].indexTextElement.show();
                        Rect.boxes[array.length - 1].rectElement.hide();
                        Rect.boxes[array.length - 1].textElement.hide();
                        await Rect.boxes[array.length - 1].indexTextElement.hide();

                        array[j] = temp;

                        arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                        arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                        tempArrow.clearArrow({ fig: true, cont: true, dfba: false });
                        CMP.clearComp({ fig: true, cont: true, dfba: false });

                        array.pop();
                    }
                    gap = Math.floor(gap / 2);
                    Rect.boxes = [];
                    canvas.drawYPos += canvas.rectHeight * 3;
                }
            } catch (e) {
                console.log(e); // do not use error ()
            }
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Shell Sort"  });
              
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

        console.log("shellsort end successfully");
    } catch (error) {
        console.log(error); // do not use error ()
    }
}