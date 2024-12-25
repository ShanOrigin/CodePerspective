
import { Rect ,Arrow }  from '../../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

export async function InsertionArray({ canvas }) {
    try {
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let array , range , orderToUser = null  , indexBox = null  , valueBox = null , orderRectText = null , insertIndex = null , textNotify = null , index  ;

        const initialize = async () => {

            drawText({ canvas, text: "Insertion In Array", x: centerX, y: centerY / 2, fontSize: 1.1 , Return: true, color: "#46099c" });
            canvas.drawYPos += canvas.rectHeight * 3 ;

            canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : -1 });
            array = new Array(canvas.currentDevice.UserLength ).fill(null) ;

            await Rect.drawArray({ canvasHandler: canvas, array: array , cont: true, indexs: true, popover: true });

            const lenText =  drawText({ canvas, text: "Enter Length To fill Array UpTo ?", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 2.5, fontSize: 1.1 , Return: true, color: "#46099c" });
            const g = lenText.rect.getBBox();

            const tempRect = new Rect({ canvasHandler: canvas, xposition: g.x + g.width /2 - canvas.rectWidth /2   , yposition:  g.y + g.height * 1.5  , content: "", index: -1, color: "#3498db" });
            canvas.currentDevice.UserLength =  await tempRect.inputRect({ rect: true, cont: true, ind: false, popover: false, inputType: "number", Range: [1, canvas.currentDevice.UserLength], plc: "Len", popoverTextArray: null });

            tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

            remove(lenText);

            const arrow = new Arrow({ canvasHandler: canvas, cont: "Fill Value", color: "red", direction: "up" });

            for (let i = 0 ; i < canvas.currentDevice.UserLength ; i++ ){
               await arrow.drawArrow({ rectObj: Rect.boxes[i], fig: true, cont: true, popover: true });
               const g = Rect.boxes[i].rectElement.getBBox();
               const tempRect = new Rect({ canvasHandler: canvas, xposition: g.x , yposition:  g.y , content: "", index: -1, color: "#3498db" });
               const data =  await tempRect.inputRect({ rect: true, cont: true, ind: false, popover: false, inputType: "number", Range: [-1000, 1000], plc: "i", popoverTextArray: null });
               array[i] = data ;
               Rect.boxes[i].textElement.attr({ text: data });
               tempRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
               arrow.clearArrow({ fig: true, cont: true, dfba: false });
            }

            for (let j = 0; j < array.length; j++) {
                if (canvas.abort) return;
                if (array[j] === null) {
                    range = j;
                    break;
                }
            }

            if (canvas.abort) return;
        }

        const insertElementFn = async () => {

            let isIndexValid = false;
            orderRectText = drawText({ canvas, text: "Index --> Element", x: centerX  , y: canvas.drawYPos + canvas.rectHeight * 6 , Return: true, fontSize: 1, color: "blue" });
            const g = orderRectText.rect.getBBox();
            indexBox = new Rect({ canvasHandler: canvas, xposition: g.x, yposition: g.y + g.height * 1.3 , content: index, index: -1, color: "#3498db" });

            while (!isIndexValid) {
                index = await indexBox.inputRect({ rect: true, cont: true, ind: false });
                if (index >= 0 && index < array.length) {
                    isIndexValid = true;
                } else {
                    const t2 = drawText({ canvas, text: `Index is Out of Boundary of Array ie Index = ${index}\n Please Enter Again`, x: canvas.canvasWidth / 2, y: canvas.drawYPos + canvas.rectHeight * 2.5 , Return: true, fontSize: 0.95, color: "red" });
                    await canvas.delay({ time: 2000 });
                    remove(t2);
                    await indexBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            valueBox = new Rect({ canvasHandler: canvas, xposition: g.x + g.width - canvas.rectWidth, yposition: g.y + g.height * 1.3 , content: "", index: -1, color: "#3498db" });
            const element = await valueBox.inputRect({ rect: true, cont: true, ind: false });

            await canvas.delay({ time: 700 });

            textNotify = drawText({ canvas, text: `Let's Insert ${element} In Array`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5  , fontSize: 1.1, Return: true ,  color: "red" });
            insertIndex = new Arrow({ canvasHandler: canvas, cont: "insert index", color: "red", direction: "down" });
            const currentIndex = new Arrow({ canvasHandler: canvas, cont: "i", color: "green" });
            const place = new Arrow({ canvasHandler: canvas, cont: "place", color: "blue" });

            await insertIndex.drawArrow({ rectObj: Rect.boxes[index], fig: true, cont: true, popover: false });
            await canvas.delay({ time: 900 });
            if (array[index] != null ){
    
            for (let i = range - 1; i >= index; i--) {
                if (canvas.abort) return;

                await currentIndex.drawArrow({ rectObj: Rect.boxes[i], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 500 });

                place.Atext = `place ${array[i]} here`;
                await place.drawArrow({ rectObj: Rect.boxes[i + 1], fig: true, cont: true, popover: true });
                await canvas.delay({ time: 100 });

                await Rect.Shifter({ rect1: Rect.boxes[i], rect2: Rect.boxes[i + 1], where: "right" });

                array[i + 1] = array[i];

                if (i > index) {
                    await currentIndex.ShiftArrow({ steps: 0.5, direction: "up" });
                    await currentIndex.ShiftArrow({ steps: 1, direction: "left" });
                    await canvas.delay({ time: 1500 });

                    await place.ShiftArrow({ steps: 0.5, direction: "up" });
                    await place.ShiftArrow({ steps: 1, direction: "left" });
                }
                await canvas.delay({ time: 500 });
                currentIndex.clearArrow({ fig: true, cont: true, dfba: false });
                place.clearArrow({ fig: true, cont: true, dfba: false });
            }
            }
            range++;
            await canvas.delay({ time: 300 });

            await valueBox.moveTo({ newX: canvas.canvasWidth - canvas.rectWidth * 1.5 , newY: valueBox.rectElement.attr("y") });
            await valueBox.moveTo({ newX: valueBox.rectElement.attr("x"), newY: Rect.boxes[index].rectElement.attr("y") + canvas.rectHeight * 1.5 });
            await valueBox.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: Rect.boxes[index].rectElement.attr("y") + canvas.rectHeight * 1.5 });
            await valueBox.moveTo({ newX: Rect.boxes[index].rectElement.attr("x"), newY: Rect.boxes[index].rectElement.attr("y") });

            const replaceRect = new Rect({ canvasHandler: canvas, xposition: Rect.boxes[index].rectElement.attr("x"), yposition: Rect.boxes[index].rectElement.attr("y"), content: element, index: index, color: Rect.boxes[index].rectElement.attr("fill") });
            await replaceRect.drawRect({ rect: true, cont: true, ind: true, popover: true });

            Rect.boxes[index].clearRect({ rect: true, cont: true, ind: false, dfba: false });
            Rect.boxes[index] = replaceRect;
            array[index] = element;

            remove(textNotify);
            textNotify = drawText({ canvas, text: `New Value ${element} Inserted Successfully At Index ${index}`, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5  , fontSize: 1.1, Return: true ,  color: "red" });

            valueBox.clearRect({ rect: true, cont: true, ind: false, dfba: false });
        };

        const insertElement = async () => {
            try {
        
                if (array.includes(null)) {
                    await insertElementFn();
                    await canvas.delay({ time: 3000 });
                    
                    await indexBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    insertIndex.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                    remove(orderRectText); 
                    remove(textNotify);
                } else {
                    const textD = `Can Not Insert In To  Array \n First you Need To Do Atleast One Array Element Empty\n Other Wise You Will Loose Array Data  \n Which Should be Right Side Of Where You Want To Insert \n To Make One Element Empty In Array \n Click 'Make Empty' Button To Proceed `
 
                    drawText({ canvas, text: textD , x: canvas.canvasWidth / 2, y: canvas.drawYPos + canvas.rectHeight * 4.5,   fontSize: 0.95, color: "red" });
                    await canvas.delay({ time: 5000 });
                    drawText({ canvas, clear : true });
                }
            } catch (e) {
                console.error(e);
            }
        };

        let count = 0 ;
        const makeEmpty = async () => {
            try {
            
                if (( !array.includes(null) || array.includes(null) )&& range > 0 ) {
                    count++;
                    const t2 = drawText({ canvas, text: `You Will Lose Array Data Which Is ${array[range - 1]}\nNote: Save the data if important.\nAre you sure?`, x: canvas.canvasWidth / 2, y: canvas.drawYPos + canvas.rectHeight * 3.5, Return: true ,  fontSize: 0.95, color: "red" });
                    const  g = t2.rect.getBBox();


                    const yes = createButton({ canvas, x : g.x + g.width /2 /2 - canvas.rectWidth /2   , y : g.y + g.height * 1.5    , colorCode :0 , textContent:"yes"  , padding: 12}) 
                    const no = createButton({ canvas, x : g.x + g.width * 0.75  - canvas.rectWidth /2 , y : g.y + g.height * 1.5   , colorCode :1 , textContent:"no" , maxWidth: yes.rect.attr("width") }) 

                    const clearAllMash = async () => {
                        remove(t2); 
                        remove(yes); 
                        remove(no);
                    };

                    const yesOption = async () => {
                    
                        if(!array.includes(null) || array.includes(null)){
                             array[range - 1] = null;
                        }
                        Rect.boxes[range - 1].textElement.attr({ text: "null" });
                        await clearAllMash();
                        range--;
                    };

                    const noOption = async () => {
                        await clearAllMash();
                      
                    };
                    await yes.addClickAction( () => {
                    yesOption();
                    toggleMenu(true );
                    });

                    await no.addClickAction( () => {
                    noOption();
                    toggleMenu(true );
                    });
               
                }else{
                    const textD = `Array Is already Empty  \n You can Insert Element in Array ` ;
                    drawText({ canvas, text: textD , x: canvas.canvasWidth / 2, y: canvas.drawYPos + canvas.rectHeight * 4.5,   fontSize: 0.95, color: "red" });
                    await canvas.delay({ time: 5000 });
                    drawText({ canvas, clear : true });
                    toggleMenu(true );
                }
            } catch (e) {
                console.error(e);
            }
        };


//-_-------_--------_------_-------_--------_---------_

        let insertButton  , emptyButton ;
        
        function createButtons( ) {
            try {

              emptyButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.8   , colorCode :1 , textContent:"Make Empty" , padding : 7 }) 

              insertButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 2.5   , colorCode :4 , textContent:"Insert" , maxWidth: emptyButton.rect.attr("width") , padding : 7 }) 

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

        function toggleMenu(show , action = { I:true , E: true }) {
            try {
              if (show){
              if(action.I) insertButton.enableButton() 
              if(action.E) emptyButton.enableButton();
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              insertButton.disableButton();
              emptyButton.disableButton();
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
               if (task == "I" ){
            
                 await insertElement();
                 toggleMenu(true );
               }if ( task == "E"){
                 
                  await makeEmpty();

               }

            } catch (error) {
               console.log("Error in action:", error);
            
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
           insertButton.addClickAction(()=> action("I"));
           emptyButton.addClickAction(()=> action("E"));
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
        return;
    } finally {
        console.log("Execution finished");
    }
}