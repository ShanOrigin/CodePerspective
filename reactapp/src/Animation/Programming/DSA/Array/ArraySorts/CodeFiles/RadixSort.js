// Function for Drawing Animation of radix  Sort  Sunday  11:22:55 am 

import { Rect, Arrow, Comparator } from '../../../../../Source/Components/Components.js';
import { drawText, waitForLength, generateColors ,  clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function RadixSort({canvas}) {
    try {

        let Input , inputArray , updateArray , updatedArray , outputArray  ;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let title = [] ;
    const CountSortByDigit= async (Input , exp ) => {
    try {
        const [ow, oh] = [canvas.rectWidth, canvas.rectHeight];
        canvas.rectWidth *= 0.8;
        canvas.rectHeight *= 0.8;
        canvas.nextPos = canvas.rectWidth + 3;

        await Rect.drawArray({ canvasHandler: canvas, array: Input , cont: true, indexs: true, popover: true, type: "array", purpose: "print", range: [-999, 999, 2, 5] });
        const colors = await generateColors(Input.length);
        if (canvas.abort) return;
        title.push(drawText({ canvas, text : "Input Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}));

        inputArray = Rect.boxes;
        Rect.boxes = [] ;
        inputArray.forEach((rect, j) => rect.rectElement.attr({ "fill": colors[j] }));


        canvas.drawYPos += canvas.rectHeight * 4;
        await Rect.drawArray({ canvasHandler: canvas, array: new Array(10).fill(0), cont: true, indexs: true, popover: true, type: "array" });
        title.push(drawText({ canvas, text : "Count Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) );

        updateArray = Rect.boxes;
        Rect.boxes = [] ;

        const [arrow1, arrow2, arrow3] = [new Arrow({ canvasHandler: canvas, cont: "i", color: "red" }), new Arrow({ canvasHandler: canvas, cont: "++1", color: "green" }), new Arrow({ canvasHandler: canvas, cont: "Place", color: "blue" })];
        const n = Input.length;
        const Output = new Array(n).fill(0);
        const update = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
            await canvas.delay({ time: 300 });
            const index = Math.floor(Input[i] / exp) % 10;
            arrow1.Atext = `i ( Input[ i ] / exp ) % 10 = ${Math.floor(Input[i] / exp) % 10} `
            arrow2.Atext = `++1 , At Count[ ${Math.floor(Input[ i ] / exp) % 10} ]`

            await arrow1.drawArrow({ rectObj: inputArray[i], fig: true, cont: true, popover: true });
            await arrow2.drawArrow({ rectObj: updateArray[index], fig: true, cont: true, popover: true });

            update[index]++;
            updateArray[index].rectElement.attr({ "fill": "#3498db" });
            updateArray[index].textElement.attr({ "text": update[index] });
            updateArray[index].popoverRect[3].attr({ text: `Index = ${updateArray[index].index} , Value = ${update[index]}` });
            updateArray[index].popoverText[3].attr({ text: ` My Value is = ${update[index]}` });
            await canvas.delay({ time: 800 });
            if (canvas.abort) return;
            //await canvas.delay({ time: 800 });

            if (i < n - 1) {
                await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                const nextind = Math.abs(index - Math.floor(Input[i + 1] / exp) % 10);
                const direction = index > (Math.floor(Input[i + 1] / exp) % 10) ? "left" : "right";
                await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow2.ShiftArrow({ steps: nextind, direction });
            }
            await canvas.delay({ time: 800 });
            arrow1.clearArrow({ fig: true, cont: true });
            arrow2.clearArrow({ fig: true, cont: true });
        }


        canvas.drawYPos += canvas.rectHeight * 4;
        await Rect.drawArray({ canvasHandler: canvas, array: new Array(10).fill(0), cont: true, indexs: true, popover: true, type: "array" });
        updatedArray = Rect.boxes;
        title.push(drawText({ canvas, text : "Count Updated Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}) );


        for (let i = 1; i < 10; i++) {
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

            if (i < 9) {
                await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow2.ShiftArrow({ steps: 1, direction: "right" });
            }

            arrow2.clearArrow({ fig: true, cont: true });
        }

        canvas.drawYPos += canvas.rectHeight * 4;
        await Rect.drawArray({ canvasHandler: canvas, array: Output, cont: true, indexs: true, popover: true, type: "array", hideR: true });
        outputArray = Rect.boxes;
        title.push(drawText({ canvas, text : "Output Array ", x : centerX, y: canvas.drawYPos + canvas.rectHeight * 1.6   ,   fontSize : 0.9, color : "red"  , padding : 10 , Return : true}));

        for (let i = n - 1; i >= 0; i--) {
            const index = Math.floor(Input[i] / exp) % 10;
            arrow1.Atext = `i ( ${Input[i]} )`;
            await arrow1.drawArrow({ rectObj: inputArray[i], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 800 });

            arrow2.Atext = `Count[ ( Input[ i ] / exp ) % 10 ] = Count[${Input[ i ]}/${exp} % 10] = ${update[index]} `;
            await arrow2.drawArrow({ rectObj: updatedArray[index], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 800 });

            arrow3.Atext = `Output[ Count[ ( Input[ i ] / exp ) % 10 ] - 1 ] = ${update[index]} - 1 = ${update[index] -1 }`;

            await arrow3.drawArrow({ rectObj: outputArray[update[index] - 1], fig: true, cont: true, popover: true });
            await canvas.delay({ time: 800 });

            if (canvas.abort) return;
            Output[update[index] - 1] = Input[i];
            const tempRect = new Rect({ canvasHandler: canvas, xposition: inputArray[i].rectElement.attr("x"), yposition: inputArray[i].rectElement.attr("y"), content: inputArray[i].content, index: -1, color: "#3498db" });
            await tempRect.drawRect({ rect: true, cont: true });
            await canvas.delay({ time: 800 });
            await tempRect.moveTo({ newX: outputArray[update[index] - 1].rectElement.attr("x"), newY: outputArray[update[index] - 1].rectElement.attr("y") });
            await tempRect.clearRect({ rect: true, cont: true });
            outputArray[update[index] - 1].textElement.attr({ "text": Input[i] });
            outputArray[update[index] - 1].rectElement.attr({ "fill": inputArray[i].rectElement.attr("fill") });
            outputArray[update[index] - 1].textElement.show();
            outputArray[update[index] - 1].popoverRect[3].attr({ text: `Index = ${outputArray[update[index] - 1].index} , Value = ${Input[i]}` });
            outputArray[update[index] - 1].popoverText[3].attr({ text: ` My Value is = ${Input[i]}` });

            await canvas.delay({ time: 800 });

            if (i > 0) {
                await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow1.ShiftArrow({ steps: 1, direction: "left" });
                await canvas.delay({ time: 800 });
/*
                const nextind = Math.abs(update[index] - update[Math.floor(Input[i - 1] / exp) % 10]);
                const direction = update[index] > update[Math.floor(Input[i - 1] / exp) % 10] ? "left" : "right";
                await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow2.ShiftArrow({ steps: nextind, direction });
*/
            }

            await canvas.delay({ time: 800 });

            update[index]--;
            updatedArray[index].textElement.attr({ text: update[index] });
            if (canvas.abort) return;

            arrow1.clearArrow({ fig: true, cont: true });
            arrow2.clearArrow({ fig: true, cont: true });
            arrow3.clearArrow({ fig: true, cont: true });

        }

        canvas.rectWidth = ow;
        canvas.rectHeight = oh;
        canvas.nextPos = canvas.rectWidth + 3;
        console.log("Count sort by digit ended successfully");
        return Output ;
    } catch (error) {
        console.log(error);
        console.log("Count sort by digit ended with error");
    }
}


       const clearAllArray = () => {

       inputArray.forEach(e => e.clearRect({ rect: true, cont: true , ind: true }));
       updateArray.forEach(e => e.clearRect({ rect: true, cont: true , ind: true }));
       updatedArray.forEach(e => e.clearRect({ rect: true, cont: true , ind: true }));
       outputArray.forEach(e => e.clearRect({ rect: true, cont: true , ind: true }));
       title.map( (e) => remove(e) );
       Rect.boxes = [];
       title =[] ;
       }

        const execute = async () =>{
        
              canvas.drawYPos += canvas.rectHeight * 2.5;
              canvas.currentDevice.UserLength = await waitForLength({ canvas , methodName : "Radix Sort" , umin : -1 , umax : -2 , Y : 0.5 , canvasDimensionaChange : false });

              Input = await Rect.drawArray({ canvasHandler: canvas, array:[], cont: true, indexs: true, popover: true, type: "array" , purpose: "input" });

              const pos = canvas.drawYPos ;
              if (canvas.abort) return;
        
              Rect.boxes.forEach(e => e.clearRect({ rect: true, cont: true , ind: true }));
              Rect.boxes = [];

              const max = Math.max(...Input);
              
              for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
                  if (canvas.abort) return;
                  Input = await CountSortByDigit( Input, exp );
                  await canvas.delay({ time: 1000 });
               
                  if (Math.floor(max / (exp * 10)) > 0) {
                  clearAllArray();
                 
                  }
                  canvas.drawYPos = pos ;
                  if (canvas.abort) return;
              }

        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth * 0.35  , y : centerY /2 , colorCode : 2 , textContent : "Radix Sort"  });
              
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


      console.log("Radix sort ended successfully");
    } catch (error) {
        console.log(error);
    }
}