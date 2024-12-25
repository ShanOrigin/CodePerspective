import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas , remove , connect , createButton , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Queue } from '../../../../../Source/Utilities/__Queue__.js' ;

export async function Custom({canvas}) {

   try{
    let centerX = canvas.canvasWidth / 2;
    let centerY = canvas.drawYPos; 

    let queue , QueueBox = [] , queueFig , queueData ; 
    let frontArrow , rearArrow  , dis ;
    let n = 0 , Front = -1 , Rear = - 1 , Size = 0 , queueBox = [] ;

    let capacityLabel , queueSizeLabel , frontLabel , rearLabel , instructions;
    let cx ; 

    const initialize = async () => {
       drawText({ canvas, text: "Queue Operations ", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true});

       n =  canvas.currentDevice.UserLength = await waitForLength({canvas , umin: 0 , umax : 0});

       queue = new Array(n).fill(null);
       QueueBox = new Array(n).fill(null);
       queueFig = new Queue({ canvasHandler : canvas , color : "#82f5ff" } ) ;
       queueData = await queueFig.drawQueue(queue);

       dis = (queueData[0].rect.rectElement.attr("x") - queueData[1].rect.rectElement.attr("x") -3 )/ canvas.rectWidth ;

       queueData[0].line.attr({ stroke: "green" });
       frontArrow = new Arrow({ "canvasHandler": canvas , "cont": "Front"  , "color": "green" , "direction": "up" });
       rearArrow = new Arrow({ "canvasHandler": canvas , "cont": "Rear"   , "color": "red" , "direction": "up" });
   }

   const information  = (w) => {
             cx  = ( canvas.canvasWidth - w * 1.25  ) / 2 ;
            
             capacityLabel =  drawText({ canvas, text: "Capacity  = "+queue.length , x: cx +  cx /2 ,  y: canvas.canvasHeight - canvas.rectHeight  , fontSize: 1 , Return: true ,  color: "blue" });
          
             const heightFactor = capacityLabel.rect.attr("height") * 0.5 ;

             queueSizeLabel =  drawText({ canvas, text: "Capacity  = "+queue.length , x: cx +  cx /2 ,  y: capacityLabel.rect.attr("y") - heightFactor, fontSize: 1 , Return: true ,  color: "red" });
             queueSizeLabel.text.attr({text :  "Size = 0 " });

             frontLabel =  drawText({ canvas, text:  "Capacity  = "+queue.length , x: cx /2  , y: queueSizeLabel.rect.attr("y") + queueSizeLabel.rect.attr("height") / 2 , fontSize: 1  , Return: true ,  color: "green" });
             frontLabel.text.attr({text :  "Front = -1 " });

             rearLabel =  drawText({ canvas, text:  "Capacity  = "+queue.length , x: cx /2 , y: capacityLabel.rect.attr("y") + queueSizeLabel.rect.attr("height") / 2 ,  fontSize: 1  , Return: true ,  color: "green" });
             rearLabel.text.attr({text :  "Rear = -1 " });

             instructions = drawText({ canvas, text: "Click Any Queue Operation  To Perform", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 5 ,  fontSize: 1 , Return: true ,  color: "red" });
   }

   const instruction = ( ele , msg , col) =>{
              ele.rect.attr({ fill: col});
              ele.text.attr({ text : msg});
   }


   const inQueue = async () => {
              const color = "#9066e3";
              const process = drawText({ canvas, text: "InQueue Operation Is Going On ", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 , Return: true ,  fontSize: 1 ,  color: "red" });
              process.rect.attr({ fill: "#829dff"});
  
              instruction( instructions  ,"Enter Data To InQueue In Queue", "#90e1e8");

              const g = instructions.rect.getBBox();

              const tempData = new Rect({ "canvasHandler": canvas  , "xposition": g.cx - canvas.rectWidth /2 , "yposition": g.y - canvas.rectHeight * 1.2 , "content": "" , "index": null , "color": "#3489eb" });
              const data = await tempData.inputRect({"rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [-1000, 1000], "plc": "" , "popoverTextArray": null });


              await canvas.delay({ time: 800});
              instruction( instructions  ,"Do , Rear ++", "yellow");


              await canvas.delay({ time: 800});

              if ( Rear < queue.length - 1 ){
                if(Rear >=0 ){
                   await rearArrow.ShiftArrow({ "steps": 0.5  , "direction":"up"  });
                   await rearArrow.ShiftArrow({ "steps": dis  , "direction":"left"  });
                   await canvas.delay({ time: 300});
                   rearArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                }
                if(Rear == -1 ){
                   Front = 0 ;
                   frontArrow.drawArrow({ "rectObj": queueData[0].rect, "fig": true, "cont": true, "popover": true }) ;
                   instruction( frontLabel  ,"Front = "+Front, color );
                   await canvas.delay({ time: 400});
                   frontLabel.rect.attr({fill:"white"});
                }
                Rear++ ;
                Size++;
                queue[Rear] = data ; 
                QueueBox[Rear] = tempData ;
                rearArrow.drawArrow({ "rectObj": queueData[Rear].rect  , "fig": true, "cont": true, "popover": true }) ;
              }

              await tempData.moveTo({ "newX":  canvas.rectWidth /2   , "newY": tempData.rectElement.attr("y") ,  "ind": false }) ;
              await tempData.moveTo({ "newX": canvas.rectWidth /2   , "newY":  queueData[queueData.length-2].rect.rectElement.attr("y") ,  "ind": false }) ;
              await canvas.delay({ time: 300});
              await tempData.moveTo({ "newX": queueData[Rear].rect.rectElement.attr("x")  , "newY":  tempData.rectElement.attr("y") ,  "ind": false }) ;

              await canvas.delay({ time: 800});
              remove( process );
              const note = drawText({ canvas, text: "Data InQueueed Successfully in Queue", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "red" });
              note.rect.attr({fill:"#72cf73"});

              await canvas.delay({ time: 900});
              instruction( rearLabel  ,"Rear = "+Rear, color );
              await canvas.delay({ time: 950});
              rearLabel.rect.attr({fill:"white"});
              instruction( queueSizeLabel  ,"Size = "+Size, color );

              await canvas.delay({ time: 800});
              queueSizeLabel.rect.attr({fill:"white"});
              await canvas.delay({ time: 800});
              queueData[Rear+1].line.attr({ stroke: "green" });
              remove(note);
              await canvas.delay({ time: 800});
              instruction( instructions  ,"Click Any Queue Operation  To Perform", "white");

   }


   const deQueue = async () => {

              let text  , col , deleted;
   
              const process= drawText({ canvas, text: "DeQueue Operation Is Going On ", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 , Return: true ,  fontSize: 1 ,  color: "red" });
              process.rect.attr({ fill: "#829dff"});
              instruction( instructions  ,"DeQueued Data Is ", "#90e1e8");

              const g = instructions.rect.getBBox();

              queueData[Front].line.attr({ stroke: "red" });
              await canvas.delay({ time: 600});

              await QueueBox[Front].moveTo({ "newX": canvas.canvasWidth - canvas.rectWidth * 1.5   , "newY": QueueBox[Front].rectElement.attr("y") ,  "ind": false }) ;
              await QueueBox[Front].moveTo({ "newX": canvas.canvasWidth - canvas.rectWidth *1.5 , "newY": g.y - canvas.rectHeight * 1.2 ,  "ind": false }) ;
              await canvas.delay({ time: 300});
              await QueueBox[Front].moveTo({ "newX": g.cx - canvas.rectWidth /2  , "newY": QueueBox[Front].rectElement.attr("y") ,  "ind": false }) ;

              await canvas.delay({ time: 800});

              instruction( instructions  ,"Do , Front ++", "yellow");

              await canvas.delay({ time: 800});

              if ( Front < queue.length ){
                if(Front >=0 ){
                   await frontArrow.ShiftArrow({ "steps": 0.5  , "direction":"up"  });
                   await frontArrow.ShiftArrow({ "steps": dis  , "direction":"left"  });
                   await canvas.delay({ time: 300});
                   frontArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                }
  
                queue[Front] = null; 
                deleted = QueueBox[Front];

                Front++ ;
                Size--;

                if( Front <= Rear ) frontArrow.drawArrow({ "rectObj": queueData[Front].rect  , "fig": true, "cont": true, "popover": true }) ;

              }

              text = "Data DeQueueed Successfully in Queue"
              col = "#72cf73";
              if( Front > Rear ){

                   frontArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                   rearArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                   queueData[Front].line.attr({ stroke: "red" });
                   Front = Rear = -1 ;
                   Size = 0 ;
                   text = "Queue is Completely Empty" ;
                   col = "#ff4242" ;
              }
              await canvas.delay({ time: 800});
              remove( process );
              const note = drawText({ canvas, text: text , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });
              note.rect.attr({fill: col });

              const color = "#9066e3";
              await canvas.delay({ time: 900});
              instruction( frontLabel  ,"Front = "+Front, color);
         
              await canvas.delay({ time: 900});
              frontLabel.rect.attr({fill:"white"});
              if( col == "red" ){
              instruction( rearLabel  ,"Rear = "+Rear, color);
              await canvas.delay({ time: 950});
              rearLabel.rect.attr({fill:"white"});
              }
              await canvas.delay({ time: 950});
              instruction( queueSizeLabel  ,"Size = "+Size, color);

              await canvas.delay({ time: 800});
              queueSizeLabel.rect.attr({fill:"white"});
              await canvas.delay({ time: 800});
  
              remove(note);
              deleted.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

              await canvas.delay({ time: 800});
              instruction( instructions  ,"Click Any Queue Operation  To Perform", "white");

   }

   const rearCheck = async () => {

              instructions.text.attr({ text : "Checking Rear Pointer" });
              instructions.rect.attr({ fill: "#b7ebe9"});

              await canvas.delay({ time: 900 });
              const note = drawText({ canvas, text: `Rear is At Index ${ Rear  } In Queue` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });

              await canvas.delay({ time: 900});
              instruction( rearLabel  ,"Rear = "+Rear, "#9066e3");

              if( Rear >=0 ){

                 await canvas.delay({ time: 800 });
                 const rCol = QueueBox[Rear].rectElement.attr("fill");
                 await QueueBox[Rear].rectElement.attr({ fill : "red" });

                 await canvas.delay({ time: 2200 });
                 await QueueBox[Rear].rectElement.attr({ fill : rCol });
              
             
              }else{
                 await canvas.delay({ time: 2700 });
              }

              await canvas.delay({ time: 950});
              rearLabel.rect.attr({fill:"white"});

              remove(note);
              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
   }

   const frontCheck = async () => {
              instructions.text.attr({ text : "Checking Front Pointer" });
              instructions.rect.attr({ fill: "#b7ebe9"});
              await canvas.delay({ time: 900 });
              const note = drawText({ canvas, text: `Front is At Index ${ Front  } In Queue` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });

              await canvas.delay({ time: 900});
              instruction( frontLabel  ,"Front = "+Front, "#9066e3");

              if( Rear >=0 ){
                 await canvas.delay({ time: 800 });
                 const rCol = QueueBox[Front].rectElement.attr("fill");
                 await QueueBox[Front].rectElement.attr({ fill : "#28a745" });

                 await canvas.delay({ time: 2200 });
                 await QueueBox[Front].rectElement.attr({ fill : rCol });
              }else{
                 await canvas.delay({ time: 2700 });
              }

              await canvas.delay({ time: 950});
              frontLabel.rect.attr({fill:"white"});

              remove(note);
              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
   }

   const isFull = async () => {
              let note ;
              instructions.text.attr({ text : "Checking Queue is Full Or Not " });
              instructions.rect.attr({ fill: "#b7ebe9"});
              await canvas.delay({ time: 900 });
              if( Rear == queue.length - 1 ){
                 note = drawText({ canvas, text: `Queue Is Completely Full` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });
              }else{
                 instructions.text.attr({ text : "Queue is Not Full  " });
                 await canvas.delay({ time: 900 });
                 note = drawText({ canvas, text: `Queue Still Can Hold ${queue.length - (Rear+1)} Elements` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });

              }
              note.rect.attr({ fill: "#ff6969"});

              await canvas.delay({ time: 800 });
              queueSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 2200 });
              queueSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
   }


   const isEmpty = async () => {
              let note ;
              instructions.text.attr({ text : "Checking Queue is Empty Or Not " });
              instructions.rect.attr({ fill: "#b7ebe9"});
              await canvas.delay({ time: 900 });
              if( Front == - 1 && Rear == -1  ){
                 note = drawText({ canvas, text: `Queue Is Completely Empty` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });
              }else{
                 instructions.text.attr({ text : "Queue is Not Empty !  " });
                 await canvas.delay({ time: 900 });
                 note = drawText({ canvas, text: `Queue Still Has ${ Rear - Front + 1 } Elements` , x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 ,  fontSize: 1 , Return: true ,  color: "green" });

              }
              note.rect.attr({ fill: "#ff6969"});

              await canvas.delay({ time: 800 });
              queueSizeLabel.rect.attr({ fill: "#84eafa"});

              await canvas.delay({ time: 2200 });
              queueSizeLabel.rect.attr({ fill: "white"});
              remove(note);

              instruction(instructions , "Click Any Operation Button ", "white");
              await canvas.delay({ time: 400 });
   }


// -----------_--------__------------_------_--


        let inQueueButton  , deQueueButton , frontButton , rearButton , isEmptyButton , isFullButton  ;
        
        function createButtons( ) {
            try {

              isEmptyButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : canvas.canvasHeight - canvas.rectHeight  , colorCode : 0 , textContent:"Is Empty" , padding : 9 }) 
              const HF = isEmptyButton.rect.attr("height") * 1.1 ;
              isFullButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : isEmptyButton.rect.attr("y") - HF  , colorCode :1 , textContent:"Is Full" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9}) 

              rearButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : isFullButton.rect.attr("y") - HF  , colorCode :2 , textContent:"Rear" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

              frontButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : rearButton.rect.attr("y") - HF , colorCode :3 , textContent:"Front" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

              deQueueButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : frontButton.rect.attr("y") - HF  , colorCode :4, textContent:"DeQueue" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

              inQueueButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *1.25  , y : deQueueButton.rect.attr("y") - HF  , colorCode :4, textContent:"InQueue" , maxWidth: isEmptyButton.rect.attr("width") , padding : 9 }) 

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };


       const toggleMenu = (show ) => {
            try {
              if (show){
                rearButton.enableButton();
                frontButton.enableButton();
                isEmptyButton.enableButton();
                isFullButton.enableButton();
                deQueueButton.enableButton();
                inQueueButton.enableButton();
                canvas.resetButton.enableButton();
                canvas.pauseButton.disableButton();
                canvas.playButton.disableButton();
              }else{
                rearButton.disableButton();
                frontButton.disableButton();
                inQueueButton.disableButton();
                deQueueButton.disableButton();
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
             case "inqueue" :
                if ( Rear < queue.length - 1  ){
                   await  inQueue();
                }else{
                   instructions.text.attr({ text : "Queue is Full ! "  });
                   instructions.rect.attr({ fill: "#4d4dff"});
                   const note = drawText({ canvas, text: "Can Not InQueue In Queue", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 , Return : true , fontSize: 1 ,  color: "red" });

                   await canvas.delay({ time: 2000 });
                   remove(note);
                }
             break;

             case "dequeue" :
                if ( Front >= 0 && Front < queue.length  ){
                   await deQueue();
                }else{
                   instructions.text.attr({ text : "Queue is Empty! "  });
                   instructions.rect.attr({ fill: "#4d4dff"});
                   const note = drawText({ canvas, text: "Can Not DeQueue From Queue", x: cx ,   y: canvas.drawYPos +  canvas.rectHeight * 6.5 , Return : true , fontSize: 1 ,  color: "red" });

                   await canvas.delay({ time: 2000 });
                   remove(note);
                }
             break;

             case "front" :
                await frontCheck();
             break;


             case "rear" :
                await rearCheck();
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
           inQueueButton.addClickAction(()=> manage("inqueue"));
           deQueueButton.addClickAction(()=> manage("dequeue") );
           frontButton.addClickAction(()=> manage("front") );
           rearButton.addClickAction(()=> manage("rear") );
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
           queue = [] ; QueueBox = [] ; queueFig = null ; queueData = null ;
           frontArrow =null ; rearArrow = null ;
           Front = -1 ; Rear = - 1 ; Size = 0 ; queueBox = [] ; n = 0 ;
           capacityLabel =null ; queueSizeLabel =null ; frontLabel =null ; rearLabel =null ; instructions = null;
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               clearAll();

               await initialize();
               await createButtons();
               information(isEmptyButton.rect.attr("width"));
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
        information(isEmptyButton.rect.attr("width"));
        canvasFunction( canvas , true);
        toggleMenu(true);
        initializeClicks();

       })();

   }catch(e){
    console.log(e);

 }
}