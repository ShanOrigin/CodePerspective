

import { Rect ,Arrow }  from '../../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove ,  createButton } from '../../../../../Source/Utilities/utilities.js';

export async function DeletionArray({ canvas }) {
    try {
        let array, originalColor = null;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let deleteIndex = null , Rectempty = null , Rectind = null , textNotify = null , textNotifyUser = null , nullSpace   ;

        const initialize = async () =>{

            drawText({ canvas, text: "Deletion In Array", x: centerX, y: centerY / 2, fontSize: 1.1 , Return: true ,  color: "#46099c" });
            canvas.drawYPos += canvas.rectHeight * 3;

            canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : -1 });

            array = await Rect.drawArray({ canvasHandler: canvas, array: array, cont: true, indexs: true, popover: true, purpose: "input" });
            if (canvas.abort) return;

            nullSpace = array.length -1  ;
            originalColor = Rect.boxes[0].rectElement.attr("fill");
        }

        const getDeleteIndex = async () => {

            textNotifyUser = drawText({ canvas, text: "Enter 'index' Delete ", x: centerX * 0.5 , y: canvas.drawYPos + canvas.rectHeight * 5 , Return: true, fontSize: 1.1 , color: "blue" });
            let isIndexValid = false, index;
            const g = textNotifyUser.rect.getBBox();

            while (!isIndexValid) {
                Rectind = new Rect({ canvasHandler: canvas, xposition: g.x + g.width /2 - canvas.rectWidth /2, yposition: g.y + g.height*2, content: index,  index: -1,color: "#3498db" });

                index = await Rectind.inputRect({ rect: true, cont: true, ind: false });
                if (index >= 0 && index <= nullSpace) isIndexValid = true;
                else {
                    const t1 = drawText({ canvas, text: `The Index is Out of Boundary Or Already Null of An Array ie Index = ${index}\nPlease Enter Again Valid Index `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3 , fontSize: 0.95, color: "blue" });
                    await canvas.delay({ time: 1000 }); t1.rect.remove(); t1.text.remove();
                    Rectind.clearRect({ rect: true, cont: true, ind: false, dfba: false });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            return index;
        };

        const deleteElementFn = async (index) => {
            if (canvas.abort) return;
            await canvas.delay({ time: 700 });
            textNotify = drawText({ canvas, text: `Let's Delete In Array At ${index} Element.`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3, fontSize: 1.1 , Return: true,   color: "red" });
            
            deleteIndex = new Arrow({ canvasHandler: canvas, cont: "delete index", color: "red", direction: "down" });
            await deleteIndex.drawArrow({ rectObj: Rect.boxes[index], fig: true, cont: true, popover: true });
            if (canvas.abort) return;
            await canvas.delay({ time: 900 });

            Rectempty = new Rect({ canvasHandler: canvas, xposition: Rect.boxes[index].rectElement.attr("x"), yposition: Rect.boxes[index].rectElement.attr("y"), content: Rect.boxes[index].content, index: Rect.boxes[index].index, color: Rect.boxes[index].rectElement.attr("fill") });
            await Rectempty.drawRect({ rect: true, cont: true, ind: false });
            await Rectempty.moveTo({ newX: Rectind.rectElement.attr("x") + canvas.rectWidth*1.25   , newY: Rectind.rectElement.attr("y")  });

            for (let i = index; i < nullSpace; i++) {
                if (canvas.abort) return;
                const currentIndex = new Arrow({ canvasHandler: canvas, cont: "i", color: "green" });
                await currentIndex.drawArrow({ rectObj: Rect.boxes[i], fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });

                const place = new Arrow({ canvasHandler: canvas, cont: "place", color: "blue" });
                place.Atext = `${array[i + 1]} shift left`;
                await place.drawArrow({ rectObj: Rect.boxes[i + 1], fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time: 100 });

                await Rect.Shifter({ rect1: Rect.boxes[i], rect2: Rect.boxes[i + 1], where: "left" });
                array[i] = array[i + 1];

                if (i < nullSpace - 1) {
                    if (canvas.abort) return;
                    await currentIndex.ShiftArrow({ steps: 0.5, direction: "up" });
                    await currentIndex.ShiftArrow({ steps: 1, direction: "right" });
                    await place.ShiftArrow({ steps: 0.5, direction: "up" });
                    await place.ShiftArrow({ steps: 1, direction: "right" });
                    await canvas.delay({ time: 1500 });
                }
                await currentIndex.clearArrow({ fig: true, cont: true, dfba: false });
                await place.clearArrow({ fig: true, cont: true, dfba: false });
                if (canvas.abort) return;
                await canvas.delay({ time: 500 });
            }

            Rect.boxes[nullSpace].rectElement.attr({ "fill": "#3498db" });
            Rect.boxes[nullSpace].textElement.attr({ "text": "null" });
  
            remove(textNotify);
            textNotify = drawText({ canvas, text: `Element Deleted Successfully At Index ${index} Of Array`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3, fontSize: 1.1 , Return: true,   color: "red" });
            
            if( nullSpace >= 0 )array[nullSpace] = null ;
            nullSpace--;
        };

//---------------

        const manageElements = async (action) => {
       
            if (action === "D") {
                if (nullSpace < 0) {
                    const t2 = drawText({ canvas, text: "Array Is Already Empty Or Null\nPlease Add Some Elements In Array\nTo Add Element Or Proceed\nClick 'Add' Button", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , Return: true ,  fontSize: 1.1, color: "red" });
                    await canvas.delay({ time: 5500 })
                    remove(t2);

                } else {
                    const index = await getDeleteIndex();
                    await deleteElementFn(index);
                    await canvas.delay({ time: 3500 });
            
                    await Rectempty.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    await Rectind.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    deleteIndex.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                    remove(textNotifyUser);
                    remove(textNotify);

                }

            } else if (action === "A") {

               if(nullSpace < array.length -1 ){
                  const genElement = Math.floor(Math.random() * 199) - 99;
                  array[++nullSpace] = genElement;
                  Rect.boxes[nullSpace].rectElement.attr({ "fill": originalColor });
                  Rect.boxes[nullSpace].textElement.attr({ "text": genElement });
                  Rect.boxes[nullSpace].content = genElement ; 
               }else{

                  const text = drawText({ canvas, text: "Array is not Empty \n At least One Element should be Empty ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , Return: true ,  fontSize: 1.1, color: "red" });
                  await canvas.delay({ time: 4500 });
                  remove(text);
 
               }
            }
        };


//-_-------_--------_------_-------_--------_---------_

        let deleteButton  , addButton ;
        
        function createButtons( ) {
            try {

              deleteButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 2.5  , colorCode :4 , textContent:"Delete" , padding : 7 }) 

              addButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.8   , colorCode :1 , textContent:"Add" , maxWidth: deleteButton.rect.attr("width") , padding : 7 }) 

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

        function toggleMenu(show , action = { D:true , A: true }) {
            try {
              if (show){
              if(action.D) deleteButton.enableButton() 
              if(action.A) addButton.enableButton();
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              deleteButton.disableButton();
              addButton.disableButton();
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };
    
       async function action(task){
            try {
                 toggleMenu(false);
             
                 await manageElements(task);
     
               toggleMenu(true );
            } catch (error) {
               console.log("Error in action:", error);
               toggleMenu(true);
            }
        };

        const clearAll = () => {
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [];
               Rect.boxes = [];
               array = [] ;
        }

        async function  menu() {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
           
               clearAll();

               await initialize();
               await createButtons();
               toggleMenu(true);
               canvas.pauseButton.disableButton();
               canvas.playButton.disableButton();
               initializeClicks();

             } catch (error) {
                console.error( error);
             }
        };

        function initializeClicks() {
          try{
           deleteButton.addClickAction(()=> action("D"));
           addButton.addClickAction(()=> action("A"));
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
        console.log("Deletion process completed");
    }
}