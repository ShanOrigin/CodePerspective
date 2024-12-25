

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas, connect , createButton, canvasFunction  } from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function DDeleteAtTail({ canvas }) {
    try {
        let spl = 1200;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let instructions, ll, notify, L2, cnt = 0 , n ;

        const initialize = async () => {
            const t = drawText({ canvas, text: "Delete At Tail in Linked List", x: centerX, y: centerY / 2, fontSize: 1.1, color: "#46099c" , Return: true });

            n = await waitForLength({ canvas , umin: 0 , umax: 1 });

            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 3;

            const llData = await Node.Linked_List({ canvas, ll: [], type: "doubly", purpose: "input", range: [-1000, 1000, 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            t.text.attr({ text: "Initial Linked List" });
            Node.NodeArray = [];
            Link.LinkArray = [];
            Link.prevArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 5.5;
            notify = drawText({ canvas, text: "Let's Delete Node At Last place in Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 3 , Return : true });
        };

        const execute = async () => {
            notify.text.attr({ text: "Let's Delete Node At Last place in Linked List" });

            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            drawText({ canvas, text: "Starting....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            if (cnt === 0) {
                Node.NodeArray = [];
                Link.LinkArray = [];
                Link.prevArray = [];
                L2 = await Node.Linked_List({ canvas, ll, type: "doubly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            }
            cnt++;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "let's Go....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const ptr = new Arrow({ canvasHandler: canvas, cont: "ptr", color: "green" });
            const ptrNext = new Arrow({ canvasHandler: canvas, cont: "ptrNext", color: "purple" });

            if (canvas.abort) return;

            drawText({ canvas, text: "Create ptr And Assign To head ;  ptr = head \n Create ptrNext And Assign To head->next ;\n  ptrNext = head->next ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            await canvas.delay({ time: spl * 1.5 });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const currB = Node.NodeArray[0].node.rectElement.getBBox();
            const nexB = Node.NodeArray[1].node.rectElement.getBBox();
            const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);

            let j ;
            drawText({ canvas, text: "Iterate While ptrNext -> next != Null" ,  x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            for ( j =0 ; j < Node.NodeArray.length - 2 ; j++) {
            
            if (canvas.abort) return;

            await ptr.drawArrow({ rectObj: Node.NodeArray[j].node });
            await ptrNext.drawArrow({ rectObj: Node.NodeArray[j+1].node });

            ptr.arrowFig.attr({ opacity: 0.4 });

            await canvas.delay({ time: spl * 1.5 });
            await ptr.ShiftArrow({ steps: 0.5, direction: "up" });
            await ptr.ShiftArrow({ steps: dis, direction: "right" });

            await ptrNext.ShiftArrow({ steps: 0.5, direction: "up" });
            await ptrNext.ShiftArrow({ steps: dis, direction: "right" });

            ptr.clearArrow({ fig: true, cont: true, dfba: false });
            ptrNext.clearArrow({ fig: true, cont: true, dfba: false });

            }
            drawText({ canvas, text: "Stop Iteration Because ptrNext -> next == Null" ,  x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            await ptr.drawArrow({ rectObj: Node.NodeArray[j].node });
            await ptrNext.drawArrow({ rectObj: Node.NodeArray[j+1].node });

            ptr.arrowFig.attr({ opacity: 0.4 });
            ptrNext.arrowFig.attr({ opacity: 0.4 });


            if (canvas.abort) return;
            await canvas.delay({ time: spl * 1.2 });


            const deleted = ll.splice( ll.length-1 , 1);

            drawText({ canvas, text: "Unlink ptrNext or Free ptrNext Or delete ptrNext", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            Link.LinkArray[Link.LinkArray.length-1].clearLink();
            await canvas.delay({ time: 400 });
            Link.LinkArray[Link.LinkArray.length-2].clearLink();
            Link.prevArray[Link.prevArray.length-1].clearLink();
          
            await canvas.delay({ time: spl * 1.5 });


            ptrNext.clearArrow({ fig: true, cont: true, dfba: false });
            await canvas.delay({ time: 400 });
            L2[0][1].clearArrow({ fig: true, cont: true, dfba: false });
            const g = Node.NodeArray[Node.NodeArray.length-1].node.rectElement.getBBox();
          
            Node.NodeArray[Node.NodeArray.length-1].node.clearRect({ rect: true, cont: true, ind: true, dfba: false });
            Node.NodeArray[Node.NodeArray.length-1].nextN.clearRect({ rect: true, cont: false, ind: false, dfba: false });
            Node.NodeArray[Node.NodeArray.length-1].prevN.clearRect({ rect: true, cont: false, ind: false, dfba: false });

            await canvas.delay({ time: 400 });
            Link.LinkArray.splice(Link.LinkArray.length-1 , 1);
            Link.prevArray.splice(Link.prevArray.length-1 , 1);
            Node.NodeArray.splice(Node.NodeArray.length-1 , 1);


            drawText({ canvas, text: "Assign ptr next to Null ; ptr->next = Null ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });

            await canvas.delay({ time: spl * 1.5 });

            Link.LinkArray[Link.LinkArray.length-1] = new Link({ "color": "black" , "direction": "next", "pos": "mid" }) 
            await L2[1][1].moveTo({ "newX":g.x - canvas.rectWidth * 0.4 , "newY": g.y ,  "ind": false }) ;
 
            await canvas.delay({ time: 150 });
            await Link.LinkArray[Link.LinkArray.length-1].drawLink({"rectObj1": Node.NodeArray[Node.NodeArray.length-1].nextN, "rectObj2": L2[1][1] }) ;

            drawText({ canvas, text: "Assign tail to ptr ; tail = ptr ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3  });
            Node.NodeArray[Node.NodeArray.length-1].nextN.rectElement.toFront();
            await canvas.delay({ time: spl * 1.5 });

            ptr.clearArrow({ fig: true, cont: true, dfba: false });
            ptr.Atext = "tail";
            await ptr.drawArrow({ rectObj: Node.NodeArray[Node.NodeArray.length-1].node });


            await canvas.delay({ time: spl * 1.5 });
        
            drawText({ canvas,  clear : true  });

            notify.text.attr({ text: `Last Node(${deleted}) Deleted Successfully` });
            await canvas.delay({ time: spl * 3.5 });

            notify.text.attr({ text: "Current Linked List is Look like This" });
            Arrow.ArrowArray.forEach(e => {
                e.clearArrow({ fig: true, cont: true, dfba: false });
            });
            Node.NodeArray.forEach(e => {
                e.node.clearRect({ rect: true, cont: true, ind: true, dfba: false });
                e.nextN.clearRect({ rect: true, cont: false, ind: false, dfba: false });
                e.prevN.clearRect({ rect: true, cont: false, ind: false, dfba: false });

            });
            Link.LinkArray.forEach(e => {
                e.clearLink();
            });
            Link.prevArray.forEach(e => {
                e.clearLink();
            });
            L2[1][0].clearRect({ rect: true, cont: true, ind: false, dfba: false });
            L2[1][1].clearRect({ rect: true, cont: true, ind: false, dfba: false });

            Node.NodeArray = [];
            Link.LinkArray = [];
            Link.prevArray = [];
            L2 = await Node.Linked_List({ canvas, ll, type: "doubly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });


        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.85 , colorCode : 2 , textContent : "Delete At End" ,    });
              
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

       const action = async () => {
            try {
              if (ll.length > 1) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              } else {
             
                 drawText({ canvas, text: "Wait.......", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3 , color : "green"  });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot delete Node From Linked List \n Otherwise You will Lose the Whole Linked List \n \n Create New Linked List 'click'  Reset Button" ,  x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3 , color : "red" });

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
               Link.prevArray = [];
               Link.LinkArray = [];
               cnt = 0 ;
               L2 = null;            
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


    } catch (e) {
        console.error(e);
    }
}