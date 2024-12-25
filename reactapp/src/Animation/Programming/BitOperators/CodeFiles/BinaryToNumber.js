
import { Rect, Arrow, Comparator } from '../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../Source/Utilities/utilities.js';

export async function BinaryToNumber({ canvas }) {
    try {
        canvas.fps = 150 ;
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos   ;
        let BitArray , ByteArray , originalWidth , updatedWidth , byteValue , numBox , numValueLable ,  num = 0 , yPos ,  textNotify = [] , rectColor = null , array ;
        const MID_DELAY = 800 ;
        const ByteArrayObj = {} , bitPositionArray = [] ;
        const initialize = async () => {

           drawText({ canvas, text: " Binary To Number ", x: centerX, y: centerY / 2, fontSize: 1 , Return: true , color: "#46099c" });

           originalWidth = canvas.rectWidth ;
       
           const byteBox =new Rect({ "canvasHandler": canvas  , "xposition": centerX - canvas.rectWidth /2 , "yposition": centerY + canvas.rectHeight * 2 , "content": "" , "index": null , "color": "#66deff" });

           textNotify.push( drawText({ canvas, text: " Enter Byte Value Between [ 1 - 4 ] \n 1 Byte = 1 Byte x 8 = 8 Bit ", x: centerX, y: centerY + canvas.rectHeight * 4 , fontSize: 1 , Return: true , color: "#46099c" }) );

           while(1){
              byteValue = await byteBox.inputRect({"rect": true , "cont": true , "ind": false, "popover": false, "inputType": "number", "Range": [ 1 , 99], "plc": "byte" , "popoverTextArray": null });
              if( byteValue <= 4 && byteValue >= 1 ) break; 
              byteBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
           }
    
           remove( textNotify[0] );

           byteBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

           canvas.currentDevice.UserLength = 8 ;

           canvas.drawYPos += canvas.rectHeight * 7;  

           for( let i = byteValue ; i > 0 ; i-- ){
              textNotify =  [] ;
              textNotify.push( drawText({ canvas, text: `Enter 8 bits of ${ i } Byte`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 }) );

              const bits = await Rect.drawArray({ canvasHandler: canvas, array: []  , cont: true, indexs: true ,  popover: true, type: "array", range:[0,1] , purpose: "input" });
              if (canvas.abort) return;
         
              BitArray = Rect.boxes ;
              Rect.boxes = [] ;
              const upWidth = originalWidth * 2.5  ;
              canvas.rectWidth = upWidth ;
              const xPos =  (canvas.canvasWidth -  (  canvas.canvasWidth / byteValue  ) * (i -0.5)) - canvas.rectWidth /2   ;
              const bit  = new Rect({ "canvasHandler": canvas  , "xposition": xPos , "yposition": centerY + canvas.rectHeight * 3 , "content": "" , "index": null , "color": "black" });
              await bit.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

              canvas.rectWidth = originalWidth  ;

            
              for ( let j = 0 ; j < bits.length ; j++){
                 if(byteValue == i )bitPositionArray.push( { x : BitArray[j].rectElement.attr("x") , y: BitArray[j].rectElement.attr("y") } );
                 await BitArray[j].moveTo({ "newX": bit.rectElement.attr("x") + upWidth /2 - canvas.rectWidth /2 , "newY": bit.rectElement.attr("y"),  "ind": true }) ;

                 BitArray[j].clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                 
                 bit.textElement.attr({ text : bit.textElement.attr("text")+bits[j] });
                 await canvas.delay({ time: 300 });
              }

              const label =  drawText({ canvas, text: i+" byte", x: xPos + upWidth /2  , y: bit.rectElement.attr("y") + canvas.rectHeight * 1.5 , fontSize: 1 , Return: true , color: "#46099c" ,  padding : 8 });
              ByteArrayObj[`byte${i}`] = { "bytes":bits , "lable" : bit } ;

              remove( textNotify[0] );
              BitArray = [] ;
           }

        }

        const calculateNumber  = async ( upperBit , lowerBit , bits  ) =>{ 

            let upperB = Math.pow(2 , upperBit * 8 - 1 ) ;
            let lowerB = Math.pow( 2 ,  lowerBit * 8 ) ;
            
            const checkBox = new Rect({ "canvasHandler": canvas  , "xposition": centerX + centerX/2  - canvas.rectWidth /2  , "yposition": canvas.drawYPos +  canvas.rectHeight *3 ,  "content": "" , "index": null , "color": "#F4C430" });
            await checkBox.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });
            checkBox.rectElement.hide();

            if(numValueLable) remove(numValueLable);
            numValueLable = drawText({ canvas, text: num , x: centerX + centerX/2  , y:  canvas.drawYPos + canvas.rectHeight * 3.5 , fontSize: 1 , padding: 16  , Return: true });

            const [ byteArrow , bitArrow , numberArrow ] = [ new Arrow({ "canvasHandler": canvas , "cont": "value"  , "color": "blue" , "direction": "up" }) , new Arrow({ "canvasHandler": canvas , "cont":"bit"   , "color": "green" , "direction": "up" }) , new Arrow({ "canvasHandler": canvas , "cont": "Number"  , "color": "red" , "direction": "up" }) ];

            numberArrow.drawArrow({ "rectObj": checkBox , "fig": true, "cont": true, "popover": true }) ;

            for(let i = 0 ; i < bits.length ; i++){

                bitArrow.drawArrow({ "rectObj": BitArray[i] , "fig": true, "cont": true, "popover": true }) ;

                const [ oX , oY ] = [ ByteArray[i].rectElement.attr("x") , ByteArray[i].rectElement.attr("y")] ;

                await canvas.delay({ time: MID_DELAY });

                await canvas.delay({ time: MID_DELAY });
                let note ;

                if( bits[i] == 1 ){

                  BitArray[i].rectElement.attr({ fill : "#59de78" });
                  await canvas.delay({ time: MID_DELAY });
                  note  = drawText({ canvas, text: `Current Bit is '1' so , \n Add Current Bit Value i.e ( ${ByteArray[i].textElement.attr("text") } ) To Number  ` , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 5.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: 1000 });
               
                  byteArrow.drawArrow({ "rectObj": ByteArray[i] , "fig": true, "cont": true, "popover": true }) ;

                  await canvas.delay({ time: MID_DELAY });

                  await ByteArray[i].moveTo({ "newX": centerX / 2 - canvas.rectWidth /2  , "newY": canvas.drawYPos + canvas.rectHeight * 3 ,   "ind": false }) ;

                  await canvas.delay({ time: 500 });

                  const bitValueLable = drawText({ canvas, text: upperB , x: centerX / 2  , y:  canvas.drawYPos + canvas.rectHeight * 3.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: 1000 });
                  remove(note);
                  const t = ` Adding  ${ upperB  } To  Number \n Number = Number ${ num } + ${ upperB } ` ;
                  note  = drawText({ canvas, text: t  , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 5.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});
                  await canvas.delay({ time: MID_DELAY });
                  remove(numValueLable);

                  num += upperB ;
                  numValueLable = drawText({ canvas, text: num  , x: centerX + centerX/2  , y:  canvas.drawYPos + canvas.rectHeight *3.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  numValueLable.rect.attr({ fill : "#87f1ff" });
                  await canvas.delay({ time: MID_DELAY });

                  numValueLable.rect.attr({ fill : "white"});
                  remove(bitValueLable);
                  byteArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                }else{
                  BitArray[i].rectElement.attr({ fill : "#e84135" });
                  await canvas.delay({ time: MID_DELAY });

                  note  = drawText({ canvas, text: `Current Bit is '0' so , \n Leave Current Bit Value i.e ( ${ByteArray[i].textElement.attr("text") } ) Go On Next Bit  ` , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 5.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: MID_DELAY });
               
                  byteArrow.drawArrow({ "rectObj": ByteArray[i] , "fig": true, "cont": true, "popover": true }) ;

                  await canvas.delay({ time: MID_DELAY });
   
                  byteArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                }
                
                await canvas.delay({ time: 500 });
                remove(note);

                await canvas.delay({ time: MID_DELAY });
                await ByteArray[i].moveTo({ "newX": oX , "newY": oY ,  "ind": false }) ;

               if( i <  bits.length -1 ){
                  const dis = ( BitArray[i+1].rectElement.attr("x") - BitArray[i].rectElement.attr("x") ) / canvas.nextPos ;

                  await canvas.delay({time : MID_DELAY});

                  await  bitArrow.ShiftArrow({ "steps":0.3, "direction": "up" });
                  await  bitArrow.ShiftArrow({ "steps" : dis , "direction": "right" });

                  bitArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
               }

               upperB = Math.floor(upperB/2);
           
            }

          bitArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
          numberArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
          checkBox.clearRect({ "rect": true, "cont": true , "ind": true, "dfba": false }) ;
       
        }   

        async function  drawArray(  byteN  ){

           yPos = canvas.drawYPos ;
      
           const byteArray = { 1 : [ "2⁷","2⁶","2⁵","2⁴","2³","2²","2¹","2⁰"] ,
                   2 : [ "2¹⁵","2¹⁴","2¹³","2¹²","2¹¹","2¹⁰","2⁹","2⁸"] ,
                   3 : [ "2²³","2²²","2²¹","2²⁰","2¹⁹","2¹⁸","2¹⁷","2¹⁶"] , 
                   4 : [ "2³¹","2³⁰","2²⁹","2²⁸","2²⁷","2²⁶","2²⁵","2²⁴"] , 
                 }

           const xPos =  (canvas.canvasWidth -  (  canvas.canvasWidth / byteValue  ) * (byteN -0.5)) - canvas.rectWidth /2   ;

           for( let i = 0 ; i < 8 ; i++ ){
              const bit  = new Rect({ "canvasHandler": canvas  , "xposition": xPos , "yposition": centerY + canvas.rectHeight * 3 , "content": ByteArrayObj[`byte${byteN}`].bytes[i] , "index": null , "color": "black" });
              await bit.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

              await bit.moveTo({ "newX": bitPositionArray[i].x  , "newY": bitPositionArray[i].y ,  "ind": false}) ;

              BitArray.push( bit );

           }
           ByteArrayObj[`byte${byteN}`].lable.rectElement.attr({ fill : "#59de78" });
           textNotify.push( drawText({ canvas, text: `Byte ${ byteN } , 8 bit Array`   , x: centerX, y: canvas.drawYPos + canvas.rectHeight *1.6, fontSize: 1 , Return: true , color: "#46099c" ,  padding : 9 }) );

           canvas.drawYPos += canvas.rectHeight * 4 ;

           await Rect.drawArray({ canvasHandler: canvas, array: byteArray[byteN] , cont: true, indexs: false, popover: true, type: "array", purpose: "print" });
           if (canvas.abort) return;
           rectColor = Rect.boxes[0].rectElement.attr("fill");
           textNotify.push( drawText({ canvas, text: `Byte ${ byteN } Array`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 }) );
           ByteArray = Rect.boxes ;
           Rect.boxes = [] ;

        }

        const execute = async () => {
   
           for( let i = byteValue ; i > 0 ; i--){

             await drawArray( i );
             await calculateNumber( i , i + 1 ,  ByteArrayObj[`byte${i}`].bytes ) ;

             canvas.drawYPos -= canvas.rectHeight * 4  ;

             ByteArray.map( (e) => e.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false }) );
             BitArray.map( (e) => e.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false }) );

             ByteArray = [] ;
             BitArray = [];
             textNotify.forEach( e => remove(e) );
             textNotify = [];
            
           }
                
           await canvas.delay({ time: 500 });
 
           const numberBox = new Rect({ "canvasHandler": canvas  , "xposition": centerX + centerX/2  - canvas.rectWidth /2  , "yposition": canvas.canvasHeight / 2 + canvas.rectHeight * 2 ,  "content": num , "index": null , "color": "red" });

           canvas.rectWidth = canvas.rectWidth *  num.toString().length /3 
           await numberBox.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });
           remove(numValueLable);

           await numberBox.moveTo({ "newX": centerX - canvas.rectWidth /2 , "newY": canvas.canvasHeight / 2 - canvas.rectHeight *2   ,  "ind": false}) ;
           await canvas.delay({ time: 500 });

           canvas.rectWidth = originalWidth ;
             //numBox.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.5   , colorCode :0 , textContent:"Binary To Number" , padding : 10 }) 

            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

       const toggleMenu = (show) => {
            try {
              if (show){
              operationButton.enableButton();

              }else{
              operationButton.disableButton();

              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };
       let count = true ;
       const action = async () => {
            try {
              if(count){
                 count = false;
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              }else{
    
                 let note = drawText({ canvas, text: "wait...", x: centerX, y: canvas.canvasHeight /2 , fontSize: 1 , Return: true , color: "#31b04b" });

                 await canvas.delay({ time: MID_DELAY });
                 remove( note );

                 note = drawText({ canvas, text: "Conversion Completed Successfully \n Please Click 'reset' Button To Restart", x: centerX, y: canvas.canvasHeight /2 , fontSize: 1 , Return: true , color: "#31b04b" });
                 await canvas.delay({ time: MID_DELAY * 3  });
                 remove( note );
                 toggleMenu(true);
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
    
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               count = true;
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

          }catch(e){
          console.log(e)
          }
        };

       ( async ()=> {

            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await initialize();
            await createButtons( );
            await canvasFunction( canvas , true);
            initializeClicks();
            toggleMenu(true);

       })();

    } catch (error) {
        console.error(error);
        return;
    } finally {
        console.log("Execution finished");
    }
}