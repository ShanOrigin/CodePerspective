
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas, connect , createButton , canvasFunction } from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function DeteleAtHead({ canvas }) {
    try {
        let spl = 800;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let instructions, ll, notify, L2, cnt = 0 , n;

        const initialize = async () => {
            const t =  drawText({ canvas, text: "Delete At Head in Linked List", x: centerX, y: centerY / 2, fontSize: 1.1, color: "#46099c" , Return: true });

            n = await waitForLength({ canvas , umin: 0 , umax: 0 });

            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 2.5 ;

            const llData = await Node.Linked_List({ canvas, ll: [], type: "singly", purpose: "input", range: [-1000, 1000, 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            t.text.attr({ text: "Initial Linked List" });
            Node.NodeArray = [];
            Link.LinkArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 4.5;
            notify = drawText({ canvas, text: "Let's Delete Node At First place in Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 2.5, fontSize: 1.2, color: "blue" , Return: true});
            
        };

        const execute = async () => {
            notify.text.attr({ text: "Let's Delete Node At First place in Linked List" });

            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            drawText({ canvas, text: "Starting....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c" });

            if (cnt === 0) {
                Node.NodeArray = [];
                Link.LinkArray = [];
                L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            }
            cnt++;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "let's Go....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const ptr = new Arrow({ canvasHandler: canvas, cont: "ptr", color: "green" });
            if (canvas.abort) return;

            drawText({ canvas, text: "Create ptr And Assign To head \n  ptr = head", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c" });

            await canvas.delay({ time: spl * 1.5 });

            await ptr.drawArrow({ rectObj: Node.NodeArray[0].node });
            ptr.arrowFig.attr({ opacity: 0.4 });
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "Assign head to head->next \n  head = head->next", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c" });

            if (canvas.abort) return;

            const currB = Node.NodeArray[0].node.rectElement.getBBox();
            const nexB = Node.NodeArray[1].node.rectElement.getBBox();
            const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);

            await canvas.delay({ time: spl * 1.5 });
            await L2[0][0].ShiftArrow({ steps: 0.5, direction: "up" });
            await L2[0][0].ShiftArrow({ steps: dis, direction: "right" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl * 1.2 });

            const deleted = ll.splice(0, 1);

            drawText({ canvas, text: "Unlink ptr or Free ptr Or delete ptr", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c" });

            await canvas.delay({ time: spl * 1.5 });

            Link.LinkArray[0].clearLink();
            await canvas.delay({ time: 400 });
            ptr.clearArrow({ fig: true, cont: true, dfba: false });
            await canvas.delay({ time: 400 });
            Node.NodeArray[0].node.clearRect({ rect: true, cont: true, ind: true, dfba: false });
            Node.NodeArray[0].nextN.clearRect({ rect: true, cont: false, ind: false, dfba: false });
            await canvas.delay({ time: 400 });
            Link.LinkArray.splice(0, 1);
            Node.NodeArray.splice(0, 1);

            drawText({ canvas , x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, clear : true });

            notify.text.attr({ text: `First Node(${deleted}) Deleted Successfully` , fill : "green"});
            await canvas.delay({ time: spl * 3.5 });

            notify.text.attr({ text: "Current Linked List is Look like This" , fill : "blue"  });
            Arrow.ArrowArray.forEach(e => {
                e.clearArrow({ fig: true, cont: true, dfba: false });
            });
            Node.NodeArray.forEach(e => {
                e.node.clearRect({ rect: true, cont: true, ind: true, dfba: false });
                e.nextN.clearRect({ rect: true, cont: false, ind: false, dfba: false });
            });
            Link.LinkArray.forEach(e => {
                e.clearLink();
            });
            L2[1][0].clearRect({ rect: true, cont: true, ind: false, dfba: false });

            Node.NodeArray = [];
            Link.LinkArray = [];
            L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
        };



//-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.85 , colorCode : 0 , textContent : "Delete At Head" ,    });
              
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
                 drawText({ canvas, text: "Wait......", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "green" });
                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot delete Node From Linked List \n Otherwise You will Lose the Whole Linked List \n \n Create New Linked List 'click'  Reset Button" , x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "red" });
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