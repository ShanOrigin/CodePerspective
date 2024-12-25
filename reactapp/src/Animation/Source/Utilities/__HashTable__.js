
//Rect({ "canvasHandler": , "xposition": , "yposition": , "content": "" , "index": null , "color": "#F4C430" });

//inputRect({"rect": false, "cont": false, "ind": false, "popover": false, "inputType": "number", "Range": [-1000, 1000], "plc": "" , "popoverTextArray": null });

//drawRect({ "rect": false, "cont": false, "ind": false, "popover": true ,  "popoverTextArray": null });

import { Rect , Arrow }  from '../Components/Component.js';

export class HashTable {

    constructor({ canvasHandler, color = "#82f5ff" } ) {

        Object.assign(this, { canvasHandler ,  color });
        this.hashTable = null;      
    }

    drawHashTable(table) {

        const [ w , h , c ] = [ this.canvasHandler.rectWidth , this.canvasHandler.rectHeight , this.canvasHandler.cfontSize] ;
        const Size = table.length ;
        this.canvasHandler.rectRadius = 0;


        const tempHT = new Rect({ "canvasHandler": this.canvasHandler , "xposition": this.canvasHandler.canvasWidth * 0.03 , "yposition": this.canvasHandler.canvasHeight * 0.45 , "content": "" , "index": null , "color":  this.canvasHandler.backgroundColor });

        this.canvasHandler.rectWidth = this.canvasHandler.canvasWidth * 0.45;
        this.canvasHandler.rectHeight = this.canvasHandler.canvasHeight * 0.5 ;

        tempHT.drawRect({ "rect": true, "cont": false ,  "ind": false, "popover": false,  "popoverTextArray": null });

        const Tdim = tempHT.rectElement.getBBox();

        const H = Tdim.height * 0.085;

        const tHeight = (Size+2+1.5) * H ;
        tempHT.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 



        const htable = new Rect({ "canvasHandler": this.canvasHandler , "xposition": this.canvasHandler.canvasWidth * 0.03 , "yposition": this.canvasHandler.canvasHeight - tHeight , "content": "" , "index": null , "color":  this.canvasHandler.backgroundColor });

        this.canvasHandler.rectWidth = this.canvasHandler.canvasWidth * 0.45;
        this.canvasHandler.rectHeight = tHeight ;

        htable.drawRect({ "rect": true, "cont": false ,  "ind": false, "popover": false,  "popoverTextArray": null });

        const dim = htable.rectElement.getBBox();


        const titleRect = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x , "yposition": dim.y , "content": "Hash Table" , "index": null , "color": "#7d1df2" });
        this.canvasHandler.rectHeight = H ;
        titleRect.drawRect({ "rect": true, "cont": true,  "ind": false, "popover": false,  "popoverTextArray": null });
        titleRect.rectElement.attr({ stroke : 0.2 });
        const hashTableinfo = [];


        let p = dim.y + H ;

        this.canvasHandler.rectHeight = H ;
        this.canvasHandler.cfontSize = this.canvasHandler.cfontSize * 0.85 ; 

        const Row = async ( canvas , index , cont ) => {

            const Index = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x , "yposition": p  , "content": index , "index": null , "color": "#c6cc76" });
            this.canvasHandler.rectWidth = dim.width * 0.2 ;
            Index.drawRect({ "rect": true, "cont": true,  "ind": false, "popover": false,  "popoverTextArray": null });
            Index.rectElement.attr({ stroke : 0.2 });

            const element = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x + dim.width * 0.2 , "yposition": p  , "content": "Data" , "index": null , "color": "#70ba76" });
            this.canvasHandler.rectWidth = dim.width * 0.4;
            element.drawRect({ "rect": true, "cont": cont ,   "ind": false, "popover": false,  "popoverTextArray": null });
            element.rectElement.attr({ stroke : 0.2 });

            const code = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x + dim.width * 0.6 ,  "yposition": p  , "content": "Hash Code" , "index": null , "color": "#b06bff" });
            this.canvasHandler.rectWidth = dim.width * 0.4;
            code.drawRect({ "rect": true, "cont": cont ,  "ind": false, "popover": false,  "popoverTextArray": null });
            code.rectElement.attr({ stroke : 0.2 });
            p += H;
            hashTableinfo.push({ index :Index ,  dataBox : element , hashBox : code });
        }

        Row( this.canvasHandler , "index", true);

        for (let i = 0 ; i < Size ; i++) {
            Row( this.canvasHandler , i , false);
        }

        htable.rectElement.attr({ height:( Size+2.05) * H });
        this.canvasHandler.rectWidth = w ;
        this.canvasHandler.rectHeight = h ;
        this.canvasHandler.cfontSize = c
        hashTableinfo.splice(0 ,1) ; 
        return hashTableinfo;
    }



    drawCHashTable( table ) {

        const [ w , h , c ] = [ this.canvasHandler.rectWidth , this.canvasHandler.rectHeight , this.canvasHandler.cfontSize] ;
        const Size = table.length ;
        this.canvasHandler.rectRadius = 0;

        const tempHT = new Rect({ "canvasHandler": this.canvasHandler , "xposition": this.canvasHandler.canvasWidth * 0.02 , "yposition": this.canvasHandler.canvasHeight * 0.45 , "content": "" , "index": null , "color":  "#cef5ea"});

        this.canvasHandler.rectWidth = this.canvasHandler.canvasWidth * 0.96;
        this.canvasHandler.rectHeight = this.canvasHandler.canvasHeight * 0.54 ;

        tempHT.drawRect({ "rect": true, "cont": false ,  "ind": false, "popover": false,  "popoverTextArray": null });
        
        const Tdim = tempHT.rectElement.getBBox();

        const H = Tdim.height * 0.085;

        const tHeight = (Size+2+1.7) * H * 1.3; 

        const factor =  (Tdim.height * 0.9) /6 ; 
          
        tempHT.rectElement.attr({ y : this.canvasHandler.canvasHeight -(  factor * Size + Tdim.height * 0.15 )});
        
        const dim = tempHT.rectElement.getBBox();

        const titleRect = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x , "yposition": dim.y , "content": "Hash Table" , "index": null , "color": "#7d1df2" });
        this.canvasHandler.rectHeight = dim.height *0.05 ;
        this.canvasHandler.rectWidth = dim.width * 0.23;
        titleRect.drawRect({ "rect": true, "cont": true,  "ind": false, "popover": false,  "popoverTextArray": null });
        titleRect.rectElement.attr({ stroke : 0.2 });

        const hashTableinfo = [];
        let p = dim.y + dim.height *0.05;

        const Row = async ( canvas , index , cont , h  ) => {
            this.canvasHandler.rectHeight = h  ;
            const Index = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x , "yposition": p  , "content": index , "index": null , "color": "#c6cc76" });
            this.canvasHandler.rectWidth = dim.width * 0.10;
            Index.drawRect({ "rect": true, "cont": true,  "ind": false, "popover": false,  "popoverTextArray": null });
            Index.rectElement.attr({ stroke : 0.2 });

            const Pointer = new Rect({ "canvasHandler": this.canvasHandler , "xposition": dim.x + dim.width * 0.1 , "yposition": p  , "content": cont , "index": null , "color": "#70ba76" });
            this.canvasHandler.rectWidth = dim.width * 0.13;
            Pointer.drawRect({ "rect": true, "cont":  true ,   "ind": false, "popover": false,  "popoverTextArray": null });
            Pointer.rectElement.attr({ stroke : 0.2 });

            p +=  h ;
            hashTableinfo.push({ index :Index ,  pointer : Pointer });
        }

        Row( this.canvasHandler , "index", "Pointer", dim.height *0.05);

        for (let i = 0 ; i < Size ; i++) {
            Row( this.canvasHandler , i , "", factor);
        }

        tempHT.rectElement.attr({ height : factor * Size + Tdim.height * 0.1  });

        return [dim , hashTableinfo ] ; 

    }

}