
import { Rect, Arrow } from '../../../../../Source/Components/Component.js'
import { HashTable } from '../../../../../Source/Utilities/__HashTable__.js'
import { drawText, waitForLength, clearCanvas , remove , connect , createButton , canvasButtons,  canvasFunction} from '../../../../../Source/Utilities/utilities.js';

export async function OpenAddressingHT({ canvas }) {

    // Create an empty array of size n x 2
    let hashTable  // store hash table Graphical figure 
    , size , currentSize = 0 // hash table size 
    , info // store hash table all Graphical data 
    , DataType = null // store DataType on which operations going on 
    , collisionDetectionMethod = null // store collision detection method which to apply on hash table 
    , instructions ; // instructions Label to show instructions to user 
    const  centerX = canvas.canvasWidth / 2;
    const  centerY = canvas.drawYPos; 

    let  HTDCW // hash table data cell width
    , HTDCH // hash table data cell height
    , HTAP // hash table above position 
    , HTRP ; // hash table right position 

    const [ w , h , c ] = [ canvas.rectWidth , canvas.rectHeight , canvas.cfontSize] ;
    let w80 = w * 0.8 ;
    let h80 = h * 0.8;

const setCanvasProperties = (canvas, original, dimensions = { width: 0, height: 0 }) => {
    canvas.rectWidth = original ? dimensions.width : w;
    canvas.rectHeight = original ? dimensions.height : h;
};

const Notice = ({ notice, font = 1, color = "white", hf = 0.15, hfi = 0 }) => {
    const text = drawText({
        canvas, text: notice, x: centerX, y: canvas.canvasHeight * hf + hfi,
        fontSize: 0.81, padding: 9, color: "#46099c", Return: true
    });
    text.rect.attr({ fill: color });
    return text;
};

const updateNotice = (element, msg, color) => {
    element.rect.attr({ fill: color });
    element.text.attr({ text: msg });
};

const removeButtons = ( buttons=[]) =>{

 buttons.forEach(e => remove(e));

}
// Initialization and drawing functions
const initialize = async () => {
    console.log(canvas.fps)
    canvas.fps = 120;
    drawText({ canvas, text: "Hash Table", x: centerX, y: centerY / 2, fontSize: 1.1, color: "#46099c", Return: true });

    size = canvas.currentDevice.UserLength = await waitForLength({ canvas, umin: 0, umax: 0 });

    const dataType = drawText({ canvas, text: "Select Data Type Of Operation", x: centerX, y: canvas.canvasHeight * 0.25, fontSize: 1.1, color: "#46099c", Return: true });

    let g = dataType.rect.getBBox();
    const integer = createButton({ canvas, x : g.x   , y : g.y + g.height * 2  , colorCode : 0 , textContent:"Integer" , padding : 9 }) ;
    const string  = createButton({ canvas, x : g.x + g.width - integer.rect.attr("width")  , y : g.y + g.height * 2 , colorCode :2 , textContent:"String" , maxWidth: integer.rect.attr("width") , padding : 9 }) 

    integer.addClickAction(() => { DataType = "number"; removeButtons([integer, string, dataType]); });
    string.addClickAction(() => { DataType = "text"; removeButtons([integer, string, dataType]); });

    await new Promise(resolve => {
        const check = async () => {
            if (DataType) resolve();
            else { await canvas.delay({ time: 300 }); check(); }
        };
        check();
    });

    const collisionMethods = ['Quadratic Probing', 'Linear Probing', 'Double Hashing'];
    const collision = drawText({ canvas, text: "Select Collision Detection Method for HAsh Table ", x: centerX, y: canvas.canvasHeight * 0.25, fontSize: 1.1, color: "#46099c", Return: true });

    g = collision.rect.getBBox();
    const collisionButtons =[];
    collisionButtons.push( createButton({ canvas, x : g.x   , y : g.y + g.height * 2  , colorCode : 0 , textContent:"Quadratic Probing" , padding : 9 }) );
    collisionButtons.push( createButton({ canvas, x : g.x + g.width - collisionButtons[0].rect.attr("width")  , y : g.y + g.height * 2 , colorCode :2 , textContent:"Linear Probing" , maxWidth : collisionButtons[0].rect.attr("width") , padding : 9 }) );
    collisionButtons.push( createButton({ canvas, x : g.cx - collisionButtons[0].rect.attr("width") /2  , y : g.y + g.height * 3, colorCode :3 , textContent:"Double Hashing" , maxWidth: collisionButtons[0].rect.attr("width") , padding : 9 }) );

    collisionButtons.forEach((button, i) => {
        button.addClickAction(() => {
            collisionDetectionMethod = ['quadraticProbing', 'linearProbing', 'doubleHashing'][i];
            removeButtons(collisionButtons.concat(collision));
        });
    });

    await new Promise(resolve => {
        const check = async () => {
            if (collisionDetectionMethod) resolve();
            else { await canvas.delay({ time: 300 }); check(); }
        };
        check();
    });

    hashTable = Array.from({ length: size }, () => ({ key: null, value: null, keyBox: null, valueBox: null }));

    const ht = new HashTable({ canvasHandler: canvas, color: "red" });
    info = await ht.drawHashTable(hashTable);

    HTDCW = info[0].dataBox.rectElement.attr("width");
    HTDCH = info[0].dataBox.rectElement.attr("height");
    HTAP = info[0].hashBox.rectElement.attr("y") - canvas.rectHeight * 3;
    HTRP = info[0].hashBox.rectElement.attr("x") + HTDCW * 1.15 ;
};

const Buttons ={};
const createButtons = () => {
    instructions = drawText({ canvas, text: "Click Any Operation Button To Proceed", x: centerX, y: canvas.canvasHeight * 0.2, fontSize: 1.1, color: "#46099c", Return: true });

    ['Is Empty', 'Is Full', 'Update', 'Search', 'Delete', 'Insert'].forEach((text, i) => {
        const button = createButton({
            canvas, x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight - (info[0].dataBox.rectElement.attr("height") * 2.3) - (i * (info[0].dataBox.rectElement.attr("height") * 1.1)),
            colorCode: i, textContent: text, padding: 9 , 
            maxWidth : i>0 ? Buttons['b1'].rect.attr("width") : 0 
        });
        Buttons[`b${i + 1}`] = button;
    });
};

const toggleMenu = (show) => {
    Object.values(Buttons).forEach(button => show ? button.enableButton() : button.disableButton());
    canvasButtons(canvas, show);
};

const taskRunner = async (operation, operationSet) => {
    if (operationSet && operationSet[operation]) await operationSet.runner(operation, operationSet);
};

const checkAndRunTask = async (operation, method, operationSet) => {
    toggleMenu(false)
    await taskRunner(operation, operationSet);

    remove(instructions);
    toggleMenu(true);
};

const manage = async ({ method = collisionDetectionMethod, operation }) => {
    const methods = {
        "linearProbing": { runner: async (operation, operationSet) => await linearProbing(operation, operationSet) , insert: linearInsert, delete: linearDelete, search: linearSearch, update: linearUpdate },
        "quadraticProbing": {  runner: async (operation, operationSet) => await quadraticProbing(operation, operationSet) ,  insert: quadraticInsert, delete: quadraticDelete, search: quadraticSearch, update: quadraticUpdate },
        "doubleHashing": {  runner: async (operation, operationSet) => await doubleHashingProbing(operation, operationSet) ,  insert: doubleInsert, delete: doubleDelete, search: doubleSearch, update: doubleUpdate }
    };

    remove(instructions);

    const methodName = method.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
    instructions = Notice({ notice: `${methodName.charAt(0).toUpperCase() + methodName.slice(1)} ${operation} Is In Progress , Wait !`, color: "#3bf7c8" });
                  
    toggleMenu(false);
    //await canvas.delay({ time: 500 });
console.log(operation)
    if (methods[method]) {
        await checkAndRunTask(operation, method, methods[method]);
    }  if (operation === "full") {
     console.log("checking full")
     toggleMenu(false);
     await isFull();
    }
    if (operation === "empty"){
     console.log("checking empty")
     toggleMenu(false);
     await isEmpty();

    }

    remove(instructions);
    console.log("kill")
    toggleMenu(true);
};

const initializeClicks = () => {

    const operations =   ['empty', 'full', 'update', 'search', 'delete', 'insert'];
    Object.values(Buttons).forEach((button, i) => {
        if (i < operations.length) button.addClickAction(() => manage({ operation: operations[i] }));
    });

};

const clearAll = () => {
           canvas.drawYPos = centerY;
           Rect.AllBoxe = [];
           Rect.boxes = [];
           hashTable = [] ; info = [] ;
           size = 0 ; DataType = null ; collisionDetectionMethod = null;
       }

const menu = async () => {
     try {
        clearCanvas(canvas.paper);
        canvas.resetButton.enableButton();
        clearAll();

        await initialize();
        await createButtons();
     
        toggleMenu(true , Buttons);
        initializeClicks();
     } catch (error) {
         console.error( error);
     }
};

( async () => {
    await initialize();
  // ggetData("Enter Text Data To Insert In Hash Table ");

    canvas.resetButton.addClickAction( menu);
    createButtons();
    canvasFunction( canvas , true);
    toggleMenu(true , Buttons );
    initializeClicks(Buttons);

})();

// --------------_---------_---------_--------


let userNotice , boxArray , indexCol, startX , startY ;

const changeDim = ({ w  , h }) => {
    canvas.rectWidth = w;
    canvas.rectHeight = h;
}

const changeShape = async ({ e, w, h, r, s }) => {
    e.rectElement.attr({ width: w, height: h, r, stroke: s });
    const g =   e.rectElement.getBBox();
    e.textElement.attr({ x: g.cx , y: g.cy }).toFront();
    changeDim({ w , h });
}

const movePair = async ({ o1, o2, b1 = {}, b2 = {} }) => {
    await o1.moveTo({ "newX": b1.x, "newY": b1.y, "ind": false });
    await o2.moveTo({ "newX": b2.x, "newY": b2.y, "ind": false });

}


async function isFull(){

    userNotice = Notice({ notice: "Wait , Checking Hash Table" , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    await canvas.delay({ time: 1200 });
    remove(userNotice);
    if( currentSize == size  ){
       userNotice = Notice({ notice: " Hash Table Is Completely Full !..." , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    }else{
       userNotice = Notice({ notice: `No ! Hash Table is Not Full \n hash Table Has ${ size - currentSize } Slots Empty !...` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

    }

    await canvas.delay({ time: 3500 });
    remove(userNotice);
}

async function isEmpty() {

    userNotice = Notice({ notice: "Wait , Checking Hash Table" , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    await canvas.delay({ time: 1200 });
    remove(userNotice);

    if( currentSize == 0 ){
       userNotice = Notice({ notice: " Hash Table Is Completely Empty !..." , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    }else{
       userNotice = Notice({ notice: `No ! Hash Table is Not Empty \n hash Table Has ${ size - currentSize } Slots To Fill !...` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    }

    await canvas.delay({ time: 3500 });
    remove(userNotice);
}

async function getData(note) {
  try{

  if(DataType == "number" ){
    canvas.rectRadius = 5;

    changeDim({ w:w80 , h:h80});
    userNotice = Notice({ notice: note, color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
    const { cx, y } = userNotice.rect.getBBox();
    [startX, startY] = [(canvas.canvasWidth - (canvas.rectWidth + 3) * 5) / 2, y - canvas.rectHeight * 1.5];

    const symbolTable = ["", " % ", size, " = ", ""].map((symbol, i) => ({ symbol, color: ["#70ba76", "#28a8a8", "#2a76e8", "#e88c2a", "#b06bff"][i] }));
    
    boxArray = symbolTable.map((sym, index) => new Rect({
        "canvasHandler": canvas,
        "xposition": startX + index * (canvas.rectWidth + 3),
        "yposition": startY,
        "content": sym.symbol,
        "index": index,
        "color": sym.color
    }));

    boxArray[0].xposition = cx - canvas.rectWidth / 2;
    const hdata = Math.abs(await boxArray[0].inputRect({
        "rect": true, "cont": true, "ind": false, "popover": false,
        "inputType": DataType, "Range": [-99, 999], "plc": "N", "popoverTextArray": null
    }));

    const insertIndex = hdata % size;
    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": startX, "newY": startY, "ind": false });
    updateNotice(userNotice, "Calculating Hash Code For Data !", "#5da5c2");

    await canvas.delay({ time: 900 });
    updateNotice(userNotice, `Take ,  %  by HashTable.length = ${size}`, "#5da5c2");
    
    for (let i = 1; i <= 3; i++) {
        await canvas.delay({ time: 900 });
        boxArray[i].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
    }

    await canvas.delay({ time: 900 });
    updateNotice(userNotice, `Hash Code Of ${hdata} Is = ${insertIndex}`, "#5da5c2");
    boxArray[4].content = insertIndex;
    boxArray[4].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
    indexCol = info[insertIndex].index.rectElement.attr("fill");
    info[insertIndex].index.rectElement.attr({ fill: "red" });

    return hdata ;
  }else if(DataType == "text"){
   let   hdata ;
   [ boxArray , hdata ] = await getTextData(note) ;
   return hdata ;
  }
  }catch(e){
    console.log(e)
  }
}


// getTextData function helper function to calculate total sum of char
 const getSum = ( data ) => {
    return data.split("").reduce((sum, cha) => sum += cha.charCodeAt(0), 0);
}
async function getTextData(note) {
  try{
    const W80 = w * 0.8 ; 
    w80 = W80  * 2.3 ; 
    const createRect = ( xposition , yposition , content , color = "#b06bff") =>{
     return new Rect({ "canvasHandler":canvas, xposition, yposition, content, "index": "", color });  
    }

    canvas.rectRadius = 5;

    changeDim({ w:w80  , h:h80});

    userNotice = Notice({ notice: note, color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
    const { cx, y } = userNotice.rect.getBBox();
    startY = y - canvas.rectHeight * 1.5 ;

    const str = createRect( centerX  - w80  /2 , startY , "" ) ;

    let text , valid = false ;
    while(!valid){
      updateNotice(userNotice, note , "#5da5c2");

      text = await str.inputRect({
        "rect": true, "cont": true, "ind": false, "popover": false,
        "inputType": DataType, "Range": [3, 7], "plc": "N", "popoverTextArray": null
      });

      if (text.length >2 && text.length < 9){
        valid = true ;
      }else{
        str.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
        updateNotice(userNotice, "Text length Should be In Range [3 ,8]", "#5da5c2");
        await canvas.delay({ time: 2500 });
      }
    }
    startX = (canvas.canvasWidth - (W80 + 3) * text.length ) / 2 ;

    const charectors = text.split("");
    boxArray = charectors.map((c , index) =>({
       chR : createRect( startX + index * (W80 + 3) , startY - h80 *1.2  , c ) ,
       codeR : createRect( startX + index * (W80 + 3) , startY - h80 *1.2  , c.charCodeAt() ) 
    }));

    changeDim({ w:W80  , h:h80});

    for (let i = 0 ; i < text.length; i++) {
        await canvas.delay({ time: 300 });
        boxArray[i].codeR.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
        boxArray[i].chR.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
    }

    const sumRect = ["Sum ( " , " ) " ].map( ( c , i ) => createRect( startX - (W80 * 1.5 +5  ) , startY , c , "#54b06d" ) )

    updateNotice(userNotice, "Computing String values" , "#5da5c2");
    changeDim({ w:W80 * 1.5   , h:h80});
    sumRect[0].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });

    changeDim({ w:W80  , h:h80});

    str.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    await canvas.delay({ time: 500 });
    for ( const rect of boxArray ){
       await rect.codeR.moveTo({ "newX": rect.codeR.xposition, "newY": startY ,  "ind": false });
    }

    changeDim({ w:W80 * 0.3  , h:h80});

    sumRect[1].xposition = boxArray[boxArray.length-1].codeR.xposition + W80 + 5 ; 
    await canvas.delay({ time: 500 });
    sumRect[1].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });

   // const sum = charectors.reduce( ( s , c  ) => s += c.charCodeAt() , 0 ) ;
    const sum = getSum( text );

    const sumR = createRect( boxArray[boxArray.length-1].codeR.xposition + W80 + 10 + W80 * 0.3  , startY , sum , "#54b06d") ;

    await canvas.delay({ time: 500 });

    changeDim({ w:W80    , h:h80});
    sumR.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });

    await canvas.delay({ time: 900 });
    for ( const rect of sumRect ){
       rect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    }
    for ( const rect of boxArray ){
       rect.chR.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
       rect.codeR.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    }

    startX = (canvas.canvasWidth - (W80 + 3) * 5) / 2
    const symbolTable = [ " % ", size, " = ", ""].map((symbol, i) => ({ symbol, color: ["#70ba76", "#28a8a8", "#2a76e8", "#e88c2a", "#b06bff"][i] }));

    boxArray = symbolTable.map((sym, index) => createRect( startX +( index+1) * (canvas.rectWidth + 3) , startY - h80 *1.2 , sym.symbol , sym.color));

    boxArray.splice(0 , 0 ,  sumR )

    const insertIndex = sum % size;
    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": startX, "newY": startY - h80 *1.2 ,  "ind": false });
    remove(userNotice)
    userNotice = Notice({ notice:  "Calculating Hash Code For Data !", color: "#5da5c2", hfi: canvas.rectHeight * 2.5 });


    await canvas.delay({ time: 900 });
    updateNotice(userNotice, `Take ,  %  by HashTable.length = ${size}`, "#5da5c2");
    
    for (let i = 1; i <= 3; i++) {
        await canvas.delay({ time: 900 });
        boxArray[i].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
    }

    await canvas.delay({ time: 900 });
    updateNotice(userNotice, `Hash Code Of ${sum} Is = ${insertIndex}`, "#5da5c2");
    boxArray[4].content = insertIndex;
    boxArray[4].drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
    indexCol = info[insertIndex].index.rectElement.attr("fill");
    info[insertIndex].index.rectElement.attr({ fill: "red" });

   return [ boxArray , text ] ;
  }catch(e){
    console.log(e)
  }
}



async function InsertHT(data, index, methodName) {
  try{
    hashTable[index] = { key: index, value: data, keyBox: boxArray[4], valueBox: boxArray[0] };
    currentSize++;
   // updateNotice(userNotice, , "#468bf2");
    remove(userNotice);
    userNotice = Notice({ notice: `Inserting ${data} In Hash Table` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

    await canvas.delay({ time: 1500 });

    userNotice.rect.hide();
    userNotice.text.hide();
    console.table(hashTable)
    for (let i = 1; i < 4; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });


    await changeShape({ e: boxArray[0], w: w80 , h: h80 , r: 5 ,  s: 0 });
    await changeShape({ e: boxArray[4], w: w80 , h: h80 , r: 5 , s: 0 });
    boxArray[0].textElement.attr({text : data });

    await canvas.delay({ time: 1200 });
    await movePair({ o1: boxArray[0], o2: boxArray[4], b1: { x: startX, y: HTAP }, b2: { x: boxArray[4].rectElement.attr("x"), y: HTAP} });
    await movePair({ o1: boxArray[0], o2: boxArray[4], b1: { x: HTRP , y: boxArray[0].rectElement.attr("y") }, b2: { x: HTRP + canvas.rectWidth * 1.35, y: boxArray[0].rectElement.attr("y") } });

    userNotice.rect.show();
    userNotice.text.show();
    //updateNotice(userNotice, , "#468bf2");

    remove(userNotice);
    userNotice = Notice({ notice: `Inserting ${data} Using ${methodName}` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

    const finalY = info[index].hashBox.rectElement.attr("y");
    await movePair({ o1: boxArray[0], o2: boxArray[4], b1: { x: boxArray[0].rectElement.attr("x"), y: finalY }, b2: { x: boxArray[4].rectElement.attr("x"), y: finalY - canvas.rectHeight * 1.3 } });
    await canvas.delay({ time: 1200 });
    await changeShape({ e: boxArray[0], w: HTDCW ,  h: HTDCH , r: 0, s: 0.2 });

    await canvas.delay({ time: 700 });
    info[index].hashBox.rectElement.hide();
    await canvas.delay({ time: 500 });
    info[index].dataBox.rectElement.hide();

    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": info[index].dataBox.rectElement.attr("x"), "newY": info[index].hashBox.rectElement.attr("y"), "ind": false });

    changeDim({ w:w80 , h:h80});
    await canvas.delay({ time: 700 });
    await boxArray[4].moveTo({ "newX": HTRP , "newY": finalY, "ind": false });
    await changeShape({ e: boxArray[4], w: HTDCW , h: HTDCH , r: 0, s: 0.2 });
    await canvas.delay({ time: 900 });
    await boxArray[4].moveTo({ "newX": info[index].hashBox.rectElement.attr("x"), "newY": info[index].hashBox.rectElement.attr("y"), "ind": false });

    await canvas.delay({ time: 600 });
    info[index].index.rectElement.attr({ fill: indexCol });

    changeDim({ w:w80 , h:h80});
    remove(userNotice);
  }catch(e){
    console.log(e)
  }
}

async function DeleteHT( data , index  , methodName  ){
  try{
    updateNotice(userNotice, `Deleting ${data} From Hash Table`, "#468bf2");
    await canvas.delay({ time: 1500 });

    updateNotice(userNotice, `Deleteing ${data} Using ${methodName}`, "#468bf2");

    for (let i = 1; i < 4; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

    const finalY = info[index].hashBox.rectElement.attr("y");

    info[index].hashBox.rectElement.show();
    changeDim({ w:HTDCW, h:HTDCH});
    await canvas.delay({ time: 700 });
    await hashTable[index].keyBox.moveTo({ "newX": HTRP , "newY": finalY, "ind": false });
    await canvas.delay({ time: 700 });
    await changeShape({ e: hashTable[index].keyBox  , w: w80 , h: h80 , r: 5 , s: 0 });

    await canvas.delay({ time: 700 });
    await hashTable[index].keyBox.moveTo({ "newX": hashTable[index].keyBox.rectElement.attr("x") + w ,  "newY": finalY - h , "ind": false });

    const g = userNotice.rect.getBBox();

    changeDim({ w:HTDCW, h:HTDCH});
    await canvas.delay({ time: 700 });
    info[index].dataBox.rectElement.show();
    await hashTable[index].valueBox.moveTo({ "newX": HTRP , "newY": finalY, "ind": false });
    await canvas.delay({ time: 700 });
    await changeShape({ e: hashTable[index].valueBox  , w: w80 , h: h80 , r: 5 , s: 0 });
    await canvas.delay({ time: 700 });

    await canvas.delay({ time: 1200 });
    await movePair({ o1: hashTable[index].valueBox, o2: hashTable[index].keyBox, b1: { x:  hashTable[index].valueBox.rectElement.attr("x"), y: HTAP }, b2: { x: hashTable[index].keyBox.rectElement.attr("x"), y: HTAP} });
    await movePair({ o1: hashTable[index].valueBox, o2: hashTable[index].keyBox, b1: { x: boxArray[0].rectElement.attr("x") , y: hashTable[index].valueBox.rectElement.attr("y") }, b2: { x: boxArray[4].rectElement.attr("x") ,  y: hashTable[index].keyBox.rectElement.attr("y") } });
    await movePair({ o1: hashTable[index].valueBox, o2: hashTable[index].keyBox, b1: { x: boxArray[0].rectElement.attr("x") , y: hashTable[index].valueBox.rectElement.attr("y") }, b2: { x: boxArray[4].rectElement.attr("x") ,  y: hashTable[index].keyBox.rectElement.attr("y") } });
    await movePair({ o1: hashTable[index].valueBox, o2: hashTable[index].keyBox, b1: { x: boxArray[0].rectElement.attr("x") , y: g.y + g.height * 1.5  }, b2: { x: boxArray[4].rectElement.attr("x") ,  y:  g.y + g.height * 1.5  } });

    updateNotice(userNotice, `Deleted Data From Hash Table `, "#468bf2");
    boxArray[0].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    boxArray[4].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

    await canvas.delay({ time: 600 });
    info[index].index.rectElement.attr({ fill: indexCol });

    changeDim({ w:w80 , h:h80});
    await canvas.delay({ time: 1200 });
    hashTable[index].valueBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    hashTable[index].keyBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    remove(userNotice);

    hashTable[index] = { key: null ,  value: null ,  keyBox: null , valueBox: null };
    currentSize--;
    console.table(hashTable)
  }catch(e){
    console.log(e)
  }
}

async function searchHT(data , index , methodName ){
  try{
    updateNotice(userNotice, `Searching ${data} In Hash Table`, "#468bf2");
    await canvas.delay({ time: 1500 });

    updateNotice(userNotice, `Searching  ${data} Using ${methodName}`, "#468bf2");

    for (let i = 1; i < 4; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    await canvas.delay({ time: 1500 });

    hashTable[index].valueBox.rectElement.attr({ stroke : "red" });
    hashTable[index].keyBox.rectElement.attr({ stroke : "red" });
    updateNotice(userNotice, `Data ${data} Is At Index : ${index} In Hash Table `, "#468bf2");

    await canvas.delay({ time: 3500 });

    for (let i = 0 ;  i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    remove(userNotice)
    hashTable[index].valueBox.rectElement.attr({ stroke : "white" });
    hashTable[index].keyBox.rectElement.attr({ stroke : "white" });
    info[index].index.rectElement.attr({ fill: indexCol });
  }catch(e){
    console.log(e)
  }
}

async function updateHT(data , index , methodName ){
  try{
    remove(userNotice);
    await canvas.delay({ time: 1500 });
    for (let i = 0 ;  i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

    await canvas.delay({ time: 1500 });
    let udata , newIndex ; 

    do{ 
       udata = await getData(`Enter Data To Updating At Key ${index} , In Hash Table `);
        
       newIndex = udata % size || getSum( udata ) % size ;
       info[newIndex].index.rectElement.attr({ fill: indexCol });

       if (newIndex == data % size){
         updateNotice(userNotice, `You Can Update Data At Key ${index}`, "#468bf2");
         for (let i = 1 ; i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
         break;
       }else{
         info[newIndex].index.rectElement.attr({ fill: "blue" });
         updateNotice(userNotice, `New Key ${newIndex} Does Not Match To Key ${index}`, "#468bf2");
         await canvas.delay({ time: 3000 });
         updateNotice(userNotice, `New Key Should be Match with Existing Key ${index}`, "#468bf2");
         for (let i = 0 ; i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
         info[newIndex].index.rectElement.attr({ fill: indexCol });
       }
       await canvas.delay({ time: 1500 });
       remove(userNotice);
    }while(newIndex != data % size );

    await canvas.delay({ time: 1200 });
    userNotice.rect.hide();
    userNotice.text.hide();

    await canvas.delay({ time: 1000 });
    
    updateNotice(userNotice, `Updating ${data} Using ${methodName}`, "#468bf2");

    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": startX, "newY": HTAP , "ind": false });

    await canvas.delay({ time: 1000 });
    userNotice.rect.show();
    userNotice.text.show();

    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": HTRP, "newY": HTAP , "ind": false });
    const finalY = info[index].hashBox.rectElement.attr("y");

    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": HTRP, "newY": finalY ,  "ind": false });

    await changeShape({ e: boxArray[0], w: HTDCW ,  h: HTDCH , r: 0, s: 0.2 });

    await canvas.delay({ time: 900 });
    await boxArray[0].moveTo({ "newX": info[index].dataBox.rectElement.attr("x"), "newY": info[index].hashBox.rectElement.attr("y"), "ind": false });

    hashTable[index].valueBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    const keyB = hashTable[index].keyBox ;
    hashTable[index] = { key: index, value: udata, keyBox : keyB ,  valueBox: boxArray[0] };

    await canvas.delay({ time: 1500 });
    remove(userNotice);
    info[index].index.rectElement.attr({ fill: "#c6cc76" });
    console.table(hashTable)
  }catch(e){
    console.log(e)
  }
}

// ++++++++++++++++++++++++++++++++++++++-

/*linear probing collision detection methods*/
async function linearProbing(operation, operationSet) {
  try{
    let data , index ;
     
    switch(operation ) {
      case "insert":
      
  if(currentSize < size ){
        data = await getData("Enter Data To Insert In Hash Table?");
        console.log(data)
        index = data % size || getSum( data ) % size ;
        if (hashTable[index].key == null ) {
            await operationSet[operation](index , data );
            console.log("hi queen")
        } else {
            let originalIndex = index;
            const g = userNotice.rect.getBBox();

            info[index].index.rectElement.attr({ fill: "red" });
            updateNotice(userNotice, `Slot ${index} Is Already Fill With Value`, "#468bf2");
            const tempNotice = drawText({ canvas, text: "Applying Linear Probing i.e  HashCode = ( HashCode + 1 ) % Size", x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8, Return: true, color: "red" });
            await canvas.delay({ time: 1200 });
            do {
                const incrementerText = `Probing  :  ${index} = (${index} + 1) % ${size} = ${(index + 1) % size}`;
                const incrementerLabel = drawText({ canvas, text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true, color: "blue" });
                incrementerLabel.rect.attr({ fill: "#85c98a" });
                await canvas.delay({ time: 500 });
                info[index].index.rectElement.attr({ fill: indexCol });
                index = (index + 1) % size;
                info[index].index.rectElement.attr({ fill: "red" });

                const slotMessage = !hashTable[index].key ? `Slot ${index} Is Empty Insert Here` : `Slot ${index} Is Already Fill With Value`;
                updateNotice(userNotice, slotMessage, "#468bf2");

                await canvas.delay({ time: 1200 });
                remove(incrementerLabel);
            } while (hashTable[index].key != null  && index !== originalIndex);

            remove(tempNotice);
            if (index !== originalIndex) {
               await operationSet[operation]( index , data );
            }else{

               updateNotice(userNotice, `Data ${data} do Not Parent In Hash Table` , "red");
               for (let i = 0 ; i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
    
            }
        }
  }else{
      
     const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Full.", x: centerX, y: canvas.canvasHeight * 0.2  , padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
     await canvas.delay({ time: 2500 });
     remove(tempNotice);   
  }
      break;

      case  "delete":
      
  if(currentSize >0 ){
      data = await getData("Enter Data To Delete From Hash Table?");
      index = data % size || getSum( data ) % size ;

    // Check the first slot for a match
    if (hashTable[index].value === data) {
       await  operationSet[operation](index , data);

    } else {
        let originalIndex = index;
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Slot ${index} of Hash Table does not match, applying Linear Probing` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
 
        const tempNotice = drawText({ canvas, text: "Applying Linear Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data to delete
        do {
            const incrementerText = `Probing: ${index} = (${index} + 1) % ${size} = ${(index + 1) % size}`;
            const incrementerLabel = drawText({ canvas,text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true,color: "blue"  });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = (index + 1) % size;
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Slot ${index} contains the data, deleting...`
                : `Slot ${index} does not contain the data, continuing to probe`;
                
            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

        } while (hashTable[index].value !== data && index !== originalIndex);

        remove(tempNotice);

        if (hashTable[index].value === data) {
            await operationSet[operation](index , data);

        } else {
            console.log("Data not found in hash table");
          updateNotice(userNotice, `Data ${data} do Not Parent In Hash Table` , "#7dd177");
            await canvas.delay({ time: 2500 });
            remove(userNotice);
          for (let i = 0 ;  i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
  }else{
     const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty .", x: centerX, y: canvas.canvasHeight * 0.2 , padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
     await canvas.delay({ time: 2500 });
     remove(tempNotice);
  }

      break;

      case "search":

  if(currentSize >0 ){
      data = await getData("Enter Data To Search In Hash Table?");
      index = data % size || getSum( data ) % size ;

    // Check the first slot for a match
    if (hashTable[index].value === data && hashTable[index].key === index ) {
       await  operationSet[operation](index , data);
          
    } else {
        let originalIndex = index;
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Data ${data} Is Not At Index : ${index} In Hash Table , applying Linear Probing` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

        const tempNotice = drawText({ canvas, text: "Applying Linear Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data to delete
        do {
            const incrementerText = `Probing: ${index} = (${index} + 1) % ${size} = ${(index + 1) % size}`;
            const incrementerLabel = drawText({ canvas,text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true,color: "blue"  });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = (index + 1) % size;
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Data ${data} Is At Index : ${index} In Hash Table `
                : `Data ${data} Is Not At Index : ${index} In Hash Table , continuing to probe`;
                
            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

        } while (hashTable[index].value !== data && index !== originalIndex);

        remove(tempNotice);

        if (hashTable[index].value === data && hashTable[index].key === index) {
            //await linearDelete(index, data);
            await operationSet[operation](index , data);

        } else {
            console.log("Data not found in hash table");
          updateNotice(userNotice, `Data ${data} do Not Parent In Hash Table` , "#7dd177");
          
            await canvas.delay({ time: 2500 });
            remove(userNotice);
          for (let i = 0 ;  i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
  }else{
     const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty ! Can not Search .", x: centerX, y: canvas.canvasHeight * 0.2 , padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
     await canvas.delay({ time: 2500 });
     remove(tempNotice);
  }

      break;
    
      case  "update":

  if(currentSize >0 ){
      data = await getData("Enter Data To Update In Hash Table?");
      index = data % size || getSum( data ) % size ;

    // Check the first slot for a match
    if (hashTable[index].value === data && hashTable[index].key === index ) {
       await  operationSet[operation](index , data);

    } else {
        let originalIndex = index;
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Data ${data} Is Not At Index : ${index} In Hash Table , applying Linear Probing` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });
 
        const tempNotice = drawText({ canvas, text: "Applying Linear Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data to delete
        do {
            const incrementerText = `Probing: ${index} = (${index} + 1) % ${size} = ${(index + 1) % size}`;
            const incrementerLabel = drawText({ canvas,text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true,color: "blue"  });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = (index + 1) % size;
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Updating data ${data} At Index : ${index} In Hash Table `
                : `Data ${data} Is Not At Index : ${index} In Hash Table , continuing to probe`;
                
            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

        } while (hashTable[index].value !== data && index !== originalIndex);

        remove(tempNotice);
    
        if (hashTable[index].value === data && hashTable[index].key === index) {
            await operationSet[operation](index , data);

        } else {
            console.log("Data not found in hash table");
          updateNotice(userNotice, `Data ${data} do Not Parent In Hash Table` , "#7dd177");
          
            await canvas.delay({ time: 2500 });
            remove(userNotice);
          for (let i = 0 ;  i < 5 ; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
  }else{
     const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty ! Can not Search .", x: centerX, y: canvas.canvasHeight * 0.2 , padding: 9,  fontSize: 0.8 ,  Return: true, color: "red" });
     await canvas.delay({ time: 2500 });
     remove(tempNotice);
  }

      break;
    } 
    console.log("Current Size of Hash Table : ", currentSize);

  }catch(e){
    console.log(e)
  }
}



async function linearInsert(index , data ) {
  try{
    await InsertHT(data, index , "linear Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Linear Insert In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function linearDelete(index , data ){
  try{
    await DeleteHT(data, index , "linear Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Linear Delete  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function linearSearch(index , data ){
  try{
    console.log("linearSearch")
    await searchHT(data, index , "linear Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Linear Search In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function linearUpdate(index , data){
  try{
    console.log("linearUpdate")
    await updateHT(data, index , "linear Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Linear Update  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

  /*linear probing end*/

  /*quadratic probing collision detection method*/

async function quadraticProbing(operation, operationSet) {

  try{

let index , data ;

    switch (operation){

      case "insert" :    
if (currentSize < size) {
    data = await getData("Enter Data To Insert In Hash Table?");
    index = data % size || getSum( data ) % size ;
    if (hashTable[index].key == null) {
        await operationSet[operation](index, data);
        console.log("hi queen");
    } else {
        let originalIndex = index;
        let i = 1;
        const g = userNotice.rect.getBBox();

        info[index].index.rectElement.attr({ fill: "red" });
        updateNotice(userNotice, `Slot ${index} Is Already Filled With Value`, "#468bf2");
        const tempNotice = drawText({canvas, text: "Applying Quadratic Probing i.e HashCode = ( HashCode + 2 * i + i ^ 2 ) % Size",x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8,  Return: true, color: "red" });

        await canvas.delay({ time: 1200 });
        do {
            const incrementerText = `Probing: ${index} = (${index} + 2 x ${i} + ${i} ^ 2) % ${size} = ${(index + (2*i) + i * i) % size}`;
            const incrementerLabel = drawText({ canvas, text: incrementerText,  x: centerX, y: g.y + g.height * 3, padding: 9,  fontSize: 0.8,  Return: true, color: "blue"  });
            incrementerLabel.rect.attr({ fill: "#85c98a" });

            await canvas.delay({ time: 500 });
            info[index].index.rectElement.attr({ fill: indexCol });

            // Apply quadratic probing step
            index = (index + ( 2 * i ) + i * i) % size;

            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = !hashTable[index].key ? `Slot ${index} Is Empty, Insert Here` : `Slot ${index} Is Already Filled With Value`;
            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

            i++; // Increment i for next quadratic probing step

        } while (hashTable[index].key != null && i <= size );

        remove(tempNotice);

        if (index !== originalIndex && hashTable[index].value == null) {
            await operationSet[operation](index, data);
        } else {

            const g = userNotice.rect.getBBox();

            // Visual updates to indicate that probing is starting
            info[index].index.rectElement.attr({ fill: "red" });
            remove(userNotice);
            userNotice = Notice({ notice: `Quadratic Probing enable To Find Empty Slot In Hash Table` , color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

            for (let i = 0; i < 5; i++) {
                boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            }

           await canvas.delay({ time: 3500 });
           updateNotice(userNotice, `Try Again With Any Other New Data`, "red");
           await canvas.delay({ time: 3500 });
           remove(userNotice);
           info[index].index.rectElement.attr({ fill: indexCol });

        }
    }
} else {
    const tempNotice = drawText({  canvas,  text: "Hash Table Is Completely Full.",  x: centerX, y: canvas.canvasHeight * 0.2,  padding: 9, fontSize: 0.8, Return: true ,  color: "red"  });

    await canvas.delay({ time: 2500 });
    remove(tempNotice);
}
      break;

      case "delete" :    

if (currentSize > 0) {
    data = await getData("Enter Data To Delete From Hash Table?");
    index = data % size || getSum( data ) % size ;
    // Check the first slot for a match
    if (hashTable[index].value === data) {
        await operationSet[operation](index, data);
    } else {
        let originalIndex = index;
        let i = 0;  // Probe count
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Slot ${index} of Hash Table does not match, applying Quadratic Probing`, color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

        const tempNotice = drawText({ canvas, text: "Applying Quadratic Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8, Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data to delete
        do {
            const quadraticIndex = (index + ( 2 *  i ) + i * i) % size; // Quadratic probing formula
            const incrementerText = `Probing: ${quadraticIndex} = (${originalIndex} + 2 x  ${i} + ${i} ^ 2) % ${size} = ${quadraticIndex}`;
            const incrementerLabel = drawText({ canvas, text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true, color: "blue" });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = quadraticIndex;  // Update index based on quadratic probing
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Slot ${index} contains the data, deleting...`
                : `Slot ${index} does not contain the data, continuing to probe`;

            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

            i++;  // Increment the probe count

        } while (hashTable[index].value !== data && i < size);

        remove(tempNotice);

        if (hashTable[index].value == data) {
            await operationSet[operation](index, data);
        } else {
            console.log("Data not found in hash table");
            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
            await canvas.delay({ time: 2500 });
            remove(userNotice);
            for (let i = 0; i < 5; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
} else {
    const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8, Return: true, color: "red" });
    await canvas.delay({ time: 2500 });
    remove(tempNotice);
}

      break;

      case "search" :    

if (currentSize > 0) {
    data = await getData("Enter Data To Search In Hash Table?");
    index = data % size || getSum( data ) % size ;

    // Check the first slot for a match
    if (hashTable[index].value === data && hashTable[index].key === index) {
        await operationSet[operation](index, data);
    } else {
        let originalIndex = index;
        let i = 0;  // Probe count
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Data ${data} is not at Index: ${index} in Hash Table, applying Quadratic Probing`, color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

        const tempNotice = drawText({ canvas, text: "Applying Quadratic Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8, Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data
        do {
            const quadraticIndex = (index + ( 2 * i ) +  i * i) % size; // Quadratic probing formula
            const incrementerText = `Probing: ${quadraticIndex} = (${originalIndex} + 2 x ${i} + ${i} ^ 2) % ${size} = ${quadraticIndex}`;
            const incrementerLabel = drawText({ canvas, text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true, color: "blue" });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = quadraticIndex;  // Update index based on quadratic probing
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Data ${data} is at Index: ${index} in Hash Table`
                : `Data ${data} is not at Index: ${index} in Hash Table, continuing to probe`;

            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

            i++;  // Increment the probe count

        } while (hashTable[index].value !== data && i < size);

        remove(tempNotice);

        if (hashTable[index].value === data ) {
            await operationSet[operation](index, data);
        } else {
            console.log("Data not found in hash table");
            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
            await canvas.delay({ time: 2500 });
            remove(userNotice);
            for (let i = 0; i < 5; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
} else {
    const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty! Cannot Search.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8, Return: true, color: "red" });
    await canvas.delay({ time: 2500 });
    remove(tempNotice);
}

      break;

      case "update" :    

if (currentSize > 0) {
    data = await getData("Enter Data To Update In Hash Table?");
    let index = data % size || getSum( data ) % size ;
    // Check the first slot for a match
    if (hashTable[index].value === data && hashTable[index].key === index) {
        await operationSet[operation](index, data);
    } else {
        let originalIndex = index;
        let i = 0;  // Probe count
        const g = userNotice.rect.getBBox();

        // Visual updates to indicate that probing is starting
        info[index].index.rectElement.attr({ fill: "red" });
        remove(userNotice);
        userNotice = Notice({ notice: `Data ${data} Is Not At Index : ${index} In Hash Table, applying Quadratic Probing`, color: "#34fa8d", hfi: canvas.rectHeight * 2.5 });

        const tempNotice = drawText({ canvas, text: "Applying Quadratic Probing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8, Return: true, color: "red" });
        await canvas.delay({ time: 1200 });

        // Probing to find the correct data to update
        do {
            const quadraticIndex = (index +( 2 *  i ) + i * i ) % size; // Quadratic probing formula
            const incrementerText = `Probing: ${quadraticIndex} = (${originalIndex} + 2 x ${i} + ${i} ^ 2) % ${size} = ${quadraticIndex}`;
            const incrementerLabel = drawText({ canvas, text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8, Return: true, color: "blue" });

            incrementerLabel.rect.attr({ fill: "#85c98a" });
            await canvas.delay({ time: 500 });

            info[index].index.rectElement.attr({ fill: indexCol });
            index = quadraticIndex;  // Update index based on quadratic probing
            info[index].index.rectElement.attr({ fill: "red" });

            const slotMessage = hashTable[index].value === data
                ? `Updating data ${data} At Index: ${index} In Hash Table`
                : `Data ${data} Is Not At Index: ${index} In Hash Table, continuing to probe`;

            updateNotice(userNotice, slotMessage, "#468bf2");

            await canvas.delay({ time: 1200 });
            remove(incrementerLabel);

            i++;  // Increment the probe count

        } while (hashTable[index].value !== data && i < size);

        remove(tempNotice);

        if (hashTable[index].value === data ) {
            await operationSet[operation](index, data);
        } else {
            console.log("Data not found in hash table");
            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
            await canvas.delay({ time: 2500 });
            remove(userNotice);
            for (let i = 0; i < 5; i++) boxArray[i].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
            info[index].index.rectElement.attr({ fill: indexCol });
        }
    }
} else {
    const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty! Cannot Update.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8, Return: true, color: "red" });
    await canvas.delay({ time: 2500 });
    remove(tempNotice);
}

      break;
    }
  }catch(e){
    console.log(e);
  }

}

async function quadraticInsert(index , data ) {
  try{
    await InsertHT(data, index , "Quadratic Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Quadratic Insert In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function quadraticDelete(index , data ){
  try{
    await DeleteHT(data, index , "Quadratic Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Quadratic Delete  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function quadraticSearch(index , data ){
  try{
  
    await searchHT(data, index , "Quadratic Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Quadratic Search In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function quadraticUpdate(index , data){
  try{
    
    await updateHT(data, index , "Quadratic Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Quadratic Update  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}


  /*quadratic probing end*/

  /*double hashing collision detection method*/

async function doubleHashingProbing(operation, operationSet) {
    try {
        let index, data;

        switch (operation) {
            case "insert":
                if (currentSize < size) {
                    data = await getData("Enter Data To Insert In Hash Table?");
                    index = data % size || getSum( data ) % size ;
                    let step = 1 + (data % (size - 1));  // Double hashing step size
                    
                    if (hashTable[index].key == null) {
                        await operationSet[operation](index, data);
                    } else {
                        let i = 1;
                        const g = userNotice.rect.getBBox();
                        info[index].index.rectElement.attr({ fill: "red" });
                        updateNotice(userNotice, `Slot ${index} Is Already Filled With Value`, "#468bf2");

                        const tempNotice = drawText({  canvas, text: `Applying Double Hashing with step size: ${step}`,x: centerX, y: g.y + g.height * 1.7, padding: 9, fontSize: 0.8, Return: true, color: "red" });

                        await canvas.delay({ time: 1200 });
                        do {
                            const incrementerText = `Probing: ${index} = (${index} + ${i} * ${step}) % ${size} = ${(index + i * step) % size}`;
                            const incrementerLabel = drawText({ canvas,  text: incrementerText, x: centerX, y: g.y + g.height * 3, padding: 9, fontSize: 0.8,  Return: true,  color: "blue" });
                            incrementerLabel.rect.attr({ fill: "#85c98a" });

                            await canvas.delay({ time: 500 });
                            info[index].index.rectElement.attr({ fill: indexCol });

                            index = (index + i * step) % size;
                            info[index].index.rectElement.attr({ fill: "red" });

                            const slotMessage = !hashTable[index].key
                                ? `Slot ${index} Is Empty, Insert Here`
                                : `Slot ${index} Is Already Filled With Value`;
                            updateNotice(userNotice, slotMessage, "#468bf2");

                            await canvas.delay({ time: 2000 });
                            remove(incrementerLabel);

                            i++;
                        } while (hashTable[index].key != null && i <= size);

                        remove(tempNotice);

                        if (hashTable[index].value == null) {
                            await operationSet[operation](index, data);
                        } else {
                            updateNotice(userNotice, `Hash Table is full. Could not insert data.`, "red");
                            await canvas.delay({ time: 2500 });
                        }
                    }
                } else {
                    const tempNotice = drawText({  canvas, text: "Hash Table Is Completely Full.",  x: centerX ,  y: canvas.canvasHeight * 0.2, padding: 9,  fontSize: 0.8, Return: true, color: "red" });
                    await canvas.delay({ time: 2500 });
                    remove(tempNotice);
                }
                break;

            case "delete":
                if (currentSize > 0) {
                    data = await getData("Enter Data To Delete From Hash Table?");
                    index = data % size || getSum( data ) % size ;
                    let step = 1 + (data % (size - 1));  // Double hashing step size

                    if (hashTable[index].value === data) {
                        await operationSet[operation](index, data);
                    } else {
                        let i = 1;
                        const g = userNotice.rect.getBBox();
                        info[index].index.rectElement.attr({ fill: "red" });
                        updateNotice(userNotice, `Slot ${index} does not match, applying Double Hashing`, "#34fa8d");

                        const tempNotice = drawText({  canvas, text: "Applying Double Hashing to find the correct slot...", x: centerX, y: g.y + g.height * 1.7,  padding: 9, fontSize: 0.8,  Return: true, color: "red" });
                        await canvas.delay({ time: 1200 });

                        do {
                            const doubleHashIndex = (index + i * step) % size;
                            const incrementerText = `Probing: ${doubleHashIndex} = (${index} + ${i} * ${step}) % ${size} = ${doubleHashIndex}`;
                            const incrementerLabel = drawText({ canvas,  text: incrementerText,  x: centerX ,   y: g.y + g.height * 3, padding: 9,  fontSize: 0.8, Return: true,  color: "blue"  });

                            incrementerLabel.rect.attr({ fill: "#85c98a" });
                            await canvas.delay({ time: 500 });

                            info[index].index.rectElement.attr({ fill: indexCol });
                            index = doubleHashIndex;
                            info[index].index.rectElement.attr({ fill: "red" });

                            const slotMessage = hashTable[index].value === data
                                ? `Slot ${index} contains the data, deleting...`
                                : `Slot ${index} does not contain the data, continuing to probe`;

                            updateNotice(userNotice, slotMessage, "#468bf2");
                            await canvas.delay({ time: 1200 });
                            remove(incrementerLabel);

                            i++;
                        } while (hashTable[index].value !== data && i < size);

                        remove(tempNotice);

                        if (hashTable[index].value === data) {
                            await operationSet[operation](index, data);
                        } else {
                            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
                            await canvas.delay({ time: 2500 });
                        }
                    }
                } else {
                    const tempNotice = drawText({ canvas,  text: "Hash Table Is Completely Empty.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8,  Return: true,  color: "red"  });
                    await canvas.delay({ time: 2500 });
                    remove(tempNotice);
                }
                break;

            case "search":
                if (currentSize > 0) {
                    data = await getData("Enter Data To Search In Hash Table?");
                    index = data % size || getSum( data ) % size ;
                    let step = 1 + (data % (size - 1));  // Double hashing step size

                    if (hashTable[index].value === data && hashTable[index].key === index) {
                        await operationSet[operation](index, data);
                    } else {
                        let i = 1;
                        const g = userNotice.rect.getBBox();
                        info[index].index.rectElement.attr({ fill: "red" });
                        updateNotice(userNotice, `Data ${data} is not at Index: ${index} in Hash Table, applying Double Hashing`, "#34fa8d");

                        const tempNotice = drawText({  canvas, text: "Applying Double Hashing to find the correct slot...",  x: centerX,  y: g.y + g.height * 1.7,  padding: 9, fontSize: 0.8, Return: true, color: "red" });
                        await canvas.delay({ time: 1200 });

                        do {
                            const doubleHashIndex = (index + i * step) % size;
                            const incrementerText = `Probing: ${doubleHashIndex} = (${index} + ${i} * ${step}) % ${size} = ${doubleHashIndex}`;
                            const incrementerLabel = drawText({ canvas, text: incrementerText,  x: centerX, y: g.y + g.height * 3,  padding: 9, fontSize: 0.8, Return: true,  color: "blue" });

                            incrementerLabel.rect.attr({ fill: "#85c98a" });
                            await canvas.delay({ time: 500 });

                            info[index].index.rectElement.attr({ fill: indexCol });
                            index = doubleHashIndex;
                            info[index].index.rectElement.attr({ fill: "red" });

                            const slotMessage = hashTable[index].value === data
                                ? `Data ${data} is at Index: ${index} in Hash Table`
                                : `Data ${data} is not at Index: ${index} in Hash Table, continuing to probe`;

                            updateNotice(userNotice, slotMessage, "#468bf2");
                            await canvas.delay({ time: 1200 });
                            remove(incrementerLabel);

                            i++;
                        } while (hashTable[index].value !== data && i < size);

                        remove(tempNotice);

                        if (hashTable[index].value === data) {
                            await operationSet[operation](index, data);
                        } else {
                            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
                            await canvas.delay({ time: 2500 });
                        }
                    }
                } else {
                    const tempNotice = drawText({ canvas, text: "Hash Table Is Completely Empty! Cannot Search.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8,  Return: true,  color: "red"  });
                    await canvas.delay({ time: 2500 });
                    remove(tempNotice);
                }
                break;

            case "update":
                if (currentSize > 0) {
                    data = await getData("Enter Data To Update In Hash Table?");
                    index = data % size || getSum( data ) % size ;
                    let step = 1 + (data % (size - 1));  // Double hashing step size

                    if (hashTable[index].value === data && hashTable[index].key === index) {
                        await operationSet[operation](index, data);
                    } else {
                        let i = 1;
                        const g = userNotice.rect.getBBox();
                        info[index].index.rectElement.attr({ fill: "red" });
                        updateNotice(userNotice, `Data ${data} is not at Index: ${index} in Hash Table, applying Double Hashing`, "#34fa8d");

                        const tempNotice = drawText({ canvas,  text: "Applying Double Hashing to find the correct slot...",  x: centerX,  y: g.y + g.height * 1.7,  padding: 9,  fontSize: 0.8, Return: true, color: "red" });
                        await canvas.delay({ time: 1200 });

                        do {
                            const doubleHashIndex = (index + i * step) % size;
                            const incrementerText = `Probing: ${doubleHashIndex} = (${index} + ${i} * ${step}) % ${size} = ${doubleHashIndex}`;
                            const incrementerLabel = drawText({  canvas, text: incrementerText,  x: centerX,  y: g.y + g.height * 3,  padding: 9, fontSize: 0.8,  Return: true,  color: "blue"  });

                            incrementerLabel.rect.attr({ fill: "#85c98a" });
                            await canvas.delay({ time: 500 });

                            info[index].index.rectElement.attr({ fill: indexCol });
                            index = doubleHashIndex;
                            info[index].index.rectElement.attr({ fill: "red" });

                            const slotMessage = hashTable[index].value === data
                                ? `Data ${data} is at Index: ${index}, applying update...`
                                : `Data ${data} is not at Index: ${index} in Hash Table, continuing to probe`;

                            updateNotice(userNotice, slotMessage, "#468bf2");
                            await canvas.delay({ time: 1200 });
                            remove(incrementerLabel);

                            i++;
                        } while (hashTable[index].value !== data && i < size);

                        remove(tempNotice);

                        if (hashTable[index].value === data) {
                            await operationSet[operation](index, data);
                        } else {
                            updateNotice(userNotice, `Data ${data} does not exist in Hash Table`, "#7dd177");
                            await canvas.delay({ time: 2500 });
                        }
                    }
                } else {
                    const tempNotice = drawText({  canvas ,   text: "Hash Table Is Completely Empty! Cannot Update.", x: centerX, y: canvas.canvasHeight * 0.2, padding: 9, fontSize: 0.8, Return: true, color: "red"  });
                    await canvas.delay({ time: 2500 });
                    remove(tempNotice);
                }
                break;
        }
    } catch (error) {
        console.error("Error in doubleHashingProbing:", error);
    }
}


async function doubleInsert(index , data ) {
  try{
    await InsertHT(data, index , "Double Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Double Insert In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function doubleDelete(index , data ){
  try{
    await DeleteHT(data, index , "Double Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Double Delete  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function doubleSearch(index , data ){
  try{
  
    await searchHT(data, index , "Double Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Double Search In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

async function doubleUpdate(index , data){
  try{
    
    await updateHT(data, index , "Double Probig" );
    remove(instructions);
    instructions = Notice({ notice: `Double Update  In Hash Table Completed Successfully !`, color: "#3bf7c8" , hfi : w*1.5});
    await canvas.delay({ time: 3500 });
  }catch(e){
    console.log(e)
  }
}

   /*double hashing end*/

}