import * as QueenMedusa  from '../Components/Component.js';
import { getAddress } from './utilities.js'


export class Node {

    static NodeArray = [];
/**
 * Constructor function for creating a visual representation of a node in a linked list on a canvas.
 * 
 * @param {object} params - Parameters for initializing the node.
 * @param {object} params.canvasHandler - Canvas handler object for managing drawing operations.
 * @param {number} params.xposition - The x-coordinate position of the node on the canvas.
 * @param {number} params.yposition - The y-coordinate position of the node on the canvas.
 * @param {string} params.content - The content to display within the node.
 * @param {number} params.index - The index or identifier of the node.
 * @param {string} [params.color="#82f5ff"] - Optional. The color of the node. Defaults to "#82f5ff".
 * 
 * This constructor initializes a node object with properties necessary for visual representation on a canvas. It assigns the provided parameters to instance variables:
 * - canvasHandler: Manages the canvas and drawing operations.
 * - xposition: Specifies the horizontal position of the node.
 * - yposition: Specifies the vertical position of the node.
 * - content: Holds the data or content to be displayed within the node.
 * - index: Represents the index or identifier of the node, aiding in unique identification.
 * - color: Specifies the color of the node visually. If not provided, it defaults to a light blue shade.
 * 
 * Upon instantiation, the node object is initialized with null references for its own node (`node`), next node (`nextN`), and previous node (`prevN`). These references can be updated later to connect nodes in a linked list structure.
 */

    constructor({ canvasHandler, xposition, yposition, content, index, color = "#82f5ff" }) {

        Object.assign(this, { canvasHandler, xposition, yposition, content, index, color });
        this.node = this.nextN = this.prevN = null;

    }

/**
 * Asynchronously draws a node on the canvas with various configurations.
 *
 * @async
 * @function drawNode
 * @param {Object} params - The parameters for drawing the node.
 * @param {boolean} [params.node=false] - Flag indicating whether to draw the node.
 * @param {boolean} [params.cont=false] - Flag indicating whether to include content.
 * @param {boolean} [params.index=false] - Flag indicating whether to include the index.
 * @param {boolean} [params.popover=true] - Flag indicating whether to enable popover.
 * @param {boolean} [params.next=false] - Flag indicating whether to create the next node.
 * @param {boolean} [params.prev=false] - Flag indicating whether to create the previous node.
 * @param {string} [params.purpose="print"] - Purpose of the drawing, either "print" or "input".
 * 
 * @returns {Promise<void|number|*>} - Returns a Promise that resolves to `undefined`, a number, or data based on the purpose.
 * 
 * @throws {Error} - Logs any errors encountered during execution.
 * 
 * The function handles the drawing of a node with the possibility of creating and linking previous and next nodes.
 * If the purpose is "print", it draws the node as a visual element. If the purpose is "input", it processes input data.
 * It also adjusts the canvas dimensions temporarily to accommodate the drawing of neighboring nodes.
 */



    async drawNode({ node = false, cont = false, index = false, popover = true, next = false, prev = false, purpose = "print" , popoverTextArray = null  }) {

       try{ 

        if (!node) return -1;
        
        const  nodeW = this.canvasHandler.rectWidth;
        let Data ;

        const s = ["th", "st", "nd", "rd"];
        const boxText = [] ;

        let pos , ind ;
        if(this.index !="" && this.index != -1 ){
        index ? pos= ((this.index+1) < 4) ? s[this.index] : s[0] : pos ="" ;
        ind = this.index  ;
        }else{
        ind ="new";
        pos ="";
}

        
        boxText.push( [
             `👋Hi, I am ${ind}${pos} Element Of LinkedList`, 
                `Index = ${ind}, Data Value = ${this.content}`, 
                `My Address is = ${getAddress({ "val":this.content, "consecutive": false })}`
        ]);

        this.node = new QueenMedusa.Rect({ "canvasHandler":this.canvasHandler , "xposition": this.xposition, "yposition": this.yposition, "content": this.content, "index": this.index, "color": this.color });

        if (purpose === "print") await this.node.drawRect({ "rect": node, "cont": cont , "ind": index , "popover" : popover , "popoverTextArray":boxText});
        else if (purpose === "input") Data = await this.node.inputRect({ "rect": node, "cont": cont , "ind": index , "popover":popover , "popoverTextArray": boxText});
        
        if (this.canvasHandler.abort) return;

        this.canvasHandler.rectWidth *= 0.4;

        const createPrevNext = (xOffset, color ,  pA = null ) => {
            
            const neighbor = new QueenMedusa.Rect({ "canvasHandler":this.canvasHandler , "xposition":this.node.rectElement.attr("x") + xOffset, "yposition": this.node.rectElement.attr("y") , "content": "" ,  "index": "" , "color": color });
            
            neighbor.drawRect({ "rect": node , "popover": true , "popoverTextArray": pA});
            neighbor.rectElement.attr({ opacity: 0.97});
            return neighbor;
        };

 
        if (next && !this.canvasHandler.abort){ 
           const boxText = [] ;
           boxText.push( [  `👋Hi, I am Next Pointer Of This Node `, `I am Holding Address `,`Of Next Node To Me` , `Address is = ` ]);
            this.nextN = createPrevNext(nodeW, "green" , boxText );
        }

        if (prev && !this.canvasHandler.abort){

           const boxText = [] ;
           boxText.push( [  `👋Hi, I am Prev Pointer Of This Node `, `I am Holding Address `,`Of Previous Node To Me` , `Address is = ` ]);
           this.prevN = createPrevNext(-nodeW*0.4 ,  "red" , boxText);
        }

        Node.NodeArray.push( this);
        this.canvasHandler.rectWidth = nodeW;
        return purpose === "input" ? Data : undefined;
     }catch(e){
     console.error(e);
    }

    }



/**
 * Asynchronously moves the node and its neighbors (next and previous) to new coordinates.
 *
 * @async
 * @function moveTo
 * @param {Object} params - The parameters for moving the node.
 * @param {number} params.newX - The new X coordinate to move the node to.
 * @param {number} params.newY - The new Y coordinate to move the node to.
 * @param {boolean} [params.index=true] - Flag indicating whether to update the index.
 * @param {boolean} [params.node=false] - Flag indicating whether to move the current node.
 * @param {boolean} [params.next=false] - Flag indicating whether to move the next node.
 * @param {boolean} [params.prev=false] - Flag indicating whether to move the previous node.
 * 
 * @returns {Promise<void>} - A Promise that resolves when all the animations are completed.
 * 
 * @throws {Error} - Logs any errors encountered during execution.
 * 
 * This function handles the movement of the current node to the new coordinates, and optionally moves the
 * next and previous nodes. It constructs an array of animation promises and uses `Promise.allSettled` 
 * to wait for all movements to complete.
 */

  async moveTo({ newX, newY, index = true, node = false, next = false, prev = false }) {
    try {
        let animations = [];
        const mindex = Node.NodeArray.indexOf(this);
        
        if (next) {
            animations.push(new Promise((resolve) => {
                this.nextN.moveTo({ newX: newX + this.canvasHandler.rectWidth, newY: newY }).then(resolve);
            }));
        }

        if (prev) {
            animations.push(new Promise((resolve) => {
                this.prevN.moveTo({ newX: newX - this.canvasHandler.rectWidth * 0.4, newY: newY }).then(resolve);
            }));
        }

        if (node) {
            animations.push(new Promise((resolve) => {
                this.node.moveTo({ newX: newX, newY: newY, ind: true }).then(resolve);
            }));
        }

        await Promise.allSettled(animations);

    } catch (e) {
        console.error(e);
    }
}


    async MoveTo({ newX, newY, index = true, node = false, next = false, prev = false }) {
    try {
        let animations = [];
        const mindex = Node.NodeArray.indexOf(this) ;
        
        if (next) {
             animations.push(new Promise((resolve) => {
                 this.nextN.moveTo({ newX: newX + this.canvasHandler.rectWidth, newY: newY }).then(resolve)
               
             }));
        }

        if (prev) {
             animations.push(new Promise((resolve) => {
                 this.prevN.moveTo({ newX: newX - this.canvasHandler.rectWidth*0.4, newY: newY }).then(resolve)
               
             }));
        }
       if (node) {
             animations.push(new Promise((resolve) => {
                 this.node.moveTo({ newX: newX, newY: newY, ind: true }).then(resolve)
                
             }));
        }

        await Promise.allSettled(animations);

   }catch(e){
     console.error(e);
   }
}

/**
 * Asynchronously constructs a linked list visualization on the provided canvas.
 *
 * @async
 * @function Linked_List
 * @param {Object} params - The parameters for creating the linked list.
 * @param {Object} params.canvas - The canvas object to draw the linked list on.
 * @param {Array} [params.ll=[]] - An array representing the linked list elements.
 * @param {string} [params.type="singly"] - The type of linked list ("singly" or "doubly").
 * @param {string} [params.purpose="print"] - The purpose of the linked list ("print" or "input").
 * @param {Array} [params.range=[-1000, 1000, 2, 3]] - The range of values for the linked list.
 * @param {string} [params.color="purple"] - The color of the linked list nodes.
 * 
 * @returns {Promise<Array>} - A Promise that resolves with the head, tail, and null nodes of the linked list.
 * 
 * @throws {Error} - Logs any errors encountered during execution.
 * 
 * This function constructs a linked list visualization by creating nodes and arrows on the canvas. It supports both
 * singly and doubly linked lists and can be used for printing or input purposes. Nodes and links are animated and 
 * positioned dynamically based on the canvas dimensions and linked list type.
 * 
 * It initializes necessary variables such as `canvas`, `Len` (length of the linked list),
 * `centerX` (x-coordinate of the center of the canvas), `nextP` (distance between nodes),
 * and `positionOfLinkedList` (x-coordinate for positioning the linked list).
 * 
 * The function then iterates over each node in the linked list:
 * - Creates a node using the `Node` class, setting its position, content, index, and color.
 * - Draws the node on the canvas using asynchronous drawing methods.
 * - Moves the node to its designated position on the canvas.
 * - Draws arrows indicating links between nodes.
 * - Handles special cases for the head and tail of the linked list.
 * 
 * The method manages delays between operations to simulate visual transitions effectively.
 * 
 * If an error occurs during any of these operations, it is logged to the console.
 * 
 * Returns a structured output based on the `purpose` parameter:
 * - For "input", returns arrays containing references to the head and tail arrows,
 *   references to null nodes (if doubly linked list), and the modified `ll` array.
 * - For "print", returns references to the head and tail arrows and null nodes (if doubly linked list).
 */


    static async Linked_List({ "canvas": canvasObj, "ll": ll = [], "type": type = "singly", popover= false   , "purpose": purpose = "print", "range": range = [-1000, 1000, 2, 3], "color": color = "purple" }) {
    try {
   
        const canvas = canvasObj;  //.canvas;
        const spl = 600;
        const Len = (ll.length <= 0 )? canvas.currentDevice.UserLength : ll.length ;
        const centerX = canvas.canvasWidth / 2;

        let nextP , positionOfLinkedList ;
        nextP = (type ==="singly")?  canvas.rectWidth * 1.95  //1.87
                          :  canvas.rectWidth + canvas.rectWidth*1.4; //+canvas.rectWidth * 0.4;

        (type ==="singly")?  positionOfLinkedList = canvas.paper.width - Len * nextP - canvas.rectWidth * 0.8 
                          :  positionOfLinkedList = canvas.paper.width - Len * nextP + canvas.rectWidth * 1.8  ;
//positionOfLinkedList = canvas.paper.width - ((Len-1) * canvas.rectWidth + (Len*2 * canvas.rectWidth * 0.4) +  (Len-1) * canvas.rectWidth * 0.37);

        canvas.drawXPos = positionOfLinkedList / 2;

        let Null = null , NullR = null,  NullL = null , link=null , linkL=null , linkR = null;


        
        const head = new QueenMedusa.Arrow({ "canvasHandler": canvas, "cont": "head", "color": "red" });
        const newNode = new QueenMedusa.Arrow({ "canvasHandler": canvas, "cont": "newNode", "color": "green" });
        const tail = new QueenMedusa.Arrow({ "canvasHandler": canvas, "cont": "tail", "color": "blue" });

        for (let i = 0; i < Len; i++) {

            const dataV = purpose === "print" ? ll[i] : "" ;
            const node = new Node({
                "canvasHandler": canvasObj,
                "xposition": centerX - canvas.rectWidth / 2,
                "yposition": canvas.drawYPos + canvas.rectHeight * 1.5,
                "content": dataV ,
                "index": i + 1,
                "color": color
            });

            const drawNodeParams = { "node": true , "cont": true, "index": true, "next": true,
                  "prev": type === "doubly", // 'prev' is true if 'type' is "doubly", false otherwise
                  "purpose": purpose , "popoverTextArray" : null
            };

            if (purpose === "print") await node.drawNode( drawNodeParams);
            else ll.push(await node.drawNode(drawNodeParams));


            if (canvas.abort) return;
            

            const moveToArgs = { "newX": canvas.drawXPos + nextP * i, "newY": canvas.drawYPos, "index": true, "node": true, "next": true ,  "prev": type === "doubly" };
            const delayArgs = { "time": spl*0.6};

            await Node.NodeArray[i].moveTo(moveToArgs);

            if (canvas.abort) return;
            await canvas.delay({"time" : spl});

            await newNode.drawArrow({ "rectObj": Node.NodeArray[i].node });
            if (canvas.abort) return;
            await canvas.delay(delayArgs);

            
            if (canvas.abort) return;
            

            if(type ==="singly"){
            link = new Link({ "color": "black" , "direction": "next", "pos": "mid" });
            }
            else{
            linkL = new Link({ "color": "black" , "direction": "prev", "pos": "down" });
            linkR = new Link({ "color": "black" , "direction": "next", "pos": "mid" });
             }

            const nullPosition = canvas.drawXPos + nextP * (i + 1) ;

            if (i === 0) {

            newNode.clearArrow();
            await head.drawArrow({ "rectObj": Node.NodeArray[i].node });
            if (canvas.abort) return;
            await canvas.delay({ "time": spl / 2 });

            await tail.drawArrow({ "rectObj": Node.NodeArray[i].node });
            if (canvas.abort) return;
            

            const NullBox = (X) => {
               return  new QueenMedusa.Rect({
                    "canvasHandler": canvas,
                    "xposition": (nullPosition-X ),
                    "yposition": canvas.drawYPos,
                    "content": "Null",
                    "index": "null" ,
                    "color": "#3498db"

                });
               }

                if (type ==="singly"){
                 Null = NullBox(0);
                 await Null.drawRect({ "rect": node, "cont": true , "popoverTextArray":[[ `👋Hi, I am Null Position`, `My Address is = 0x00000` ]] });
                 await link.drawLink({"rectObj1":Node.NodeArray[i].nextN,  "rectObj2":Null });
                 Node.NodeArray[i].nextN.rectElement.toFront();
                }
                 else{
                   NullL = NullBox( canvas.rectWidth*0.4);
                   NullR = NullBox( canvas.rectWidth*0.4);
                   await NullL.drawRect({ "rect": node, "cont": true , "popoverTextArray":[[ `👋Hi, I am Null Position`, `My Address is = 0x00000` ]] });

                   await NullR.drawRect({ "rect": node, "cont": true , "popoverTextArray":[[ `👋Hi, I am Null Position`, `My Address is = 0x00000` ]] });

                   await NullL.moveTo({ "newX":canvas.drawXPos - (nextP)+canvas.rectWidth*0.4 , "newY": canvas.drawYPos });

                   linkL.pos = "mid" ;
                   await linkL.drawLink({"rectObj1":Node.NodeArray[i].prevN,  "rectObj2":NullL });
                   await linkR.drawLink({"rectObj1":Node.NodeArray[i].nextN,  "rectObj2":NullR });
                   Node.NodeArray[i].prevN.rectElement.toFront();
                   Node.NodeArray[i].nextN.rectElement.toFront();  
                }

              if (canvas.abort) return;
              



            } else { //  if (i === 0) this if 

                  if (type ==="singly"){
                     Link.LinkArray[Link.LinkArray.length-1].arrowFig.attr({"fill":"red" });
                     await Null.moveTo({ "newX": nullPosition, "newY": canvas.drawYPos });
                     await link.drawLink({"rectObj1":Node.NodeArray[i].nextN,  "rectObj2":Null });   
                     Node.NodeArray[i].nextN.rectElement.toFront();
                  }
                  else{
                     Link.LinkArray[Link.LinkArray.length-1].arrowFig.animate({ transform:  `t0, -${canvas.rectHeight*0.2}` }, 50);

                     Link.LinkArray[Link.LinkArray.length-1].arrowFig.attr({"fill":"green" });
                
                     await NullR.moveTo({ "newX": nullPosition - canvas.rectWidth*0.4 , "newY": canvas.drawYPos });
                     await linkL.drawLink({"rectObj1":Node.NodeArray[i].prevN,  "rectObj2":Node.NodeArray[i-1].nextN});
                     await linkR.drawLink({"rectObj1":Node.NodeArray[i].nextN,  "rectObj2":NullR });
                     Node.NodeArray[i].prevN.rectElement.toFront();
                     Node.NodeArray[i].nextN.rectElement.toFront();

                     if(i>0) Link.prevArray[Link.prevArray.length-1].arrowFig.attr({"fill":"red" });
              
                  }

                if (canvas.abort) return;
                
            }

            if (i > 0 && i < Len ) {
                if (canvas.abort) return;
                const newA = newNode.arrowFig.getBBox();
                const tailA = tail.arrowFig.getBBox();
                const dis = (newA.x - tailA.x) / canvas.nextPos;
               // await canvas.delay({ "time": 300 });
                await tail.ShiftArrow({ "steps": 0.5, "direction": "up" });
                await tail.ShiftArrow({ "steps": dis, "direction": "right" });
                if (canvas.abort) return;
                await canvas.delay({ "time": 100 });
                newNode.clearArrow();
                tail.clearArrow();
                await tail.drawArrow({ "rectObj": Node.NodeArray[i].node });
            }

            if (canvas.abort) return;
            await canvas.delay({ "time": 400 });


           if(type ==="doubly"){
               if (Node.NodeArray.length > 1 ){
                    
                    let text = Node.NodeArray[ Node.NodeArray.length-1].node.popoverRect[4].attr("text").split(" ") ;
                    let addr = text[text.length-1] ;

                    Node.NodeArray[ Node.NodeArray.length-2].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });
                
                    
                    text = Node.NodeArray[ Node.NodeArray.length-2].node.popoverRect[4].attr("text").split(" ") ;
                    addr = text[text.length-1] ;
                    Node.NodeArray[Node.NodeArray.length-1].prevN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });          
               }else{
                   Node.NodeArray[0].prevN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });
    
               }

          }else{
    
              if (Node.NodeArray.length > 1 ){
                 
                 let text = Node.NodeArray[ Node.NodeArray.length-1].node.popoverRect[4].attr("text").split(" ") ;
                 let addr = text[text.length-1] ;

                 Node.NodeArray[ Node.NodeArray.length-2].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });
              }
          }

          Node.NodeArray[Node.NodeArray.length-1].nextN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });



        }

/*
        for (let j = 0 ; j < Node.NodeArray.length -1 ; j++){

        const text = Node.NodeArray[ j+1].node.popoverRect[4].attr("text").split(" ") ;
        const addr = text[text.length-1] ;
        Node.NodeArray[j].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });
        }
        Node.NodeArray[Node.NodeArray.length-1].nextN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });
*/
        if(purpose === "input" ){
           Node.NodeArray.forEach(( e,i)=> {
           e.node.popoverRect[3].attr( { "text" : `Index = ${e.node.index}, Data Value = ${ll[i]}` });
          });
        }

        if (canvas.abort) return;
        return (purpose === "input") ? [[head, tail], [type === "singly" ? Null : NullL, NullR], ll] : [[head, tail], [type === "singly" ? Null : NullL, NullR]];

    } catch (e) {
        console.log(e);
    }
  }






} // class end


export class Link {

    static LinkArray = [];
    static prevArray = [];

/**
 * Creates an instance of Link.
 * 
 * @constructor
 * @param {Object} params - The parameters for the link.
 * @param {string} params.color - The color of the link.
 * @param {string} [params.direction="next"] - The direction of the link ("next" or "prev").
 * @param {string} [params.pos="mid"] - The position of the link ("mid", "up", or "down").
 * 
 * This constructor initializes a Link object with the specified color, direction, and position.
 * It also initializes `arrowFig` and `arrowFigPopover` to null, which will hold the graphical
 * representations of the link.
 */

    constructor({ color, direction = "next", pos = "mid" }) {
        Object.assign(this, { color, direction, pos });
        this.arrowFig = null;
        this.arrowFigPopover = null;
    }

/**
 * Draws the graphical representation of the link between two rectangles.
 * 
 * @param {Object} params - The parameters for drawing the link.
 * @param {Object} params.r1 - The first rectangle object.
 * @param {Object} params.r2 - The second rectangle object.
 * 
 * This function calculates the points for the link's arrow path based on the positions of 
 * the two rectangles and the specified direction and position. It then draws the arrow path 
 * on the canvas and animates its appearance.
 * 
 * The function handles cases where the direction of the link is "next" or "prev", and adjusts 
 * the arrow's base Y position based on whether the position is "mid", "up", or "down".
 * 
 * If the `abort` flag in `canvasHandler` is set to true, the function returns early to prevent 
 * further processing.
 * 
 * If an error occurs during the execution, it is caught and logged to the console.
 */

    drawFig({r1, r2 }) {
        try {
            if (r1.canvasHandler.abort) return;

            const { rectWidth: w, rectHeight: h, paper } = r1.canvasHandler;
            const dist = this.direction === "next"
                ? r2.rectElement.attr("x") - (r1.rectElement.attr("x") + w * 0.4 / 2)
                : Math.abs((r2.rectElement.getBBox().x + r2.rectElement.getBBox().width) - (r1.rectElement.attr("x") + w * 0.4 / 2));

            const baseY = this.pos === "mid"
                ? (r1.rectElement.attr("y") + h / 2) - h * 0.05
                : r1.rectElement.attr("y") + (this.pos === "up" ? h * 0.25 : h * 0.65);

            const calcPoints = (d, bY, dir) => [
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2, y: bY },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2 + (dir === "next" ? 0.7 : -0.7) * d, y: bY },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2 + (dir === "next" ? 0.7 : -0.7) * d, y: bY - w * 0.15 },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2 + (dir === "next" ? 1 : -1) * d, y: bY - w * 0.15 + h * 0.2 },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2 + (dir === "next" ? 1 : -1) * d - (dir === "next" ? 0.3 : -0.3) * d, y: bY - w * 0.15 + h * 0.2 + h * 0.2 },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2 + (dir === "next" ? 1 : -1) * d - (dir === "next" ? 0.3 : -0.3) * d, y: bY - w * 0.15 + h * 0.2 + h * 0.2 - h * 0.15 },
                { x: r1.rectElement.attr("x") + (w * 0.4) / 2, y: bY - w * 0.15 + h * 0.2 + h * 0.2 - h * 0.15 }
            ];

            const arrowPath = calcPoints(dist, baseY, this.direction);

            const tempPath = paper.path(arrowPath.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ') + 'Z');
            tempPath.attr({ stroke: this.color, 'stroke-width': 3, 'stroke-opacity': 0.6 })
                .animate({ 'stroke-opacity': 0 }, 500, () => tempPath.remove());

            this.arrowFig = paper.path(arrowPath.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ') + 'Z');           
            this.arrowFig.attr({ fill: this.color, stroke: 0, opacity: 0.6 });
            
        } catch(e) {
            console.error(e)
        }
    }

/**
 * Draws a link between two rectangles on the canvas.
 * 
 * @param {Object} params - Parameters for drawing the link.
 * @param {Object} params.rectObj1 - The first rectangle object.
 * @param {Object} params.rectObj2 - The second rectangle object.
 * 
 * This method draws a graphical link (arrow) between two rectangles (`rectObj1` and `rectObj2`) 
 * on the canvas. It uses the `drawFig` method internally to calculate and draw the path of the link.
 * 
 * The function checks if the `abort` flag in `canvasHandler` of `rectObj1` is true before proceeding 
 * with drawing the link. If the flag is true, indicating that drawing operations should be aborted, 
 * the function returns early without performing any drawing actions.
 * 
 * Depending on the direction specified (either "next" or "prev"), the link is stored in either 
 * `Link.LinkArray` or `Link.prevArray`.
 * 
 * If an error occurs during the execution of drawing or handling canvas operations, the error is 
 * caught and logged to the console.
 */

    async drawLink({rectObj1, rectObj2}) {
        try {
            
            if (rectObj1.canvasHandler.abort) return;

            this.drawFig({ "r1": rectObj1, "r2": rectObj2 });
            this.direction === "next" ? Link.LinkArray.push(this) : Link.prevArray.push(this);

            if (rectObj1.canvasHandler.abort) return;

        } catch(e) {
            console.log(e)
        }
    }

/**
 * Clears the graphical link (arrow) associated with this Link instance.
 * Resets related properties and removes the arrow from the canvas.
 * 
 * This method checks if `arrowFig` exists; if so, it removes it from the canvas.
 * After removing the arrow, it resets internal properties such as `color`, `direction`, `pos`, and `canvasHandler`.
 * 
 * If an error occurs during the removal of the arrow or resetting of properties, 
 * the error is caught and logged to the console.
 */

    async clearLink() {
        try {
            if (this.arrowFig) this.arrowFig.remove();

            this.arrowFig = null;
            this.color = "";
            this.direction = "";
            this.pos = "";
            this.canvasHandler = null;
        } catch(e) {
            console.log(e)
        }
    }

}