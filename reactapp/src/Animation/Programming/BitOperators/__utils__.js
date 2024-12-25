
import { Rect, Arrow, Comparator } from '../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton , truthTable } from '../../Source/Utilities/utilities.js';

class BitwiseOperation {
    constructor(canvas, cont) {
        this.canvas = canvas;
        this.cont = cont;
        this.centerX = canvas.canvasWidth / 2;
        this.centerY = canvas.drawYPos;
        this.Operator = {
           "&": (a, b) => a & b,
           "|": (a, b) => a | b,
           "~": (a) => ~a,
           "^": (a, b) => a ^ b
        };
        this.operationButton = null;
        this.byteG1 = null;
        this.byteG2 = null;
        this.byte1 = null;
        this.byte2 = null;
        this.tTable = null;
        this.prevColor = null;
        this.count = true;
    }

    async initialize() {
        this.canvas.fps = 150 ;
        this.tTable = await truthTable(this.canvas, Rect, this.cont);
        this.prevColor = this.tTable[1][0].rectElement.attr("fill");
        this.canvas.drawYPos += this.canvas.rectHeight * 6;

        // Initialization logic for byte inputs
        let label = drawText({ canvas: this.canvas, text: `Enter First Number's 8 bits`, x: this.centerX, y: this.canvas.drawYPos + this.canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 });
        
        this.canvas.currentDevice.UserLength = 8;
        this.byte1 = await Rect.drawArray({ canvasHandler: this.canvas, array: [], cont: true, indexs: false, popover: true, type: "array", range: [0, 1], purpose: "input" });
        remove(label);
        drawText({ canvas : this.canvas , text: `First Number Bits Array`, x: this.centerX, y: this.canvas.drawYPos  -  this.canvas.rectHeight * 0.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 });

        // Draw labels and set up byteG1 and byteG2
        this.byteG1 = Rect.boxes;
        Rect.boxes = [];

        this.canvas.drawYPos += this.canvas.rectHeight * 3;
        label = drawText({ canvas: this.canvas, text: `Enter second Number's 8 bits`, x: this.centerX, y: this.canvas.drawYPos + this.canvas.rectHeight * 1.6, fontSize: 1, Return: true, color: "#46099c", padding: 9 });
        
        this.byte2 = await Rect.drawArray({ canvasHandler: this.canvas, array: [], cont: true, indexs: false, popover: true, type: "array", range: [0, 1], purpose: "input" });
        remove(label);
        drawText({ canvas:this.canvas, text: `Second Number Bits Array`, x: this.centerX, y: this.canvas.drawYPos  + this.canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 } );

        this.byteG2 = Rect.boxes;
        Rect.boxes = [];
    }


    async hightlightTruthTableRow(r , fill ){ fill ? this.tTable[r].forEach(e => e.rectElement.attr({ fill : "#c9223b" }) ) : this.tTable[r].forEach(e => e.rectElement.attr({ fill : this.prevColor })) }

    async  decideTruthTableRow( cont , b1 , b2 , c ){

            if( cont =="&" || cont =="|" || cont =="^"){

              switch ([b1,b2].toString()){

                 case '0,0' :this.hightlightTruthTableRow(1 , c) ;
                 break;
                 case '0,1' :this.hightlightTruthTableRow(2 , c ) ;
                 break;
                 case '1,0' :this.hightlightTruthTableRow(3 , c ) ;
                 break;
                 case '1,1' :this.hightlightTruthTableRow(4 , c ) ;
                 break;
              }

            }
    }
    async execute() {
        // Execution logic here

             const [ bit1 , bit2 ] = [ new Arrow({ "canvasHandler": this.canvas , "cont": "bit1"  , "color": "blue" , "direction": "up" }) , new Arrow({ "canvasHandler": this.canvas , "cont":"bit2"   , "color": "green" , "direction": "down" }) ];
           

             this.canvas.drawYPos += this.canvas.rectHeight * 4;

             await Rect.drawArray({ canvasHandler: this.canvas, array: this.byte2 , cont: true, indexs: false, popover: true, type: "array", hideR : true ,  range :[0, 1]  ,  purpose: "print" });
             drawText({ canvas: this.canvas, text: `Second Number Bits Array`, x: this.centerX, y: this.canvas.drawYPos  + this.canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 } );

             const [x,y ] = [ this.byteG2[this.byteG2.length-1 ].rectElement.attr("x") + this.canvas.rectWidth * 1.5 , this.byteG2[this.byteG2.length-1 ].rectElement.attr("y") - this.canvas.rectHeight * 1.5  ];
             const opt = new Rect({ "canvasHandler":this.canvas  , "xposition": x , "yposition": y , "content": this.cont , "index": null , "color": "#28a156" });

             opt.drawRect({ "rect": true , "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

             const dis = ( this.byteG2[1].rectElement.attr("x") - this.byteG2[0].rectElement.attr("x") ) / this.canvas.nextPos ;

             for(  let i = this.byteG2.length -1 ; i >=0 ; i-- ){ 

                 const resBit = this.Operator[this.cont](this.byte1[i] , this.byte2[i] )  ;
                 bit1.drawArrow({ "rectObj": this.byteG1[i] , "fig": true, "cont": true, "popover": true }) ;
                 bit2.drawArrow({ "rectObj": this.byteG2[i] , "fig": true, "cont": true, "popover": true }) ;
                 await this.canvas.delay({ time: 700  });
                const note  = drawText({ canvas : this.canvas , text: ` Performing ${ this.cont} on bit1( ${this.byte1[i]} ) ${ this.cont} bit2( ${this.byte2[i]} ) \n According To Above Truth Table ` , x: this.centerX   , y:  this.canvas.drawYPos + this.canvas.rectHeight * 3.5 , fontSize: 1 , padding: 16  , Return: true });
              
                 await this.decideTruthTableRow( this.cont , this.byte1[i],this.byte2[i] , true);

                 await this.canvas.delay({ time: 900  });

                 await opt.moveTo({ "newX": this.byteG1[i].rectElement.attr("x")   , "newY": opt.rectElement.attr("y") ,  "ind": false }) ;

                 const res  = new Rect({ "canvasHandler":this.canvas  , "xposition": opt.rectElement.attr("x") , "yposition": opt.rectElement.attr("y")  , "content": resBit   , "index": null , "color": "#28a156" });

                 await this.canvas.delay({ time: 900  });

                 res.drawRect({ "rect": true , "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

                 await this.canvas.delay({ time: 500  });
                 await res.moveTo({ "newX": x   , "newY": y  ,  "ind": false }) ;
                 await res.moveTo({ "newX": x   , "newY": Rect.boxes[i].rectElement.attr("y") -  this.canvas.rectHeight * 1.5 ,  "ind": false }) ;
                 await res.moveTo({ "newX": Rect.boxes[i].rectElement.attr("x")   , "newY": Rect.boxes[i].rectElement.attr("y") -  this.canvas.rectHeight *1.5 ,  "ind": false }) ;
                 await res.moveTo({ "newX": Rect.boxes[i].rectElement.attr("x")   , "newY": Rect.boxes[i].rectElement.attr("y") ,  "ind": false }) ;

                 Rect.boxes[i].textElement.attr({text: resBit });
                 Rect.boxes[i].textElement.show();
                 res.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                 await this.canvas.delay({ time: 700  });
                 if( i > 0 ){

                    await this.canvas.delay({time : 600 });

                    await  bit1.ShiftArrow({ "steps":0.3, "direction": "up" });
                    await  bit2.ShiftArrow({ "steps":0.3, "direction": "down" });

                    await  bit1.ShiftArrow({ "steps" : Math.abs(dis ) , "direction": "left" });
                    await  bit2.ShiftArrow({ "steps" : Math.abs(dis ) , "direction": "left" });

                    bit1.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
 
                    bit2.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                 }
                 remove(note);
                 await this.decideTruthTableRow(this.cont , this.byte1[i] , this.byte2[i],false);


            }

            opt.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

            bit1.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
 
            bit2.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

    }

    createButtons() {
        try {
            this.operationButton = createButton({ canvas: this.canvas, x: this.canvas.canvasWidth - this.canvas.rectWidth * 2.25, y: this.canvas.canvasHeight - this.canvas.rectHeight * 1.5, colorCode: 0, textContent: "Binary AND", padding: 10 });
        } catch (error) {
            console.log("Error in createButtons:", error);
        }
    }

    toggleMenu(show) {
        try {
            if (show) {
                this.operationButton.enableButton();
            } else {
                this.operationButton.disableButton();
            }
        } catch (error) {
            console.log("Error in toggleMenu:", error);
        }
    }

    clearAll() {
        this.canvas.drawYPos = this.centerY;
        Rect.AllBoxe = [];
        Rect.boxes = [];
    }

    async action() {
        try {
            if (this.count) {
                this.count = false;
                this.toggleMenu(false);
                await this.execute();
                this.toggleMenu(true);
            } else {
                // Completion message logic
            }
        } catch (error) {
            console.log("Error in action:", error);
            this.toggleMenu(true);
        }
    }

    initializeClicks() {
        try {
            this.operationButton.addClickAction(() => this.action());
        } catch (e) {
            console.log(e);
        }
    }

    async start() {
        try {
            canvasFunction(this.canvas, true);
            this.canvas.resetButton.addClickAction(() => this.menu());
            await this.initialize();
            this.createButtons();
            this.initializeClicks();
            this.toggleMenu(true);
        } catch (e) {
            console.log(e);
        }
    }

    async menu() {
        try {
            clearCanvas(this.canvas.paper);
            this.canvas.resetButton.enableButton();
            this.count = true;
            this.clearAll();
            await this.initialize();
            this.createButtons();
            this.toggleMenu(true);
            this.initializeClicks();
        } catch (error) {
            console.error(error);
        }
    }
}

export async function fn({ canvas, cont }) {
    const operation = new BitwiseOperation(canvas, cont);
    await operation.start();
}


/*
import { Rect, Arrow, Comparator } from '../../Source/Components/Components.js';
import { drawText, waitForLength, clearCanvas , canvasFunction , remove , createButton , truthTable } from '../../Source/Utilities/utilities.js';

export async function fn({canvas , cont }){

   try{
        canvas.fps = 150 ;
        const [ centerX , centerY ] = [ canvas.canvasWidth / 2 , canvas.drawYPos  ] ;
        let byteG1 , byteG2 , byte1 , byte2 , tTable , prevColor ; 

        const Operator = {
           "&": (a, b) => a & b,
           "|": (a, b) => a | b,
           "~": (a) => ~a,
           "^": (a, b) => a ^ b
        };

        const hightlightTruthTableRow = (r , fill ) => fill ? tTable[r].forEach(e => e.rectElement.attr({ fill : "#c9223b" }) ) : tTable[r].forEach(e => e.rectElement.attr({ fill : prevColor })) ;

        const decideTruthTableRow =( cont , b1 , b2 , c ) =>{

            if( cont =="&" || cont =="|" || cont =="^"){

              switch ([b1,b2].toString()){

                 case '0,0' : hightlightTruthTableRow(1 , c) ;
                 break;
                 case '0,1' :hightlightTruthTableRow(2 , c ) ;
                 break;
                 case '1,0' :hightlightTruthTableRow(3 , c ) ;
                 break;
                 case '1,1' :hightlightTruthTableRow(4 , c ) ;
                 break;
              }

            }
 
        }

        const initialize = async () =>{

             // Call the truthTable function with the desired operator ("AND", "OR", "XOR", or "NOT")
             tTable = await truthTable(canvas, Rect ,  cont );  // You can switch this to "OR", "XOR", "NOT" for different operators
      
             prevColor = tTable[1][0].rectElement.attr("fill");
             canvas.drawYPos += canvas.rectHeight * 6;

             let lable = drawText({ canvas, text: `Enter First Number's 8 bits`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 } );

             canvas.currentDevice.UserLength = 8 ;
             byte1 = await Rect.drawArray({ canvasHandler: canvas, array: [] , cont: true, indexs: false, popover: true, type: "array", range :[0, 1]  ,  purpose: "input" });
             remove( lable);
             drawText({ canvas, text: `First Number Bits Array`, x: centerX, y: canvas.drawYPos  -  canvas.rectHeight * 0.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 });
             byteG1 = Rect.boxes ;
             Rect.boxes = [] ;

             canvas.drawYPos += canvas.rectHeight * 3;

             lable = drawText({ canvas, text: `Enter second Number's 8 bits`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 }) ;

             byte2 = await Rect.drawArray({ canvasHandler: canvas, array: [] , cont: true, indexs: false, popover: true, type: "array", range :[0, 1]  ,  purpose: "input" });
             remove(lable);
             drawText({ canvas, text: `Second Number Bits Array`, x: centerX, y: canvas.drawYPos  + canvas.rectHeight * 1.6, fontSize: 1 , Return: true , color: "#46099c" , padding : 9 } );
             byteG2 = Rect.boxes ;
             Rect.boxes = [] ;
    
        }

        const execute = async () =>{

             //const cont = "&" ;
             const [ bit1 , bit2 ] = [ new Arrow({ "canvasHandler": canvas , "cont": "bit1"  , "color": "blue" , "direction": "up" }) , new Arrow({ "canvasHandler": canvas , "cont":"bit2"   , "color": "green" , "direction": "down" }) ];
             

             canvas.drawYPos += canvas.rectHeight * 4;

             await Rect.drawArray({ canvasHandler: canvas, array: byte2 , cont: true, indexs: false, popover: true, type: "array", hideR : true ,  range :[0, 1]  ,  purpose: "print" });
             const [x,y ] = [ byteG2[byteG2.length-1 ].rectElement.attr("x") + canvas.rectWidth * 1.5 , byteG2[byteG2.length-1 ].rectElement.attr("y") - canvas.rectHeight * 1.5  ];
             const opt = new Rect({ "canvasHandler":canvas  , "xposition": x , "yposition": y , "content": cont , "index": null , "color": "#28a156" });

             opt.drawRect({ "rect": true , "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

             const dis = ( byteG2[1].rectElement.attr("x") - byteG2[0].rectElement.attr("x") ) / canvas.nextPos ;

             for(  let i = byteG2.length -1 ; i >=0 ; i-- ){ 

                 const resBit = Operator[cont](byte1[i] , byte2[i] )  ;
                 bit1.drawArrow({ "rectObj": byteG1[i] , "fig": true, "cont": true, "popover": true }) ;
                 bit2.drawArrow({ "rectObj": byteG2[i] , "fig": true, "cont": true, "popover": true }) ;
                   await canvas.delay({ time: 700  });
                 const note  = drawText({ canvas, text: ` Performing ${ cont} on bit1( ${byte1[i]} ) ${ cont} bit2( ${byte2[i]} ) \n According To Above Truth Table ` , x: centerX   , y:  canvas.drawYPos + canvas.rectHeight * 3.5 , fontSize: 1 , padding: 16  , Return: true });
                
                 await decideTruthTableRow( cont , byte1[i],byte2[i] , true);

                 await canvas.delay({ time: 900  });

                 await opt.moveTo({ "newX": byteG1[i].rectElement.attr("x")   , "newY": opt.rectElement.attr("y") ,  "ind": false }) ;

                 const res  = new Rect({ "canvasHandler":canvas  , "xposition": opt.rectElement.attr("x") , "yposition": opt.rectElement.attr("y")  , "content": resBit   , "index": null , "color": "#28a156" });

                 await canvas.delay({ time: 900  });

                 res.drawRect({ "rect": true , "cont": true , "ind": false, "popover": true ,  "popoverTextArray": null });

                 await canvas.delay({ time: 500  });
                 await res.moveTo({ "newX": x   , "newY": y  ,  "ind": false }) ;
                 await res.moveTo({ "newX": x   , "newY": Rect.boxes[i].rectElement.attr("y") -  canvas.rectHeight * 1.5 ,  "ind": false }) ;
                 await res.moveTo({ "newX": Rect.boxes[i].rectElement.attr("x")   , "newY": Rect.boxes[i].rectElement.attr("y") -  canvas.rectHeight *1.5 ,  "ind": false }) ;
                 await res.moveTo({ "newX": Rect.boxes[i].rectElement.attr("x")   , "newY": Rect.boxes[i].rectElement.attr("y") ,  "ind": false }) ;

                 Rect.boxes[i].textElement.attr({text: resBit });
                 Rect.boxes[i].textElement.show();
                 res.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                  await canvas.delay({ time: 700  });
                 if( i > 0 ){

                    await canvas.delay({time : 600 });

                    await  bit1.ShiftArrow({ "steps":0.3, "direction": "up" });
                    await  bit2.ShiftArrow({ "steps":0.3, "direction": "down" });

                    await  bit1.ShiftArrow({ "steps" : Math.abs(dis ) , "direction": "left" });
                    await  bit2.ShiftArrow({ "steps" : Math.abs(dis ) , "direction": "left" });

                    bit1.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
 
                    bit2.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                 }
                 remove(note);
                 await decideTruthTableRow(cont , byte1[i],byte2[i],false);


            }
            opt.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

            bit1.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
 
            bit2.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

    
        }


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 1.5   , colorCode :0 , textContent:"Binay AND " , padding : 10 }) 

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
                 await canvas.delay({ time: 3000  });
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

   }catch(e){
      console.log(e);
   }

}

*/