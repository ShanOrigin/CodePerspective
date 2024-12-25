
import { Rect ,Arrow }  from '../../../../../Source/Components/Component.js'
// Helper function to draw text on the canvas and get Address of Object
import { drawText, getAddress, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../../../Source/Utilities/utilities.js';

// Main function to visualize the creation of an array
export async function CreationArray({ canvas }) {
    let tempArray = [] , tempArray1 = [] ;
  
    try {
      const centerX = canvas.canvasWidth /2  , centerY = canvas.drawYPos ;
      if (canvas.abort) return;
        
      let len = canvas.currentDevice.UserLength;
      const buttonsArray = [] ;
      let array ;

      const initialize = async () => {

        len = canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0, umax : -1 });

        array = new Array(len).fill(null);

        canvas.drawXPos = (canvas.canvasWidth - (len * canvas.nextPos)) / 2;
        canvas.drawYPos += canvas.rectHeight * 4;
        const b =  createButton({ canvas, x : 100 , y : canvas.drawYPos   , colorCode : 2 , textContent : "N"  });
        const g = b.rect.getBBox();

        remove(b);
        drawText({ canvas, text: "Generally, In Array we Assign index to contiguous Array \n For proper referenceing ", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 1.5 , Return: true , fontSize: 0.81, color: "#46099c" , padding: 9});
        canvas.drawYPos += canvas.rectHeight ;

        for (let j =0 ; j < len ; j++){
    
           const xx = canvas.drawXPos + canvas.nextPos * j ; 

           const r = new Rect({ "canvasHandler": canvas  , "xposition": xx  , "yposition": canvas.drawYPos  , "content": "" , "index": j  });
           r.drawRect({ "rect": true ,  "cont": true ,  "ind": true ,  "popover": true ,  "popoverTextArray": null });
           tempArray.push(r);
           const b =  createButton({ canvas, x : xx  , y : canvas.drawYPos   , colorCode : 2 , textContent : "0"   });
           b.rect.attr({width : canvas.rectWidth  , height : canvas.rectHeight});
           b.text.attr({ x : b.rect.attr("x") + canvas.rectWidth /2  , y:b.rect.attr("y") + canvas.rectHeight /2 });
           Rect.boxes.push(b);
        }

       const notice =  drawText({ canvas, text: "Click Any Box to Fill value", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 1.5 , Return: true , fontSize: 1.1, color: "#46099c" , padding: 9});

        let valid = true ;
        Rect.boxes.forEach( (button , i )=> {

          if(button) button.addClickAction( async () => {

           if (valid ){

               const arrow = new Arrow({ "canvasHandler": canvas, "cont": `Array [ ${ i } ]`, "color": "green", "direction": "up" });
               await arrow.drawArrow({ "rectObj": tempArray[i], "fig": true, "cont": true, "popover": true });

               valid = false ;
               notice.text.attr({ text: `Array [ ${ i } ] = ?` , fill:"green" });
               const rect = new Rect({ "canvasHandler": canvas , "xposition": button.rect.attr("x")  , "yposition": canvas.drawYPos , "content": "" , "index": i  });
               const data = await rect.inputRect({"rect": true ,  "cont": true , "ind": true ,  "popover": true , "inputType": "number", "Range": [-1000, 1000], "plc": "0" , "popoverTextArray": null });
               valid = true ;

               remove(button);
               
               tempArray[i].clearRect({ "rect": true, "cont": true, "ind": true , "dfba": false });
               const clearArrowPara = { "fig": true, "cont": true, "dfba": false } ;
               await arrow.clearArrow(clearArrowPara);
               array[i] = data ; 
               Rect.boxes.splice(i , 1 , rect);
               
               notice.text.attr({ text: `Click Any Box to Fill value` , fill: "#46099c"  });

               if (!array.includes(null)){
                  remove(notice);
                  
                  tempArray1 = Rect.boxes;
                  await createButtons( );
                  initializeClicks();
                  toggleMenu(true);
                  canvas.pauseButton.disableButton();
                  canvas.playButton.disableButton();
                  canvasFunction( canvas , true);
                  canvas.resetButton.addClickAction( menu);
               }
           }
           button.enableButton();
        });
      
        });
      };

 //-_-------_--------_------_-------_--------_---------_

        let accessButton  , ModifyButton ;
        const startButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25, y :canvas.canvasHeight - canvas.rectHeight * 3.2  , colorCode :0 , textContent:"create Array" , padding : 7 }) 

        function createButtons( ) {
            try {
              accessButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 2.5   , colorCode :0 , textContent:"Access" , padding : 7 }) 

              ModifyButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.8   , colorCode :0 , textContent:"Modify" , padding : 7 }) 

              
            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

        function toggleMenu(show , action = { M:true , A: true }) {
            try {
              if (show){
              if(action.M) ModifyButton.enableButton() 
              if(action.A) accessButton.enableButton();
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              ModifyButton.disableButton();
              accessButton.disableButton();
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };
       let count = true ;
       async function action(task){
            try {
                 toggleMenu(false);
               if (task == "A" ){
                 await AccessElement();
                 toggleMenu(true , { M:false, A: true} );
               }else{
                  await ModifyElement();
                 toggleMenu(true , { A: false , M: true} );
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
               tempArray1 = [] ; tempArray = [] ;
               array = [] ;
        }

        async function  menu() {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               count = true;
               clearAll();

               const startButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 3.2 , colorCode :0 , textContent:"create Array" , padding : 7 }) 

               startButton.addClickAction( ()=>{
                   initialize();
                   remove(startButton) ;
               });

               await createButtons();
               toggleMenu(false);
               canvas.pauseButton.disableButton();
               canvas.playButton.disableButton();
               initializeClicks();
             } catch (error) {
                console.error( error);
             }
        };

        function initializeClicks() {
          try{
           accessButton.addClickAction(()=> action("A"));
           ModifyButton.addClickAction(()=> action("M"));
          }catch(e){
          console.log(e)
          }
        };

       async function showPopOver(element, type = "up") {
         try{

           // Programmatically trigger the click event
           const clickEvent = new MouseEvent('click', {
                 view: window,
                 bubbles: true,
                 cancelable: true
           });
           element.indexTextElement.node.dispatchEvent(clickEvent);

           await canvas.delay({"time":1000});
           element.textElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":2000});
           element.rectElement.node.dispatchEvent(clickEvent);

           await canvas.delay({"time":5000});
 
           element.indexTextElement.node.dispatchEvent(clickEvent);

           await canvas.delay({"time":1000});
           element.textElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":2000});
           element.rectElement.node.dispatchEvent(clickEvent);

         }catch(e){
         console.error(e);
         }
       }

       let controFlag = false  , orderToUser = null  , indexBox = null  , index , arrow ;

       async function AccessElement(){
          try{
            if (!controFlag){

                orderToUser  = drawText({ canvas, text: "Enter Index To Access \n Array Element. Of Range { 0 - " + (array.length - 1) + " }", x: centerX / 2, y: canvas.canvasHeight - canvas.rectHeight * 3.5 , Return: true  ,  fontSize: 0.85, color: "#46099c" });
                const g = orderToUser.rect.getBBox();
                indexBox = new Rect({ "canvasHandler": canvas, "xposition":  g.x + g.width /2  - canvas.rectWidth /2 , "yposition": g.y + g.height * 1.5 ,  "content": "", "index": "", "color": "#3498db" });
                index = await indexBox.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [0, array.length - 1], "plc": "i", "popoverTextArray": null });

                arrow = new Arrow({ "canvasHandler": canvas, "cont": `Array [ ${ index } ]`, "color": "green", "direction": "up" });
                await arrow.drawArrow({ "rectObj": tempArray1[index], "fig": true, "cont": true, "popover": true });

                await tempArray1[index].moveTo({ "newX": centerX - canvas.rectWidth / 2, "newY": canvas.drawYPos + canvas.rectHeight * 3.5 , "ind": true });

                await showPopOver(tempArray1[index], "up");
                controFlag = ! controFlag ;
                
             }
             else{
               
                await tempArray1[index].moveTo({ "newX":index !=0 ? tempArray1[ index-1].rectElement.attr("x")+ canvas.nextPos : tempArray1[ index+1].rectElement.attr("x") - canvas.nextPos , "newY": index !=0 ?  tempArray1[index-1].rectElement.attr("y") : tempArray1[ index+1].rectElement.attr("y")  ,  "ind": true });
                await indexBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                const clearArrowPara = { "fig": true, "cont": true, "dfba": false } ;
                await arrow.clearArrow(clearArrowPara);
                remove(orderToUser) ;

                toggleMenu(true );
                controFlag = ! controFlag ;
             }

            }catch(e){
             console.error(e);
            }
        }

        async function  ModifyElement(){
           try {
    
            if (!controFlag) {
                     
                orderToUser  = drawText({ canvas, text: "Enter Index To Modify \n Array Element. Of Range { 0 - " + (array.length - 1) + " }", x: centerX / 2, y: canvas.canvasHeight - canvas.rectHeight * 3.5 , Return: true  ,  fontSize: 0.85, color: "#46099c" });
                const g = orderToUser.rect.getBBox();
                indexBox = new Rect({ "canvasHandler": canvas, "xposition":  g.x + g.width /2  - canvas.rectWidth /2 , "yposition": g.y + g.height * 1.5 ,  "content": "", "index": "", "color": "#3498db" });
                index = await indexBox.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [0, array.length - 1], "plc": "i", "popoverTextArray": null });

                arrow = new Arrow({ "canvasHandler": canvas, "cont": `Array [ ${ index} ]`, "color": "green", "direction": "up" });
                await arrow.drawArrow({ "rectObj": tempArray1[index], "fig": true, "cont": true, "popover": true });

                await tempArray1[index].moveTo({ "newX": centerX - canvas.rectWidth / 2, "newY": canvas.drawYPos + canvas.rectHeight * 3.5 , "ind": true });

                const orderToUser1 = drawText({ canvas, text: "Enter New Element  ", x: tempArray1[index].rectElement.attr("x") + tempArray1[index].rectElement.attr("width") / 2, y: tempArray1[index].rectElement.attr("y") + tempArray1[index].rectElement.attr("height") *1.45 , Return: true , fontSize: 0.85, color: "#46099c" });
                const newElement = new Rect({ "canvasHandler": canvas, "xposition": tempArray1[index].rectElement.attr("x"), "yposition": tempArray1[index].rectElement.attr("y"), "content": "", "index": "", "color": "#3498db" });
                const newElementValue = await newElement.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [-1000 , 1000], "plc": "i", "popoverTextArray": null });
                await newElement.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
   
                remove(orderToUser1);
                
                array[index] = newElementValue;

                tempArray1[index].textElement.attr({ "text": newElementValue });
                tempArray1[index].popoverRect[3].attr({ text: `Index = ${ index } , Value = ${newElementValue}` });
                tempArray1[index].popoverText[3].attr({ text: `My Data Value = ${newElementValue}` });

                controFlag = !controFlag;
                
            } else {

                await tempArray1[index].moveTo({ "newX":index !=0 ? tempArray1[ index-1].rectElement.attr("x")+ canvas.nextPos : tempArray1[ index+1].rectElement.attr("x") - canvas.nextPos , "newY": index !=0 ?  tempArray1[index-1].rectElement.attr("y") : tempArray1[ index+1].rectElement.attr("y")  ,  "ind": true });
                await indexBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                const clearArrowPara = { "fig": true, "cont": true, "dfba": false } ;
                await arrow.clearArrow(clearArrowPara);
                remove(orderToUser) ;
                
                controFlag = !controFlag;
                toggleMenu(true );
                
            }
 
          } catch (e) {
            console.error(e);
          }
        }

     startButton.addClickAction( ()=>{

      initialize();
      remove(startButton) ;
      
      });

    } catch (error) {
        console.log(error);
        return;
    }
}