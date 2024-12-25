


// utilities.js

import { clearCanvas, createButton } from '../../../../Source/Utilities/utilities.js';

const namespace = {};

namespace.canvas = null; // Initialize as needed
namespace.operationButton = null; // Initialize as needed
namespace.resetButton = null; // Initialize as needed
namespace.action = null; // Initialize as needed
namespace.centerY = null ;
          namespace.AllBoxe = null
        namespace.boxes = null
        namespace.ArrowArray = null
        namespace.NodeArray = null
        namespace.LinkArray = null
        namespace.cnt = null
        namespace.initialize = null ;
namespace.createButtons = () => {
    try {
        let { canvas } = namespace; // Destructure from namespace object

        const btn1 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.75,
            colorCode: 2,
            textContent: "Reverse Linked List",
            maxWidth: 0, // placeholder
            padding: 10
        });

       const btn2 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.83,
            colorCode: 1,
            textContent: "New Linked List",
            maxWidth: btn1.maxWidth, // use the maxWidth from btn1
            padding: 10
        });

        console.log("Buttons created:");
        //console.log(btn1, btn2);
        
        return { btn1, btn2};

    } catch (error) {
        console.log("Error in createButtons:", error);
        return { btn1: null, btn2: null }; // Handle error gracefully
    }
};

namespace.toggleMenu = (show) => {
    try {
        const { operationButton, resetButton } = namespace; // Destructure from namespace object

        if (show) {
            operationButton.enableButton();
            resetButton.enableButton();
        } else {
            operationButton.disableButton();
            resetButton.disableButton();
        }
    } catch (error) {
        console.log("Error in toggleMenu:", error);
    }
};

namespace.menu = async () => {
    try {
        let  { canvas,AllBoxe , ArrowArray , boxes , initialize , cnt ,LinkArray , NodeArray} = namespace; // Destructure from namespace object

        clearCanvas(canvas.paper);

//        
        namespace.toggleMenu(false);

        canvas.drawYPos = namespace.centerY;

       AllBoxe = [];
        boxes = [];
       ArrowArray = [];
      NodeArray = [];
        LinkArray = [];
        cnt = 0;
        await initialize();

       namespace.operationButton = null ;
     namespace.resetButton = null ;
const { b1 , b2 } = await namespace.createButtons(canvas);
namespace.operationButton = b1;
     namespace.resetButton = b2 ;
       namespace.toggleMenu(true);
        namespace.initializeClicks();

    } catch (error) {
        console.error( error);
    }
};

namespace.initializeClicks = () => {
    try {
        const { canvas ,  operationButton, resetButton, action } = namespace; // Destructure from namespace object
      console.log(namespace)
        console.log("Initializing clicks with buttons:");
        console.log(operationButton, resetButton);
        operationButton.addClickAction(action);
        resetButton.addClickAction(namespace.menu);
    } catch (e) {
        console.log(e);
    }
};

export default namespace;



/*

// utilities.js

import { clearCanvas, createButton } from '../../../../Source/Utilities/utilities.js';

const namespace = {};

namespace.createButtons = (canvas )=> {
    try {
        const btn1 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.75,
            colorCode: 2,
            textContent: "Reverse Linked List",
            maxWidth: 0, // placeholder
            padding: 10
        });

        const btn2 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.83,
            colorCode: 1,
            textContent: "New Linked List",
            maxWidth: btn1.maxWidth, // use the maxWidth from btn1
            padding: 10
        });

        console.log("Buttons created:");
        console.log(btn1, btn2);

        return { btn1, btn2 };

    } catch (error) {
        console.log("Error in createButtons:", error);
        return { btn1: null, btn2: null }; // Handle error gracefully
    }
};

namespace.toggleMenu = (show, operationButton, resetButton) => {
    try {
        if (show) {
            operationButton.enableButton();
            resetButton.enableButton();
        } else {
            operationButton.disableButton();
            resetButton.disableButton();
        }
    } catch (error) {
        console.log("Error in toggleMenu:", error);
    }
};

namespace.menu = async (canvas, operationButton, resetButton , initialize) => {
    try {
        clearCanvas(canvas.paper);

        const { btn1, btn2 } = await namespace.createButtons(canvas);
        namespace.toggleMenu(false, operationButton, resetButton);

        canvas.drawYPos = centerY;
        Rect.AllBoxe = [];
        Rect.boxes = [];
        Arrow.ArrowArray = [];
        Node.NodeArray = [];
        Link.LinkArray = [];
        cnt = 0;
        await initialize();

        namespace.toggleMenu(true, operationButton, resetButton);
        namespace.initializeClicks(operationButton, resetButton);

    } catch (error) {
        console.error( error);
    }
};

namespace.initializeClicks = (operationButton, resetButton, action ,canvas , initialize) => {
    try {
        console.log("Initializing clicks with buttons:");
        console.log(operationButton, resetButton);
        operationButton.addClickAction(action);
        resetButton.addClickAction(()=>namespace.menu(canvas, operationButton, resetButton , initialize));
    } catch (e) {
        console.log(e);
    }
};

export default namespace;


*/


/*import {clearCanvas, createButton } from '../../../../Source/Utilities/utilities.js';

export const createButtons =  (canvas) => {
    try {
        const btn1 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.75,
            colorCode: 2,
            textContent: "Reverse Linked List",
            maxWidth: 0, // placeholder
            padding: 10
        });
        
        const btn2 = createButton({
            canvas,
            x: canvas.canvasWidth - canvas.rectWidth * 1.25,
            y: canvas.canvasHeight * 0.83,
            colorCode: 1,
            textContent: "New Linked List",
            maxWidth: btn1.maxWidth, // use the maxWidth from btn1
            padding: 10
        });

        console.log("button are ")
        console.log(btn1 , btn2)
        return { btn1 , btn2 } ;
        
    } catch (error) {
        console.log("Error in createButtons:", error);
    }
};

export const toggleMenu = (show) => {
    try {
        if (show) {
            operationButton.enableButton();
            resetButton.enableButton();
        } else {
            operationButton.disableButton();
            resetButton.disableButton();
        }
    } catch (error) {
        console.log("Error in toggleMenu:", error);
    }
};

export const menu = async () => {
    try {
        clearCanvas(canvas.paper);

        await createButtons({ button: operationButton }, { button: resetButton });
        toggleMenu(false);

        canvas.drawYPos = centerY;
        Rect.AllBoxe = [];
        Rect.boxes = [];
        Arrow.ArrowArray = [];
        Node.NodeArray = [];
        Link.LinkArray = [];
        cnt = 0;
        await initialize();

        toggleMenu(true);
        initializeClicks();
    } catch (error) {
        console.error("Error in menu:", error);
    }
};

export const initializeClicks = (operationButton , resetButton , action) => {
    try {
        console.log(operationButton);
        console.log(resetButton);
        operationButton.addClickAction(action);
        resetButton.addClickAction(menu);
    } catch (e) {
        console.log(e);
    }
};


*/