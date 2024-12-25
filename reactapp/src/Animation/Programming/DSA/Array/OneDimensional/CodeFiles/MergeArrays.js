


import { Rect ,Arrow }  from '../../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove, createButton } from '../../../../../Source/Utilities/utilities.js';


const getLen = async (canvas , factor = 0 ) => {

        if (canvas.currentDevice.device =="mobile"){
    
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 0 + factor });

        }else if(canvas.currentDevice.device =="tablet"){
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 2 + factor});

        }else{
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 2 + factor});

        }
}
export async function MergeArrays({canvas}) {
    try {
        let cnt = 0 , n, arr1 = [] , arr2 = [] , mergedArray =[] , tempArray1 = [], tempArray2 = [] ,  index = 0 , t1 = null   ;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const takeInputArrays =async () => {

        canvas.drawYPos += canvas.rectHeight * 2;

        n = await getLen(canvas);
        arr1 = new Array( n ).fill(0);

        // Draw and get the first array
        arr1 = await Rect.drawArray({ canvasHandler: canvas, array: arr1, cont: true, indexs: true , popover : true, type: "array", purpose: "input", range: [-1000, 1000, 4] , color : "#28a745" });
        if (canvas.abort) return;

        tempArray1 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 2;
        
        drawText({ canvas, text: "Array 1", x: centerX, y:canvas.drawYPos * 0.88, fontSize: 1.1 , Return: true, color: "#46099c" , padding: 8 });

        await canvas.delay({ time: 700 });
        canvas.drawYPos -= canvas.rectHeight * 2.5;
        canvas.drawYPos += canvas.rectHeight * 4;

        n = await getLen(canvas , 1 );

        arr2 = new Array( n ).fill(0);

        drawText({ canvas, text: "Enter Any Integer Values", x: centerX, y:canvas.drawYPos * 0.86, fontSize: 0.9, color: "#46099c" });

        // Draw and get the second array
        arr2 = await Rect.drawArray({ canvasHandler: canvas, array: arr2, cont: true, indexs: true , popover : true, type: "array", purpose: "input", range: [-1000, 1000, 4] , color : "#dc3545" });
        if (canvas.abort) return;

        tempArray2 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 3.5;
       
        drawText({ canvas, clear: true });
        drawText({ canvas, text: "Array 2", x: centerX, y: canvas.drawYPos * 0.8 , fontSize: 1.1 , Return: true ,  color: "#46099c"  , padding: 8 });

        await canvas.delay({ time:700 });
        canvas.drawYPos -= canvas.rectHeight * 3.5;
        canvas.drawYPos += canvas.rectHeight * 2.3;

        // Prepare the merged array

        const len = Array.from(new Set([...arr1, ...arr2])).length;
         mergedArray = new Array(len).fill(null);

        t1 = drawText({ canvas, text: "Let's Concatenate , Generally in Merging  Duplicate are Not Allowed.", x: centerX, y: canvas.drawYPos , Return: true ,  fontSize: 0.9,  color: "blue"  , padding: 9 });

        drawText({ canvas, text: "Let's Merge , Generally in Merging Duplicate are Not Allowed.", x: centerX, y: canvas.canvasHeight - canvas.rectHeight , Return: true ,  fontSize: 0.9 ,  color: "red" });

        canvas.drawYPos += canvas.rectHeight * 2;

        Rect.boxes = [];
        await Rect.drawArray({ canvasHandler: canvas, array: mergedArray,  cont: true, indexs: false , type: "array" });

        if (canvas.abort) return;

        drawText({ canvas, text: "Merge Array", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 1.5 , fontSize: 1.1 , Return: true ,  color: "#46099c" });
        await canvas.delay({ time:700 });

        };

        // Merge the arrays
        let col ;
        const mergeArray = async (arr, tempArray) => {

            const arrow1 = new Arrow({ canvasHandler: canvas, cont: "" , color: "red" });
            const arrow2 = new Arrow({ canvasHandler: canvas, cont: "Place", color: "green" });

            for (let i = 0; i < arr.length; i++) {
                arrow2.Atext = `i (${i}) = ( ${ arr[i] } )`;
                arrow1.Atext = `Index( ${ index } )`;
                col = i % 2 == 0 ?  "red" : "green" ;
                if(i < arr.length - 1) {
                   if(i< mergedArray.length -3 ){
                      await arrow1.drawArrow({ rectObj: Rect.boxes[index], fig: true, cont: true, popover: true });
                      if (canvas.abort) return;
                      await canvas.delay({ time:100 });
                   }
                   await arrow2.drawArrow({ rectObj: tempArray[i], fig: true, cont: true, popover: true });
                   if (canvas.abort) return;
                }

                if (!mergedArray.includes(arr[i])) {

                t1.text.attr({ text: `Set Value of i =  ${ arr[i] }  At Index ${ index } In Merge Array  &&  Index++` , fill : col  });

                await canvas.delay({ time:1000 });

                    const tempRect = new Rect({
                        canvasHandler: canvas,
                        xposition: tempArray[i].rectElement.attr("x"),
                        yposition: tempArray[i].rectElement.attr("y"),
                        content: tempArray[i].content,
                        index: -1,
                        color: tempArray[i].rectElement.attr("fill")
                    });
                    await tempRect.drawRect({ rect: true, cont: true, ind: false });
        
                    await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: tempRect.rectElement.attr("y") + tempRect.rectElement.attr("height")*1.5});

                    if(  i < Math.floor((0 + tempArray.length) / 2)  ){
                       await tempRect.moveTo({ newX: centerX*0.10, newY: tempRect.rectElement.attr("y") });
                       await tempRect.moveTo({ newX: centerX*0.10, newY: Rect.boxes[index].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                    }else{
                       await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                       await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: Rect.boxes[index].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                    }
                    await tempRect.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: Rect.boxes[index].rectElement.attr("y") });

                    await Rect.boxes[index].textElement.attr({ text:  arr[i] }) ; 
                    await Rect.boxes[index].rectElement.attr({fill :tempRect.rectElement.attr("fill") });
                    Rect.boxes[index].content = arr[i] ; 
                    await tempRect.clearRect({ rect: true, cont: true, ind: false, dfba: false });

                    mergedArray[index] = arr[i];
                    index++;

                    if (i < arr.length - 1) {
                        await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                        await canvas.delay({ time:900 });
                      if(i< mergedArray.length -3 ){
                        await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                        await canvas.delay({ time:700});
                      }
                    }
                   await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                   await arrow2.clearArrow({ fig: true, cont: true, dfba: false });

                } else {

                    t1.text.attr({ text :`${arr[i]} Is Already Present In Merged Array, go for Next` , fill: "blue" });

                    await canvas.delay({ time:700 });

                    if (i < arr.length - 1) {
                        await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                    }

                    await canvas.delay({ time:1000 });

                    await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                    await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                }

          }
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;
        let running = false ;
        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth / 2 /2 + canvas.rectWidth * 0.5     , y : centerY /2   , colorCode :0 , textContent:"Merge Of Arrays"  }) 
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

        const Merge = async () => {
            console.log("running")
            await takeInputArrays () ;
            await mergeArray(arr1, tempArray1);
            await mergeArray(arr2, tempArray2);
            t1.text.attr({ text :`Array1 & Array2 Merged Successfully!` , fill: "blue" });

            running = true
        }


       let t1pos ; 
       const action = async () => {
            try {
              if(!running){
                 toggleMenu(false);
                 await Merge();
                 toggleMenu(true);
                 t1pos  = t1.rect.attr("y");
              }else{
                 remove(t1);
                 t1 = drawText({ canvas, text: "Array 1 And Array 2 Is Merged  Already. \n To continue continue 'Click' Reset Button .", x: centerX, y: t1pos + canvas.rectHeight  , Return: true ,   fontSize: 0.9 ,  color: "red" });
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
               arr1 = [] , arr2 = [] , mergedArray =[] , tempArray1 = [], tempArray2 = [] , index = 0 , t1 = null   ;
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
            
               clearAll();

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

            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await createButtons( );
            initializeClicks();
            toggleMenu(true);

       })();

        if (canvas.abort) return;
    } catch (error) {
        console.error(error);
    } 
}






/*


import { Rect ,Arrow }  from '../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove, createButton } from '../../../../Source/Utilities/utilities.js';


const getLen = async (canvas) => {

        if (canvas.currentDevice.device =="mobile"){
    
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 0 });

        }else if(canvas.currentDevice.device =="tablet"){
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 2 });

        }else{
          return canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : 2 });

        }
}
export async function MergeArrays({canvas}) {
    try {
        let cnt = 0 , n, arr1 = [] , arr2 = [] , mergedArray =[] , tempArray1 = [], tempArray2 = [] ,  index = 0 , t1 = null   ;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const takeInputArrays =async () => {

        canvas.drawYPos += canvas.rectHeight * 2;

        n = await getLen(canvas);
        arr1 = new Array( n ).fill(0);

        // Draw and get the first array
        arr1 = await Rect.drawArray({ canvasHandler: canvas, array: arr1, cont: true, indexs: true , popover : true, type: "array", purpose: "input", range: [-1000, 1000, 4] , color : "#28a745" });
        if (canvas.abort) return;

        tempArray1 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 2.5;
        
        drawText({ canvas, text: "Array 1", x: centerX, y:canvas.drawYPos * 0.85 , fontSize: 1.1 , Return: true, color: "#46099c" , padding: 8 });

        await canvas.delay({ time: 700 });
        canvas.drawYPos -= canvas.rectHeight * 2.5;
        canvas.drawYPos += canvas.rectHeight * 4;

        n = await getLen(canvas);

        arr2 = new Array( n ).fill(0);

        drawText({ canvas, text: "Enter Some Duplicate Values From Array1 ", x: centerX, y:canvas.drawYPos * 0.86, fontSize: 0.9, color: "#46099c" });

        // Draw and get the second array
        arr2 = await Rect.drawArray({ canvasHandler: canvas, array: arr2, cont: true, indexs: true , popover : true, type: "array", purpose: "input", range: [-1000, 1000, 4] , color : "#dc3545" });
        if (canvas.abort) return;

        tempArray2 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 3.5;
       
        drawText({ canvas, clear: true });
        drawText({ canvas, text: "Array 2", x: centerX, y: canvas.drawYPos * 0.8 , fontSize: 1.1 , Return: true ,  color: "#46099c"  , padding: 8 });

        await canvas.delay({ time:700 });
        canvas.drawYPos -= canvas.rectHeight * 3.5;
        canvas.drawYPos += canvas.rectHeight * 2.3;

        // Prepare the merged array
        const len = Array.from(new Set([...arr1, ...arr2])).length;
         mergedArray = new Array(len).fill(null)

        t1 = drawText({ canvas, text: "Let's Merge, Generally in Merging Duplicate Not Allowed.", x: centerX, y: canvas.drawYPos , Return: true ,  fontSize: 0.9 ,  color: "red" });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        Rect.boxes = [];
        await Rect.drawArray({ canvasHandler: canvas, array: mergedArray,  cont: true, indexs: false , type: "array" });

        if (canvas.abort) return;

        drawText({ canvas, text: "Merged Array", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 1.5 , fontSize: 1.1 , Return: true ,  color: "#46099c" });
        await canvas.delay({ time:700 });

        };

        // Merge the arrays
        const mergeArray = async (arr, tempArray) => {

            const arrow1 = new Arrow({ canvasHandler: canvas, cont: "Element Place in MA", color: "red" });
            const arrow2 = new Arrow({ canvasHandler: canvas, cont: "Place", color: "green" });

            for (let i = 0; i < arr.length; i++) {
                arrow2.Atext = `Element At(${i})Place`;

                if(i < arr.length - 1) {
                if(i< mergedArray.length -3 ){
                await arrow1.drawArrow({ rectObj: Rect.boxes[index], fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time:100 });
                }
                await arrow2.drawArrow({ rectObj: tempArray[i], fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time:1000 });
                }

                if (!mergedArray.includes(arr[i])) {
                    const tempRect = new Rect({
                        canvasHandler: canvas,
                        xposition: tempArray[i].rectElement.attr("x"),
                        yposition: tempArray[i].rectElement.attr("y"),
                        content: tempArray[i].content,
                        index: -1,
                        color: tempArray[i].rectElement.attr("fill")
                    });
                    await tempRect.drawRect({ rect: true, cont: true, ind: false });
        
                    await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: tempRect.rectElement.attr("y") + tempRect.rectElement.attr("height")*1.5});

                    if(  i < Math.floor((0 + tempArray.length) / 2)  ){
                       await tempRect.moveTo({ newX: centerX*0.10, newY: tempRect.rectElement.attr("y") });
                       await tempRect.moveTo({ newX: centerX*0.10, newY: Rect.boxes[index].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                    }else{
                       await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                       await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: Rect.boxes[index].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                    }
                    await tempRect.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: Rect.boxes[index].rectElement.attr("y") });

                    await Rect.boxes[index].textElement.attr({ text:  arr[i] }) ; 
                    await Rect.boxes[index].rectElement.attr({fill :tempRect.rectElement.attr("fill") });
                    Rect.boxes[index].content = arr[i] ; 
                    await tempRect.clearRect({ rect: true, cont: true, ind: false, dfba: false });

                    mergedArray[index] = arr[i];
                    index++;

                    if (i < arr.length - 1) {
                        await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                        await canvas.delay({ time:900 });
                      if(i< mergedArray.length -3 ){
                        await arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow1.ShiftArrow({ steps: 1, direction: "right" });
                        await canvas.delay({ time:700});
                      }
                    }

                    await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                    await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                } else {

                    t1.text.attr({ text :`${arr[i]} Is Already Present In Merged Array, go for Next` , fill: "blue" });

                    await canvas.delay({ time:700 });

                    if (i < arr.length - 1) {
                        await arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                        await arrow2.ShiftArrow({ steps: 1, direction: "right" });
                    }

                    await canvas.delay({ time:1000 });

                    t1.text.attr({ text :"Let's Merge, Generally in Merging Duplicate Not Allowed." , fill:"red" });

                    await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                    await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                }
            }
        };


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;
        let running = false ;
        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth / 2 /2 + canvas.rectWidth * 0.5     , y : centerY /2   , colorCode :0 , textContent:"Merging Of Arrays" , padding : 9 }) 

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

        const Merge = async () => {
            console.log("running")
            await takeInputArrays () ;
            await mergeArray(arr1, tempArray1);
            await mergeArray(arr2, tempArray2);
            running = true
        }


       let t1pos ; 
       const action = async () => {
            try {
              if(!running){
                 toggleMenu(false);
                 await Merge();
                 toggleMenu(true);
                 t1pos  = t1.rect.attr("y");
              }else{
                 remove(t1);
                 t1 = drawText({ canvas, text: "Array 1 And Array 2 Is Merged Already. \n To continue continue 'Click' Reset Button .", x: centerX, y: t1pos + canvas.rectHeight  , Return: true ,   fontSize: 0.9 ,  color: "red" });
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
               arr1 = [] , arr2 = [] , mergedArray =[] , tempArray1 = [], tempArray2 = [] , index = 0 , t1 = null   ;
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
            
               clearAll();

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

            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await createButtons( );
            initializeClicks();
            toggleMenu(true);

       })();

        if (canvas.abort) return;
    } catch (error) {
        console.error(error);
    } 
}


*/