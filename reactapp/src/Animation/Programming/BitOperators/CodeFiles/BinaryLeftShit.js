
async function BinaryLeftShit({canvas}){

   try{

        const initialize = async () =>{

        // Call the truthTable function with the desired operator ("AND", "OR", "XOR", or "NOT")
        const tTable = await truthTable(canvas, Rect ,  "XOR" );  // You can switch this to "OR", "XOR", "NOT" for different operators

        console.log(tTable);

    
        }


        const execute = async () =>{

        ;
    
        }


 //-_-------_--------_------_-------_--------_---------_

        let operationButton  ;

        const createButtons = ( ) => {
            try {
              operationButton  = createButton({ canvas, x : canvas.canvasWidth - canvas.rectWidth *2.25  , y :canvas.canvasHeight - canvas.rectHeight * 2.5   , colorCode :0 , textContent:"Binay AND " , padding : 10 }) 

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
       let count = true ;
       const action = async () => {
            try {
              if(count){
                 count = false;
                 toggleMenu(false);
                 await execute();
                 toggleMenu(true);
              }else{
    
                 let note = drawText({ canvas, text: "wait...", x: centerX, y: canvas.canvasHeight /2 , fontSize: 1 , Return: true , color: "#31b04b" });

                 await canvas.delay({ time: MID_DELAY });
                 remove( note );

                 note = drawText({ canvas, text: "Conversion Completed Successfully \n Please Click 'reset' Button To Restart", x: centerX, y: canvas.canvasHeight /2 , fontSize: 1 , Return: true , color: "#31b04b" });
                 await canvas.delay({ time: MID_DELAY * 3  });
                 remove( note );
                 toggleMenu(true);
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
    
        }

        const menu = async () => {
             try {
               clearCanvas(canvas.paper);
               canvas.resetButton.enableButton();
               count = true;
               clearAll();

               await initialize();
               await createButtons();
          
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

            canvasFunction( canvas , true);
            canvas.resetButton.addClickAction( menu);
            await initialize();
            await createButtons( );
            await canvasFunction( canvas , true);
            initializeClicks();
            toggleMenu(true);

       })();

   }catch(e){
      console.log(e);
   }
}