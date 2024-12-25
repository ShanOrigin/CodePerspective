import { Rect ,Arrow , Comparator}  from '../../../../../Source/Components/Components.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove, createButton } from '../../../../../Source/Utilities/utilities.js';

export async function ReverseArray({ canvas }) {
   try {

        let tempArray1 = [];
        let array  , cnt = 0 ,t1 , arrayTitle ;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const initialize = async () => {
        canvas.drawYPos += canvas.rectHeight * 3 ;

        const n0 = canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : - 1  });
        array = new Array( n0 ).fill(0);
   
        array = await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array", purpose: "input" });
        if (canvas.abort) return;
        drawText({ canvas, text: "Original Array", x: centerX  ,  y: canvas.drawYPos + canvas.rectHeight * 1.5 , Return: true , fontSize: 1.1 , color: "#46099c" });

        tempArray1 = Rect.boxes;
        Rect.boxes = [];
 
        }

        let pos ;
        const reverseArray = async () => {

        let start = 0, end = array.length - 1;

        canvas.drawYPos += canvas.rectHeight * 3 ; 
        pos = canvas.drawYPos ;
        t1 = drawText({ canvas, text: "Reversing Array...", x: centerX, y: canvas.drawYPos, fontSize:  1 , Return: true ,  color: "blue" });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true , type: "array" });
        arrayTitle = drawText({ canvas, text: "Reverse Array" , x: centerX  ,  y: canvas.drawYPos + canvas.rectHeight * 1.5 , Return: true , fontSize: 1.1 , color: "#46099c" });

        if (canvas.abort) return;

        const arrow1 = new Arrow({ canvasHandler: canvas, cont: "start", color: "red" });
        const arrow2 = new Arrow({ canvasHandler: canvas, cont: "end", color: "green" });

        while (start < end) {
            await arrow1.drawArrow({ rectObj: Rect.boxes[start], fig: true, cont: true, popover: true });
            if (canvas.abort) return;
            await canvas.delay({ time: 200 });

            await arrow2.drawArrow({ rectObj: Rect.boxes[end], fig: true, cont: true, popover: true });
            if (canvas.abort) return;
            await canvas.delay({ time: 1000 });

            const compT = `Swap start = ${array[start]} With end = ${array[end]}\n while start < end ; `;
            const CMP = new Comparator({ rectObj1: Rect.boxes[start], rectObj2: Rect.boxes[end], color: "green", CompText: compT });
            await CMP.drawComp({ fig: true, cont: true, popover: false });

            if (start < end) {
                await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                await Rect.swapping({ rect1: Rect.boxes[start], rect2: Rect.boxes[end] });

                [array[start], array[end]] = [array[end], array[start]];

                if (canvas.abort) return;
                
                await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                await arrow2.ShiftArrow({ steps: 1, direction: "left" });
                if (canvas.abort) return;

                await canvas.delay({ time: 1000 });

                await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                CMP.clearComp({ fig: true, cont: true, dfba: false });

                start++;
                end--;
            }
         
        }
            await arrow1.drawArrow({ rectObj: Rect.boxes[start], fig: true, cont: true, popover: true });
            if (canvas.abort) return;
            await canvas.delay({ time: 200 });

            await arrow2.drawArrow({ rectObj: Rect.boxes[end], fig: true, cont: true, popover: true });
            if (canvas.abort) return;
            await canvas.delay({ time: 1000 });


            const compT = `Don't Swap start = ${start} With end = ${end}\n  start !< end ! Stop ; `;
            const CMP = new Comparator({ rectObj1: Rect.boxes[end], rectObj2: Rect.boxes[start], color: "red", CompText: compT });
            await CMP.drawComp({ fig: true, cont: true, popover: false });

            remove(t1);
            t1 = drawText({ canvas, text: "Array Reversed Successfully", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 2.5 ,  fontSize:  1 , Return: true ,  color: "green" });

            await canvas.delay({ time: 3500 });
                await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                CMP.clearComp({ fig: true, cont: true, dfba: false });

        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;
        let running = false ;
        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth / 2 /2 + canvas.rectWidth * 0.5     , y : centerY /2   , colorCode :0 , textContent:"Reverse Array"  }) 

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

       let t1pos ; 
       const action = async () => {
            try {

              if(!running){
                 toggleMenu(false);
                 await reverseArray();
                 toggleMenu(true);
                 running = true ; 
                 t1pos  = t1.rect.attr("y");
              }else{
                 remove(t1);
                 t1 = drawText({ canvas, text: "Array Is Reversed  Already. \n To continue continue 'Click' Reset Button .", x: centerX, y: t1pos + canvas.rectHeight  , Return: true ,   fontSize: 0.9 ,  color: "red" });
                 await canvas.delay({ time: 2500 });
                 remove(t1);
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
               running = false ;
                array = [] ,  tempArray1 = [] ;
      }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
            
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
           console.log("hi")
          }catch(e){
          console.log(e)
          }
        };

       ( async ()=> {

            await initialize();
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await createButtons( );
            initializeClicks();
            toggleMenu(true);

       })();

    } catch (error) {
        console.log(error);
    } finally {
        console.log("hi am I finally");
    }

}