
import { Rect, Arrow, Comparator } from '../../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton } from '../../../Source/Utilities/utilities.js';

export async function NumberToBinary({ canvas }) {
    try {
        canvas.fps = 150 ;
        if (canvas.abort) return;

        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos   ;
        let BitArray , ByteArray , originalWidth , updatedWidth , byteValue , numBox ,  num , yPos ,  textNotify = [] , rectColor = null , array ;
        const MID_DELAY = 800 ;

        const initialize = async () => {

           drawText({ canvas, text: " Number To Binary ", x: centerX, y: centerY / 2, fontSize: 1 , Return: true , color: "#46099c" });

           originalWidth = canvas.rectWidth ;
           canvas.rectWidth = originalWidth * 1.2 ;

           const byteBox =new Rect({ "canvasHandler": canvas  , "xposition": centerX - canvas.rectWidth /2 , "yposition": centerY + canvas.rectHeight * 2 , "content": "" , "index": null , "color": "#66deff" });

           textNotify.push( drawText({ canvas, text: " Enter Byte Value Between [ 1 - 4 ] \n 1 Byte = 1 Byte x 8 = 8 Bit ", x: centerX, y: centerY + canvas.rectHeight * 4 , fontSize: 1 , Return: true , color: "#46099c" }) );

           while(1){
              byteValue = await byteBox.inputRect({"rect": true , "cont": true , "ind": false, "popover": false, "inputType": "number", "Range": [ 1 , 99], "plc": "byte" , "popoverTextArray": null });
              if( byteValue <= 4 && byteValue >= 1 ) break; 
              byteBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
           }
    
           remove( textNotify );
           const highestBit = Math.pow(2 , (byteValue * 8 - 1 ) )

           updatedWidth  = originalWidth *  highestBit.toString().length / 3 ;
           canvas.rectWidth = updatedWidth ;
           byteBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
           const highestValue = Math.pow(2 , (byteValue * 8 ) ) - 1  ;
           textNotify[0].text.attr({ text: `Enter An Any  Number In Range \n [ 0 - ${ highestValue } ] ` });
      
           numBox =new Rect({ "canvasHandler": canvas  , "xposition": centerX - canvas.rectWidth /2 , "yposition": centerY + canvas.rectHeight * 2 , "content": "" , "index": null , "color": "#66deff" });

           num  = await numBox.inputRect({"rect": true , "cont": true , "ind": false, "popover": false, "inputType": "number", "Range": [ 0 , highestValue], "plc": "number" , "popoverTextArray": null });

           drawText({ canvas, text: `Number = ${num} `, x: centerX, y: numBox.rectElement.attr("y") - canvas.rectHeight   , fontSize: 1 , Return: true , color: "#46099c" , padding : 9 });

           remove(textNotify[0]);
           textNotify = [] ;

        }

        const calculateBits = async ( upperBit , lowerBit ) =>{ 

            let bitRepresentation = "" ;
            let upperB = Math.pow(2 , upperBit * 8 - 1 ) ;
            let lowerB = Math.pow( 2 ,  lowerBit * 8 ) ;
   
            let i = 0 ;

            const checkBox = new Rect({ "canvasHandler": canvas  , "xposition": centerX - canvas.rectWidth /2 , "yposition": canvas.drawYPos , "content": "" , "index": null , "color": "#F4C430" });

            const [ byteArrow , bitArrow ] = [ new Arrow({ "canvasHandler": canvas , "cont": "i"  , "color": "blue" , "direction": "up" }) , new Arrow({ "canvasHandler": canvas , "cont":"bit"   , "color": "green" , "direction": "up" }) ];

            while(upperB >= lowerB ){

                byteArrow.drawArrow({ "rectObj": ByteArray[i] , "fig": true, "cont": true, "popover": true }) ;

                const [ oX , oY ] = [ ByteArray[i].rectElement.attr("x") , ByteArray[i].rectElement.attr("y")] ;
                await ByteArray[i].moveTo({ "newX": centerX / 2 - canvas.rectWidth /2  , "newY": canvas.drawYPos ,  "ind": false }) ;

                await canvas.delay({ time: MID_DELAY });
                const upperValueLable = drawText({ canvas, text: upperB , x: centerX / 2  , y:  canvas.drawYPos + canvas.rectHeight /2 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                await canvas.delay({ time: MID_DELAY });
                let note ;

                if( upperB <= num ){
 
                  checkBox.content = "<=" ;
                  checkBox.color = "green" ;
                  await checkBox.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

                  await canvas.delay({ time: MID_DELAY });
                  note  = drawText({ canvas, text: ` ${ upperB } <= ${ num } \n Set Bit  = 1 At index ${ i } in Bit Array` , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 2.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: 1000 });
                  bitArrow.Atext = "Bit";
                  bitArrow.drawArrow({ "rectObj": BitArray[i] , "fig": true, "cont": true, "popover": true }) ;

                  await canvas.delay({ time: MID_DELAY });
                  BitArray[i].textElement.attr({ text : "1" });

                  await canvas.delay({ time: 500 });

                  bitArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                  bitArrow.Atext = "Number";
                  await canvas.delay({ time: 1000 });
                  remove(note);
                  const t = ` ${ upperB } <= ${ num } \n Number = Number( ${ num } ) - ${ upperB } =  ${num - upperB} ` ;
                  note  = drawText({ canvas, text: t  , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 2.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: MID_DELAY });
                  numBox.rectElement.attr({ fill : "#de375e" });
                  await canvas.delay({ time: MID_DELAY });
                  numBox.textElement.attr({ text : num - upperB });
                  await canvas.delay({ time: 1000 });

                  numBox.rectElement.attr({ fill : "#66deff"});
                  bitRepresentation += '1' ;
                  num -= upperB ;

                }else{

                  checkBox.content = " > " ;
                  checkBox.color = "red" ;
                  await checkBox.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });
                  await canvas.delay({ time: MID_DELAY });

                  note  = drawText({ canvas, text: ` ${ upperB } > ${ num } \n Set Bit  = 0 At index ${ i } in Bit Array` , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 2.5 , fontSize: 1 , padding: 16  , Return: true , color: ByteArray[i].rectElement.attr("fill")});

                  await canvas.delay({ time: MID_DELAY });
                  bitArrow.Atext = "Bit";
                  bitArrow.drawArrow({ "rectObj": BitArray[i] , "fig": true, "cont": true, "popover": true }) ;

                  await canvas.delay({ time: MID_DELAY });
                  BitArray[i].textElement.attr({ text : "0" });

                  await canvas.delay({ time: 500 });

                  bitArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                  bitRepresentation += '0' ;
                }
                
                await canvas.delay({ time: 1000 });
                remove(note);
                await canvas.delay({ time: MID_DELAY });
                checkBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                await canvas.delay({ time: MID_DELAY });
                remove(upperValueLable);
                await canvas.delay({ time: MID_DELAY });
                await ByteArray[i].moveTo({ "newX": oX , "newY": oY ,  "ind": false }) ;

               if( i <  ByteArray.length -1 ){
                  const dis = ( ByteArray[i+1].rectElement.attr("x") - ByteArray[i].rectElement.attr("x") ) / canvas.nextPos ;

                  await canvas.delay({time : MID_DELAY});

                  await  byteArrow.ShiftArrow({ "steps":0.3, "direction": "up" });
                  await  byteArrow.ShiftArrow({ "steps" : dis , "direction": "right" });

                  byteArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
               }

               upperB = Math.floor(upperB/2);
               i++;
            }

          byteArrow.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

          return bitRepresentation ;
             
        }   

        async function  drawArray(  byteN  ){

           yPos = canvas.drawYPos ;
           canvas.drawYPos += canvas.rectHeight * 6 ; 
           const byteArray = { 1 : [ "2⁷","2⁶","2⁵","2⁴","2³","2²","2¹","2⁰"] ,
                   2 : [ "2¹⁵","2¹⁴","2¹³","2¹²","2¹¹","2¹⁰","2⁹","2⁸"] ,
                   3 : [ "2²³","2²²","2²¹","2²⁰","2¹⁹","2¹⁸","2¹⁷","2¹⁶"] , 
                   4 : [ "2³¹","2³⁰","2²⁹","2²⁸","2²⁷","2²⁶","2²⁵","2²⁴"] , 
                 }

           canvas.rectWidth = originalWidth ;
           canvas.drawYPos += canvas.rectHeight * 5;

           await Rect.drawArray({ canvasHandler: canvas, array: byteArray[byteN] , cont: true, indexs: false, popover: true, type: "array", purpose: "print" });
           if (canvas.abort) return;
           rectColor = Rect.boxes[0].rectElement.attr("fill");
           textNotify.push( drawText({ canvas, text: `Byte ${ byteN } Array`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 }) );
           ByteArray = Rect.boxes ;
           Rect.boxes = [] ;
           canvas.drawYPos -= canvas.rectHeight * 4;
           const bitArray = new Array(byteArray[byteN].length).fill("");
           await Rect.drawArray({ canvasHandler: canvas, array: bitArray, cont: true, indexs: true,  popover: true, type: "array", purpose: "print" , color : "black" });
           BitArray = Rect.boxes ;          
           textNotify.push( drawText({ canvas, text: " 8 Bit Array", x: centerX, y: canvas.drawYPos + canvas.rectHeight *1.6, fontSize: 1 , Return: true , color: "#46099c" ,  padding : 9 }) );
           canvas.drawYPos += canvas.rectHeight * 5.5 ;
           
        }

        const execute = async () => {
   
           for( let i = byteValue ; i > 0 ; i--){

              await drawArray( i );

              canvas.drawYPos += canvas.rectHeight * 1.4 ;
              canvas.rectWidth = updatedWidth ;
              await numBox.moveTo({ "newX": centerX + centerX / 2 - updatedWidth /2  , "newY": canvas.drawYPos ,  "ind": false }) ;

              canvas.rectWidth = originalWidth ;
           
              const bin = await calculateBits( i , i -1) ;
         
              const upWidth = originalWidth * 2.5  ;
              canvas.rectWidth = upWidth ;
              const xPos =  (canvas.canvasWidth -  (  canvas.canvasWidth / byteValue  ) * (i -0.5)) - canvas.rectWidth /2   ;
              const bit  = new Rect({ "canvasHandler": canvas  , "xposition": xPos , "yposition": centerY + canvas.rectHeight * 3 , "content": "" , "index": null , "color": "black" });
              await bit.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

             canvas.rectWidth = originalWidth  ;

             const l = bin.split('');
             for ( let i = 0 ; i < l.length ; i++){
                 await BitArray[i].moveTo({ "newX": bit.rectElement.attr("x") + upWidth /2 - canvas.rectWidth /2 , "newY": bit.rectElement.attr("y"),  "ind": true }) ;
            
                 BitArray[i].clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                 
                 bit.textElement.attr({ text : bit.textElement.attr("text")+l[i] });
                 await canvas.delay({ time: 300 });
             }

             canvas.rectWidth = originalWidth * 3  ;
             drawText({ canvas, text: i+" byte", x: xPos + upWidth /2  , y: bit.rectElement.attr("y") + canvas.rectHeight * 1.5 , fontSize: 1 , Return: true , color: "#46099c" ,  padding : 8 });

             ByteArray.map( (e) => e.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false }) );
             ByteArray = [] ;
             BitArray = [];
             textNotify.forEach( e => remove(e) );
             canvas.drawYPos = yPos ;

           }
             numBox.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });

        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.5   , colorCode :0 , textContent:"Number To Binary" , padding : 10 }) 

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