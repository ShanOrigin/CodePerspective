
import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, waitForLength, clearCanvas , connect , createButton , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function InsertInBetween({ canvas }) {
    try {
        let spl = 800;
        const centerX = canvas.canvasWidth / 2;
        const centerY = canvas.drawYPos;
        let t  , n , ll , firstllPos , count , llData , orgL = []  ;
        let  L1 , L2 , title1 , title2 , newLink1 , newLink2  , modifyNodeArray =[] , modifiedNodeArray = [] ; 
        let placeText , placeRect , newNode;

        const initialize = async () => {

            t = drawText({ canvas, text: "Insert In Between In Linked List ", x: centerX, y: centerY / 2, fontSize: 1.1 ,  color: "#46099c" , Return: true , padding: 8});

            count = n = await waitForLength({ canvas , umin: -1 , umax : 2 });
            canvas.currentDevice.UserLength = n;
            canvas.drawYPos += canvas.rectHeight * 1.5 ; 
            firstllPos = canvas.drawYPos ;
            let templl;
            llData = await Node.Linked_List({ canvas, ll: templl, type: "singly", purpose: "input", range: [-99 , 99 , 2, 3], color: "#ff850a" });
            ll = [...llData[2]];
            orgL.push(Node.NodeArray);
            orgL.push(Link.LinkArray);
            Node.NodeArray = [];
            Link.LinkArray = [];
            Arrow.ArrowArray = [];

            canvas.drawYPos += canvas.rectHeight * 3;
            t.text.attr({ text: "Initial Linked List" });

            }

        const clearPrevData = async (initial=true) => {

              L2[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              L2[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              modifiedNodeArray[1].forEach( e =>  e.clearLink() );
              L2[1][0].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

              modifiedNodeArray[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              title2.text.remove();
              title2.rect.remove();
              modifiedNodeArray = [] ;

              await canvas.delay({ time: 700 });

              L1[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              L1[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              newNode.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              newLink1.remove();
              newLink2.remove();
              placeText.text.remove();
              placeText.rect.remove();
              placeRect.clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });

              modifyNodeArray[1].forEach( e =>  e.clearLink() );
              L1[1][0].clearRect({ "rect": true, "cont": true , "ind": false, "dfba": false });

              modifyNodeArray[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              title1.text.remove();
              title1.rect.remove();
              modifyNodeArray = [] ;
            
              await canvas.delay({ time: 700 });

              llData[0][1].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              llData[0][0].clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
              orgL[1].forEach( e =>  e.clearLink() );
              llData[1][0].clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

              orgL[0].forEach(( e) => {
                  e.nextN.clearRect({ "rect": true, "cont": false , "ind": false, "dfba": false });
                  e.node.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": false });
                  
              });
              orgL = [] ;
              t.text.attr({ text: "Updated Linked List" });
              canvas.drawYPos =  firstllPos ;

              if ( initial){
                 llData = await Node.Linked_List({ canvas, ll: ll, type: "singly", purpose: "print", range: [-99 , 99 ,  2, 3], color: "#ff850a" });
                 orgL.push(Node.NodeArray);
                 orgL.push(Link.LinkArray);
                 Node.NodeArray = [];
                 Link.LinkArray = [];
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
            title1 = drawText({ canvas, text: "Let's Insert Node At First place in Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight, fontSize: 1.1, padding: 8 , color: "blue" , Return: true});
            if (canvas.abort) return;
            await canvas.delay({ time: 700 });

            canvas.drawYPos += canvas.rectHeight * 2;

            drawText({ canvas, text: "Starting....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

            Node.NodeArray = [];
            L1 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-99, 99], color: "#ff850a" });
            modifyNodeArray.push(Node.NodeArray) ;
            modifyNodeArray.push(Link.LinkArray) ;
            if (canvas.abort) return;
            await canvas.delay({ time: spl });


            placeText = drawText({ canvas, text: "Place [2 ," + ll.length + "] -> " , x: title1.rect.attr("x") + title1.rect.attr("width") * 0.8  , y: title1.rect.attr("y") +  title1.rect.attr("height")*1.5 , Return: true, fontSize: 1, color: "#46099c" , padding:6});
            const g = placeText.rect.getBBox();
            placeRect = new Rect({ "canvasHandler": canvas , "xposition": g.x + g.width*1.1 , "yposition": g.y - canvas.rectHeight/2 + g.height/2 , "content": "" , "index": null , "color": "#ff850a" });

            let place , isIndexValid = false;
            drawText({ canvas, text: "Enter Index' Where you want \n to Insert Element In Given Range  ", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

            while (!isIndexValid) {
                place = await placeRect.inputRect({"rect": true ,  "cont": true , "ind": false, "popover": false, "inputType": "number", "Range": [-99, 99], "plc": "i" , "popoverTextArray": null });

                if (place >= 2 && place <= ll.length) {
                    isIndexValid = true;
                } else {
                    drawText({ canvas, text: "Index Is Out Of Range \n Please Enter Index In Given Range.", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "red" });
                    await canvas.delay({ "time": 2000});
                    placeRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    drawText({ canvas, text: "Enter Index' Where you want \n to Insert Element In Given Range  ", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

                }
             }

            drawText({ canvas, text: "let's Go....", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });
            await canvas.delay({"time":spl});
            drawText({ canvas, text: "Create ptr and ptrNext Pointer \n assign ptr to head  Ptr = head \n ptrNext to  head next ptrNext = head -> next .", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });


            if (canvas.abort) return;
            await canvas.delay({"time":spl});

            const ptr = new Arrow({ "canvasHandler": canvas , "cont": "ptr"   , "color": "black" , "direction": "up" });
            const ptrNext = new Arrow({ "canvasHandler": canvas , "cont": "ptrNext" , "color": "green" , "direction": "up" });

            const currB = Node.NodeArray[0].node.rectElement.getBBox();
            const nexB = Node.NodeArray[1].node.rectElement.getBBox();

            const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);

            drawText({ canvas, text: "Movo ptr & patNext to next Node \n ptr = ptr -> next  ptrNext = ptrNext -> next \n while ptrNext != "+place, x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

            for (let i = 0; i < place - 1; i++) {

                if (canvas.abort)return;
                await canvas.delay({"time":spl});

                await ptr.drawArrow({ "rectObj": Node.NodeArray[i].node  , "fig": true, "cont": true, "popover": true }) ;
                ptr.arrowFig.attr({opacity: 0.8});

                if (canvas.abort) return;
                await canvas.delay({"time":spl / 5});

                await ptrNext.drawArrow({ "rectObj": Node.NodeArray[i + 1].node , "fig": true, "cont": true, "popover": true }) ;
                ptrNext.arrowFig.attr({ opacity: 0.8  });

                if (canvas.abort) return;
                await canvas.delay({"time":spl});

                if (i >= 0 && i < place - 2) {
                                         
                     await ptr.ShiftArrow({ "steps": 0.5, "direction": "up" });
                     await ptr.ShiftArrow({ "steps": dis , "direction": "right"});

                     await ptrNext.ShiftArrow({ "steps": 0.5, "direction": "up" });
                     await ptrNext.ShiftArrow({ "steps": dis , "direction": "right"});

                     if (canvas.abort) return;
                
                     await canvas.delay({"time":spl / 2});
                     ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
                     ptrNext.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

                }
            }

            if (canvas.abort) return;
            await canvas.delay({ time: spl });
            drawText({ canvas, text: "Enter data to be Inserted ?", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            const node = new Node({
                canvasHandler: canvas,
                xposition: Node.NodeArray[place-2].node.rectElement.attr("x") + canvas.rectWidth * 0.5,
                yposition: Node.NodeArray[place-2].node.rectElement.attr("y") + canvas.rectHeight * 2.3,
                content: "",
                index: -1,
                color: "#ff850a"
            });
            const nodeData = await node.drawNode({ node: true, cont: true, index: false, popover: true, next: true, prev: false, purpose: "input" });

            newNode = new Arrow({ canvasHandler: canvas, cont: "newNode", color: "green" });
            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            await newNode.drawArrow({ rectObj: Node.NodeArray[Node.NodeArray.length - 1].node });
            newNode.arrowFig.attr({ opacity: 0.4 });
            if (canvas.abort) return;
            await canvas.delay({ time: spl });
            drawText({ canvas, text: "Assign newNode next to ptrNext \n newNode -> next = ptrNext .", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

            if (canvas.abort) return;
            await canvas.delay({ time: spl });

            newLink1 = connect(node, Node.NodeArray[place-1] , "NNtoN" , "red");

            const tailindex = Node.NodeArray.length-2 ; 
            await canvas.delay({ time: spl });
            drawText({ canvas, text: "Assign ptr next to newNode \n ptr -> next = newNode ", x: canvas.canvasWidth * 0.5, y: canvas.drawYPos + canvas.rectHeight * 5.5,  color: "#46099c" });

  
            await canvas.delay({ time: spl });
            newLink2 = connect( Node.NodeArray[place-2] , node, "NtoNN" , "red");
            Link.LinkArray[place-2].clearLink();

            if (canvas.abort) return;
            await canvas.delay({ time: spl });
            ptr.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;
            ptrNext.clearArrow({ "fig": true, "cont": true, "dfba": false } ) ;

            if (canvas.abort) return;
            await canvas.delay({ time: spl });
            drawText({ canvas, clear: true  });
            ll.splice(place - 1, 0, nodeData);
        
/*
//--
            const text1= node.node.popoverRect[4].attr("text").split(" ") ;
            Node.NodeArray[tailindex].nextN.popoverRect[5].attr( { "text" : `My Address Is = ${text1[text1.length-1]}` });
            
            node.node.popoverRect[2].attr( { "text" : `👋Hi,I am ${ll.length}th Element In Linked List` });
            node.node.popoverRect[3].attr( { "text" : `Index = ${ll.length} , Data Value = ${ll[ll.length-1]}` });
            node.nextN.popoverRect[5].attr( { "text" : `My Address Is = 0x000000000000` });
//---
*/

            canvas.drawYPos += canvas.rectHeight * 6.5;

            title2 = drawText({ canvas, text: "Linked List After Insertion In Between Nodes", x: canvas.canvasWidth / 2, y: canvas.drawYPos - canvas.rectHeight * 2, fontSize: 1.1, color: "#46099c" , padding: 8, Return: true });

            Node.NodeArray = [];
            Link.LinkArray = [] ;
            L2 = await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-1000, 1000], color: "#ff850a" });
            modifiedNodeArray.push(Node.NodeArray) ;
            modifiedNodeArray.push(Link.LinkArray) ;
            Node.NodeArray = [];
            Link.LinkArray = [] ;
        };

 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton= createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.9 , colorCode : 2 , textContent : "Insert In Between Nodes"   });
              
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

              if (( canvas.currentDevice.device =="mobile" || canvas.currentDevice.device =="tablet" ) && count < canvas.currentDevice.max  ) {
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
                 limit = canvas.currentDevice.max;
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

                 await Node.Linked_List({ canvas, ll: ll.slice( limit - canvas.currentDevice.UserLength , ll.length), type: "singly", purpose: "print", range: [-99, 99], color: "#ff850a" });
                 Node.NodeArray = [];
                 Link.LinkArray = [];
                 Arrow.ArrowArray = [];
                 canvas.drawYPos += canvas.rectHeight * 3;
                 title2 = drawText({ canvas, text: "updated Linked List", x: centerX, y: canvas.drawYPos - canvas.rectHeight, fontSize: 1.1, color: "blue" , Return: true});
                  canvas.drawYPos += canvas.rectHeight * 2;
                 await Node.Linked_List({ canvas, ll, type: "singly", purpose: "print", range: [-99, 99], color: "#ff850a" });
               
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
               ll =[];
        }
        const clearAllInsert = async () => {
               
               count = n =  firstllPos = 0 ;  
               llData = [] ; 
               orgL = []  ;
               L1 = null ;  L2 = null ; t = null ;  title1 = null ;  title2 = null ; newLink = null ; 
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