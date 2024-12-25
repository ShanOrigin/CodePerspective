

import { Rect, Arrow } from '../../../../../Source/Components/Component.js';
import { drawText, getAddress, waitForLength , createButton , clearCanvas , canvasFunction} from '../../../../../Source/Utilities/utilities.js';
import { Node, Link } from '../../../../../Source/Utilities/__LinkedList__.js';

export async function TraverseInSLL({ canvas }) {
    try {
        let spl = 800;
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;
        let Tarray = [], searchValue, searchBox, searchX, searchY, orgColor , instructions ;
        let n , llData ,  ll , nextP , title ; 

        const initialize = async () => {
            title = drawText({ canvas, text: "Enter Linked List Data", x: centerX, y: centerY, Return: true , fontSize: 1.1 ,  color: "#46099c" });

            n = await waitForLength({ canvas , umin: 0, umax : 0 });

            canvas.currentDevice.UserLength = n;

            let templl;
            canvas.drawYPos += canvas.rectHeight * 3;

            llData = await Node.Linked_List({ canvas, ll: templl, type: "singly", purpose: "input", range: [-1000, 1000, 2, 3], color: "#ff850a" });
            orgColor = Node.NodeArray[0].node.rectElement.attr("fill");

            ll = [...llData[2]];

            if (canvas.abort) return;
            title.text.attr({text: "Your Linked List" , fill:"green" });
            await canvas.delay({ time: spl });

            nextP = canvas.rectWidth + 3;
            const positionOfArray = canvas.paper.width - ll.length * nextP;
            canvas.drawXPos = positionOfArray / 2;
        }; 
        const actionTakePlace = async (action) => {
            drawText({ canvas, text: "Starting....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7,  fontSize: 0.9, color: "#46099c" });

            await canvas.delay({ time: 700 });
        
            if (canvas.abort) return;
            await canvas.delay({ time: spl });
          
            drawText({ canvas, text: "let's Go....", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

            await canvas.delay({ time: 700 });
            drawText({ canvas, text: "Create Ptr Pointer And assign Ptr to head \n Ptr = head", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

            await canvas.delay({ time: spl });

            const ptr = new Arrow({ canvasHandler: canvas, cont: "ptr", color: "green" });

            if (action == "S") {
                await searchBox.moveTo({ newX: searchBox.rectElement.attr("width"), newY: searchBox.rectElement.attr("y") });
                await searchBox.moveTo({ newX: searchBox.rectElement.attr("x"), newY: Node.NodeArray[0].node.rectElement.attr("y") + canvas.rectHeight * 1.5 });
            }

            for (let i = 0; i < ll.length; i++) {
                await ptr.drawArrow({ rectObj: Node.NodeArray[i].node, fig: true, cont: true, popover: true });

                if (canvas.abort) return;

                if ( action =="M" && (i+1) == searchValue ){
                return  ptr  ;
                }

                if (action == "T") {
                    drawText({ canvas, text: "Get Data i.e (" + ll[i] + ") From Current Node \n Ptr = Ptr -> Data" , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                    await canvas.delay({ time: spl });

                    const tempRect = new Rect({ canvasHandler: canvas, xposition: Node.NodeArray[i].node.rectElement.attr("x"), yposition: Node.NodeArray[i].node.rectElement.attr("y"), content: Node.NodeArray[i].node.content, index: -1, color: "#ff850a" });
                    tempRect.drawRect({ rect: true, cont: true, ind: false, popover: false });
                    Tarray.push(tempRect);
                    if (canvas.abort) return;
                    await canvas.delay({ time: spl });

                    await tempRect.moveTo({ newX: tempRect.rectElement.attr("x"), newY: tempRect.rectElement.attr("y") + canvas.rectHeight * 1.5 });
                    await tempRect.moveTo({ newX: llData[1][0].rectElement.attr("x"), newY: tempRect.rectElement.attr("y") });
                    await tempRect.moveTo({ newX: llData[1][0].rectElement.attr("x"), newY: canvas.drawYPos + canvas.rectHeight * 4.5 });
                    await tempRect.moveTo({ newX: canvas.drawXPos + nextP * i, newY: canvas.drawYPos + canvas.rectHeight * 4.5 });

                    if (canvas.abort) return;
                }

                if (action == "S") {
                    await searchBox.moveTo({ newX: Node.NodeArray[i].node.rectElement.attr("x"), newY: searchBox.rectElement.attr("y") });
                    Node.NodeArray[i].node.rectElement.toFront();
                    Node.NodeArray[i].node.textElement.toFront();

          
                   drawText({ canvas, text:`Comparing Search Value ${ searchValue} With Ptr Node Data  ${ ll[i] } `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });


                    await Node.NodeArray[i].node.moveTo({ newX: Node.NodeArray[i].node.rectElement.attr("x"), newY: Node.NodeArray[i].node.rectElement.attr("y") + canvas.rectHeight * 1.5 });

                    if (searchValue == ll[i]) {
                        drawText({ canvas, text: "Stop Search Value is Found At "+(i+1)+" index ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                        Node.NodeArray[i].node.rectElement.attr({ fill: "green", opacity: 0.7 });
                        await Node.NodeArray[i].node.moveTo({ newX: Node.NodeArray[i].node.rectElement.attr("x"), newY: Node.NodeArray[i].node.rectElement.attr("y") - canvas.rectHeight * 1.5 });

                        searchBox.rectElement.attr({ fill: "green", opacity: 0.7 });
                        await searchBox.moveTo({ newX: llData[1][0].rectElement.attr("x"), newY: searchBox.rectElement.attr("y") });
                        await searchBox.moveTo({ newX: searchBox.rectElement.attr("x"), newY: searchY });
                        await searchBox.moveTo({ newX: searchX, newY: searchY });

                        await canvas.delay({ time: 600 });
                        drawText({ canvas, clear: true });
                        ptr.clearArrow({ fig: true, cont: true, dfba: false });
                        return i + 1;
                    }
                    
                    await canvas.delay({ time: 800 });
                    await Node.NodeArray[i].node.moveTo({ newX: Node.NodeArray[i].node.rectElement.attr("x"), newY: Node.NodeArray[i].node.rectElement.attr("y") - canvas.rectHeight * 1.5 });
                }

                if (i >= 0 && i < ll.length) {
                    if (action == "T") {
                        drawText({ canvas, text: "Shift Ptr Pointer to next Node \n Ptr = Ptr -> next \n while Ptr -> next != Null..", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                    } else if (action == "S") {
                        drawText({ canvas, text: "Shift Ptr to next Node Ptr = Ptr -> next \n  while Ptr -> next != Null \n Search Value !=  To Node Data Value .", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                    }else if (action == "M") {
                        drawText({ canvas, text: "Shift Ptr Pointer to next Node \n Ptr = Ptr -> next \n while index != "+searchValue ,  x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                    }
                    await canvas.delay({ time: 1500 });
                    const currB = Node.NodeArray[i].node.rectElement.getBBox();

                    let dx = 1;
                    if (i == ll.length - 1) {
                        drawText({ canvas, text: "STOP ! \n  Ptr -> next == null.", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                        await canvas.delay({ time: 600 });
                        dx = -1;
                    }
                    const nexB = Node.NodeArray[i + dx].node.rectElement.getBBox();
                    const dis = Math.abs((nexB.x - currB.x) / canvas.nextPos);

                    await ptr.ShiftArrow({ steps: 0.5, direction: "up" });
                    await ptr.ShiftArrow({ steps: dis, direction: "right" });

                    if (canvas.abort) return;

                    ptr.clearArrow({ fig: true, cont: true, dfba: false });
                  
                }
            }

            if (action == "S") {
                await searchBox.moveTo({ newX: llData[1][0].rectElement.attr("x"), newY: searchBox.rectElement.attr("y") });
                await searchBox.moveTo({ newX: searchBox.rectElement.attr("x"), newY: searchY });
                await searchBox.moveTo({ newX: searchX, newY: searchY });
                ptr.clearArrow({ fig: true, cont: true, dfba: false });
                return 0;
            }
            drawText({ canvas, clear: true });
          
        };

// ###########s########

        let searchButton , ModifyButton , traverseButton ;

        const createButtons = ( ) => {
            try {
              traverseButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.78, colorCode : 0 , textContent : "Traverse"  , maxWidth : 0 });
              ModifyButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.84 , colorCode : 2 , textContent : "Modify" , maxWidth : traverseButton.rect.getBBox().width  });
              searchButton = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth * 1.25 , y : canvas.canvasHeight * 0.9 , colorCode : 3 , textContent : "Search" , maxWidth : traverseButton.rect.getBBox().width    });
              
            } catch (error) {
               console.log("Error in createButtons:", error);
            }
        };

       const toggleMenu = (show , {  T = false, M = false, S = false } = {} ) => {
            try {
              if (show){
                if (T) {
                    traverseButton.enableButton();
                }
                if (M) {
                    ModifyButton.enableButton();
                }
                if (S) {
                    searchButton.enableButton();
                }
                canvas.resetButton.enableButton();
                canvas.pauseButton.disableButton();
                canvas.playButton.disableButton();
              }else{
                traverseButton.disableButton();
                searchButton.disableButton();
                ModifyButton.disableButton();
                canvas.resetButton.disableButton();
                canvas.pauseButton.enableButton();
                canvas.playButton.enableButton();
              }

            } catch (error) {
               console.log( error);
            }
       };


       let controFlag = false, orderToUser = null, indexBox = null, index , R = null;

       const traverseLL = async () => {
           try {
              if (!controFlag) {
                toggleMenu(false);
                orderToUser = drawText({ canvas, text: "---------Traversing Linked List---------", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5, fontSize: 1 ,  color: "#46099c" , Return: true });
                await actionTakePlace("T");
                orderToUser.text.attr({ "text": "Traversing Linked List Completed ", "fill": "green" });
                await canvas.delay({ "time": 1500 });
                controFlag = !controFlag;
                toggleMenu(true , { T: true });
              } else {
                orderToUser.text.remove();
                orderToUser.rect.remove();
                Tarray.forEach(e => e.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false }));
                Tarray = [] ;
                toggleMenu(true , { T: true, S: true, M: true });
                controFlag = !controFlag;
              }
           } catch (e) {
              console.error(e);
           }
       }

       const searchEle = async () => {
           try {
              if (!controFlag) {
                 toggleMenu(false);
                 orderToUser = drawText({ canvas, text: "Enter Value  To  Search In Linked List ", x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5, Return: true ,  fontSize: 1, color: "#46099c" });
                 searchX = (centerX - canvas.rectWidth * 0.5);
                 searchY = orderToUser.text.getBBox().y + orderToUser.text.getBBox().height * 2;
                 searchBox = new Rect({ "canvasHandler": canvas, "xposition": searchX, "yposition": searchY, "content": "", "index": "", "color": "#3498db" });
                 searchValue = await searchBox.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "inputType": "number", "Range": [-99, 99], "plc": "i", "popoverTextArray": null });
                 orderToUser.text.attr({ "text": `Searching ${searchValue} In Linked List  ` });
                 R = await actionTakePlace("S");
                 console.log(R);
                 if (R) {
                   orderToUser.text.remove();
                   orderToUser.rect.remove();
                   drawText({ canvas, text: `Search Value ${searchValue} Is Present At ${R} Index In Linked List  `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5,  fontSize: 1, color: "#46099c" });
                 } else {
                   orderToUser.text.remove();
                   orderToUser.rect.remove();
                   drawText({ canvas, text: `Search Value ${searchValue} Not Present In Linked List `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5,  fontSize: 1, color: "#46099c" });
                 }
                 await canvas.delay({ "time": 1500 });
                 controFlag = !controFlag;
                 toggleMenu(true , { S: true });
              } else {
                 if( orderToUser.text)orderToUser.text.remove();
                 if(orderToUser.rect)orderToUser.rect.remove();
                 searchBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                 if (R > 0) Node.NodeArray[R - 1].node.rectElement.attr({ "fill": orgColor, "opacity": 1 });
                 toggleMenu(true , { T: true, S: true, M: true });
                 controFlag = !controFlag;
              }
           } catch (e) {
             console.error(e);
           }
       }

       let isIndexValid = false , data , MB , MNB , newV;
       const modifyEle = async () => {
           try {
              if (!controFlag) {
                 toggleMenu(false);
                 orderToUser = drawText({ canvas, text: `Enter Index To Modify Between { 1 to ${ ll.length } } `, x: centerX, y: canvas.drawYPos + canvas.rectHeight * 3.5, Return:true ,  fontSize: 1, color: "#46099c" });
                 searchX = (centerX - canvas.rectWidth * 0.5);
                 searchY = orderToUser.text.getBBox().y + orderToUser.text.getBBox().height * 2;
                 searchBox = new Rect({ "canvasHandler": canvas, "xposition": searchX, "yposition": searchY, "content": "", "index": "", "color": "#3498db" });

                 while (!isIndexValid) {
                    searchValue = await searchBox.inputRect({ rect: true, cont: true, ind: false });
                    if (searchValue >= 1 && searchValue <= ll.length ) {
                       isIndexValid = true;
                    } else {
                       orderToUser.text.attr({ "text": `Index is Invalid Please Enter Valid Index ` , "fill" : "red"  });
                       await canvas.delay({ time: 2000 });
                       orderToUser.text.attr({ "text": `Enter Index To Modify Between { 1 to ${ ll.length } } `  , "fill" : "#46099c"});

                       await new Promise(resolve => setTimeout(resolve, 1000));
                       searchBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                    }
                 }
                 isIndexValid = false  ;
                 data = await actionTakePlace("M");

                 MB  = new Rect({ "canvasHandler": canvas, "xposition": Node.NodeArray[searchValue -1].node.rectElement.attr("x")    , "yposition": Node.NodeArray[searchValue -1].node.rectElement.attr("y") , "content": Node.NodeArray[searchValue -1].node.content , "index": "", "color": Node.NodeArray[searchValue -1].node.rectElement.attr("fill") });
                 MB.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false,  "popoverTextArray": null });
                 await MB.moveTo({ newX: Node.NodeArray[searchValue -1].node.rectElement.attr("x"), newY: Node.NodeArray[searchValue -1].node.rectElement.attr("y") + canvas.rectHeight * 1.5 });

                 await MB.moveTo({ newX: llData[1][0].rectElement.attr("x"), newY: MB.rectElement.attr("y") });
                 await MB.moveTo({ newX: MB.rectElement.attr("x"), newY: searchY });
                 await MB.moveTo({ newX: searchX + MB.rectElement.attr("width")*1.2 , newY: searchY });
 
                 MNB  = new Rect({ "canvasHandler": canvas, "xposition": MB.rectElement.attr("x")    , "yposition": MB.rectElement.attr("y") , "content": "" , "index": "", "color": MB.rectElement.attr("fill") });

                 MB.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                 orderToUser.text.attr({ "text": `Enter New Value To Modify Old One  `  , "fill" : "#46099c"});

                 drawText({ canvas, clear: true});
                 newV  = await MNB.inputRect({ rect: true, cont: true, ind: false });
                 ll[searchValue -1] = newV ;
                 //data[1].attr({ "text":   , "fill" : "#46099c"});
                 drawText({ canvas, text: `Set Prt.Data  = ${ newV } ` , x: centerX, y: canvas.drawYPos + canvas.rectHeight * 7 ,  fontSize: 0.9, color: "#46099c" });

                 await canvas.delay({ "time": 1500 });
                 controFlag = !controFlag
                 toggleMenu(true , { M: true });
              } else {

                 await MNB.moveTo({ newX: canvas.rectWidth , newY: searchY });
                 await MNB.moveTo({ newX:MNB.rectElement.attr("x"), newY: llData[1][0].rectElement.attr("y") + canvas.rectHeight*1.5 });

                 await MNB.moveTo({ newX: Node.NodeArray[searchValue -1].node.rectElement.attr("x"), newY: MNB.rectElement.attr("y") });
                 await MNB.moveTo({ newX: Node.NodeArray[searchValue -1].node.rectElement.attr("x"), newY: Node.NodeArray[searchValue -1].node.rectElement.attr("y") });

                 Node.NodeArray[searchValue -1].node.textElement.attr({ "text": newV });
                 Node.NodeArray[searchValue -1].node.content = newV ;
                 Node.NodeArray[searchValue -1].node.popoverRect[3].attr({ "text" : `Index = ${Node.NodeArray[searchValue -1].node.index }, Data Value = ${ newV }` });
                 Node.NodeArray[searchValue -1].node.popoverText[3].attr({ "text" : `My Data Value = ${ newV }` });

                 MNB.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });

                 orderToUser.text.remove();
                 orderToUser.rect.remove();
                 searchBox.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
                 drawText({ canvas, clear: true});

                 data.clearArrow({ fig: true, cont: true, dfba: false });
 
                 toggleMenu(true , { T: true, S: true, M: true });
                 controFlag = !controFlag;
              }
           } catch (e) {
             console.error(e);
           }
       }

        const clearAll = () => {
               canvas.drawYPos = centerY;
               Rect.AllBoxe = [];
               Rect.boxes = [];
               Arrow.ArrowArray = [];
               Node.NodeArray = [];
               Link.LinkArray = [];
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

               toggleMenu(true , { T: true, S: true, M: true });
               initializeClicks();
             } catch (error) {
                console.error(error);
             }
        };

        const initializeClicks = () => {
          try{
           traverseButton.addClickAction( traverseLL );
           searchButton.addClickAction( searchEle );
           ModifyButton.addClickAction( modifyEle );
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


    } catch (error) {
        console.error('Error occurred:', error);
    }
}