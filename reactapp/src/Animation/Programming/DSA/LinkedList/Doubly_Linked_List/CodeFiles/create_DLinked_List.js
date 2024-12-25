


import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, getAddress , canvasFunction ,  waitForLength , clearCanvas , createButton} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function CreateDLL({canvas}) {
    try {
        let spl = 1500;
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos , ll = []  , n , nextP;

        const s = ["th", "st", "nd", "rd"];
        let i = 0 ;
        let NullR = null , title = null ;
        let NullL = null , instructions;

        const head = new Arrow({ "canvasHandler":canvas , "cont": "head"  , "color": "red" , "direction": "up" });
        const newNode = new Arrow({ "canvasHandler":canvas , "cont": "newNode"  , "color": "green" , "direction": "up" });
        const tail = new Arrow({ "canvasHandler":canvas , "cont": "tail"  , "color": "blue" , "direction": "up" });

        const initialize = async () => {

            title = drawText({ canvas, text: "Create S Linked List", x: centerX, y: centerY /2 , Return: true  , fontSize: 1.1, color: "#46099c" });
  
            //n = await waitForLength(0 , 1) ;
            if (( canvas.currentDevice.device =="mobile" || canvas.currentDevice.device =="tablet" )   ) {
               n = await waitForLength({ canvas , umin: 0, umax : 1 });                
            }
            else if ( canvas.currentDevice.device =="laptop"   ) {
               n = await waitForLength({ canvas , umin: 0, umax : 2 });
            }

            canvas.currentDevice.UserLength = n ; 
            canvas.drawYPos += canvas.rectHeight * 3;

            nextP =  canvas.rectWidth + canvas.rectWidth * 1.17; //+canvas.rectWidth * 0.4;
            const positionOfLinkedList = canvas.paper.width - ((n-1) * canvas.rectWidth + (n*2 * canvas.rectWidth * 0.4) +  (n-1) * canvas.rectWidth * 0.37);

            canvas.drawXPos = positionOfLinkedList / 2;
      
            drawText({ canvas, text: "Click Button ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
  
            canvas.drawYPos += canvas.rectHeight ;
        };

        const execute = async () => {

            if (canvas.abort) return;

            const boxText = [] ;
            let pos = (i < 4) ? s[i] : s[0];
            boxText.push( [
                `👋Hi, I am ${i+1}${pos} Element Of LinkedList`, 
                `Index = ${i+1}, Data Value = `, 
                `My Address is = ${getAddress({ "val": Math.floor(Math.random() * 99)    , "consecutive": false })}`
            ]);

           
            drawText({ canvas, text: "Enter Data In Data Field", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
            const node = new Node({ canvasHandler: canvas, xposition: centerX - canvas.rectWidth*0.7 , yposition: canvas.drawYPos + canvas.rectHeight *2.5 ,  content: "" , index: i + 1, color: "#ff850a" });
            const data = await node.drawNode({ node: true, cont: true, index: true, popover: true , next: true , prev:true  , popoverTextArray : boxText , "purpose": "input" });
            ll.push( data );

            const nextlLink = new Link({ color: "black", direction: "next", pos: "mid" });
            const prevLink = new Link({ color: "red", direction: "prev", pos: "down" });

            if (canvas.abort) return;
            await canvas.delay({ time: 500 });
            //Rect.boxes[i].moveTo({ newX: x1 , newY: y1 , index: false });


            if (i == 0) {

                await Node.NodeArray[i].moveTo({ newX: canvas.drawXPos + nextP * i, newY: canvas.drawYPos, index: true  , node : true, next: true , prev:true});
               if (canvas.abort) return;

                drawText({ canvas, text: "Create newNode Pointer \n Assign To Current Node ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                await canvas.delay({ time: spl*1.5 });
                await newNode.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });

                drawText({ canvas, text: "Create head Pointer \n Assign To newNode \n head = newNode ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                if (canvas.abort) return;
                await canvas.delay({ time: spl*1.5 });
                newNode.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                if (canvas.abort) return;
             
                await head.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });
                if (canvas.abort) return;
             
                drawText({ canvas, text: "Create tail Pointer \n Assign To newNode \n tail = newNode ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
              
                await canvas.delay({ time: spl*1.5 });
                await tail.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                drawText({ canvas, text: "Assign tail next to Null \n tail -> prev  = Null ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                if (canvas.abort) return;
                await canvas.delay({ time: 700});

                NullR = new Rect({ canvasHandler:canvas, xposition: canvas.drawXPos + nextP * (i + 1) - canvas.rectWidth*0.4 , yposition: canvas.drawYPos, content: "Null", index: -1, color: "#3498db" });
                const boxText1 = [ [
                `👋Hi, I am Null  `, 
                `Address = 0x00000`
                ]] ;

                NullL = new Rect({ canvasHandler:canvas, xposition: canvas.drawXPos - nextP * (i + 1) + canvas.rectWidth*0.4 , yposition: canvas.drawYPos, content: "Null", index: -1, color: "#3498db" });
                const boxText2 = [ [
                `👋Hi, I am Null  `, 
                `Address = 0x00000`
                ]] ;

                
                drawText({ canvas, text: "Assign tail prev to Null \n tail -> prev  = Null ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                prevLink.pos = "mid" ;
                prevLink.color ="black"
                NullL.drawRect({ "rect": true, "cont": true, "ind": false, "popover": true ,  "popoverTextArray": boxText1 });
                if (canvas.abort) return;
                await canvas.delay({ time: spl*1.5 });

                await prevLink.drawLink({ rectObj1: Node.NodeArray[i].prevN, rectObj2: NullL });
                Node.NodeArray[i].prevN.rectElement.toFront();

                drawText({ canvas, text: "Assign tail next to Null \n tail -> next = Null ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                NullR.drawRect({ "rect": true, "cont": true, "ind": false, "popover": true ,  "popoverTextArray": boxText2});

                await canvas.delay({ time: spl*1.5});
                await nextlLink.drawLink({ rectObj1: Node.NodeArray[i].nextN, rectObj2: NullR });
                Node.NodeArray[i].nextN.rectElement.toFront();
            } else {
                drawText({ canvas, text: "Assign tail next to newNode  \n tail -> next = newNode", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                await canvas.delay({ time: spl });
                await Node.NodeArray[i].moveTo({ newX: canvas.drawXPos + nextP * i  , newY: canvas.drawYPos, index: true  , node : true, next: true , prev:true});

                if (canvas.abort) return;
                 await canvas.delay({ time: 700 });
                await newNode.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                Link.LinkArray[Link.LinkArray.length-1].arrowFig.animate({ transform:  `t0, -${canvas.rectHeight*0.2}` }, 50);
                Link.LinkArray[Link.LinkArray.length-1].arrowFig.attr({ "fill":"green" });
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });
                
                drawText({ canvas, text: "Assign  newNode prev to tail \n newNode -> prev  = tail ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                if (canvas.abort) return;
                await canvas.delay({ time: spl });
                await prevLink.drawLink({ rectObj1: Node.NodeArray[i].prevN , rectObj2: Node.NodeArray[i-1].nextN });
                Node.NodeArray[i].nextN.rectElement.toFront();

                drawText({ canvas, text: "Assign newNode Next Pointer to Null\n newNode -> next = Null ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                if (canvas.abort) return;
                await canvas.delay({ time: spl});

                await NullR.moveTo({ newX: canvas.drawXPos + nextP * (i + 1) - canvas.rectWidth*0.4 , newY: canvas.drawYPos });
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                if (canvas.abort) return;
                await canvas.delay({ time: 700 });

                await nextlLink.drawLink({ rectObj1: Node.NodeArray[i].nextN, rectObj2: NullR});
                 Node.NodeArray[i].nextN.rectElement.toFront();
            }

            if (i > 0 && i < n ) {
                drawText({ canvas, text: "Assign tail Pointer to newNode \n tail = tail -> next  ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                if (canvas.abort) return;
                await canvas.delay({ time: 700 });
                drawText({ canvas, text: "Shift tail Pointer to next Node \n tail = tail -> next ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "#46099c" });
                
                if (canvas.abort) return;

                const newA = newNode.arrowFig.getBBox();
                const tailA = tail.arrowFig.getBBox();
                const dis = (newA.x - tailA.x) / canvas.nextPos;

                await canvas.delay({ time: 500 });
                await tail.ShiftArrow({ steps: 0.5, direction: "up" });
                await tail.ShiftArrow({ steps: dis, direction: "right" });

                if (canvas.abort) return;
                newNode.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                tail.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                await tail.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });
            }

            if (canvas.abort) return;
            await canvas.delay({ time: 800 });
            drawText({ canvas, clear: true});
            i++ ;

        console.log(Node.NodeArray.length)

        if (Node.NodeArray.length > 1 ){
        console.log("next address set")
        let text = Node.NodeArray[ Node.NodeArray.length-1].node.popoverRect[4].attr("text").split(" ") ;
        let addr = text[text.length-1] ;

        Node.NodeArray[ Node.NodeArray.length-2].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });
                
        console.log("prev address set")
         text = Node.NodeArray[ Node.NodeArray.length-2].node.popoverRect[4].attr("text").split(" ") ;
        addr = text[text.length-1] ;
        Node.NodeArray[Node.NodeArray.length-1].prevN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });          
        }else{
        Node.NodeArray[0].prevN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });
    
        }
        Node.NodeArray[Node.NodeArray.length-1].nextN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });


        };


 //-_-------_--------_------_-------_--------_---------_





 //-_-------_--------_------_-------_--------_---------_

        let operationButton , introButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.84 , colorCode : 2 , textContent : "New Node"   });
              introButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.9 , colorCode : 0 , textContent : "Introduction"   });
       
            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

       const toggleMenu = (show) => {
            try {
              if (show){
              operationButton.enableButton();
              
              canvas.resetButton.enableButton();
              canvas.pauseButton.disableButton();
              canvas.playButton.disableButton();
              }else{
              operationButton.disableButton();
              introButton.disableButton();
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };


       async function showPopOver(element ) {
         try{
           // Programmatically trigger the click event
           const clickEvent = new MouseEvent('click', { view: window,  bubbles: true ,  cancelable: true  });
           element.node.indexTextElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":1000});
           element.node.textElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":2000});
           element.node.rectElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":5000});
           element.node.indexTextElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":1000});
           element.node.textElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":2000});
           element.node.rectElement.node.dispatchEvent(clickEvent);

           await canvas.delay({"time":1000});
           element.prevN.rectElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":4500});
           element.prevN.rectElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":1000});
           element.nextN.rectElement.node.dispatchEvent(clickEvent);
           await canvas.delay({"time":4500});
           element.nextN.rectElement.node.dispatchEvent(clickEvent);

         }catch(e){
         console.error(e);
         }
       }

       let controFlag = false , copynode = null , orderToUser = null  , indexBox = null  , index  ;

       const AccessElement = async () => {
          try{
            if (!controFlag){
                toggleMenu(false);

                orderToUser  = drawText({ canvas, text: "Enter Index To Access Element.\n Of Range { 1 - " + (ll.length ) + " }", x: centerX / 2, y: canvas.canvasHeight * 0.85  , fontSize: 0.85, color: "#46099c" , Return: true });
                const g = orderToUser.rect.getBBox();

                indexBox = new Rect({ "canvasHandler": canvas , "xposition": g.x + g.width * 1.1 , "yposition": g.y -  canvas.rectHeight /2 + g.height/2 , "content": "" , "index": null , "color": "#F4C430" });

                index = await indexBox.inputRect({"rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [1, ll.length], "plc": "i" , "popoverTextArray": null });

                let text = Node.NodeArray[index-1].node.popoverRect[4].attr("text").split(" ") ;
                let addr = text[text.length-1] ;
                
                copynode = new Node({ canvasHandler: canvas, xposition: Node.NodeArray[index-1].node.rectElement.attr("x") , yposition: Node.NodeArray[index-1].node.rectElement.attr("y") , content: Node.NodeArray[index-1].node.content, index: Node.NodeArray[index-1].node.index ,  color: "#ff850a" });
                await copynode.drawNode({ node: true, cont: true, index: true, popover: true, next: true, prev: true, popoverTextArray: null ,  purpose: "print" });
                await canvas.delay({"time":700});

                copynode.node.popoverRect[4].attr( { "text" : `My Address Is = ${addr}` });

                text = Node.NodeArray[index-1].prevN.popoverRect[5].attr("text").split(" ") ;
                addr = text[text.length-1] ;

                copynode.prevN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });

                text = Node.NodeArray[index-1].nextN.popoverRect[5].attr("text").split(" ") ;
                addr = text[text.length-1] ;

                copynode.nextN.popoverRect[5].attr( { "text" : `My Address Is = ${addr}` });

                await copynode.moveTo({ newX:centerX - canvas.rectWidth / 2 , newY: canvas.drawYPos +  canvas.rectHeight * 5 , index: true  , node : true, next: true , prev:true});
                await canvas.delay({"time":1500});
                await showPopOver(copynode);

                controFlag =! controFlag ;
                introButton.enableButton();
             }
             else{

                await indexBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                orderToUser.text.remove() ;
                orderToUser.rect.remove() ;

                await copynode.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                await copynode.nextN.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                await copynode.prevN.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

                controFlag =! controFlag ;
                toggleMenu(true);
                 introButton.enableButton();
             }

            }catch(e){
         console.error(e);
         }
        }


       let limit ;
       const action = async () => {
            try {

              if (( canvas.currentDevice.device =="mobile" || canvas.currentDevice.device =="tablet" ) && i < canvas.currentDevice.UserLength  ) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
                 limit = canvas.currentDevice.UserLength;
              }
              else if ( canvas.currentDevice.device =="laptop"  && i < canvas.currentDevice.UserLength   ) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
                 limit = canvas.currentDevice.UserLength;
              }
              else {
                 operationButton.enableButton();
                 introButton.enableButton();
                 drawText({ canvas, text: "Wait....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , color : "green" });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot Add Node in Linked List \n Because Canvas can't hold That much Element \n \n Create New Linked List 'click' Reset Button "  , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , color : "red" });


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
               Arrow.ArrowArray = [];
               Node.NodeArray = [];
               Link.LinkArray = [];
               i = 0 ;
               Null = null;
               instructions = null ;
               ll =[];
      }


      const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               await createButtons();
               toggleMenu(false);

               clearAll();
            
               await initialize();

               toggleMenu(true);
               initializeClicks();
             } catch (error) {
                console.error( error);
             }
      };

      const initializeClicks = () => {
          try{
           operationButton.addClickAction(action);
           introButton.addClickAction(AccessElement);
          }catch(e){
          console.log(e)
          }
      };

      ( async ()=> {
            await initialize();
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
           
            await createButtons( );

            initializeClicks();
            introButton.disableButton();
      })();







/*


        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.8 , colorCode : 2 , textContent : "New Node" ,    });
              
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

       const action = async () => {
            try {
              if (i <  n) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              } else {
                 drawText({ canvas, text: "Wait...... ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "green" });
                 
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot Add Node in Linked List \n Because Canvas can't hold That much Element \n \n Create New Linked List 'click' Reset Button ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 6 ,   fontSize: 1 ,  color: "red" });
              }
            } catch (error) {
               console.log(error);
               toggleMenu(true);
            }
        };

        const clearAll = () => {
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [];
               Rect.boxes = [];
               Arrow.ArrowArray = [];
               Node.NodeArray = [];
               Link.LinkArray = [];
               i = 0 ;
               NullR = null;
               NullL = null ;
               instructions = null ;
               ll =[];
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               await createButtons();
               toggleMenu(false);

               clearAll();
               await initialize();

               toggleMenu(true);
               initializeClicks();
             } catch (error) {
                console.error("Error in menu:", error);
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
            await initialize();
            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);

            await createButtons( );
            initializeClicks();
       })();

*/

    } catch (e) {
        console.log(e);
    }
}