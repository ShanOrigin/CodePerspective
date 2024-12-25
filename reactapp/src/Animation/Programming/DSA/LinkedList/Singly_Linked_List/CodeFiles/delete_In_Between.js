

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas, connect , createButton  , canvasFunction } from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function DeleteInBetween({ canvas }) {
    try {
        let spl = 800;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let instructions, ll, notify, L2, cnt = 0 ,yFac = 1.5  , n ;

        const initialize = async () => {
            console.log("capacity = " , Math.floor(canvas.canvasWidth / (canvas.rectWidth*1.87) ))
            const t = drawText({ canvas, text: "Delete In Between  in Linked List", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true});

            n = await waitForLength({ canvas , umin: -1 , umax: 0 });

            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 2.5;

            const llData = await Node.Linked_List({ canvas, ll: [], type: "singly", purpose: "input", range: [-1000, 1000, 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            t.text.attr({ text: "Initial Linked List" });
            Node.NodeArray = [];
            Link.LinkArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 5 ;
            notify = drawText({ canvas, text: "Let's Delete In Between  in Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 2.8 ,  fontSize: 1, color: "blue" , Return : true });
        };

        const execute = async () => {
            notify.text.attr({ text: "Let's Delete In Between  in Linked List" });

            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            drawText({ canvas, text: "Starting....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 4 , fontSize: 1, color: "#46099c" });
            
            const placeText = drawText({ canvas, text: "Place [2 ," + (ll.length-1) + "] -> " , x: canvas.canvasWidth - canvas.rectWidth*3.5 , y: canvas.drawYPos  - canvas.rectHeight*yFac , fontSize: 1, color: "#46099c" , Return:true , padding: 10 });
            const G = placeText.text.getBBox();
 console.log(yFac)   
            const placeRect = new Rect({ "canvasHandler": canvas , "xposition": G.x + G.width*1.1 , "yposition": G.y - canvas.rectHeight/2 + G.height/2 , "content": "" , "index": null , "color": "#ff850a" });

            let place , isIndexValid = false;

            while (!isIndexValid) {
          
                drawText({ canvas, text: "Waiting for Index", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

                place = await placeRect.inputRect({"rect": true ,  "cont": true , "ind": false, "popover": false, "inputType": "number", "Range": [-99, 99], "plc": "i" , "popoverTextArray": null });

                if (place >= 2 && place <= ll.length-1) {
                    isIndexValid = true;
                } else {
               
                    drawText({ canvas, text: "Index Is Out Of Range \n Please Enter Index In Given Range", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  , color : "red" });

                    await canvas.delay({ "time": 2000});
                    placeRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    drawText({ canvas, text: "Waiting for Index", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  , color : "blue" });

                }
             }
            drawText({ canvas, text: "Wait....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            if (cnt === 0) {
                yFac = 2.5 ;
                Node.NodeArray = [];
                Link.LinkArray = [];
                canvas.drawYPos += canvas.rectHeight  ;
                L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            }
            cnt++;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "let's Go.....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const ptr = new Arrow({ canvasHandler: canvas, cont: "ptr", color: "green" });
            const ptrNext = new Arrow({ canvasHandler: canvas, cont: "ptrNext", color: "purple" });

            if (canvas.abort) return;

            drawText({ canvas, text: "Create ptr And Assign To head ;  ptr = head \n Create ptrNext And Assign To head->next ;  \n ptrNext = head->next " , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time: spl * 1.5 });


            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const currB = Node.NodeArray[0].node.rectElement.getBBox();
            const nexB = Node.NodeArray[1].node.rectElement.getBBox();
            const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);

            let j ;
            drawText({ canvas, text: "Iterate While ptrNext != "+place , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            for ( j =0 ; j < place -2; j++) {
          
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

            drawText({ canvas, text: "Stop Iteration Because ptrNext -> next == Null", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await ptr.drawArrow({ rectObj: Node.NodeArray[j].node });
            await ptrNext.drawArrow({ rectObj: Node.NodeArray[j+1].node });

            ptr.arrowFig.attr({ opacity: 0.4 });
            ptrNext.arrowFig.attr({ opacity: 0.4 });

            if (canvas.abort) return;
            await canvas.delay({ time: spl * 1.2 });

            const deleted = ll.splice( place-1 , 1);
            drawText({ canvas, text: "Assign ptr next to PrtNext next ;\n ptr->next = ptrNext-next ;", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            Link.LinkArray[place-2].clearLink();
            
            await canvas.delay({ time: spl * 2.5 });
            const newLink = new Link({ "color": "blye" , "direction": "next", "pos": "mid" }) 
            
            await canvas.delay({ time: 150 });
            await newLink.drawLink({"rectObj1": Node.NodeArray[place-2].nextN, "rectObj2": Node.NodeArray[place].node }) ;

            drawText({ canvas, text: "Unlink ptrNext or Free ptrNext Or delete ptrNext", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time: spl * 1.5 });
            await canvas.delay({ time: 400 });
            Link.LinkArray[place-1].clearLink();
          
            ptrNext.clearArrow({ fig: true, cont: true, dfba: false });
            await canvas.delay({ time: 700 });
        
            Node.NodeArray[place -1].node.clearRect({ rect: true, cont: true, ind: true, dfba: false });
            Node.NodeArray[place -1].nextN.clearRect({ rect: true, cont: false, ind: false, dfba: false });
            await canvas.delay({ time: 400 });
            Link.LinkArray.splice(place -1 , 1);
            Node.NodeArray.splice(place -1 , 1);

            await canvas.delay({ time: spl * 1.5 });
            drawText({ canvas, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , clear : true });


            notify.text.attr({ text: `${place} Node(${deleted}) Deleted Successfully` });
            await canvas.delay({ time: spl * 3.5 });

            notify.text.attr({ text: "Current Linked List is Look like This" });
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
            placeRect.clearRect({ rect: true, cont: true, ind: false, dfba: false });
            placeText.text.remove();
            placeText.rect.remove();
            Node.NodeArray = [];
            Link.LinkArray = [];
            
            L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });

        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.85 ,   colorCode : 2 , textContent : "Delete In Between" ,    });
              
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
              if (ll.length > 2) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              } else {
              
                 drawText({ canvas, text: "Wait....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , color : "green" });

                 await canvas.delay({ time: 500 });
                 drawText({ canvas, text: "Cannot delete Node From Linked List \n Otherwise You will Lose the Whole Linked List \n \n Create New Linked List 'click'  Reset Button" , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  , color : "red" });

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
               yFac = 1.5 ;
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