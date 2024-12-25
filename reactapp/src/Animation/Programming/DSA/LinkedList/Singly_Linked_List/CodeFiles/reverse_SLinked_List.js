
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas, createButton , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';


export async function ReverseSLL({ canvas }) {
    try {
        let spl = 1000;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let instructions, ll, notify, L2, cnt = 0 , n;

        const initialize = async () => {

            const t = drawText({ canvas, text: "Reverse Of Linked List", x: centerX, y: centerY / 2, fontSize: 1.1, color: "#46099c" , Return: true });

            n = await waitForLength({ canvas , umin: -2 , umax: 0 });
            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 2.5;

            const llData = await Node.Linked_List({ canvas, ll: [], type: "singly", purpose: "input", range: [-1000, 1000, 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            t.text.attr({ text: "Initial Linked List" });
            Node.NodeArray = [];
            Link.LinkArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 5;
            notify = drawText({ canvas, text: "------- Let's Reverse in Linked List --------", x: centerX, y: canvas.drawYPos - canvas.rectHeight * 2.5, fontSize: 1.1, color: "blue" , Return: true });
        };

        const execute = async () => {
            notify.text.attr({ text: "------- Let's Reverse in Linked List --------" });

            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            drawText({ canvas, text: "Starting....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1, color: "#46099c"  });

            if (cnt === 0) {
                Node.NodeArray = [];
                Link.LinkArray = [];
                L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            }
            cnt++;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            drawText({ canvas, text: "let's Go.....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5 });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });


        const nullB = new Rect({ "canvasHandler": canvas , "xposition": Node.NodeArray[0].node.rectElement.attr("x") - canvas.rectWidth*1.79 ,  "yposition": Node.NodeArray[0].node.rectElement.attr("y") , "content": "null" , "index": null , "color": "#3498db" });
        await nullB.drawRect({ "rect": true ,  "cont": true , "ind": false, "popover": false ,  "popoverTextArray": null });

        const current = new Arrow({ "canvasHandler":canvas , "cont":"Current"   , "color": "black" , "direction": "up" });

        const prev = new Arrow({ "canvasHandler":canvas , "cont":"Prev"   , "color":"green" , "direction": "down" });

        const Next = new Arrow({ "canvasHandler":canvas , "cont":"Next"   , "color":"blue" , "direction": "down" });


        if (canvas.abort) return;
        drawText({ canvas, text: "Create prev Pointer & Assign to Null \n prev = Null", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

        await canvas.delay({ time:spl*1.3 });

        await prev.drawArrow({ "rectObj": nullB , "fig": true, "cont": true, "popover": true }) ;

        drawText({ canvas, text: "Create current pointer & Assign to Head \n current  =  Head ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

        await canvas.delay({ time:spl*1.3 });

        await current.drawArrow({ "rectObj": Node.NodeArray[0].node , "fig": true, "cont": true, "popover": true }) ;

        drawText({ canvas, text: "Create next pointer & Assign next to Head \n next = head", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

        await canvas.delay({ time:spl*1.3});

        await Next.drawArrow({ "rectObj": Node.NodeArray[0].node, "fig": true, "cont": true, "popover": true }) ;

            const currB = Node.NodeArray[0].node.rectElement.getBBox();
            const nexB = Node.NodeArray[1].node.rectElement.getBBox();
            const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);
        await canvas.delay({ time:spl *0.5});
        for (let i = 0; i < ll.length; i++) {
            if (i > 0) {

                prev.drawArrow({ "rectObj": Node.NodeArray[i - 1].node, "fig": true, "cont": true, "popover": true }) ;
                await canvas.delay({ time:50});

                current.drawArrow({ "rectObj": Node.NodeArray[i].node , "fig": true, "cont": true, "popover": true }) ;
                await canvas.delay({ time:50});

                Next.drawArrow({ "rectObj":Node.NodeArray[i].node , "fig": true, "cont": true, "popover": true }) ;

            }

            drawText({ canvas, text: "Assign next pointer to current next \n next = current -> next" , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time:spl});

            await Next.ShiftArrow({ "steps": 0.5, "direction": "down"});
            await Next.ShiftArrow({ "steps":dis , "direction": "right"});
            await canvas.delay({ time:spl});

            drawText({ canvas, text: "Assign current next to prev \n current -> next = prev.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time:spl});
            const fig = Link.LinkArray[i].arrowFig.getBBox();
            Promise.allSettled([
               new Promise(resolve => {
                   Node.NodeArray[i].nextN.moveTo({
                        newX: Node.NodeArray[i].node.rectElement.attr("x") - canvas.rectWidth * 0.4,
                        newY: Node.NodeArray[i].node.rectElement.attr("y")
                   });
                   resolve();
               }),
               new Promise(resolve => {
                   Link.LinkArray[i].arrowFig.animate({
                        transform: `...t-${canvas.rectWidth * 1.4 + fig.width}, 0`
                   }, 500, resolve);
               })
           ]).then(results => {
            if ( i == 0 ) {Link.LinkArray[i].arrowFig.attr({ "fill": "black" })}
            else{Link.LinkArray[i].arrowFig.attr({ "fill": "red" })}

            Link.LinkArray[i].arrowFig.animate({ transform: '...r-180' }, 500);

           });

            if (canvas.abort) return;
            await canvas.delay({ time:spl*1.5});

            drawText({ canvas, text: "Assign prev to current \n prev = current.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time:spl});

            await prev.ShiftArrow({ "steps": 0.5, "direction": "down"});
            await prev.ShiftArrow({ "steps":dis , "direction": "right"});
            await canvas.delay({ time:spl});
            drawText({ canvas, text: "Assign current to next \n current = next.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

            await canvas.delay({ time:spl});

            await current.ShiftArrow({ "steps": 0.5, "direction": "up"});
            await current.ShiftArrow({ "steps":dis , "direction": "right"});
            await canvas.delay({ time:spl});

            prev.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
            current.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

            Next.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

        }
        L2[1][0].clearRect({ rect: true, cont: true, ind: false, dfba: false });


        prev.drawArrow({ "rectObj": Node.NodeArray[ll.length - 1].node, "fig": true, "cont": true, "popover": true }) ;

        drawText({ canvas, text: "Assign tail to head \n tail = head.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });
        await canvas.delay({ time:spl});

        await L2[0][1].ShiftArrow({ "steps":0.5 , "direction":"up" });
        await L2[0][1].ShiftArrow({ "steps":dis * (ll.length - 1), "direction":"left" }); 
        await canvas.delay({ time:spl});

        drawText({ canvas, text: "Assign head to prev \n head = prev.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4  });

        await canvas.delay(spl);
        drawText({ canvas, text: "", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 4 , clear : true });

     
        await L2[0][0].ShiftArrow({ "steps":0.5 , "direction":"up" });
        await L2[0][0].ShiftArrow({ "steps":dis * (ll.length - 1) , "direction":"right" });
        await canvas.delay({ time:spl / 10});

        prev.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

        ll.reverse();

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
            nullB.clearRect({ rect: true, cont: true, ind: false, dfba: false });

            Node.NodeArray = [];
            Link.LinkArray = [];
            L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });


        };



 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.85 , colorCode : 2 , textContent : "Reverse Linked List"   });
              
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
              if (ll.length  <=  n) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              } else {
             
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