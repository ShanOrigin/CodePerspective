
import {grids  as grid } from  '../Components/Canvas.js'
/**
 * Draws text on a canvas.
 * @param {Object} options - Options for drawing text.
 * @param {Object} options.canvas - Canvas object.
 * @param {string} options.text - Text to be drawn.
 * @param {number} options.x - X-coordinate for text.
 * @param {number} options.y - Y-coordinate for text.
 * @param {number} options.fontSize - Font size of the text.
 * @param {string} options.color - Color of the text.
 * @returns {Object} - Raphael.js text object.
 */

const textObj = { rect: null, text: null };
export const drawText = ({ canvas, text, x, y, r = 3 ,   fontSize = 1 , color = "red"  ,  reuse = true , clear = false , Return = false ,  padding = 15 }) => {

       try {
              if (reuse) {
                     textObj.text?.remove();
                     textObj.rect?.remove();
                     textObj.text = null;
                     textObj.rect = null;
              
              if (clear) return;
              }

              // Create a text element
              const Colors = ["#6c757d", "#dc3545", "#0077be", "#00a8e8"];
              textObj.text = canvas.paper.text(0, 0, text).attr({
                     "font-size": canvas.cfontSize*fontSize,
                     "text-anchor": "start",
                     "fill": "white"
              });

              // Get the bounding box of the text
              const bbox = textObj.text.getBBox();

              textObj.rect = canvas.paper.rect(x - bbox.width / 2 -  padding, y - bbox.height / 2 - padding / 2, bbox.width + 2 * padding, bbox.height + padding, r ).attr({
                     "fill-opacity": 1,
                     fill: "#ffffff",
                     stroke: "#cccccc",
                     "stroke-width": 0.5
              });
              textObj.text.toFront();

              // Position the text inside the rectangle, centered
              textObj.text.attr({
                     x: textObj.rect.attr("x") + textObj.rect.attr("width") / 2,
                     y: textObj.rect.attr("y") + textObj.rect.attr("height") / 2,
                     "text-anchor": "middle",
                     "alignment-baseline": "middle",
                     "cursor": "pointer",
                     "fill": color
              });

             if (Return){
             const obj = { rect :textObj.rect , text : textObj.text }; 
             textObj.text = textObj.rect = null ; 
             return obj ;
             }
       } catch (e) {
              console.log(e);
       }
/*

    try {
        return canvas.paper.text(x, y, text).attr({ "font-size": canvas.cfontSize * fontSize, fill: color });
    } catch (error) {
        console.error(`Error in drawText function: ${error.message}`);
    }
*/
};

/**
 * Generates a unique address for an object.
 * @param {Object} options - Options for generating an address.
 * @param {any} options.val - Value for which address is generated.
 * @param {boolean} options.consecutive - Flag to generate consecutive addresses.
 * @returns {string} - Unique object address.
 */

const addressMap = new WeakMap();
let idCounter = 0x7fffb31e5700; // Larger starting point to simulate realistic addresses

export function getAddress({ val, consecutive }) {
    try {
        if (!consecutive) {
            const randomOffset = Math.floor(Math.random() * 0x310102); // Small random offset
            idCounter = 0x7fffb31e5700 + randomOffset;
        }

        const getObjectAddress = (obj) => {
            if (!addressMap.has(obj)) {
                const address = `0x${idCounter.toString(16)}`;
                addressMap.set(obj, address);
                idCounter++;
            }
            return addressMap.get(obj);
        };

        return getObjectAddress({ value: val });
    } catch (error) {
        console.error(`Error in getAddress function: ${error.message}`);
    }
}

/**
 * Waits for user input within specified length ranges based on screen size.
 * @param {number} [umin=0] - Minimum user input value.
 * @param {number} [umax=0] - Maximum user input value.
 * @returns {Promise<number>} - Resolves with the valid user input length.
 */
export function WaitForLength({canvas , umin = 0, umax = 0}) {
    return new Promise((resolve, reject) => {
        try {
            const lengthInput = document.getElementById('lengthInput');
            const submitBtn = document.getElementById('submitBtn');
            const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            const modalBody = document.getElementById('modalMessage');

            const screenSizeRanges = {
                mobile: { min: canvas.currentDevice.min || 3 , max: canvas.currentDevice.max  || 6 },
                tablet: { min: canvas.currentDevice.min || 3 ,  max: canvas.currentDevice.max || 7 },
                laptop: { min: canvas.currentDevice.min || 3 , max: canvas.currentDevice.max  || 8 }
            };

            const width = window.innerWidth;
            let currentRange;

            if (width < 768) {
                currentRange = screenSizeRanges.mobile;
                modalBody.textContent = `Enter Length Between ${currentRange.min - umin} and ${currentRange.max - umax} for Mobile`;
            } else if (width >= 768 && width < 992) {
                currentRange = screenSizeRanges.tablet;
                modalBody.textContent = `Enter Length Between ${currentRange.min - umin} and ${currentRange.max - umax} for Tablet`;
            } else {
                currentRange = screenSizeRanges.laptop;
                modalBody.textContent = `Enter Length Between ${currentRange.min - umin} and ${currentRange.max - umax} for Laptop`;
            }

            lengthInput.min = currentRange.min;
            lengthInput.max = currentRange.max;
            submitBtn.disabled = true;

            const submitHandler = () => {
                const length = lengthInput.value.trim();
                const lengthInt = parseInt(length, 10);

                if (length !== "" && lengthInt >= (currentRange.min - umin) && lengthInt <= (currentRange.max - umax)) {
                    //console.log("Length submitted:", length);
                    lengthInput.value = "";
                    modal.hide();
                    cleanup();
                    resolve(lengthInt);
                } else {
                  //  console.log(`Invalid length. Please enter a number between ${currentRange.min} and ${currentRange.max}.`);
                    reject("Invalid length");
                }
            };

            const inputHandler = () => {
                const value = lengthInput.value.trim();
                const lengthInt = parseInt(value, 10);
                submitBtn.disabled = value === "" || lengthInt < (currentRange.min - umin) || lengthInt > (currentRange.max - umax);
            };

            const cleanup = () => {
                submitBtn.removeEventListener('click', submitHandler);
                lengthInput.removeEventListener('input', inputHandler);
            };

            cleanup();

            submitBtn.addEventListener('click', submitHandler);
            lengthInput.addEventListener('input', inputHandler);

            modal.show();
            inputHandler();
        } catch (error) {
            console.error(`Error in waitForLength function: ${error.message}`);
        }
    });
}



/**
 * Creates an input element for user input within the given canvas.
 * @param {Object} options - The options for the function.
 * @param {Object} options.canvas - The Raphael canvas object.
 * @param {string} [options.methodName="Something"] - The name of the method for animation.
 * @param {number} [options.umin=0] - Minimum input range.
 * @param {number} [options.umax=0] - Maximum input range.
 * @param {number} [options.Y=0.5] - Vertical positioning factor for the message body.
 * @param {boolean} [options.canvasDimensionaChange=false] - Flag to change canvas dimensions based on user input.
 * @returns {Promise<number>} A promise that resolves with the user's input length.
 */
export async function waitForLength({ canvas, methodName = "Something", umin = 0, umax = 0, Y = 0.5 , defFactor =[ 0.5 , 1 ] , canvasDimensionaChange = false }) {
    /**
     * Creates an input field on the canvas.
     * @param {number} x - The x-position of the input.
     * @param {number} y - The y-position of the input.
     * @param {number} w - The width of the input.
     * @param {number} h - The height of the input.
     * @param {string} c - The color of the input text.
     * @param {number} m1 - Minimum value for placeholder range.
     * @param {number} m2 - Maximum value for placeholder range.
     * @returns {HTMLElement} The created input element.
     */
    const createInput = async (x, y, w, h, c, m1, m2) => {
        const canvasParent = document.getElementById(canvas.canvasID);
        canvasParent.style.position = 'relative';

        const inputElement = document.createElement('input');
        Object.assign(inputElement.style, {
            position: 'absolute', textAlign: 'center', background: 'rgba(0, 0, 0, 0)', borderRadius: '5px',
            outline: 'none', boxShadow: 'none', caretColor: 'black', caretWidth: '5',
            left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`,
            border: 'none', padding: '0', color: c,
            fontSize: `${canvas.cfontSize}px`,
        });
        inputElement.type = 'number';
        inputElement.required = true;
        inputElement.min = 0;
        inputElement.max = 100;
        inputElement.placeholder = `Enter Between Range [${m1} - ${m2}]`;

        canvasParent.appendChild(inputElement);
        inputElement.classList.add('px-1', 'm-btn');
        return inputElement;
    };

    const messageText = `So you have selected ${methodName} \n for Animation.\n We need to know the length.`;
    const gradient = "45deg-rgba(245,9,9,1)-rgba(234,31,76,1)-rgba(80,20,237,1)-rgba(39,1,255,0.9444444362933819)";

    // Create message and title elements
    const messageBody = drawText({ canvas, r: 0, fontSize: 1.3, text: messageText, x: canvas.canvasWidth * 0.5, y: (canvas.canvasHeight * Y), color: "#363636", Return: true, padding: 15 });
    const title = drawText({ canvas, r: 0, text: "🙏 Welcome User 🙏", fontSize: 1.45, x: canvas.canvasWidth * 0.5, y: messageBody.rect.attr("y") - messageBody.rect.attr("height") * 0.2, color: gradient, Return: true, padding: 10 });

    title.rect.attr({ x: messageBody.rect.attr("x"), width: messageBody.rect.attr("width") });

    const label = drawText({ canvas, r: 0, text: "Please Enter Length:", fontSize: 1.25, x: canvas.canvasWidth * 0.5, y: messageBody.rect.attr("y") + messageBody.rect.attr("height") * 1.22, color: gradient, Return: true, padding: 10 });
    label.rect.attr({ x: messageBody.rect.attr("x") + 0.5, width: messageBody.rect.attr("width") * 0.997, 'stroke': "white" });

    const input = drawText({ canvas, text: "Enter Between 3 To 5", fontSize: 1, x: canvas.canvasWidth * 0.5, y: label.rect.attr("y") + label.rect.attr("height") * 1.6, color: "purple", Return: true, padding: 15 });
    const submitBtn = createButton({ canvas, x: canvas.canvasWidth * 0.5, y: input.rect.attr("y") + input.rect.attr("height") * 1.1, colorCode: 4, textContent: "Submit", padding: 15 });

    const Input = canvas.paper.rect(canvas.canvasWidth * 0.5, label.rect.attr("y") + label.rect.attr("height") * 1.05, messageBody.rect.attr("width") * 0.7, submitBtn.rect.attr("height")).attr({
        fill: "#fff", stroke: "#cccccc", "stroke-width": 0.5, r: 0
    });

    const modalHeight = (submitBtn.rect.attr("y") - title.rect.attr("y")) + submitBtn.rect.attr("height") * 1.15;
    const modal = canvas.paper.rect(messageBody.rect.attr("x"), title.rect.attr("y"), messageBody.rect.attr("width"), modalHeight).attr({
        fill: "#fff", stroke: "#cccccc", "stroke-width": 0.5, r: 0
    });

    submitBtn.rect.attr({ x: canvas.canvasWidth * 0.5 - submitBtn.rect.attr("width") / 2 });
    submitBtn.text.attr({ x: canvas.canvasWidth * 0.5 });

    Input.toFront();
    Input.attr({ x: canvas.canvasWidth * 0.5 - Input.attr("width") / 2, fill: "#d1f9ff" });

    [title, messageBody, label, submitBtn].forEach(parent => {
        parent.rect.toFront();
        parent.text.toFront();
    });

    submitBtn.disableButton();

    const currentRange = determineScreenRange(canvas);
    const g = Input.getBBox();
    const inputBox = await createInput(g.x, g.y, g.width, g.height, "red", currentRange.min - umin, currentRange.max - umax);

    // Return a promise that resolves when user submits the input
    return new Promise((resolve) => {
        const deleteModal = () => {
            [title, messageBody, label, submitBtn, input].forEach(parent => {
                parent.rect.remove();
                parent.text.remove();
            });
            Input.remove();
            inputBox.remove();
            modal.remove();
        };

        const inputHandler = () => {
            const value = inputBox.value.trim();
            const lengthInt = parseInt(value, 10);

            if (value === "" || lengthInt < currentRange.min - umin || lengthInt > currentRange.max - umax) {
                submitBtn.disableButton();
            } else {
                submitBtn.enableButton();
                submitBtn.addClickAction(() => {
                  //  deleteModal();
                   // resolve(lengthInt);

                   const latestValue = parseInt(inputBox.value.trim(), 10); 
                   deleteModal();
                   resolve(latestValue);  // Resolving with the latest value on button click
                });
            }
        };
        inputBox.addEventListener('input', inputHandler);
    }).then(value => {
        if (canvasDimensionaChange) {
            canvas.paper.setSize(canvas.canvasWidth, ( Math.ceil( value/defFactor[1] ) + defFactor[0]  ) * canvas.rectHeight * 3);
            canvas.bg.attr({ height: ( Math.ceil( value/defFactor[1] ) + defFactor[0] ) * canvas.rectHeight * 3 });
            [canvas.canvasWidth, canvas.canvasHeight] = [canvas.paper.width, canvas.paper.height];
        }
        return value;
    });

    /**
     * Determines the screen range based on the current screen width.
     * @param {Object} canvas - The Raphael canvas object.
     * @returns {Object} The range for the current device.
     */
    function determineScreenRange(canvas) {
        const width = window.innerWidth;
        const ranges = {
            mobile: { min: canvas.currentDevice.min || 3, max: canvas.currentDevice.max || 6 },
            tablet: { min: canvas.currentDevice.min || 3, max: canvas.currentDevice.max || 7 },
            laptop: { min: canvas.currentDevice.min || 3, max: canvas.currentDevice.max || 8 }
        };

        if (width < 768) {
            return ranges.mobile;
        } else if (width >= 768 && width < 992) {
            return ranges.tablet;
        } else {
            return ranges.laptop;
        }
    }
}








/**
 * Retrieves all elements from a Raphael paper canvas.
 * @param {Object} paper - Raphael paper object.
 * @returns {Array} - Array of elements in the canvas.
 */
const getAllElements = (paper) => {
    try {
        const elements = [];
        let element = paper.bottom;

        while (element) {
            elements.push(element);
            element = element.next;
        }

        //console.log("Canvas elements:", elements);
        return elements;
    } catch (error) {
        console.error(`Error in getAllElements function: ${error.message}`);
    }
};

/**
 * Clears all elements from a Raphael paper canvas.
 * @param {Object} paper - Raphael paper object.
 */
export const clearCanvas = (paper) => {
    try {
        console.log("Clearing canvas elements");
        const elements = getAllElements(paper);

        elements.forEach(element => {
            if (element.remove && (!(element.id == "reset")  && !(element.id == "play") && !(element.id == "pause")  && !(element.id == "background") ) &&  !grid.includes(element)) {
                element.remove();
            }
        });

        //console.log("Paper after clearing elements:", paper);
    } catch (error) {
        console.error(`Error in clearCanvas function: ${error.message}`);
    }
};

/**
 * Generates random colors.
 * @param {number} n - Number of colors to generate.
 * @returns {Array} - Array of randomly generated colors.
 */
export function generateColors(n) {
    try {
        function generateRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        if (n <= 0) return [];

        const colors = [];
        let previousColor = null;

        for (let i = 0; i < n; i++) {
            let newColor;

            do {
                newColor = generateRandomColor();
            } while (newColor === previousColor);

            colors.push(newColor);
            previousColor = newColor;
        }

        return colors;
    } catch (error) {
        console.error(`Error in generateColors function: ${error.message}`);
    }
}

/**
 * Connects two nodes with an arrow on a canvas.
 * @param {Object} newNode - New node object.
 * @param {Object} nextNode - Next node object to connect.
 * @param {string} cnt - Type of connection (NNtoN or NtoNN).
 * @param {string} [color="red"] - Color of the arrow.
 * @param {string} [pos="mid"] - position where from arrow start ( specially y position).
 */
export const connect = (newNode, nextNode, cnt, color = "red" , pos = "mid" ) => {
    try {
        let arrowPath = [];
        const addArrowPath = (x, y) => arrowPath.push({ x, y });

        
        const { x, y, width: W, height: H } = 'node' in nextNode ? nextNode.node.rectElement.getBBox() : nextNode.rectElement.getBBox();
        let X = x;
        let Y = y;

        const yFactor = pos == "mid" ? 0.45 : pos == "up" ?  0.266 : (0.266*2.8) ; 

        if (pos == "up" && 'prevN' in nextNode) {
           X = nextNode.prevN.rectElement.getBBox().x ;
           Y = nextNode.prevN.rectElement.getBBox().y;
        }
        if (pos == "down" && cnt == "NNtoNB" && 'nextN' in nextNode) {
           X = nextNode.nextN.rectElement.getBBox().x ;
           Y = nextNode.nextN.rectElement.getBBox().y;
        }

/*
        const { x: X, y: Y, width: W, height: H } = 'node' in nextNode ? nextNode.node.rectElement.getBBox() : nextNode.rectElement.getBBox();
       if (pos == "up" && 'prevN' in nextNode){
          X = nextNode.prevN.rectElement.getBBox().x ; 
          Y = nextNode.prevN.rectElement.getBBox().y ; 
       }
*/

        if (cnt === "NNtoN") {
            addArrowPath(newNode.nextN.rectElement.attr("x") + (W * 0.4) / 2, newNode.nextN.rectElement.attr("y") + H * yFactor);
            addArrowPath(arrowPath[0].x + W * 0.4, arrowPath[0].y);
            addArrowPath(arrowPath[1].x, arrowPath[1].y - W * 0.7);
            addArrowPath(arrowPath[2].x - (arrowPath[2].x - (X - W * 0.30)), arrowPath[2].y);
            addArrowPath(arrowPath[3].x, arrowPath[3].y - (arrowPath[3].y - (Y + H * yFactor)));
            addArrowPath(arrowPath[4].x + W * 0.20, arrowPath[4].y);
            addArrowPath(arrowPath[5].x, arrowPath[5].y - W * 0.15);
            addArrowPath(arrowPath[6].x + W * 0.1, arrowPath[6].y + W * 0.2);
            addArrowPath(arrowPath[7].x - W * 0.1, arrowPath[7].y + W * 0.2);
            addArrowPath(arrowPath[8].x, arrowPath[8].y - W * 0.15);
            addArrowPath(arrowPath[9].x - W * 0.1, arrowPath[9].y);
            addArrowPath(arrowPath[10].x, arrowPath[3].y - W * 0.1);
            addArrowPath(arrowPath[2].x + W * 0.1, arrowPath[11].y);
            addArrowPath(arrowPath[12].x, arrowPath[1].y + W * 0.1);
            addArrowPath(arrowPath[0].x, arrowPath[13].y);
        } else if (cnt === "NtoNN") {
            addArrowPath(newNode.nextN.rectElement.attr("x") + (W * 0.4) / 2, newNode.nextN.rectElement.attr("y") + H * yFactor);
            addArrowPath(arrowPath[0].x + W * 0.4, arrowPath[0].y);
            addArrowPath(arrowPath[1].x, arrowPath[1].y + W * 1.6);
            addArrowPath(arrowPath[2].x - (arrowPath[2].x - (X - W * 0.25)), arrowPath[2].y);
            addArrowPath(arrowPath[3].x, arrowPath[3].y + (-arrowPath[3].y + (Y + H * yFactor)));
            addArrowPath(arrowPath[4].x + W * 0.15, arrowPath[4].y);
            addArrowPath(arrowPath[5].x, arrowPath[5].y - W * 0.15);
            addArrowPath(arrowPath[6].x + W * 0.1, arrowPath[6].y + W * 0.2);
            addArrowPath(arrowPath[7].x - W * 0.1, arrowPath[7].y + W * 0.2);
            addArrowPath(arrowPath[8].x, arrowPath[8].y - W * 0.15);
            addArrowPath(arrowPath[9].x - W * 0.25, arrowPath[9].y);
            addArrowPath(arrowPath[10].x, arrowPath[3].y - W * 0.1);
            addArrowPath(arrowPath[2].x - W * 0.1, arrowPath[11].y);
            addArrowPath(arrowPath[12].x, arrowPath[1].y + W * 0.1);
            addArrowPath(arrowPath[0].x, arrowPath[13].y);
        } else if(cnt === "NtoNNB"){
            addArrowPath(newNode.prevN.rectElement.attr("x") + (W * 0.4) / 2, newNode.prevN.rectElement.attr("y") + H * yFactor);
            addArrowPath(arrowPath[0].x - (( W * 0.40)/2)- W*0.05, arrowPath[0].y);
            addArrowPath(arrowPath[1].x, arrowPath[1].y + W * 0.7 );
            addArrowPath(arrowPath[2].x + (arrowPath[2].x - (X - W * 0.2  )), arrowPath[2].y);
            addArrowPath(arrowPath[3].x, arrowPath[3].y + (-arrowPath[3].y + (Y + H * yFactor)));
            addArrowPath(arrowPath[4].x - W * 0.6, arrowPath[4].y);
            addArrowPath(arrowPath[5].x, arrowPath[5].y + W * 0.15);
            addArrowPath(arrowPath[6].x - W * 0.1, arrowPath[6].y - W * 0.2);
            addArrowPath(arrowPath[7].x + W * 0.1, arrowPath[7].y - W * 0.2);
            addArrowPath(arrowPath[8].x, arrowPath[8].y + W * 0.15);
            addArrowPath(arrowPath[9].x + W * 0.5 ,  arrowPath[9].y);
            addArrowPath(arrowPath[10].x, arrowPath[3].y + W * 0.1);
            addArrowPath(arrowPath[2].x - W * 0.1, arrowPath[11].y);
            addArrowPath(arrowPath[12].x, arrowPath[1].y - W * 0.1);
            addArrowPath(arrowPath[0].x, arrowPath[13].y);
        }else if(cnt === "NNtoNB"){
            addArrowPath(newNode.prevN.rectElement.attr("x") + (W * 0.4) / 2, newNode.prevN.rectElement.attr("y") + H * yFactor);
            addArrowPath(arrowPath[0].x - W * 0.9 ,  arrowPath[0].y);
            addArrowPath(arrowPath[1].x, arrowPath[1].y - W *1.6 );
            addArrowPath(arrowPath[2].x + (X - arrowPath[2].x + (W*0.4) * 0.45 ), arrowPath[2].y);
            addArrowPath(arrowPath[3].x, arrowPath[3].y - (arrowPath[3].y - (Y + H * 1.2 )));
            addArrowPath(arrowPath[4].x - W * 0.10, arrowPath[4].y);
            addArrowPath(arrowPath[5].x + W * 0.15, arrowPath[5].y - W * 0.2);
            addArrowPath(arrowPath[6].x + W * 0.15, arrowPath[6].y + W * 0.2);
            addArrowPath(arrowPath[7].x - W * 0.10, arrowPath[7].y);
            addArrowPath(arrowPath[8].x, arrowPath[3].y + W * 0.1);
            addArrowPath(arrowPath[2].x + W * 0.1, arrowPath[9].y);
            addArrowPath(arrowPath[10].x, arrowPath[1].y - W * 0.1);
            addArrowPath(arrowPath[0].x, arrowPath[0].y - W * 0.1);

        }else {
            console.error(`Unsupported connection type: ${cnt}`);
            return;
        }

        if (nextNode.canvasHandler.abort) return;

        const tempPath = nextNode.canvasHandler.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
        tempPath.attr({ stroke: color, 'stroke-width': 3, 'stroke-opacity': 0.6 });
        tempPath.animate({ 'stroke-opacity': 0 }, 500, () => tempPath.remove());

        const arrow = nextNode.canvasHandler.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
        arrow.attr({ fill: color, stroke: 0, opacity: 0.6 });
        //arrow.toBack();
      return arrow ;
    } catch (error) {
        console.error(`Error in connect function: ${error.message}`);
    }
};

/**
 * Function to create a rectangle with centered text.
 * @param {Object} options - Options for creating the button.
 * @param {Object} options.canvas - Canvas object.
 * @param {number} options.x - X-coordinate of the button.
 * @param {number} options.y - Y-coordinate of the button.
 * @param {string} options.id - ID of the button.
 * @param {number} options.colorCode - Color code for the button.
 * @param {string} options.textContent - Text content of the button.
 * @param {number} [options.maxWidth=0] - Maximum width of the button.
 * @param {number} [options.padding=10] - Padding around the text.
 * @returns {Object} - Object containing the created rectangle and text elements.
 */
export function createButton({ canvas, x, y, id, colorCode, textContent, maxWidth = 0, padding = 10 }) {
    try {
        // Create a text element
        const Colors = ["#6c757d", "#dc3545", "#0077be", "#00a8e8" , "#28a745"];
        const text = canvas.paper.text(0, 0, textContent).attr({
            
            "font-size": canvas.cfontSize,
            "text-anchor": "start",
            "fill": "white"
        });
        text.id = id ;
        // Get the bounding box of the text
        const bbox = text.getBBox();

        // If maxWidth is 0, calculate the max width based on the text
        if (maxWidth == 0) {
            maxWidth = bbox.width + padding * 2;
        }

        const buttonWidth = maxWidth ;
//console.log(buttonWidth)
        if ((x + buttonWidth) < canvas.canvasWidth) {
            ;
        } else {
            x = canvas.canvasWidth - buttonWidth * 1.1;
        }

        // Create a rounded rectangle with padding around the text
        const rect = canvas.paper.rect(x, y, buttonWidth, bbox.height + padding, 5).attr({
         
            "stroke": 0,
            "fill": Colors[colorCode % Colors.length],
            "fill-opacity": 1,
            "cursor": "pointer"
        });
        text.toFront();
        rect.id = id ;
        // Position the text inside the rectangle, centered
        text.attr({
            x: x + buttonWidth / 2,
            y: y + rect.attr("height") / 2,
            "text-anchor": "middle",
            "cursor": "pointer"
        });

        let isDisabled = false;

        // Function to handle hover effect
        function addHoverEffect(element) {
            element.hover(
                function () {
                    if (!isDisabled) {
                        rect.attr("stroke", "#000");
                        rect.attr("fill-opacity", 0.7);
                    }
                },
                function () {
                    if (!isDisabled) {
                        rect.attr("stroke", 0);
                        rect.attr("fill-opacity", 1);
                    }
                }
            );
        }

        // Function to handle click effect
        function addClickAction(callback) {
            rect.click(function () {
                if (!isDisabled) {
                    rect.attr("stroke", "#000");
                    rect.attr("stroke-width", 1);
                    disableButton();
                    callback();
                }
            });
            text.click(function () {
                if (!isDisabled) {
                    rect.attr("stroke", "#000");
                    rect.attr("stroke-width", 1);
                    disableButton();
                    callback();
                }
            });
        }

        // Function to disable the button
        function disableButton() {
            isDisabled = true;
            rect.attr({
                "fill-opacity": 0.5,
                "stroke-opacity": 0.5,
                "cursor": "not-allowed"
            });
            text.attr({
                "fill-opacity": 0.5,
                "cursor": "not-allowed"
            });
        }

        // Function to enable the button
        function enableButton() {
            isDisabled = false;
            rect.attr({
                "fill-opacity": 1,
                "stroke": 0,
                "stroke-opacity": 0,
                "cursor": "pointer"
            });
            text.attr({
                "fill-opacity": 1,
                "cursor": "pointer"
            });
        }

        // Add hover effects to both rect and text
        addHoverEffect(rect);
        addHoverEffect(text);

        // Return an object containing both the rect, text, and control functions
        return { rect, text, addClickAction, disableButton, enableButton, maxWidth };
    } catch (error) {
        console.error(`Error in createButton function: ${error.message}`);
    }
}

/**
 * Enables or disables buttons on the canvas.
 * @param {Object} canvas - Canvas object.
 * @param {boolean} show - Whether to show or hide the buttons.
 */


export const  canvasButtons = ( canvas , action ) =>{
    if (action ){
       canvas.resetButton.enableButton();
       canvas.pauseButton.disableButton();
       canvas.playButton.disableButton();
    }else{
       canvas.resetButton.disableButton();
       canvas.pauseButton.enableButton();
       canvas.playButton.enableButton();
   }
}
export const canvasFunction = (canvas, show) => {
    try {
/*
            for (var x = 0; x <= canvas.canvasWidth; x += canvas.rectWidth * 0.05) {
             grid.push( canvas.paper.path(["M", x, 0, "L", x, canvas.canvasHeight]).attr({
                    stroke: "#ababab",
                     "stroke-width":0.1
                }));
            }

            // Draw horizontal lines
            for (var y = 0; y <= canvas.canvasHeight; y += canvas.rectHeight * 0.05) {
             grid.push( canvas.paper.path(["M", 0, y, "L", canvas.canvasWidth, y]).attr({
                    stroke: "#ababab",
                    "stroke-width":0.1
                }));
            }
*/
        canvasButtons( canvas , show)
       
    } catch (error) {
        console.error(`Error in canvasFunction: ${error.message}`);
    }
}


/**
 * detele  buttons on the canvas.
 * @param {Object} canvas - Canvas object.
 * @param {boolean} show - Whether to show or hide the buttons.
 */
export const remove = (element) => {
    try {
     if ('rect' in element ) element.rect.remove();
     if ('text' in element ) element.text.remove();
    } catch (error) {
        console.error(`Error in canvasFunction: ${error.message}`);
    }
}


//const textObj = { rect: null, text: null };

export function command({ canvas, x, y, colorCode, textContent, reuse = true , clear = false , Return = false ,  padding = 10 }) {
       try {
              if (reuse) {
                     textObj.text?.remove();
                     textObj.rect?.remove();
                     textObj.text = null;
                     textObj.rect = null;
              
              if (clear) return;
              }

              // Create a text element
              const Colors = ["#6c757d", "#dc3545", "#0077be", "#00a8e8"];
              textObj.text = canvas.paper.text(0, 0, textContent).attr({
                     "font-size": canvas.cfontSize,
                     "text-anchor": "start",
                     "fill": "white"
              });

              // Get the bounding box of the text
              const bbox = textObj.text.getBBox();

              textObj.rect = canvas.paper.rect(x - bbox.width / 2 - 2 * padding, y - bbox.height / 2 - padding / 2, bbox.width + 4 * padding, bbox.height + padding, 3).attr({
                     "fill-opacity": 1,
                     fill: "#ffffff",
                     stroke: "#cccccc",
                     "stroke-width": 0.5
              });
              textObj.text.toFront();

              // Position the text inside the rectangle, centered
              textObj.text.attr({
                     x: textObj.rect.attr("x") + textObj.rect.attr("width") / 2,
                     y: textObj.rect.attr("y") + textObj.rect.attr("height") / 2,
                     "text-anchor": "middle",
                     "alignment-baseline": "middle",
                     "cursor": "pointer",
                     "fill": Colors[colorCode % Colors.length]
              });

             if (Return){
             const obj = { rect :textObj.rect , text : textObj.text }; 
             textObj.text = textObj.rect = null ; 
             return obj ;
             }
       } catch (e) {
              console.log(e);
       }
}




// specially function for bit operation section

 export  const truthTable = async (canvas , Rect , operator , col = 3  ) =>{

       const inputTable = {
          "&": [{ 1: "input1", 2: "input2", 3: "Output" }, { 1: 0, 2: 0, 3: 0 & 0 }, { 1: 0, 2: 1, 3: 0 & 1 }, { 1: 1, 2: 0, 3: 1 & 0 }, { 1: 1, 2: 1, 3: 1 & 1 }],
          "|": [{ 1: "input1", 2: "input2", 3: "Output" }, { 1: 0, 2: 0, 3: 0 | 0 }, { 1: 0, 2: 1, 3: 0 | 1 }, { 1: 1, 2: 0, 3: 1 | 0 }, { 1: 1, 2: 1, 3: 1 | 1 }],
          "^": [{ 1: "input1", 2: "input2", 3: "Output" }, { 1: 0, 2: 0, 3: 0 ^ 0 }, { 1: 0, 2: 1, 3: 0 ^ 1 }, { 1: 1, 2: 0, 3: 1 ^ 0 }, { 1: 1, 2: 1, 3: 1 ^ 1 }],
          "~": [{ 1: "input", 2: "Output" }, { 1: 0, 2: ~0 & 1 }, { 1: 1, 2: ~1 & 1 }]
       };


       const [ w , h , c ] = [ canvas.rectWidth , canvas.rectHeight , canvas.cfontSize ] ;
       
       canvas.rectRadius = 0;

       const tableArea = new Rect({ 
           "canvasHandler": canvas, 
           "xposition": canvas.canvasWidth * 0.05, 
           "yposition": canvas.canvasHeight * 0.02, 
           "content": "", 
           "index": null, 
           "color": canvas.backgroundColor 
       });

       canvas.rectWidth = canvas.canvasWidth * 0.3;
       canvas.rectHeight = canvas.canvasHeight * 0.2;

       tableArea.drawRect({ "rect": true, "cont": false, "ind": false, "popover": false, "popoverTextArray": null });

       const Tdim = tableArea.rectElement.getBBox();
       const H = Tdim.height * 0.085;
      
       tableArea.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 
       const tableTitle = new Rect({
           "canvasHandler": canvas, 
           "xposition": Tdim.x, 
           "yposition": Tdim.y, 
           "content": "Truth Table", 
           "index": null, 
           "color": "#5abf9f" 
       });
     
       canvas.rectHeight = Tdim.height / (inputTable[operator].length+1) ;

       tableTitle.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });

       const dim = tableTitle.rectElement.getBBox();

       canvas.rectWidth = Tdim.width / col;
       const result = [] ;
       // Loop through the rows and columns of the truth table for the given operator
       for(let i = 0; i < inputTable[operator].length; i++) {

          const row = [] ;
          canvas.cfontSize = ( i ) ? c :  canvas.cfontSize * 0.85 ;
          for(let j = 1; j <= col; j++) {  // Loop through input1, input2, output
              const cell = new Rect({
                  "canvasHandler": canvas, 
                  "xposition": Tdim.x + canvas.rectWidth * (j-1), 
                  "yposition": Tdim.y + canvas.rectHeight *( i+1), 
                  "content": inputTable[operator][i][j], 
                  "index": null, 
                  "color": "#5a7cbf" 
              });
              await cell.drawRect({ "rect": true, "cont": true, "ind": false, "popover": false, "popoverTextArray": null });
              row.push(cell);
          }

         result.push(row);
          
       }

       canvas.rectWidth = w ;
       canvas.rectHeight = h ;
       canvas.cfontSize
       canvas.rectRadius = 5;
       return result  ;
   }







/*
const textObj = { rect : null , text : null } ;

export function command({ canvas, x, y, colorCode, textContent , reuse = false  , clear = false , padding = 10 }) {
    try {

         if ( reuse){
       textObj.text = null ;
       textObj.rect = null ;
         }
         if (clear){
          textObj.text.remove();
          textObj.rect.remove();
          return
        }
        // Create a text element
        const Colors = ["#6c757d", "#dc3545", "#0077be", "#00a8e8"];
        textObj.text = canvas.paper.text(0, 0, textContent).attr({
            
            "font-size": canvas.cfontSize,
            "text-anchor": "start",
            "fill": "white"
        });
        
        // Get the bounding box of the text
        const bbox = textObj.text.getBBox();

        textObj.rect = canvas.paper.rect(x - bbox.width/2 - 2*padding , y - bbox.height/2 -  padding/2 , bbox.width + 4*padding   , bbox.height + padding , 3).attr({
         
            "fill-opacity": 1,
            fill: "#ffffff" , 
            stroke: "#cccccc",
            "stroke-width": 0.5
        });
        textObj.text.toFront();
     
        // Position the text inside the rectangle, centered
        textObj.text.attr({
          
            x:textObj.rect.attr("x") + textObj.rect.attr("width") / 2,
            y:textObj.rect.attr("y") + textObj.rect.attr("height") / 2,
            "text-anchor": "middle",
            "alignment-baseline": "middle",
            "cursor": "pointer",
            "fill" :Colors[colorCode % Colors.length]
        });
    }catch(e){
       console.log(e);
    }

}
*/












/*

export const drawText = ({ canvas, text, x, y, fontSize, color }) => {
   return  canvas.paper.text(x, y, text).attr({ "font-size": canvas.cfontSize * fontSize, fill: color });
     };







export function getAddress({ val, consecutive }) {
    // If consecutive is false, reset the counter to a new random starting point for each call
    if (!consecutive) {
        const randomOffset = Math.floor(Math.random() * 0x310102); // Small random offset
        idCounter = 0x7fffb31e5700 + randomOffset;
    }

    const getObjectAddress = (obj) => {
        if (!addressMap.has(obj)) {
            const address = `0x${idCounter.toString(16)}`;
            addressMap.set(obj, address);
            idCounter++; // Increment to simulate consecutive memory addresses
        }
        return addressMap.get(obj);
    };

    return getObjectAddress({ value: val });
}







export function waitForLength(umin = 0  , umax = 0) {
    return new Promise((resolve, reject) => {
        const lengthInput = document.getElementById('lengthInput');
        const submitBtn = document.getElementById('submitBtn');
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        const modalBody = document.getElementById('modalMessage'); // Assuming this is the ID of the modal body

        // Define the length ranges for different screen sizes
        const screenSizeRanges = {
            mobile: {
                min: 3,
                max: 5
            },
            tablet: {
                min: 4,
                max: 6
            },
            laptop: {
                min: 5,
                max: 7
            }
        };

        // Determine current screen size
        const width = window.innerWidth;
        let currentRange;
        if (width < 768) {
            currentRange = screenSizeRanges.mobile;
            modalBody.textContent = `Enter Length Between ${currentRange.min - umin} and ${currentRange.max - umax} for Mobile`;
        } else if (width >= 768 && width < 992) {
            currentRange = screenSizeRanges.tablet;
            modalBody.textContent = `Enter Length Between ${currentRange.min - umin } and ${currentRange.max - umax} for Tablet`;
        } else {
            currentRange = screenSizeRanges.laptop;
            modalBody.textContent = `Enter Length Between ${currentRange.min - umin } and ${currentRange.max - umax } for Laptop`;
        }

        // Set the input attributes based on the screen size
        lengthInput.min = currentRange.min;
        lengthInput.max = currentRange.max;

        // Initially disable the submit button
        submitBtn.disabled = true;

        const submitHandler = () => {
            const length = lengthInput.value.trim();
            const lengthInt = parseInt(length, 10);

            if (length !== "" && lengthInt >=( currentRange.min - umin ) && lengthInt <= (currentRange.max - umax )) {
                console.log("Length submitted:", length);
                lengthInput.value = ""; // Clear the input field
                modal.hide(); // Hide the modal after submission
                cleanup();
                resolve(lengthInt);
            } else {
                console.log(`Invalid length. Please enter a number between ${currentRange.min} and ${currentRange.max}.`);
                reject("Invalid length");
            }
        };

        const inputHandler = () => {
            const value = lengthInput.value.trim();
            const lengthInt = parseInt(value, 10);
            submitBtn.disabled = value === "" || lengthInt < ( currentRange.min - umin ) || lengthInt > ( currentRange.max - umax );
        };

        const cleanup = () => {
            submitBtn.removeEventListener('click', submitHandler);
            lengthInput.removeEventListener('input', inputHandler);
        };

        // Ensure event listeners are removed before adding new ones
        cleanup();

        submitBtn.addEventListener('click', submitHandler);
        lengthInput.addEventListener('input', inputHandler);

        // Check the input value as soon as the modal is shown and set the button state accordingly
        modal.show();
        inputHandler();
    });
}









// Function to get all elements from the canvas
const getAllElements = (paper) => {
    const elements = [];
    let element = paper.bottom; // Start from the bottom-most element

    while (element) {
        elements.push(element);
        element = element.next; // Move to the next element in the linked list
    }

    console.log("Canvas elements:", elements);
    return elements;
};




// Function to clear all elements from the canvas without destroying the canvas paper
export const clearCanvas = (paper) => {
    console.log("Clearing canvas elements");
    const elements = getAllElements(paper);
    elements.forEach(element => {
        if (element.remove && !(element.id =="play") && !(element.id =="pause") && !(element.id =="reset") && !(element.id =="background")) { // Check if the element has a remove method
   
            element.remove();
           
        }
    });

    // Ensure the paper itself is still intact
    console.log("Paper after clearing elements:", paper);
};










export function generateColors(n) {
    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    if (n <= 0) return [];

    const colors = [];
    let previousColor = null;

    for (let i = 0; i < n; i++) {
        let newColor;

        // Ensure the new color is different from the previous color
        do {
            newColor = generateRandomColor();
        } while (newColor === previousColor);

        colors.push(newColor);
        previousColor = newColor;
    }

    return colors;
}








          export  const connect = (newNode, nextNode , cnt , color = "red") => {
                let arrowPath = [];
                const addArrowPath = (x, y) => arrowPath.push({ x, y });

                const { x: X, y: Y, width: W, height: H } = 'node' in nextNode ? nextNode.node.rectElement.getBBox() : nextNode.rectElement.getBBox();

                if( cnt =="NNtoN"){
                addArrowPath(newNode.nextN.rectElement.attr("x") + (W * 0.4) / 2, newNode.nextN.rectElement.attr("y") + H * 0.45);
                addArrowPath(arrowPath[0].x + W * 0.4, arrowPath[0].y);
                addArrowPath(arrowPath[1].x, arrowPath[1].y - W * 0.7);
                addArrowPath(arrowPath[2].x - (arrowPath[2].x - (X - W * 0.25)), arrowPath[2].y);
                addArrowPath(arrowPath[3].x, arrowPath[3].y - (arrowPath[3].y - (Y + H * 0.45)));
                addArrowPath(arrowPath[4].x + W * 0.15, arrowPath[4].y);
                addArrowPath(arrowPath[5].x, arrowPath[5].y - W * 0.15);
                addArrowPath(arrowPath[6].x + W * 0.1, arrowPath[6].y + W * 0.2);
                addArrowPath(arrowPath[7].x - W * 0.1, arrowPath[7].y + W * 0.2);
                addArrowPath(arrowPath[8].x, arrowPath[8].y - W * 0.15);
                addArrowPath(arrowPath[9].x - W * 0.05, arrowPath[9].y);
                addArrowPath(arrowPath[10].x, arrowPath[3].y - W * 0.1);
                addArrowPath(arrowPath[2].x + W * 0.1, arrowPath[11].y);
                addArrowPath(arrowPath[12].x, arrowPath[1].y + W * 0.1);
                addArrowPath(arrowPath[0].x, arrowPath[13].y);
                }else if (cnt == "NtoNN"){

        addArrowPath(newNode.nextN.rectElement.attr("x") + (W * 0.4) / 2, newNode.nextN.rectElement.attr("y") + H * 0.45);
    addArrowPath(arrowPath[0].x + W * 0.35, arrowPath[0].y);
    addArrowPath(arrowPath[1].x, arrowPath[1].y + W * 1.6);
    addArrowPath(arrowPath[2].x - (arrowPath[2].x - (X - W * 0.15)), arrowPath[2].y);
    addArrowPath(arrowPath[3].x, arrowPath[3].y + (-arrowPath[3].y + (Y + H * 0.45)));
    addArrowPath(arrowPath[4].x + W * 0.05, arrowPath[4].y);
    addArrowPath(arrowPath[5].x, arrowPath[5].y - W * 0.15);


    addArrowPath(arrowPath[6].x + W * 0.1, arrowPath[6].y + W * 0.2);
    addArrowPath(arrowPath[7].x - W * 0.1, arrowPath[7].y + W * 0.2);
    addArrowPath(arrowPath[8].x, arrowPath[8].y - W * 0.15);


    addArrowPath(arrowPath[9].x - W * 0.15, arrowPath[9].y);

    addArrowPath(arrowPath[10].x, arrowPath[3].y - W * 0.1);

    addArrowPath(arrowPath[2].x - W * 0.1, arrowPath[11].y);
   addArrowPath(arrowPath[12].x, arrowPath[1].y + W * 0.1);
    addArrowPath(arrowPath[0].x, arrowPath[13].y);


}


                if (nextNode.canvasHandler.abort) return;

                const tempPath = nextNode.canvasHandler.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
                tempPath.attr({ stroke: color , 'stroke-width': 3, 'stroke-opacity': 0.6 });
                tempPath.animate({ 'stroke-opacity': 0 }, 500, () => tempPath.remove());

                const arrow = nextNode.canvasHandler.paper.path(arrowPath.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
                arrow.attr({ fill: color , stroke: 0, opacity: 0.6 });
            };








// Function to create a rectangle with centered text
export function createButton({ canvas, x, y, id, colorCode, textContent, maxWidth = 0, padding = 10 }) {
    // Create a text element
    const Colors = ["#6c757d", "#dc3545", "#0077be", "#00a8e8"];

    const text = canvas.paper.text(0, 0, textContent).attr({
        "id" : id ,
        "font-size": canvas.cfontSize,
        "text-anchor": "start",
        "fill": "white"
    });

    // Get the bounding box of the text
    const bbox = text.getBBox();

    // If maxWidth is 0, calculate the max width based on the text
    if (maxWidth === 0) {
        maxWidth = bbox.width;
    }

    const buttonWidth = maxWidth + padding * 2;

    if ((x + buttonWidth) < canvas.canvasWidth) {
        ;
    } else {
        x = canvas.canvasWidth - buttonWidth * 1.1;
    }

    // Create a rounded rectangle with padding around the text
    const rect = canvas.paper.rect(x, y, buttonWidth, bbox.height + padding , 5).attr({
        "id" : id ,
        "stroke": 0,
        "fill": Colors[colorCode % Colors.length],
        "fill-opacity": 1,
        "cursor": "pointer"
    });
    text.toFront();

    // Position the text inside the rectangle, centered
    text.attr({
        x: x + buttonWidth / 2,
        y: y + rect.attr("height") / 2,
        "text-anchor": "middle",
        "cursor": "pointer"
    });

    let isDisabled = false;

    // Function to handle hover effect
    function addHoverEffect(element) {
        element.hover(
            function () {
                if (!isDisabled) {
                    rect.attr("stroke", "#000");
                    rect.attr("fill-opacity", 0.7);
                }
            },
            function () {
                if (!isDisabled) {
                    rect.attr("stroke", 0);
                    rect.attr("fill-opacity", 1);
                }
            }
        );
    }

    // Function to handle click effect
    function addClickAction(callback) {
        rect.click(function () {
            if (!isDisabled) {
                rect.attr("stroke", "#000");
                rect.attr("stroke-width" , 1 );
                disableButton();
                callback();
            }
        });
        text.click(function () {
            if (!isDisabled) {
                rect.attr("stroke", "#000");
                rect.attr("stroke-width" , 1 );
                disableButton();
                callback();
            }
        });
    }

    // Function to disable the button
    function disableButton() {
        isDisabled = true;
        rect.attr({
             "fill-opacity": 0.5,

             "stroke-opacity": 0.5,
             "cursor": "not-allowed"
        });
        text.attr({
            "fill-opacity": 0.5,
            "cursor": "not-allowed"
        });
    }

    // Function to enable the button
    function enableButton() {
        isDisabled = false;
        rect.attr({
             "fill-opacity": 1,
             "stroke":0,
             "stroke-opacity": 0,
             "cursor": "pointer"
        });
        text.attr({
            "fill-opacity": 1,
            "cursor": "pointer"
        });
    }

    // Add hover effects to both rect and text
    addHoverEffect(rect);
    addHoverEffect(text);

    // Return an object containing both the rect, text, and control functions
    return { rect, text, addClickAction, disableButton, enableButton, maxWidth };
}




export const canvasFunction  = (canvas , show) => {
       if(show){
       canvas.resetButton.enableButton();
       canvas.playButton.enableButton();
       canvas.pauseButton.enableButton();
       }else{
       canvas.resetButton.disableButton();
       canvas.playButton.disableButton();
       canvas.pauseButton.disableButton();

       }
}


*/