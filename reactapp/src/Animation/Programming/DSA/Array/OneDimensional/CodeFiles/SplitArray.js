
import { Rect ,Arrow }  from '../../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove, createButton } from '../../../../../Source/Utilities/utilities.js';

export async function SplitArray({ canvas }) {
    try {
        let array, index = 0, Sindex = 0 , t1 ;
        let tempArray1 = [], tempArray2 = [] ;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;

        const takeInputArrays = async () => {
            
            if (canvas.abort) return;

            canvas.drawYPos += canvas.rectHeight * 2.5;

            const n0 = canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : - 2});
            array = new Array(n0).fill(0);

            array = await Rect.drawArray({ canvasHandler: canvas, array, cont: true, indexs: true, popover: true, type: "array", purpose: "input" });
            if (canvas.abort) return;

            tempArray1 = Rect.boxes;
            Rect.boxes = [];
            canvas.drawYPos += canvas.rectHeight * 3;

            const getValidIndex = async () => {

                t1 = drawText({ canvas, text: "Split Index : ", x: centerX * 0.7, y: canvas.drawYPos, Return: true ,  fontSize: 1.1 , color: "#46099c" });
                const g = t1.rect.getBBox();
                const Rectind = new Rect({ canvasHandler: canvas, xposition: g.x + g.width * 1.2 , yposition: g.y - canvas.rectHeight /2 + g.height /2 , content: index, index: -1, color: "#3498db" });

                let isIndexValid = false;
                while (!isIndexValid) {
                    index = await Rectind.inputRect({ rect: true, cont: true, ind: false });
                    if (index >= 0 && index < array.length) {
                        isIndexValid = true;
                    } else {
                        const text =  `Index is Out of Boundary of Array ie Index = ${index}\n Please Enter Again ` ;
                        const t2 = drawText({ canvas, text: text, x: centerX , y: canvas.drawYPos + canvas.rectHeight * 3 , Return: true ,  fontSize: 1.1 , color: "#46099c" });

                        await canvas.delay({ time: 2000 });
                        remove(t2);
                        Rectind.clearRect({ rect: true, cont: true, ind: false });
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
            };

            await getValidIndex();

            const drawSplitArray = async (arr, label) => {
                await Rect.drawArray({ canvasHandler: canvas, array: arr, cont: true, indexs: true, popover: false, type: "array" });
                if (canvas.abort) return;
                drawText({ canvas, text: label , x: centerX  ,  y: canvas.drawYPos + canvas.rectHeight * 1.5 , Return: true , fontSize: 1.1 , color: "#46099c" });
            };

            const arr1 = array.slice(0, index).fill(0);
            const arr2 = array.slice(index).fill(0);

            canvas.drawYPos += canvas.rectHeight * 2.5 ;
            if(index>0)await drawSplitArray(arr1, "Array 1");
            tempArray2 = Rect.boxes;

            Rect.boxes = [];

            canvas.drawYPos += canvas.rectHeight * 3.5;
            await drawSplitArray(arr2, "Array 2");
        };

        const splitArray = async (arr, tempArr, isArr1, col) => {
            const arrow1 = new Arrow({ canvasHandler: canvas, cont: "place", color: "red" });
            const arrow2 = new Arrow({ canvasHandler: canvas, cont: "Element Place", color: "green" });

            for (let i = 0; i < arr.length; i++) {
                arrow2.Atext = `i (${i}) => ( ${ arr[i] } )`;
                arrow1.Atext = `Index( ${ Sindex } )`;

                if (canvas.abort) return;
                await arrow1.drawArrow({ rectObj: tempArray1[Sindex] });
                await canvas.delay({ time: 100 });
                await arrow2.drawArrow({ rectObj: tempArr[i] });
                await canvas.delay({ time: 1000 });

                const tempRect = new Rect({
                    canvasHandler: canvas,
                    xposition: tempArray1[Sindex].rectElement.attr("x"),
                    yposition: tempArray1[Sindex].rectElement.attr("y"),
                    content: tempArray1[Sindex].content,
                    index: Sindex,
                    color: col,
                    popover: true
                });

                await tempRect.drawRect({ rect: true, cont: true, ind: true });
                tempArray1[Sindex].rectElement.attr({ "fill": col });
                await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: tempRect.rectElement.attr("y") + tempRect.rectElement.attr("height")*1.5});

                if( isArr1 ){
                   await tempRect.moveTo({ newX: centerX*0.10, newY: tempRect.rectElement.attr("y") });
                   await tempRect.moveTo({ newX: centerX*0.10, newY: tempArr[i].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                }else{
                   await tempRect.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempRect.rectElement.attr("y") });
                   await tempRect.moveTo({ newX:canvas.canvasWidth - canvas.rectWidth*1.5 , newY: tempArr[i].rectElement.attr("y") - tempRect.rectElement.attr("height")*1.5 });
                }

                await tempRect.moveTo({ newX: tempArr[i].rectElement.attr("x"), newY: tempRect.rectElement.attr("y") });
                await tempRect.moveTo({ newX: tempArr[i].rectElement.attr("x"), newY: tempArr[i].rectElement.attr("y") });

                tempArr[i].clearRect({ rect: true, cont: true, ind: false });
                await canvas.delay({ time: 1000 });

                if (i < arr.length - 1) {
                    arrow2.ShiftArrow({ steps: 0.5, direction: "up" });
                    arrow1.ShiftArrow({ steps: 0.5, direction: "up" });
                    await canvas.delay({ time: 800 });
                    arrow2.ShiftArrow({ steps: 1, direction: "right" });
                    arrow1.ShiftArrow({ steps: 1, direction: "right" });
                    await canvas.delay({ time: 1000 });
                }

                await arrow1.clearArrow({ fig: true, cont: true, dfba: false });
                await arrow2.clearArrow({ fig: true, cont: true, dfba: false });
                Sindex++;
            }
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;
        let running = false ;
        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth / 2 /2 + canvas.rectWidth * 0.5     , y : centerY /2   , colorCode :0 , textContent:"Split Array"  }) 

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

        const split = async () => {
            console.log("running")
            await takeInputArrays();
            await splitArray(array.slice(0, index), tempArray2, true, "#3498db");
            await splitArray(array.slice(index), Rect.boxes, false, "purple");
            running = true
        }

       let  note ; 
       const action = async () => {
            try {
              if(!running){
                 toggleMenu(false);
                 await split();
                 toggleMenu(true);
                 note = drawText({ canvas, text: "Array 1 And Array 2 Is Splited Successfully. \n To continue continue 'Click' Reset Button .", x: centerX, y: t1.rect.attr("y") + canvas.rectHeight * 2   , Return: true ,   fontSize: 0.9 ,  color: "green" });

              }else{
                 note.text.attr({fill : "red"});
                 await canvas.delay({ time: 2500 });        
                 note.text.attr({fill : "green"});
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
               array = [], index = 0 , Sindex = 0 ;
               tempArray1 = [], tempArray2 = [] ;
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

    } catch (error) {
        console.error(error);
    } finally {
        console.log("Finally block executed.");
    }
}