
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas , remove , connect , createButton , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Stack } from '../../../../../Source/Utilities/__Stack__.js' ;

export async function CustomStack({canvas}) {

    try {

        if (canvas.abort) return;
        let stack , stackBox =[] , Stackfig , stackFig , stackData ;
        let n , dis , heightFactor , labelX , instructionsX;
        let capacityLabel , stackSizeLabel , topLabel , instructions ;

        let TOP = -1 , stackSize = 0 , topArrow = null ; 

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        const initialize = async () => {

             drawText({ canvas, text: "Stack Operations ", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true});

             canvas.drawYPos += canvas.rectHeight * 1.5;

             n =  canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0 , umax : 0});

             stack = new Array(n).fill(null);
    
             canvas.drawYPos = canvas.canvasHeight * 0.5
             Stackfig = new Stack({ canvasHandler : canvas , color : "#82f5ff" } ) ;

             stackData = await Stackfig.drawStack({ array : stack , ex : true});
      
             console.table(stackData)
             dis = (stackData[0].rect.rectElement.attr("y") - stackData[1].rect.rectElement.attr("y") )/ canvas.rectHeight ;

             stackFig = Stackfig.stack.getBBox();

             instructionsX = ( canvas.canvasWidth + ( stackFig.x + stackFig.width ) ) / 2 ;
             labelX = stackFig.x + stackFig.width * 1.7  ;

             capacityLabel =  drawText({ canvas, text: "Stack Size = 0", x: labelX ,  y: stackFig.y + stackFig.height - canvas.rectHeight * 0.45 , fontSize: 1 , Return: true ,  color: "blue" });
             capacityLabel.text.attr({text :  "Capacity = "+stack.length });
             heightFactor = capacityLabel.rect.attr("height") * 0.5 ;

             stackSizeLabel =  drawText({ canvas, text: "Stack Size = 0", x: labelX ,  y: capacityLabel.rect.attr("y") - heightFactor , fontSize: 1 , Return: true ,  color: "red" });

             topLabel =  drawText({ canvas, text:  "Stack Size = 0", x: labelX , y: stackSizeLabel.rect.attr("y") - heightFactor , fontSize: 1  , Return: true ,  color: "green" });
             topLabel.text.attr({text :  "Top = -1" });

             instructions = drawText({ canvas, text: "Click Any Stack Operation Button", x: instructionsX ,   y: stackFig.y - heightFactor * 0.5  , fontSize: 1 , Return: true ,  color: "red" });
        }

        const instruction = ( ele , msg , col) =>{
              ele.rect.attr({ fill: col});
              ele.text.attr({ text : msg});
        }
        const Notice = ( notice , font = 1 , color = "white"  ) => {

            const text = drawText({ canvas, text: notice , x: instructionsX ,   y: stackFig.y + heightFactor * 2.5 , fontSize: font , Return: true ,  color: "red" });
            text.rect.attr({fill : color }) ;
            return text ;
        }
        
        const push  = async (  ) => {
              ++TOP;
             
              instructions.text.attr({ text : "Enter Data To Push " });
              const g = instructions.rect.getBBox();

              const tempData = new Rect({ "canvasHandler": canvas  , "xposition": g.cx - canvas.rectWidth /2 , "yposition": g.y - canvas.rectHeight * 1.2 , "content": "" , "index": null , "color": "#3489eb" });
              const data = await tempData.inputRect({"rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [-1000, 1000], "plc": "" , "popoverTextArray": null });

              stack[TOP] = data ;
              stackBox.push(tempData);
              stackSize++ ;
              await canvas.delay({ time: 900 });
              const note = Notice( `Pushing Data ${ data } Into Stack !` , 0.9 , "#6efa9d" ) ;
              await canvas.delay({ time: 900});
              
              instruction(instructions , "Do , ++ Top " , "#4d4dff");
              await canvas.delay({ time: 800 });

              if (TOP >0 && TOP < stack.length  ){
                   await topArrow.ShiftArrow({ "steps": dis  , "direction":"up"  });
                   await canvas.delay({ time: 300});
                   topArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              }

              topArrow = new Arrow({ "canvasHandler": canvas  , "cont": "Top"  , "color": "red" , "direction": "left" });
              topArrow.drawArrow({ "rectObj": stackData[TOP].rect  , "fig": true, "cont": true, "popover": false }) ;

              await canvas.delay({ time: 800 });

              instruction(topLabel , "Top = "+ TOP , "#84eafa");
              await canvas.delay({ time: 800 });

              await tempData.moveTo({ "newX": stackFig.cx - canvas.rectWidth /2 , "newY": tempData.rectElement.attr("y") ,  "ind": false }) ;
              await tempData.moveTo({ "newX": stackData[TOP].rect.rectElement.attr("x"), "newY":  stackData[TOP].rect.rectElement.attr("y") ,  "ind": false }) ;

              await canvas.delay({ time: 800 });
              stackData[TOP].line.attr({stroke:"green"}); 
             
              await canvas.delay({ time: 800 });
              instruction(note ,  " Data Pushed Successfully! " , "#28a745");

              await canvas.delay({ time: 800 });
              topLabel.rect.attr({ fill: "white"});
              stackSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 800 });
              stackSizeLabel.text.attr({text :  "Stack Size = "+stackSize});

              await canvas.delay({ time: 800 });
              stackSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 800 });
        }


        const pop = async () => {

              instructions.text.attr({ text : "Pop Operation " });
              const g = instructions.rect.getBBox();

              await canvas.delay({ time: 900 });
              const note = Notice( `Poping Data At Top ${ TOP  } From Stack !` , 0.9 , "#6efa9d" ) ;
              await canvas.delay({ time: 900});
              stackData[TOP].line.attr({stroke:"red"}); 

              await canvas.delay({ time: 800 });

              await stackBox[TOP].moveTo({ "newX": stackBox[TOP].rectElement.attr("x"), "newY": g.y - canvas.rectHeight * 1.2 ,  "ind": false }) ;
              await stackBox[TOP].moveTo({ "newX":g.cx - canvas.rectWidth /2 ,  "newY": stackBox[TOP].rectElement.attr("y") ,  "ind": false }) ;
 
              await canvas.delay({ time: 800 });
              
              instruction(instructions , "Do , Top-- " , "#4d4dff");
              await canvas.delay({ time: 800 });
              let deleteBox ;
              if (TOP >= 0 && TOP < stack.length  ){
                   await topArrow.ShiftArrow({ "steps": dis  , "direction":"down"  });
                   await canvas.delay({ time: 300});
                   topArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                   stack[TOP] = null;
                   deleteBox = stackBox.splice(TOP,1);
                   TOP--;
                   stackSize-- ;
                   topArrow = new Arrow({ "canvasHandler": canvas  , "cont": "Top"  , "color": "red" , "direction": "left" });
                   if(TOP>=0)topArrow.drawArrow({ "rectObj": stackData[TOP].rect  , "fig": true, "cont": true, "popover": false }) ;
              }
              
              await canvas.delay({ time: 800 });
              instruction(topLabel , "Top = "+ TOP , "#84eafa");

              await canvas.delay({ time: 800 });
              instruction(note ,  " Data Poped Successfully! " , "#28a745");

              await canvas.delay({ time: 800 });
              topLabel.rect.attr({ fill: "white"});
              stackSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 800 });
              stackSizeLabel.text.attr({text :  "Stack Size = "+stackSize });

              await canvas.delay({ time: 800 });
              stackSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 1200 });
              deleteBox[0].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
        }


        const top = async () => {

              instructions.text.attr({ text : "Checking Top Pointer" });
          
              await canvas.delay({ time: 900 });
              const note = Notice( `Top is At Index ${ TOP  } In Stack ` , 0.9 , "#6efa9d" ) ;

            if( TOP >=0 ){
              await canvas.delay({ time: 800 });
              instruction(topLabel , "Top = "+ TOP , "#84eafa");

              await canvas.delay({ time: 800 });
              await topArrow.arrowFig.attr({ fill : "#28a745" });
              const rCol = stackBox[TOP].rectElement.attr("fill");
              await stackBox[TOP].rectElement.attr({ fill : "#28a745" });



              await canvas.delay({ time: 2200 });


              await topArrow.arrowFig.attr({ fill : "red" });
              await stackBox[TOP].rectElement.attr({ fill : rCol });

              await canvas.delay({ time: 800 });
              topLabel.rect.attr({ fill: "white"});
             
            }else{
             await canvas.delay({ time: 2700 });
            }
              remove(note);
              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });

        }

        const isFull = async () => {
              let note ;
              instructions.text.attr({ text : "Checking Stack is Full Or Not " });
              await canvas.delay({ time: 900 });
              if( TOP == stack.length - 1 ){
                 note = Notice( `Stack Is Completely Full` , 0.9 , "#6efa9d" ) ;
              }else{
                 instructions.text.attr({ text : "Stack is Not Full  " });
                 await canvas.delay({ time: 900 });
                 note = Notice( `Stack Still Can Hold ${stack.length - stackSize} Elements` , 0.9 , "#6efa9d" ) ;

              }
              await canvas.delay({ time: 800 });
              stackSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 2200 });

              stackSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
        }



        const isEmpty = async () => {
              let note ;
              instructions.text.attr({ text : "Checking Stack is Empty Or Not " });
              await canvas.delay({ time: 900 });
              if( TOP == - 1 ){
                 note = Notice( `Stack Is Completely Empty ` , 0.9 , "#6efa9d" ) ;
              }else{
                 instructions.text.attr({ text : "Stack is Not Empty !  " });
                 await canvas.delay({ time: 900 });
                 note = Notice( `Stack Still Has ${ stackSize } Elements` , 0.9 , "#6efa9d" ) ;

              }
              await canvas.delay({ time: 800 });
              stackSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 2200 });

              stackSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
        }


// -----------_--------__------------_------_--


        let pushButton  , popButton , topButton , isEmptyButton , isFullButton  ;
        
        function createButtons( ) {
            try {

              isEmptyButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : stackFig.y + stackFig.height - canvas.rectHeight * 0.65 , colorCode : 0 , textContent:"Is Empty" , padding : 9 }) 
              const HF = isEmptyButton.rect.attr("height") * 1.1 ;
              isFullButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : isEmptyButton.rect.attr("y") - HF  , colorCode :1 , textContent:"Is Full" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9}) 

              topButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : isFullButton.rect.attr("y") - HF  , colorCode :2 , textContent:"Top" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

              popButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : topButton.rect.attr("y") - HF , colorCode :3 , textContent:"Pop" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

              pushButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : popButton.rect.attr("y") - HF  , colorCode :4, textContent:"Push" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };


       const toggleMenu = (show ) => {
            try {
              if (show){
                pushButton.enableButton();
                popButton.enableButton();
                isEmptyButton.enableButton();
                isFullButton.enableButton();
                topButton.enableButton();
                canvas.resetButton.enableButton();
                canvas.pauseButton.disableButton();
                canvas.playButton.disableButton();
              }else{
                pushButton.disableButton();
                popButton.disableButton();
                topButton.disableButton();
                isFullButton.disableButton();
                isEmptyButton.disableButton();
             
                canvas.resetButton.disableButton();
                canvas.pauseButton.enableButton();
                canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log( error);
            }
       };
       const manage = async (action) =>{
          toggleMenu(false) ;
          switch (action){
             case "push" :
                if ( TOP < stack.length - 1 ){
                   await  push();
                }else{
                   instructions.text.attr({ text : "Stack is Full ! "  });
                   instructions.rect.attr({ fill: "#4d4dff"});
                   const note = Notice( `Can Not Push Data Into Stack !` , 0.9 , "#6efa9d" ) ;
                   await canvas.delay({ time: 2000 });
                   remove(note);
                }
             break;

             case "pop" :
                if (TOP >= 0 && TOP < stack.length ){
                   await pop();
                }else{
                   instructions.text.attr({ text : "Stack is Empty! "  });
                   instructions.rect.attr({ fill: "#4d4dff"});
                   const note = Notice( `Can Not Pop Data From Stack !` , 0.9 , "#6efa9d" ) ;
                   await canvas.delay({ time: 2000 });
                   remove(note);
                }
             break;

             case "top" :
                await top();
             break;

             case "full":
                await isFull();
             break;

             case "empty":
                await isEmpty();
             break;
          }
          toggleMenu(true) ;

       }

        const initializeClicks = () => {
          try{
           pushButton.addClickAction(()=> manage("push"));
           popButton.addClickAction(()=> manage("pop") );
           topButton.addClickAction(()=> manage("top") );
           isFullButton.addClickAction(()=> manage("full"));
           isEmptyButton.addClickAction(()=> manage("empty") );
          
          }catch(e){
          console.log(e)
          }
        };




        const clearAll = () => {
           canvas.drawYPos = centerY;
           Rect.AllBoxe = [];
           Rect.boxes = [];
           Stack.stackBox = [] ;
          stack = null ; stackBox =[] ;Stackfig.stack = null  ; stackFig = null ;  stackData = []  ;
          n =0 ; dis = 0 ; heightFactor =0 ;  labelX =0 ;  instructionsX =0 ;
          capacityLabel = null ; stackSizeLabel = null ; topLabel = null ; instructions =null ;
          TOP = -1 ; stackSize = 0 ; topArrow = null ; 
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


       ( async () => {
        await initialize();
        canvas.resetButton.addClickAction( menu);
        createButtons();
        canvasFunction( canvas , true);
        toggleMenu(true);
        initializeClicks();

       })();


    } catch (e) {

        console.log(e);

    }



}