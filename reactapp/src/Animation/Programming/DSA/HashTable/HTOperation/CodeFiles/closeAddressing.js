import { Rect, Arrow } from '../../../../../Source/Components/Component.js'
import { HashTable } from '../../../../../Source/Utilities/__HashTable__.js'
import { drawText, waitForLength, clearCanvas , remove , connect , createButton , canvasButtons,  canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';


export async function ClosedAddressingHT({canvas}) {

try{

    canvas.fps = 150;
    // Create an empty array of size n x 2
    let hashTable  // store hash table Graphical figure 
    , size , currentSize = 0 // hash table size 
    , info // store hash table all Graphical data 
    , collisionDetectionMethod = null // store collision detection method which to apply on hash table 
    , instructions ; // instructions Label to show instructions to user 
    const  centerX = canvas.canvasWidth / 2;
    const  centerY = canvas.drawYPos; 

    let  HTDCW // hash table data cell width
    , HTDCH // hash table data cell height
    , HTAP // hash table above position 
    , HTRP ; // hash table right position 


    const DataType = "number" ;
    let userNotice , boxArray , previousIndexColor , startX , startY ;


    const [ w , h , c ] = [ canvas.rectWidth , canvas.rectHeight , canvas.cfontSize] ;
    let w80 = w * 0.8 ;
    let h80 = h * 0.8;

    const initialize = async () =>{
        size = canvas.currentDevice.UserLength = await waitForLength({ canvas, methodName : "Closed Addressing HT " ,  umin: 2, umax: 3});

        hashTable = Array.from({ length: size }, () => ({ index : null, pointerXPos : null ,  pointerYPos : null , pointer : { head : null , tail : null } , bucket: null  , List : [] }));

        const ht = new HashTable({ canvasHandler: canvas, color: "red" });
        info = await ht.drawCHashTable(hashTable);
    
        const dim = info[1][1].pointer.rectElement.getBBox();
 
        canvas.rectHeight = dim.height * 0.45; 
        canvas.rectWidth = dim.width * 0.53;
        canvas.rectRadius = 3 ;

        for ( let i = 1 ; i <= size ; i++){
            const dim = info[1][i].pointer.rectElement.getBBox();
            hashTable[i-1].index = i-1 ;
     
            hashTable[i-1].pointerYPos = dim.cy - dim.height *0.45 /2 ; 
  
            hashTable[i-1].bucket = new Node({ canvasHandler: canvas, xposition: dim.x + dim.width - canvas.rectWidth - (canvas.rectWidth) *0.42,   yposition: hashTable[i-1].pointerYPos,   content: "*", index :1 , color: "#70ba76" });
            await hashTable[i-1].bucket.drawNode({ node: true, cont: true, index: false, popover: true, next: true, prev: false, popoverTextArray: null , purpose: "print" });

            hashTable[i-1].bucket.nextN.rectElement.hide();

            hashTable[i-1].pointerXPos = hashTable[i-1].bucket.nextN.rectElement.attr("x")  +(canvas.rectWidth) *0.85; 
        }

    }

    const Notice = ({ notice, font = 1, color = "white", hf = 0.15, hfi = 0 }) => {
        const text = drawText({
            canvas, text: notice, x: centerX, y: canvas.canvasHeight * hf + hfi,
            fontSize: 0.81, padding: 13, color: "#46099c", Return: true
        });
        text.rect.attr({ fill: color });
        return text;
    };

    const updateNotice = (element, msg, color) => {
        element.rect.attr({ fill: color });
        element.text.attr({ text: msg });
    };



async function getData(note) {
  try{
  boxArray = [] ;
  remove (instructions);
  if(DataType == "number" ){
    canvas.rectRadius = 5;

    userNotice = Notice({ notice: note, color: "#34fa8d", hfi: canvas.rectHeight * 1.5 });
    const { cx, y } = userNotice.rect.getBBox();
    [startX, startY] = [(canvas.canvasWidth - (canvas.rectWidth + 3) * 5) / 2, y - canvas.rectHeight * 1.5];

    const symbolTable = ["", " % ", size, " = ", ""].map((symbol, i) => ({ symbol, color: ["#70ba76", "#28a8a8", "#2a76e8", "#e88c2a", "red"][i] }));
    
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


    //---------------------
    // Constants for delay and clearing options
    const DELAY_SHORT = 500 ,  DELAY_LONG = 1500;
    const CLEAR_OPTS = { "rect": true, "cont": true, "ind": false, "dfba": false };

    // Helper function to move an element to a specific position
    const moveElement = async (element, x, y , node =false ) => {  await element.moveTo({ "newX": x, "newY": y, "ind": false , ... (node ? {"node": true , "next": true} :{} )});  };

    // Helper function to draw an arrow from a node with a specific color
    const drawNodeArrow = async (node,text ,  color) => {
        const arrow = new Arrow({ canvasHandler: canvas, cont: text, color });
        await arrow.drawArrow({ rectObj: node.node, fig: true, cont: true, popover: true });
        return arrow;
    };

    // Helper function to change index color and restore it later
    const highlightIndex = (index, color = "red") => {
        const previousColor = info[1][index + 1].index.rectElement.attr("fill");
        info[1][index + 1].index.rectElement.attr({ fill: color });
        return previousColor;
    };


    const inputTaker = async (task) => {

         // Getting the data to insert in the hash table
         const data = await getData( task);         
         remove(userNotice);
         for (let i = 1; i < 4; i++)boxArray[i].clearRect(CLEAR_OPTS); 

         return data ;
    }

    const highlightIndexWhereToPerformeTask = async (index) =>{

        // Get the dimensions of the index where the element will be moved
        const dim = info[1][index + 1].index.rectElement.getBBox();
        await moveElement(boxArray[4], dim.cx - canvas.rectWidth / 2, dim.cy - canvas.rectHeight / 2);

        // Highlight the selected index
        previousIndexColor = highlightIndex(index);

        boxArray[4].clearRect(CLEAR_OPTS);

        await canvas.delay({ time: DELAY_SHORT });

    }

const insertInHT = async () => {


    const data = await inputTaker( "Enter Data To Insert In Hash Table " );
    const index = data % size;

    await canvas.delay({ time: DELAY_SHORT });

    await highlightIndexWhereToPerformeTask(index);

    await moveElement(boxArray[0], boxArray[0].rectElement.attr("x") , info[0].y - canvas.rectWidth * 2);
    await moveElement(boxArray[0], canvas.canvasWidth - canvas.rectWidth * 2, boxArray[0].rectElement.attr("y"));

    const dataNode = new Node({ canvasHandler: canvas, xposition: boxArray[0].rectElement.attr("x") ,  yposition: boxArray[0].rectElement.attr("y") ,   content: data , index : hashTable[index].List.length   , color: "#70ba76" });
    await dataNode.drawNode({ node: true, cont: true, index: true , popover: true, next: true, prev: false, popoverTextArray: null , purpose: "print" });
    boxArray[0].clearRect(CLEAR_OPTS);
      
    const nextLink = new Link({ color: "red", direction: "next", pos: "mid" });

    // Node creation and collision handling logic starts here
    if (hashTable[index].List.length < 1) {

        dataNode.nextN.rectElement.hide();
        userNotice = Notice({ notice: `Inserting ${data} In At ${ index } index Bucket In Hash Table `, color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
        await canvas.delay({time : DELAY_LONG});
       
        await moveElement(dataNode, dataNode.node.rectElement.attr("x") , hashTable[index].pointerYPos , true);
        await moveElement(dataNode, hashTable[index].pointerXPos, hashTable[index].pointerYPos , true);

        hashTable[index].bucket.nextN.rectElement.show();
        await canvas.delay({time : DELAY_SHORT});

        hashTable[index].pointer.head = await drawNodeArrow(dataNode, "head" , "red" );

        await canvas.delay({time : DELAY_SHORT});
        await nextLink.drawLink({ rectObj1: hashTable[index].bucket.nextN, rectObj2: dataNode.node});
        hashTable[index].bucket.nextN.rectElement.toFront();

        await canvas.delay({time : DELAY_SHORT});
        hashTable[index].pointer.tail = await drawNodeArrow(dataNode, "tail" , "green" );


      
    } else {

        const lastNode = hashTable[index].List[hashTable[index].List.length - 1];
 
        userNotice = Notice({ notice: ` Collision Has Been Occuring Due To  ${data} \n In At ${ index } index Bucket In Hash Table `, color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
        await canvas.delay({time : 3000});

        updateNotice(userNotice, `Converting Data ${ data } Into Linked List Node \n Then Inserting in Hash Table `, "white");
        await canvas.delay({time : DELAY_LONG}); 

        await moveElement(dataNode, dataNode.node.rectElement.attr("x") , hashTable[index].pointerYPos , true);
        await moveElement(dataNode, lastNode.Gdata.nextN.rectElement.attr("x")  + (canvas.rectWidth) *0.85 , hashTable[index].pointerYPos , true);

        const arrow0 = await drawNodeArrow(dataNode, "newNode" , "blue" );

        await canvas.delay({time : DELAY_SHORT});
        lastNode.Gdata.nextN.rectElement.show();

        await canvas.delay({time : DELAY_SHORT});
        await nextLink.drawLink({ rectObj1: lastNode.Gdata.nextN , rectObj2: dataNode.node});
        lastNode.Gdata.nextN.rectElement.toFront();

        const dis = ( dataNode.node.rectElement.attr("x") - lastNode.Gdata.node.rectElement.attr("x") ) / canvas.nextPos ;

        await canvas.delay({time : DELAY_SHORT});

        await  hashTable[index].pointer.tail.ShiftArrow({ "steps":0.3, "direction": "up" });
        await  hashTable[index].pointer.tail.ShiftArrow({ "steps" : dis , "direction": "right" });

        await canvas.delay({time : DELAY_SHORT});
        hashTable[index].pointer.tail.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
        await hashTable[index].pointer.tail.drawArrow({ rectObj: dataNode.node  , fig: true, cont: true, popover: true });
        arrow0.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

    }

    await canvas.delay({time : 800});
    // Restore the original color of the index
    info[1][index + 1].index.rectElement.attr({ fill: previousIndexColor });

    hashTable[index].List.push({value: data , Gdata : dataNode , Glink : nextLink });
    remove(userNotice);

    console.log( hashTable );
};




    const searchInHT = async ( purpose = " Using Linked List Search Technique" ) =>{

        const eraser = async (index , r , ptr) =>{
            await canvas.delay({time : 800});
            // Restore the original color of the index
   
            info[1][index + 1].index.rectElement.attr({ fill: previousIndexColor });

            boxArray[0].clearRect(CLEAR_OPTS); 
            r.forEach( e => e.clearRect(CLEAR_OPTS) );
            ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

            remove(userNotice);
        }
        const returnNull = async ( obj = {index , Equaty , Ldata , ptr}) =>{

        }


        const data = await inputTaker( "Enter Data Search In Hash Table " );
        const index = data % size;
        let Ldata , Equaty , ptr ;
        await canvas.delay({ time: DELAY_SHORT });

        await highlightIndexWhereToPerformeTask(index);

        await moveElement(boxArray[0], boxArray[0].rectElement.attr("x") , info[0].y - canvas.rectWidth * 2);
        await moveElement(boxArray[0], canvas.canvasWidth /2  - canvas.rectWidth /2 , boxArray[0].rectElement.attr("y"));

        userNotice = Notice({ notice: ` Searching Data ${ data } In Bucket ${ index }  \n  in Hash Table `, color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
        await canvas.delay({time : 3000});

        if (hashTable[index].List.length > 0 ) {

            remove(userNotice);

            userNotice = Notice({ notice:  `Searching  Data ${ data } In Bucket ${ index } In Hash Table   \n ${ purpose } `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
            await canvas.delay({time : DELAY_LONG}); 

            ptr = await drawNodeArrow( hashTable[index].List[0].Gdata , "ptr" , "blue" );
            

            for (let i = 0 ; i < hashTable[index].List.length ; i++ ){

               Ldata = new Rect({ "canvasHandler":canvas , "xposition":hashTable[index].List[i].Gdata.node.rectElement.attr("x") , "yposition": hashTable[index].List[i].Gdata.node.rectElement.attr("y")     ,  "content": hashTable[index].List[i].value , "index": null , "color": hashTable[index].List[i].Gdata.node.rectElement.attr("fill") });
               Ldata.drawRect({ "rect": true, "cont": true ,  "ind": false, "popover": true ,  "popoverTextArray": null });
               await moveElement(Ldata, boxArray[0].rectElement.attr("x") + boxArray[0].rectElement.attr("width") * 2.2 ,  boxArray[0].rectElement.attr("y") );

               await canvas.delay({time : 800});

               if ( hashTable[index].List[i].value == data ){

                  Equaty = new Rect({ "canvasHandler":canvas , "xposition": boxArray[0].rectElement.attr("x") + boxArray[0].rectElement.attr("width") * 1.1 , "yposition": boxArray[0].rectElement.attr("y")  ,  "content": "=" , "index": null , "color": "green" });
                  Equaty.drawRect({ "rect": true, "cont": true ,  "ind": false, "popover": true ,  "popoverTextArray": null });

                  remove(userNotice);
                  userNotice = Notice({ notice:  ` Data ${ data } Is Present At Index ${ i} In Bucket ${ index } \n  In Hash Table   `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
                  await canvas.delay({time : DELAY_LONG * 2 }); 

                  await eraser(index ,[Equaty , Ldata] , ptr );
          
                  return [ data , index , i ] ;

               }else{
                  Equaty = new Rect({ "canvasHandler":canvas , "xposition": boxArray[0].rectElement.attr("x") + boxArray[0].rectElement.attr("width") * 1.1 , "yposition": boxArray[0].rectElement.attr("y")  ,  "content": "≠" , "index": null , "color": "red"  });
                  Equaty.drawRect({ "rect": true, "cont": true ,  "ind": false, "popover": true ,  "popoverTextArray": null });

               }

               await canvas.delay({time : 1500});
               Equaty.clearRect(CLEAR_OPTS);
               Ldata.clearRect(CLEAR_OPTS);

               if( i <  hashTable[index].List.length -1 ){
                  const dis = ( hashTable[index].List[i+1].Gdata.node.rectElement.attr("x") - hashTable[index].List[i].Gdata.node.rectElement.attr("x") ) / canvas.nextPos ;

                  await canvas.delay({time : DELAY_SHORT});

                  await  ptr.ShiftArrow({ "steps":0.3, "direction": "up" });
                  await  ptr.ShiftArrow({ "steps" : dis , "direction": "right" });

                  ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                  await ptr.drawArrow({ rectObj : hashTable[index].List[i+1].Gdata.node, fig: true, cont: true, popover: true });
               }
               
            }

            remove(userNotice);
            userNotice = Notice({ notice:  ` Data ${ data } Is Not Present  In Bucket ${ index } \n  In Hash Table   `   , color: "red", hfi: canvas.rectHeight * 3.5 });
            await canvas.delay({time : DELAY_LONG * 2 }); 
            await eraser(index ,[Equaty , Ldata] , ptr );
            return [ null , null , null ] ;
         
        }else{

            updateNotice(userNotice, ` Data ${ data } Is Not Present  In Bucket ${ index }  \n  in Hash Table `, "red");

            await canvas.delay({time : DELAY_LONG * 2 }); 
            boxArray[0].clearRect(CLEAR_OPTS);
            remove(userNotice);
            info[1][index+ 1].index.rectElement.attr({ fill: previousIndexColor });

            return [ null , null , null ] ;
        }

    }



    const deleteInHT = async () =>{

        // Function to move the entire set relative to the first element and wait until all animations complete using promises
        const moveList = async (List, newX, newY) => {
            // Get the current position of the first element in the set
            let firstElement = List[0];
            let dx, dy;

            if (firstElement.type === "rect") {
               dx = newX - firstElement.attr("x");
               dy = newY - firstElement.attr("y");
            } else if (firstElement.type === "path") {
               let bbox = firstElement.getBBox();
               dx = newX - bbox.x;
               dy = newY - bbox.y;
            }

            // Function to create a promise for each element animation
            const animateElement = (element, dx, dy) => {
                return new Promise((resolve) => {
                   if (element.type === "rect") {
                       let x = element.attr("x");
                       let y = element.attr("y");
                       element.animate({ x: x + dx, y: y + dy }, 2000, () => {
                       resolve(); // Resolve when the animation completes
                       });
                   } else if (element.type === "path") {
                       let newPath = Raphael.transformPath(element.attr("path"), "t" + dx + "," + dy);
                       element.animate({ path: newPath }, 2000, () => {
                       resolve(); // Resolve when the animation completes
                       });
                   } else if (element.type === "text") {
                       let x = element.attr("x");
                       let y = element.attr("y");
                       element.animate({ x: x + dx, y: y + dy }, 2000, () => {
                       resolve(); // Resolve when the animation completes
                       });
                   }
                });
            };

           // Create an array of promises for each animation
           let animationPromises = Array.from(List).map((element) => animateElement(element, dx, dy));
           // Wait for all animations to complete}
           await Promise.all(animationPromises);

        };


        const deleteNodeWithArrowAndLink = async ( ptr , Bucket ,  index , d = true  ) => {

            await canvas.delay({time : DELAY_SHORT});

            ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

            await canvas.delay({time : DELAY_SHORT});
            hashTable[Bucket].List[index].Gdata.node.clearRect({ "rect": true, "cont": true, "ind": true , "dfba": false });
            hashTable[Bucket].List[index].Gdata.nextN.clearRect(CLEAR_OPTS);

            if(d)await canvas.delay({time : DELAY_SHORT});
            hashTable[Bucket].List[index].Glink.clearLink();
            if(d)await canvas.delay({time : DELAY_SHORT});
        }


         let  [ data ,  Bucket , index ] = await searchInHT( "For Deleting Existing Value" ); 
         
         if(data ){
            const deleteNode = hashTable[Bucket].List[index].Gdata ;
            deleteNode.node.rectElement.attr({ fill : "blue" });
            const ptr = await drawNodeArrow( deleteNode , "ptr" , "blue" );
            const len = hashTable[Bucket].List.length ;

            console.log("length is " , len )
            userNotice = Notice({ notice:  ` Deleting Data ${ data } From Bucket ${ Bucket } \n  In Hash Table   `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
            await canvas.delay({time : DELAY_SHORT});
               
            if( len == 1 && index == 0  ){
          
                hashTable[Bucket].pointer.tail.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                hashTable[Bucket].pointer.head.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                await deleteNodeWithArrowAndLink( ptr , Bucket ,  index );

                hashTable[Bucket].bucket.nextN.rectElement.hide();

                hashTable[Bucket].List.splice( index  , 1 ) ;
            }else if ( len <= 6  && index == len - 1 ){

                const dis = ( hashTable[Bucket].List[index].Gdata.node.rectElement.attr("x") - hashTable[Bucket].List[index -1 ].Gdata.node.rectElement.attr("x") ) / canvas.nextPos ;

                await canvas.delay({time : DELAY_SHORT});

                await  hashTable[Bucket].pointer.tail.ShiftArrow({ "steps":0.3, "direction": "up" });
                await  hashTable[Bucket].pointer.tail.ShiftArrow({ "steps" : dis , "direction": "left" });

                hashTable[Bucket].pointer.tail.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                await hashTable[Bucket].pointer.tail.drawArrow({ rectObj: hashTable[Bucket].List[index-1].Gdata.node  , fig: true, cont: true, popover: true });

                await canvas.delay({time : DELAY_LONG }); 

                await deleteNodeWithArrowAndLink( ptr , Bucket ,  index );

                hashTable[Bucket].List.splice( index  , 1 ) ;

            }else{


                console.log("more  element")
                const dis = Math.abs(( hashTable[Bucket].List[index].Gdata.node.rectElement.attr("x") - hashTable[Bucket].List[ (index == 0 ) ? index + 1 : index -1 ].Gdata.node.rectElement.attr("x") ) / canvas.nextPos );

                await canvas.delay({time : DELAY_SHORT});

                const ptrNext = await drawNodeArrow( hashTable[Bucket].List[index+1].Gdata  , "ptrNext" , "black" );

                await canvas.delay({time : DELAY_LONG }); 
                const [ newX, newY ] = [ hashTable[Bucket].List[index].Gdata.node.rectElement.attr("x") , hashTable[Bucket].List[index].Gdata.node.rectElement.attr("y") ] ;
                await deleteNodeWithArrowAndLink( ptr , Bucket ,  index , false );
                hashTable[Bucket].List[index+1].Glink.clearLink();
  
                if(index == 0){

                await  hashTable[Bucket].pointer.head.ShiftArrow({ "steps":0.3, "direction": "up" });
                await  hashTable[Bucket].pointer.head.ShiftArrow({ "steps" : dis , "direction": "right" });
                ptrNext.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              
                }
                const remainingList = canvas.paper.set()  

                remove(userNotice);
                userNotice = Notice({ notice:  ` Rearranging Bucket ${ Bucket } linked list after deleting data ${ data }\n  In Hash Table   `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
                await canvas.delay({time : DELAY_LONG * 2 });

                for( let i = index + 1 ; i < len ; i++ ){
                  remainingList.push(
                     hashTable[Bucket].List[i].Gdata.node.rectElement,
                     hashTable[Bucket].List[i].Gdata.node.textElement,
                     hashTable[Bucket].List[i].Gdata.node.indexTextElement,
                     hashTable[Bucket].List[i].Gdata.nextN.rectElement,
                     hashTable[Bucket].List[i].Glink.arrowFig
                  );
                }
                (index == 0 ) ?  remainingList.push( hashTable[Bucket].pointer.head.arrowFig , hashTable[Bucket].pointer.head.arrowContent)
                :remainingList.push(ptrNext.arrowFig , ptrNext.arrowContent);
                remainingList.push( hashTable[Bucket].pointer.tail.arrowFig , hashTable[Bucket].pointer.tail.arrowContent);

                await moveList( remainingList , newX, newY) ;

                await canvas.delay({time : DELAY_SHORT});
                console.log( hashTable );

                const nextLink = new Link({ color: "red", direction: "next", pos: "mid" });
                await nextLink.drawLink({ rectObj1: (index == 0 ) ? hashTable[Bucket].bucket.nextN  : hashTable[Bucket].List[index -1].Gdata.nextN , rectObj2: hashTable[Bucket].List[index +1].Gdata.node});
                hashTable[Bucket].List[index +1 ].Glink = nextLink ;
                (index == 0 ) ? hashTable[Bucket].bucket.nextN.rectElement.toFront() : hashTable[Bucket].List[index -1].Gdata.nextN.rectElement.toFront();
                await canvas.delay({time : DELAY_SHORT});
                if( index ==0 ){
                   hashTable[Bucket].pointer.head.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                   hashTable[Bucket].pointer.head.drawArrow({ rectObj: hashTable[Bucket].List[index+1].Gdata.node, fig: true, cont: true, popover: true });

                }else{
                    ptrNext.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                }              
                console.log( hashTable );
                hashTable[Bucket].List.splice( index  , 1 ) ;

                console.log( hashTable );

            }
            remove(userNotice);
         }
    };



    const updateInHT = async () =>{


         let  [ data ,  Bucket , index ] = await searchInHT( "For Updating Existing Value" ); 
         let newData ;

      if(data ){
  
         const updateNode = hashTable[Bucket].List[index].Gdata ;
         updateNode.node.rectElement.attr({ fill : "blue" });
         const ptr = await drawNodeArrow( updateNode , "index" , "blue" );
         
         while(1){
   
            newData = await inputTaker( `Enter New Data To Update ${ data } \n New Data Hash Code Should Be Same i.e( ${data%size} ) as Existing One ` );
            if( newData % size == data % size ){

               userNotice = Notice({ notice:  ` You Can Update Existing ${ data } With New Data ${ newData } \n  In Hash Table   `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
               await canvas.delay({time : DELAY_LONG * 2.5 }); 
               remove(userNotice);
               break;
            }else{
    
               userNotice = Notice({ notice:  ` You Can Not Update Existing ${ data } With New Data ${ newData }  \n  Because Hash Code doesn't Match ${ data % size } ≠ ${ newData % size }`   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
               await canvas.delay({time : DELAY_LONG * 2.5 }); 

            }
            for (let i = 0 ; i < 5 ; i++)boxArray[i].clearRect(CLEAR_OPTS); 
            remove(userNotice);

         }

         await highlightIndexWhereToPerformeTask(Bucket);

         await moveElement(boxArray[0], boxArray[0].rectElement.attr("x") , info[0].y - canvas.rectWidth * 2);
         await moveElement(boxArray[0], canvas.canvasWidth /2  - canvas.rectWidth /2 , boxArray[0].rectElement.attr("y"));

         userNotice = Notice({ notice:  `Updating Data ${ data } In Bucket ${ index } In Hash Table   \n  With New Data ${ newData } `   , color: "#34fa8d", hfi: canvas.rectHeight * 3.5 });
         await canvas.delay({time : DELAY_LONG}); 

         await moveElement(boxArray[0], updateNode.node.rectElement.attr("x") , updateNode.node.rectElement.attr("y") );
        
         await canvas.delay({time : DELAY_SHORT});
         updateNode.node.textElement.attr({ text : newData });
         hashTable[Bucket].List[index].value = newData ;

         updateNotice(userNotice, `Data  ${ newData} Updated Successfully `, "#5da5c2");

         info[1][Bucket + 1].index.rectElement.attr({ fill: previousIndexColor });
         ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
         boxArray[0].clearRect(CLEAR_OPTS);
         updateNode.node.rectElement.attr({ fill : "#70ba76" });
         await canvas.delay({time : DELAY_LONG * 1.5 }); 
         
         console.table(hashTable)
      }
      remove(userNotice);
    }



// ----------------_-----_-------++----_---------

const Buttons ={};
const createButtons = () => {
    console.log("hi sir")
    let d =0 ;
    instructions = drawText({ canvas, text: "Click Any Operation Button To Proceed", x: centerX, y: canvas.canvasHeight * 0.2, fontSize: 1.1, color: "#46099c", Return: true });

    ['Update', 'Search', 'Delete', 'Insert'].forEach((text, i) => {
        const button = createButton({
            canvas, x:  canvas.rectWidth * 0.25,
            y: canvas.pauseButton.rect.attr("y") +canvas.pauseButton.rect.attr("height") * 1.1  - i * d ,
            colorCode: i, textContent: text, padding: 9 , 
            maxWidth : i>0 ? Buttons['b1'].rect.attr("width") : 0 
        });
        Buttons[`b${i + 1}`] = button;
        d = Buttons["b1"].rect.attr("height")*1.05 ;
    });
};

const toggleMenu = (show) => {
    Object.values(Buttons).forEach(button => show ? button.enableButton() : button.disableButton());
    canvasButtons(canvas, show);
};


const initializeClicks = () => {

    const operations =   [ updateInHT, searchInHT, deleteInHT ,insertInHT];
    
    Object.values(Buttons).forEach((button, i) => {
        if (i < operations.length) button.addClickAction(async() =>{
            await toggleMenu(false);
            await operations[i]();
            await toggleMenu(true);
        });
    });

};

const clearAll = () => {
           canvas.drawYPos = centerY;
           Rect.AllBoxe = [];
           Rect.boxes = [];
           hashTable = [] ; info = [] ;
           size = 0 ;
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
    canvas.resetButton.addClickAction( menu);
    createButtons();
    canvasFunction( canvas , true);
    toggleMenu(true , Buttons );
    initializeClicks(Buttons);

})();

}catch(e){
 console.log(e)
}
}


