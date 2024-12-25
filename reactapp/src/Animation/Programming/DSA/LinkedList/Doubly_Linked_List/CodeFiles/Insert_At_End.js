

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas , connect , createButton , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function DInsertAtTail({ canvas }) {
    try {
        let spl = 800;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let t  , n , ll , firstllPos , count , llData , orgL = []  ;
        let  L1 , L2 , title1 , title2 , newLink1 , newLink2 , modifyNodeArray =[] , modifiedNodeArray = [] ; 

        const initialize = async () => {

            t = drawText({ canvas, text: "Insert At Tail in Linked List ", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true});
            canvas.drawYPos += canvas.rectHeight ;
            count = n = await waitForLength({ canvas , umin: 0, umax : 3 });
            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 2;
            firstllPos = canvas.drawYPos ;
            let templl;
            llData = await Node.Linked_List({ canvas, ll: templl, type: "doubly", purpose: "input", range: [-99 , 99 , 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            orgL.push(Node.NodeArray);
            orgL.push(Link.LinkArray);
            orgL.push(Link.prevArray);
            Node.NodeArray = [];
            Link.LinkArray = [];
            Link.prevArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 3;
            t.text.attr({ text: "Initial Linked List" });

            }

        const clearPrevData = async (initial=true) => {

              L2[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              L2[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              modifiedNodeArray[1].forEach( e =>  e.clearLink() );
              modifiedNodeArray[2].forEach( e =>  e.clearLink() );
              L2[1][0].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });
              L2[1][1].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });

              modifiedNodeArray[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.prevN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              title2.text.remove();
              title2.rect.remove();
              modifiedNodeArray = [] ;

              await canvas.delay({ time: 700 });

              L1[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              L1[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              newLink1.remove();
              newLink2.remove();
              modifyNodeArray[1].forEach( e =>  e.clearLink() );
              modifyNodeArray[2].forEach( e =>  e.clearLink() );
              L1[1][0].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });
              L1[1][1].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });

              modifyNodeArray[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.prevN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              title1.text.remove();
              title1.rect.remove();
              modifyNodeArray = [] ;
            
              await canvas.delay({ time: 700 });

              llData[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              llData[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              orgL[1].forEach( e =>  e.clearLink() );
              orgL[2].forEach( e =>  e.clearLink() );
              llData[1][0].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });
              llData[1][1].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });


              orgL[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.prevN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              orgL = [] ;
              t.text.attr({ text: "Updated Linked List" });
              canvas.drawYPos =  firstllPos ;

              if ( initial){
                 llData = await Node.Linked_List({ canvas, ll: ll, type: "doubly", purpose: "print", range: [-99 , 99 ,  2, 3], color: "#ff850a" });
                 orgL.push(Node.NodeArray);
                 orgL.push(Link.LinkArray);
                 orgL.push(Link.prevArray);
                 Node.NodeArray = [];
                 Link.LinkArray = [];
                 Link.prevArray = [];
                 Arrow.ArrowArray = [];

                 canvas.drawYPos += canvas.rectHeight * 3;
                 await canvas.delay({ time: 700 });
              }
           };


        const execute = async () => {

           if( count > canvas.currentDevice.UserLength ) {
               await clearPrevData(); 
           }

           count ++ ;
            title1 = drawText({ canvas, text: "Let's Insert Node At Last place in Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight, fontSize: 1.1, color: "blue" , Return: true});
            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            canvas.drawYPos += canvas.rectHeight * 1;

            drawText({ canvas, text: "Starting....", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            Node.NodeArray = [];
            L1 = await Node.Linked_List({ canvas, ll, type: "doubly", purpose: "print", range: [-99, 99], color: "#ff850a" });
            modifyNodeArray.push(Node.NodeArray) ;
            modifyNodeArray.push(Link.LinkArray) ;
            modifyNodeArray.push(Link.prevArray) ;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "let's Go.....", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });
         
            drawText({ canvas, text: "Enter data to be Inserted ?", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });


            const node = new Node({
                canvasHandler: canvas,
                xposition: Node.NodeArray[Node.NodeArray.length-1].node.rectElement.attr("x") + canvas.rectWidth * 0.8,
                yposition: Node.NodeArray[Node.NodeArray.length-1].node.rectElement.attr("y") + canvas.rectHeight * 2.3,
                content: "",
                index: -1,
                color: "#ff850a"
            });
            const nodeData = await node.drawNode({ node: true, cont: true, index: false, popover: true, next: true, prev: true , purpose: "input" });

            const newNode = new Arrow({ canvasHandler: canvas, cont: "newNode", color: "green" });
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            await newNode.drawArrow({ rectObj: Node.NodeArray[Node.NodeArray.length - 1].node });
            newNode.arrowFig.attr({ opacity: 0.4 });
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

/*
            drawText({ canvas, text: "Assign newNode next to Null \n newNode -> next = Null.", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl *1.5});


            newLink1 = connect(node, L1[1][1] , "NNtoN" , "black");
*/
            const tailindex = Node.NodeArray.length-2 ; 
            await canvas.delay({ time: spl });
   
            drawText({ canvas, text: "Assign tail next to newNode \n tail -> next = newNode .", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            await canvas.delay({ time: spl *1.5});

            newLink1 = connect( Node.NodeArray[tailindex] , node, "NtoNN" , "green", "up" );
            //Link.LinkArray[tailindex].clearLink();
            Node.NodeArray[tailindex].nextN.rectElement.toFront();


            await canvas.delay({ time: spl });
            drawText({ canvas, text: "Assign newNode prev to tail \n newNode -> prev = tail  .", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            await canvas.delay({ time: spl *1.5});

            newLink2 = connect(node, Node.NodeArray[tailindex] , "NNtoNB" , "red", "down" );
            Link.LinkArray[tailindex].clearLink();
            node.prevN.rectElement.toFront();
            if (canvas.abort) return;
            await canvas.delay({ time: spl });



            drawText({ canvas, text: "Assign newNode prev to null   \n  newNode -> prev  = null.", x: canvas.canvasWidth * 0.7, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl*1.5 });

            await L1[1][1].moveTo({ "newX": node.node.rectElement.attr("x") + canvas.rectWidth*2 , "newY": node.node.rectElement.attr("y")  ,  "ind": false }) ;

            if (canvas.abort) return;
            await canvas.delay({ time: spl*1.5 });

            Link.LinkArray[Link.LinkArray.length-1] = new Link({ "color":"black", "direction": "next", "pos": "mid" }) 

            Link.LinkArray[Link.LinkArray.length-1].drawLink({"rectObj1": node.nextN  ,"rectObj2": L1[1][1] }) ;
            node.nextN.rectElement.toFront();
            await canvas.delay({ time: spl });


            drawText({ canvas, text: "Assign tail to newNode  \n  tail = newNode.", x: canvas.canvasWidth * 0.3, y: canvas.drawYPos + canvas.rectHeight * 4.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl*1.5 });

            newNode.clearArrow();
            L1[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

            newNode.Atext = "tail";
            newNode.color = "purple";
            L1[0][1] = await newNode.drawArrow({ rectObj: Node.NodeArray[Node.NodeArray.length - 1].node });

            newNode.arrowFig.attr({ opacity: 0.7 });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });
            drawText({ canvas, clear: true  });
            ll.push(nodeData) ;

            const text1= node.node.popoverRect[4].attr("text").split(" ") ;
            Node.NodeArray[tailindex].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${text1[text1.length-1]}` });
            
            node.node.popoverRect[2].attr( { "text" : `👋Hi,I am ${ll.length}th Element In Linked List` });
            node.node.popoverRect[3].attr( { "text" : `Index = ${ll.length} , Data Value = ${ll[ll.length-1]}` });
            node.nextN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });

            canvas.drawYPos += canvas.rectHeight * 6.5;

            title2 = drawText({ canvas, text: "Linked List After Insertion At Last place", x: canvas.canvasWidth / 2, y: canvas.drawYPos - canvas.rectHeight * 2, fontSize: 1.1, color: "#46099c" , Return: true });

            Node.NodeArray = [];
            Link.LinkArray = [] ;
            Link.prevArray = [];
            L2 = await Node.Linked_List({ canvas, ll, type: "doubly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            modifiedNodeArray.push(Node.NodeArray) ;
            modifiedNodeArray.push(Link.LinkArray) ;
            modifiedNodeArray.push(Link.prevArray) ;
            Node.NodeArray = [];
            Link.LinkArray = [] ;
            Link.prevArray = [];
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Insert At Tail(last)"   });
              
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
              canvas.resetButton.disableButton();
              canvas.pauseButton.enableButton();
              canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log("Error in toggleMenu:", error);
            }
       };

              let limit ;
       const action = async () => {
            try {

              if (( canvas.currentDevice.device =="mobile" || canvas.currentDevice.device =="tablet" ) && count < canvas.currentDevice.max -1 ) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
                 limit = canvas.currentDevice.max-1;
              }
              else if ( canvas.currentDevice.device =="laptop"  && count < canvas.currentDevice.max -1   ) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
                 limit = canvas.currentDevice.max - 1 ;
              }
              else {

               if( count == limit ) {
                 count++;
                 await clearPrevData(false);
                 t.text.remove();
                 t.rect.remove();
                 t = drawText({ canvas, text: "Initial Linked List ", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true});

                 await Node.Linked_List({ canvas, ll: ll.slice(0 ,canvas.currentDevice.UserLength ), type: "doubly", purpose: "print", range: [-99, 99], color: "#ff850a" });
                 Node.NodeArray = [];
                 Link.LinkArray = [];
                 Arrow.ArrowArray = [];
                 canvas.drawYPos += canvas.rectHeight * 3;
                 title2 = drawText({ canvas, text: "updated Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight, fontSize: 1.1, color: "blue" , Return: true});
                  canvas.drawYPos += canvas.rectHeight * 2;
                 await Node.Linked_List({ canvas, ll, type: "doubly", purpose: "print", range: [-99, 99], color: "#ff850a" });
               
               }

                 drawText({ canvas, text: "Wait....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , color : "green" });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot Add Node in Linked List \n Because Canvas can't hold That much Element \n \n Create New Linked List 'click' Reset Button "  , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , color : "red" });

                 operationButton.enableButton();
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
               Link.prevArray = [];
               ll =[];
        }
        const clearAllInsert = async () => {
               
               count = n =  firstllPos = 0 ;  
               llData = [] ; 
               orgL = []  ;
               L1 = null ;  L2 = null ; t = null ;  title1 = null ;  title2 = null ; newLink1 = null ; newLink2 = null ;
               modifyNodeArray =[] ;
               modifiedNodeArray = [] ; 
               ll =[];
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               await createButtons();
               toggleMenu(false);

               clearAll();
               clearAllInsert();
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



    } catch (e) {
        console.error(e);
    }
}


/*
import {
    Rect,
    Arrow
} from '../../../Source/Main.js'


import {
    Node,
    Link
} from '../../../Source/LL_main.js'


export async function DInsertAtTail(canvas) {



    try {
        let spl = 800;


        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, "Linked List Data").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });



        canvas.drawYPos += canvas.rectHeight * 2;

        let templl;
        const llData = await Node.Linked_List(canvas, templl, "doubly", "input", [-1000, 1000, 2, 3], "#ff850a");

        const ll = [...llData[1]];


        canvas.drawYPos += canvas.rectHeight * 3;



        canvas.paper.text(centerX, canvas.drawYPos - canvas.rectHeight, "Let's Insert Node At Last place D linked List ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        canvas.drawYPos += canvas.rectHeight * 1;

        centerY = canvas.drawYPos + canvas.rectHeight * 3;


        const instructions = canvas.paper.text(canvas.canvasWidth * 0.3, centerY, "Starting....").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });


        Node.NodeArray = [];

        const L2 = await Node.Linked_List(canvas, ll, "doubly", "print", [-1000, 1000], "#ff850a");

        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        instructions.attr({
            text: "let's Go...."
        });


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        instructions.attr({
            text: "Enter data to be Inserted ?"
        });


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        const node = new Node(canvas, Node.NodeArray[Node.NodeArray.length - 1][1].rectElement.attr("x"), Node.NodeArray[0][1].rectElement.attr("y") + canvas.rectHeight * 2.5, "", -1, "#82f5ff");

        //   node.drawNode(true, true, false, true);
        const nodeData = await node.drawNode(true, true, false, true, true, "input");


        //  const newNode = new Arrow(canvas, "newNode", "green");


        const newNode = new Arrow(canvas, "newNode", "green", "down");

        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        await newNode.drawArrow(Node.NodeArray[Node.NodeArray.length - 1][0]);
        newNode.arrowFig.attr({
            opacity: 0.4
        });
        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        instructions.attr({
            text: "Assign tail next to newNode \n tail -> next = newNode."
        });



        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        let arrowPath = [];

        arrowPath.push({
            x: Node.NodeArray[Node.NodeArray.length - 2][1].rectElement.attr("x") + (canvas.rectWidth * 0.4) / 2,
            y: Node.NodeArray[Node.NodeArray.length - 2][1].rectElement.attr("y") + canvas.rectHeight * 0.20

        });


        const nodeWidth = canvas.rectWidth;

        arrowPath.push({
            x: arrowPath[0].x + nodeWidth * 0.4,
            y: arrowPath[0].y
        });
        arrowPath.push({
            x: arrowPath[1].x,
            y: arrowPath[1].y + nodeWidth * 1.6
        });

        arrowPath.push({
            x: arrowPath[2].x - (nodeWidth * 1.4),
            y: arrowPath[2].y
        });

        arrowPath.push({
            x: arrowPath[3].x,
            y: arrowPath[3].y + nodeWidth * 0.9
        });
        arrowPath.push({
            x: arrowPath[4].x + nodeWidth * 0.3,
            y: arrowPath[4].y
        });



        arrowPath.push({
            x: arrowPath[5].x,
            y: arrowPath[5].y - nodeWidth * 0.15
        });



        // arrow
        arrowPath.push({
            x: arrowPath[6].x + nodeWidth * 0.2,

            y: arrowPath[6].y + nodeWidth * 0.2
        });


        arrowPath.push({
            x: arrowPath[7].x - nodeWidth * 0.2,
            y: arrowPath[7].y + nodeWidth * 0.2
        });


        arrowPath.push({
            x: arrowPath[8].x,
            y: arrowPath[8].y - nodeWidth * 0.15
        });


        arrowPath.push({
            x: arrowPath[9].x - nodeWidth * 0.4,
            y: arrowPath[9].y
        });


        arrowPath.push({
            x: arrowPath[10].x,
            y: arrowPath[10].y - nodeWidth * 1.1
        });


        arrowPath.push({
            x: arrowPath[11].x + nodeWidth * 1.4,
            y: arrowPath[11].y
        });


        arrowPath.push({
            x: arrowPath[12].x,
            y: arrowPath[12].y - nodeWidth * 1.4
        });


        arrowPath.push({
            x: arrowPath[13].x - nodeWidth * 0.3,
            y: arrowPath[13].y
        });




        const tempPath1 = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');
        tempPath1.attr({
            stroke: "red",
            'stroke-width': 3,
            'stroke-opacity': 0.6
        });

        // Animate the drawing of the temporary path
        tempPath1.animate({
            'stroke-opacity': 0
        }, 500, function() {
            // Animation complete
            tempPath1.remove(); // Remove the temporary path after animation
        });
        // Draw the arrow on the canvas.paper
        const arrow1 = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');

        arrow1.attr({
            fill: "red",
            stroke: 0,
            opacity: 0.6
        });




        Link.LinkArray[Link.LinkArray.length - 1].clearLink();

        await canvas.delay(spl);

        instructions.attr({
            text: "Assign newNode prev to tail  \n newNode -> prev  = tail."
        });



        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        //newNode prev to previous node


        arrowPath = [];



        arrowPath.push({
            x: Node.NodeArray[Node.NodeArray.length - 1][2].rectElement.attr("x") + (canvas.rectWidth * 0.4) / 2,
            y: Node.NodeArray[Node.NodeArray.length - 1][2].rectElement.attr("y") + canvas.rectHeight * 0.7

        });

        arrowPath.push({
            x: arrowPath[0].x - nodeWidth * 0.8, // right
            y: arrowPath[0].y
        });
        arrowPath.push({
            x: arrowPath[1].x,
            y: arrowPath[1].y - nodeWidth * 1.6 // up
        });

        arrowPath.push({
            x: arrowPath[2].x + (nodeWidth * 1.25), // left 
            y: arrowPath[2].y
        });

        arrowPath.push({
            x: arrowPath[3].x,
            y: arrowPath[3].y - nodeWidth * 0.55 // up
        });

        arrowPath.push({
            x: arrowPath[4].x + nodeWidth * 0.15,
            y: arrowPath[4].y
        });



        // arrow
        arrowPath.push({
            x: arrowPath[5].x - nodeWidth * 0.2,

            y: arrowPath[5].y - nodeWidth * 0.2
        });
        arrowPath.push({
            x: arrowPath[6].x - nodeWidth * 0.2,
            y: arrowPath[6].y + nodeWidth * 0.2
        });






        arrowPath.push({
            x: arrowPath[7].x + nodeWidth * 0.15,
            y: arrowPath[7].y
        });


        arrowPath.push({
            x: arrowPath[8].x,
            y: arrowPath[8].y + nodeWidth * 0.45 // down
        });
        arrowPath.push({
            x: arrowPath[9].x - nodeWidth * 1.25, // right 
            y: arrowPath[9].y
        });

        arrowPath.push({
            x: arrowPath[10].x,
            y: arrowPath[10].y + nodeWidth * 1.8 // down
        });

        arrowPath.push({
            x: arrowPath[11].x + nodeWidth * 0.9, // left 
            y: arrowPath[11].y
        });


        if (canvas.abort) {
            return;
        }


        const tempPath2 = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');
        tempPath2.attr({
            stroke: "green",
            'stroke-width': 3,
            'stroke-opacity': 0.6
        });

        // Animate the drawing of the temporary path
        tempPath2.animate({
            'stroke-opacity': 0
        }, 500, function() {
            // Animation complete
            tempPath2.remove(); // Remove the temporary path after animation
        });

        // Draw the arrow on the canvas.paper
        const arrow2 = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');

        arrow2.attr({
            fill: "green",
            stroke: 0,
            opacity: 0.6
        });






        await canvas.delay(spl);

        instructions.attr({
            text: "Assign newNode next to null  \n newNode -> next = null."
        });




        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        arrowPath = [];

        // newNode  next to nextNode 

        arrowPath.push({
            x: Node.NodeArray[Node.NodeArray.length - 1][1].rectElement.attr("x") + (canvas.rectWidth * 0.4) / 2,
            y: Node.NodeArray[Node.NodeArray.length - 1][1].rectElement.attr("y") + canvas.rectHeight * 0.45

        });


        //   const nodeWidth = canvas.rectWidth;

        arrowPath.push({
            x: arrowPath[0].x + nodeWidth * 0.4, // right
            y: arrowPath[0].y
        });
        arrowPath.push({
            x: arrowPath[1].x,
            y: arrowPath[1].y - nodeWidth * 1 // up
        });

        arrowPath.push({
            x: arrowPath[2].x - (nodeWidth * 0.9), // left 
            y: arrowPath[2].y
        });

        arrowPath.push({
            x: arrowPath[3].x,
            y: arrowPath[3].y - nodeWidth * 1.55 // up
        });

        arrowPath.push({
            x: arrowPath[4].x + nodeWidth * 0.15,
            y: arrowPath[4].y
        });



        arrowPath.push({
            x: arrowPath[5].x,
            y: arrowPath[5].y - nodeWidth * 0.15
        });


        // arrow
        arrowPath.push({
            x: arrowPath[6].x + nodeWidth * 0.2,

            y: arrowPath[6].y + nodeWidth * 0.2
        });
        arrowPath.push({
            x: arrowPath[7].x - nodeWidth * 0.2,
            y: arrowPath[7].y + nodeWidth * 0.2
        });




        arrowPath.push({
            x: arrowPath[8].x,
            y: arrowPath[8].y - nodeWidth * 0.15
        });


        arrowPath.push({
            x: arrowPath[9].x - nodeWidth * 0.05,
            y: arrowPath[9].y
        });


        arrowPath.push({
            x: arrowPath[10].x,
            y: arrowPath[10].y + nodeWidth * 1.35 // down
        });
        arrowPath.push({
            x: arrowPath[11].x + nodeWidth * 0.9, // right 
            y: arrowPath[11].y
        });

        arrowPath.push({
            x: arrowPath[12].x,
            y: arrowPath[12].y + nodeWidth * 1.2 // down
        });

        arrowPath.push({
            x: arrowPath[13].x - nodeWidth * 0.5, // left 
            y: arrowPath[13].y
        });


        if (canvas.abort) {
            return;
        }


        const tempPath = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');
        tempPath.attr({
            stroke: "red",
            'stroke-width': 3,
            'stroke-opacity': 0.6
        });

        // Animate the drawing of the temporary path
        tempPath.animate({
            'stroke-opacity': 0
        }, 500, function() {
            // Animation complete
            tempPath.remove(); // Remove the temporary path after animation
        });

        // Draw the arrow on the canvas.paper
        const arrow = canvas.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');

        arrow.attr({
            fill: "red",
            stroke: 0,
            opacity: 0.6
        });




        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        instructions.attr({
            text: "Assign tail to newNode  \n  tail  = newNode .."
        });



        console.log("LinkArray")
        console.log(Link.LinkArray)


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        L2[1].clearArrow();
        await newNode.clearArrow();

        newNode.Atext = "tail";
        newNode.color = "blue";
        await newNode.drawArrow(Node.NodeArray[Node.NodeArray.length - 1][0]);
        newNode.arrowFig.attr({
            opacity: 0.4
        });


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        ll.push(nodeData);
        instructions.remove();

        canvas.drawYPos += canvas.rectHeight * 7.5;

        const t = canvas.paper.text(canvas.canvasWidth / 2, canvas.drawYPos - canvas.rectHeight * 2, "Liked List After Insertion At End ").attr({
            "font-size": canvas.cfontSize * 1.5,
            fill: "#46099c"
        });

        Node.NodeArray = [];

        await Node.Linked_List(canvas, ll, "doubly", "print", [-1000, 1000], "#ff850a");

    } catch (e) {

        console.log(e);
    }


}

*/