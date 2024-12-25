//+++++++++++ Rect Class andall related method++++++++++++++++++++

export class Rect {
    static AllBoxe = [];
    static boxes = [];
    static boxes2D = [];

   constructor({ canvasHandler, xposition, yposition, content = "" , index = null , color = "#F4C430" }) {
        this.canvasHandler = canvasHandler;
        this.xposition = xposition;
        this.yposition = yposition;
        this.content = content;
        this.index = index;
        this.color = color;
        this.rectElement = null;
        this.popoverRect = null;
        this.textElement = null;
        this.popoverText = null;
        this.indexTextElement = null;
        this.popoverIndex = null;
    }


/**
 * Creates a popover tooltip with customizable text lines and attaches it to a specified element.
 * The popover is shown or hidden when the element is clicked.
 *
 * @param {Object} canvasHandler - An object that manages the canvas and its elements.
 * @param {Object} element - The canvas element to which the popover will be attached. This element should support click events.
 * @param {Array<string>} lines - An array of text strings to be displayed in the popover.
 * @param {string} [type="up"] - Determines the position of the popover relative to the element. It can be "up" or "down".
 * @returns {Object} A set of canvas elements (rectangle, arrow, and text elements) representing the popover. The popover can be shown or hidden based on user interaction.
 *
 * @example
 * const canvasHandler = ...; // Your canvas handler instance
 * const element = ...; // The element to attach the popover to
 * const lines = ["Line 1", "Line 2", "Line 3"];
 * const popover = await createPopover(canvasHandler, element, lines, "up");
 * // Now, clicking on `element` will toggle the visibility of the popover.
 */


  static async createPopover({canvasHandler, element, lines, type = "up"}) {
    try {
        const vars = {
            lh: 10,
            w: 165,
            p: 5,
            s: 10,
            d: 15,
            bg: "#ffffff",
            bc: "#cccccc",
            bw: 0.5
        };

        vars.apPath = `M${vars.w / 2 - vars.s},${vars.lh * lines.length}L${vars.w / 2},${vars.lh * lines.length + vars.s}L${vars.w / 2 + vars.s},${vars.lh * lines.length}Z`

        const popoverRect = canvasHandler.paper.rect(0, 0, vars.w, vars.lh * lines.length).attr({
            fill: vars.bg,
            stroke: vars.bc,
            "stroke-width": vars.bw
        });
        const popoverArrow = canvasHandler.paper.path(vars.apPath).attr({
            fill: vars.bg,
            stroke: vars.bc,
            "stroke-width": vars.bw
        });
        const popover = canvasHandler.paper.set().push(popoverRect, popoverArrow).hide();
        const colors = ["red", "green", "blue", "orange"];
        const textElements = [];

        for (let i = 0; i < lines.length; i++) {
            const color = colors[i % colors.length];
            const yPos = (vars.lh * lines.length / lines.length) * 0.5 + (vars.lh * lines.length / lines.length) * (0.5 + i);
            const textElement = canvasHandler.paper.text(vars.w * 0.5, popoverRect.attr("y") + yPos, lines[i]).attr({
                "text-anchor": "middle",
                "alignment-baseline": "middle",
                fill: color
            }).hide();
            textElements.push(textElement);
        }

        if (vars.lh * lines.length + 2 * vars.p > vars.lh * lines.length) {
            const h = vars.lh * lines.length + 2 * vars.p;
            popoverRect.attr({
                height: h
            });
            popoverArrow.attr({
                path: type === "up" ? `M${vars.w / 2 - vars.s},${h}L${vars.w / 2},${h + vars.s}L${vars.w / 2 + vars.s},${h}Z` : `M${vars.w / 2 - vars.s},${h - vars.lh * lines.length - 2 * vars.p}L${vars.w / 2},${h - vars.s - vars.lh * lines.length - 2 * vars.p}L${vars.w / 2 + vars.s},${h - vars.lh * lines.length - 2 * vars.p}Z`
            });
        }

        for (let i = 0; i < textElements.length; i++) popover.push(textElements[i]);

        let isVisible = false;

        element.click(() => {
            if (!isVisible) {
                const rectBounds = element.getBBox();
                const rectX = rectBounds.x + rectBounds.width / 2 - popoverRect.attr("width") / 2;
                let rectY;
                if (type === "up") rectY = rectBounds.y + -popoverRect.attr("height") - vars.d;
                else rectY = rectBounds.y + rectBounds.height + vars.s * 1.5;
                popover.transform(`T${rectX},${rectY}`).show().toFront();
                for (let i = 0; i < textElements.length; i++) textElements[i].show().toFront();
                isVisible = true;
            } else {
                popover.hide();
                for (let i = 0; i < textElements.length; i++) textElements[i].hide();
                isVisible = false;
            }
        });

        return popover;

    }catch(e){
    console.log(e)
    }
 }



/**
 * Asynchronously handles the creation of a rectangle input element, text input, and optional popovers on a canvas.
 *
 * @param {boolean} [rect=false] - Indicates whether to create a rectangle element.
 * @param {boolean} [cont=false] - Indicates whether to create a text element.
 * @param {boolean} [ind=false] - Indicates whether to create an index text element.
 * @param {boolean} [popover=false] - Indicates whether to create popovers for the elements.
 * @param {string} [inputType="number"] - The type of input element to create (e.g., "number" or "text").
 * @param {Array<number>} [Range=[-1000, 1000]] - The range of acceptable values for number input.
 * @param {string} [plc=""] - Placeholder text for the input element.
 * @param {Array<Array<string>>}  [popoverTextArray=null] - 2D Array consists Text  for popover elements.

 * @returns {Promise<any>} - A promise that resolves with the user input value.
 *
 * @example
 * const userInput = await inputRect(true, true, true, true, "number", [0, 100], "Enter a number");
 * console.log("User input:", userInput);
 */



    async inputRect({rect = false, cont = false, ind = false, popover = false, inputType = "number", Range = [-1000, 1000], plc = "" , popoverTextArray = null }) {
        return new Promise(async (resolve, reject) => {
            try {
                let userInput; // Store user input
                let inputProcessed = false; // Flag to indicate if input has been processed
                const canvasParent = document.getElementById(this.canvasHandler.canvasID);
                const createShapes = async () => {
                    if (rect) {
                        this.rectElement = this.canvasHandler.paper.rect(this.xposition, this.yposition, this.canvasHandler.rectWidth, this.canvasHandler.rectHeight, this.canvasHandler.rectRadius).attr({
                            fill: this.color,
                            stroke: 0,
                            "font-size": this.canvasHandler.cfontSize,
                            
                        });
                
                    }
                    if (ind) {
                        this.indexTextElement = this.canvasHandler.paper.text(this.xposition + this.canvasHandler.rectWidth * 0.1, this.yposition - this.canvasHandler.rectHeight * 0.15, this.index).attr({
                            "font-size": this.canvasHandler.ifontSize,
                            "text-anchor": "start",
                            "alignment-baseline": "top"
                        });
                    }
                    if (cont) {
                        this.textElement = this.canvasHandler.paper.text(this.xposition + this.canvasHandler.rectWidth / 2, this.yposition + this.canvasHandler.rectHeight / 2, "").attr({
                            "stroke": this.canvasHandler.backgroundColor,
                            "stroke-width": 1.25,
                            fill: this.canvasHandler.backgroundColor,
                            "font-size": this.canvasHandler.cfontSize,
                            "text-anchor": "middle",
                            "alignment-baseline": "middle",
                            fill:"black"
                        });
                    }

                };

                const createInput = async () => {

                    canvasParent.style.position = 'relative';
                    const parentX = this.rectElement.attr("x");
                    const parentY = this.rectElement.attr("y");
                    const inputElement = document.createElement('input');
                    inputElement.type = inputType;
                    inputElement.required = true;
                    inputElement.min = Range[0];
                    inputElement.max = Range[1];
                    inputElement.style.position = 'absolute';
                    inputElement.style.textAlign = 'center';
                    inputElement.style.background = "RGBA(0 ,0 ,0 ,0)";
                    inputElement.style.borderRadius = "5px";
                    inputElement.style.outline = 'none';
                    inputElement.style.boxShadow = 'none';
                    inputElement.style.caretColor = 'white';
                    inputElement.style.caretWidth = '2px';
                    inputElement.style.left = parentX + "px";
                    inputElement.style.top = parentY + "px";
                    inputElement.style.width = this.canvasHandler.rectWidth + "px";
                    inputElement.style.height = this.canvasHandler.rectHeight + "px";
                    inputElement.style.border = 'none';
                    inputElement.style.padding = '0';
                    inputElement.placeholder = plc;
                    inputElement.style.color = this.canvasHandler.backgroundColor;
                    inputElement.style.fontSize = this.canvasHandler.cfontSize + "px";
                    canvasParent.appendChild(inputElement);
                    inputElement.focus();
                    inputElement.classList.add('px-1'  ,'m-btn');
                    this.inputElement = inputElement;
   
                };

                const handleInput = async () => {
                   try {
                    return new Promise((resolve) => {
                        const inputElement = this.inputElement;
                        const handleInput =async (event) => {
                            const userInput = inputElement.value;
                            if (event.target !== inputElement || inputProcessed || this.canvasHandler.abort || userInput === '') return;

                            if (inputType === "number") {
                             
                                if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                                if (this.canvasHandler.abort )return;

                                const userInputNum = Number(userInput);
                                const sanitizedInput = Math.min(Range[1], Math.max(Range[0], userInputNum));
                                this.textElement.attr({
                                    text: parseInt(sanitizedInput)
                                });
                                this.content = parseInt(sanitizedInput);
                                inputProcessed = true;

                                if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                                if (this.canvasHandler.abort )return;

                                //inputElement.removeEventListener('blur', handleInput);
                                inputElement.removeEventListener('keydown', handleKeydown);
                                inputElement.blur();
                                try{
                                  if(!this.canvasHandler.isPaused )canvasParent.removeChild(inputElement);
                                }catch(e){ ; }
                                resolve(parseInt(sanitizedInput));
                            }
                            if (inputType === "text") {

                               if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                               if (this.canvasHandler.abort )return;

                                this.textElement.attr({
                                    text: userInput
                                });
                                this.content = userInput;
                                inputProcessed = true;

                                if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                                if (this.canvasHandler.abort )return;

                             
                                //inputElement.removeEventListener('blur', !this.canvasHandler.isPaused ? handleInput : ()=>{} );
                                inputElement.removeEventListener('keydown', !this.canvasHandler.isPaused ? handleKeydown : ()=>{} );
                                 
                                inputElement.blur();
                                //if(!this.canvasHandler.isPaused)canvasParent.removeChild(inputElement);
                                try{
                                  if(!this.canvasHandler.isPaused )canvasParent.removeChild(inputElement);
                                }catch(e){ ; }
                                resolve(userInput);
                            }
                        };

                        const handleKeydown = (event) => {
                            if (event.key === "Enter") handleInput(event);
                        };


                       // document.addEventListener('click', handleInput);
                        document.addEventListener('keydown', handleKeydown);
                    });
                  }catch(e){
                  console.error(e)
                  }
                };


                const createPopovers = async () => {
                    const s = ["th", "st", "nd", "rd"];
                    let pos = (this.index < 4) ? s[this.index] : s[0];
                const boxText = rect && cont  ? [`👋Hi, I am ${this.index}${pos} Element in Array`, `Index = ${this.index}, Value = ${this.textElement.attr("text")}`, "Array Name = UserArray"] : "" ;
                const textText = cont ?  [`👋Hi, I am Data Value Of Element`, `My Data Value = ${this.textElement.attr("text")}`]: "" ;
                const indexText = ind ? [`👋Hi, I am Index Of Element`, `My Index = ${this.index}`] : "";

                   // const boxText = ["👋Hi, I am " + this.index + pos + " Element in Array", "Index = " + this.index + ", Value = " + this.textElement.attr("text"), "Array Name = UserArray"];
                  //  const textText = ["👋Hi, I am Data Value Of Element", "My Data Value = " + this.textElement.attr("text")];
                  //  const indexText = ["👋Hi, I am Index Of Element", "My Index = " + this.index];

                    if (rect) this.popoverRect = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element": this.rectElement, "lines": ( popoverTextArray  && popoverTextArray[0] ) ? popoverTextArray[0] : boxText});
                    if (cont) this.popoverText = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element":this.textElement, "lines": (popoverTextArray && popoverTextArray[1]) ?  popoverTextArray[1] : textText, "type":"down" });
                    if (ind) this.popoverIndex = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element":this.indexTextElement, "lines": ( popoverTextArray && popoverTextArray[2] ) ? popoverTextArray[2] : indexText});
                };

                if (this.canvasHandler.abort) {
                    reject("Canvas handler aborted");
                    return;
                }

                if (this.canvasHandler.paper) {

                    await createShapes();

                    await createInput();

                    userInput = await handleInput();

                    if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                    if (this.canvasHandler.abort )return;

                    if (popover) {
                        await createPopovers();
                    }
                    Rect.AllBoxe.push(this);

                    resolve(userInput);
                } else {
                    console.error("Canvas is not created. Cannot draw rectangle.");
                    reject("Canvas not created");
                }

            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }



/**
 * Asynchronously draws a rectangle, text content, index, and optional popovers on a canvas.
 *
 * @param {boolean} [rect=false] - Whether to draw a rectangle element.
 * @param {boolean} [cont=false] - Whether to draw a text element.
 * @param {boolean} [ind=false] - Whether to draw an index text element.
 * @param {boolean} [popover=true] - Whether to create popovers for the elements.
 * @param {Array<Array<string>>}  [popoverTextArray=null] - 2D Array consists Text  for popover elements.
 * @returns {Promise<void>} - A promise that resolves when the drawing operations are complete.
 * 
 * @example
 * await drawRect(true, true, true, true);
 */


    async drawRect({rect = false, cont = false, ind = false, popover = true , popoverTextArray = null }) {
        try {
           if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
           if (this.canvasHandler.abort )return;
           if (rect) {
                const gradient = "45deg-rgba(245,9,9,1)-rgba(234,31,76,1)-rgba(80,20,237,1)-rgba(39,1,255,0.9444444362933819)";
                this.rectElement = this.canvasHandler.paper.rect(this.xposition, this.yposition, this.canvasHandler.rectWidth, this.canvasHandler.rectHeight, this.canvasHandler.rectRadius);
                this.rectElement.attr({
                    fill: this.color,
                    stroke: 0,
                    "font-size": this.canvasHandler.cfontSize,
                });
      
            }
            if (cont) {
                this.textElement = this.canvasHandler.paper.text(this.xposition + this.canvasHandler.rectWidth / 2, this.yposition + this.canvasHandler.rectHeight / 2, this.content);
                this.textElement.attr({
                    "stroke": this.canvasHandler.backgroundColor,
                    "stroke-width": 0,
                    fill: this.canvasHandler.backgroundColor,
                    "font-size": this.canvasHandler.cfontSize,
                    "text-anchor": "middle",
                    "alignment-baseline": "middle"
                });
            }
            if (ind) {
                this.indexTextElement = this.canvasHandler.paper.text(this.xposition + this.canvasHandler.rectWidth * 0.1, this.yposition - this.canvasHandler.rectHeight * 0.15, this.index);
                this.indexTextElement.attr({
                    "font-size": this.canvasHandler.ifontSize,
                    "text-anchor": "start",
                    "alignment-baseline": "top"
                });
            }
            if (popover) {

                const s = ["th", "st", "nd", "rd"];
                let pos = (this.index < 4) ? s[this.index] : s[0];

                const boxText = rect && cont  ? [`👋Hi, I am ${this.index}${pos} Element in Array`, `Index = ${this.index}, Value = ${this.textElement.attr("text")}`, "Array Name = UserArray"] : "" ;
                const textText = cont ?  [`👋Hi, I am Data Value Of Element`, `My Data Value = ${this.textElement.attr("text")}`]: "" ;
                const indexText = ind ? [`👋Hi, I am Index Of Element`, `My Index = ${this.index}`] : "";
                if (rect) this.popoverRect = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element": this.rectElement, "lines": ( popoverTextArray  && popoverTextArray[0] ) ? popoverTextArray[0] : boxText });
                if (cont) this.popoverText = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element":this.textElement, "lines": ( popoverTextArray && popoverTextArray[1] ) ?   popoverTextArray[1] : textText , "type":"down" });
                if (ind) this.popoverIndex = await Rect.createPopover({ "canvasHandler":this.canvasHandler, "element":this.indexTextElement, "lines": ( popoverTextArray && popoverTextArray[2] ) ? popoverTextArray[2] : indexText});
                 }
     
            if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
            if (this.canvasHandler.abort )return;

            Rect.AllBoxe.push(this);
          
        } catch (e) {
            console.log(e);
        }
    }


/**
 * Asynchronously clears and removes specific elements of the rectangle object.
 *
 * @param {boolean} [rec=true] - Whether to remove the rectangle element.
 * @param {boolean} [cont=true] - Whether to remove the content text element.
 * @param {boolean} [ind=false] - Whether to remove the index text element.
 * @param {boolean} [dfba=false] - Whether to remove the rectangle from the boxes array.
 * @returns {Promise<void>} - A promise that resolves when the elements are cleared.
 *
 * @example
 * await rectInstance.clearRect();
 * await rectInstance.clearRect(true, false, true, true);
 */


    async clearRect({ rect = true, cont = true, ind = false, dfba = false }) {
        try {
            if (this.rectElement && rect) {
                this.rectElement.remove();
                this.rectElement = null;
            }
            if (this.textElement && cont) {
                this.textElement.remove();
                this.textElement = null;
            }
            if (this.indexTextElement && ind) {
                this.indexTextElement.remove();
                this.indexTextElement = null;
            }
            [this.popoverRect, this.popoverText, this.popoverIndex]
            .forEach((popover, index) => {
                if (popover && [rect, cont, ind][index]) {
                    popover.forEach((ele) => ele.remove());
                    this[`popover${["Rect", "Text", "Index"][index]}`] = null;
                }
            });

           if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
           if (this.canvasHandler.abort )return;


            if (dfba && this.popoverRect) {
                const index = Rect.boxes.indexOf(this);
                if (index !== -1) {
                    Rect.boxes.splice(index, 1);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }


/**
 * Asynchronously cleans up and resets properties of rectangles based on the specified type.
 *
 * @param {string} type - The type of cleanup to perform. Accepts "array" or "array2D".
 *                        "array" cleans up 1D arrays, "array2D" cleans up 2D arrays and 1D arrays.
 * @returns {Promise<void>} - A promise that resolves when the cleanup operations are complete.
 *
 * @example
 * await Rect.cleanup("array");
 * await Rect.cleanup("array2D");
 */


    static async cleanup({type }) {
        try {
            const resetRectProperties = (rect) => {
                rect.content = rect.canvasHandler = null;
                rect.xposition = rect.yposition = 0;
                rect.index = -1;
                rect.color = "";
            };

            if (type === "array" || type === "array2D") {
                for (let i = Rect.AllBoxe.length - 1; i >= 0; i--) {
                    const rect = Rect.AllBoxe[i];
                    rect.clearRect({ "rect": true, "cont": true, "ind": true, "dfba": true });
                    resetRectProperties(rect);
                }

                Rect.AllBoxe = [];
                for (let i = Rect.boxes.length - 1; i >= 0; i--) {
                    const rect = Rect.boxes[i];
                    rect.clearRect({ "rect": true, "cont": true, "ind": true , "dfba": true});
                }
                Rect.boxes = [];
            }

            if (type === "array2D") {
                for (let i = Rect.boxes2D.length - 1; i >= 0; i--) {
                    const row = Rect.boxes2D[i];
                    for (let j = row.length - 1; j >= 0; j--) {
                        const rect = row[j];
                        rect.clearRect({ "rect": true, "cont": true, "ind": true , "dfba": false });
                        resetRectProperties(rect);
                    }
                }
                Rect.boxes2D = [];
            }

            console.log("Rect class cleaned successfully");
        } catch (e) {
            console.log(e);
        }
    }


/**
 * Asynchronously draws an array or 2D array on the canvas.
 *
 * @param {object} canvasHandler - The canvas handler object.
 * @param {Array} array - The array to be drawn.
 * @param {boolean} [cont=true] - Whether to include content text elements.
 * @param {boolean} [indexs=true] - Whether to include index text elements.
 * @param {string} [type="array"] - The type of array ("array" or "array2D").
 * @param {string} [purpose="print"] - The purpose of the drawing ("print" or "input").
 * @param {Array} [range=[-1000, 1000, 2, 5]] - The range of values for the input.
 * @param {string|null} [color=null] - The color for the rectangles.
 * @param {Array<Array<Array<string>>>}  [popoverTextArray=null] - 3D Array consists Text  for popover elements.

 * @returns {Promise<Array>} - A promise that resolves to the array of input values or an empty array.
 *
 * @example
 * await Rect.drawArray(canvasHandler, [1, 2, 3]);
 * await Rect.drawArray(canvasHandler, [[1, 2], [3, 4]], true, true, "array2D", "input");
 */


    static async drawArray({ canvasHandler, "array": array=[] , cont = true, indexs = true , popover = false , type = "array", purpose = "print", range = [-1000, 1000, 2, 5], color = null , hideR = false  , popoverTextArray = null }) {


        try {

            const gradient = "45deg-rgba(245,9,9,1)-rgba(234,31,76,1)-rgba(80,20,237,1)-rgba(39,1,255,0.9444444362933819)";
        //  const gradient = "315deg-rgba(0,0,0,1)-rgba(255,255,255,1)";
        //  const gradient = "45deg-rgba(17 , 17 , 17 , 1)-rgba(77, 77 , 77 ,1)-rgba(0 , 0 , 0 , 1)-rgba(17 , 17 , 17 , 1)-rgba(77, 77 , 77 ,1)-rgba(0 , 0 , 0 , 1)-rgba(17 , 17 , 17 , 1)-rgba(77, 77 , 77 ,1)-rgba(0 , 0 , 0 , 1)-rgba(17 , 17 , 17 , 1)-rgba(77, 77 , 77 ,1)-rgba(0 , 0 , 0 , 1)-rgba(17 , 17 , 17 , 1)-rgba(77, 77 , 77 ,1)-rgba(0 , 0 , 0 , 1)";

           
            if (color == null) color = gradient;

            const arr = [];

            const title = canvasHandler.paper.text(canvasHandler.canvasWidth / 2, canvasHandler.drawYPos - canvasHandler.rectHeight * 1, "  ").attr({
                "font-size": canvasHandler.cfontSize * 1.5,
                fill: "green"
            });

            if (canvasHandler.abort) return;

            if (type === "array") {

                const Len = array.length >0 ? array.length  : canvasHandler.currentDevice.UserLength;
                Rect.boxes = [];
                canvasHandler.drawXPos = (canvasHandler.canvasWidth - (Len * canvasHandler.nextPos)) / 2;

                for (let i = 0; i < Len; i++) {

                   if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                   if (canvasHandler.abort )return;


                  const xx = canvasHandler.drawXPos + canvasHandler.nextPos * i;
                  const popoverText = popoverTextArray ? popoverTextArray[i] : null;

                  if (purpose === "print" || purpose === "input") {
                      const commonParams = {
                            "canvasHandler" :canvasHandler,
                            "xposition":  xx,
                            "yposition": canvasHandler.drawYPos,
                            "index": i,
                            "color":color
                         };
                      const drawRectparam = { "rect": true, "cont": cont, "ind": indexs, "popover":popover , "Range": range ,  "popoverTextArray": popoverText } ;

                      if (purpose === "print") {
                          const rectDrawer = new Rect({  ...commonParams, "content": array[i] });
                          rectDrawer.drawRect(drawRectparam);

                          Rect.boxes.push(rectDrawer);

                          if (hideR) {
                              rectDrawer.textElement.hide();
                          }
                          await canvasHandler.delay({
                              time: 30
                          });

                      } else if (purpose === "input") {
                          const rectDrawer = new Rect(commonParams);
                          const data = await rectDrawer.inputRect(drawRectparam);

                          Rect.boxes.push(rectDrawer);
                          arr.push(data);
                      }

                      if (canvasHandler.isPaused) await canvasHandler.pauseCanvas();
                      if (canvasHandler.abort) return;
                  }

              }

                title.remove();
                return arr;
            }

            if (type === "array2D") {

                const isMobile = window.matchMedia("(max-width: 767px)").matches;
                const isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
                const isLaptop = window.matchMedia("(min-width: 1024px)").matches;

                if (range[3] == -1) {

                    if (purpose == "input") {

                        const input = canvasHandler.paper.text(canvasHandler.canvasWidth / 2, canvasHandler.canvasHeight*0.4, "Enter Dimensions Of An Array ?").attr({
                            "font-size": canvasHandler.cfontSize,
                            fill: "red"
                        });

                        const box1Range = [];
                        const box2Range = [];
                        // Example usage
                        if (isMobile) {
                            console.log("You are on a mobile screen.");
                            box1Range.push(2, 3);
                            box2Range.push(2, 2);

                            input.attr({
                                text: "Enter Dimensions Of An Array between  ? \n  " + box1Range[0] + "X" + box1Range[1] + " | " + box2Range[0] + "X" + box2Range[1]
                            });

                        } else if (isTablet) {

                            box1Range.push(2, 3);
                            box2Range.push(2, 3);
                            console.log("You are on a tablet screen.");

                        } else if (isLaptop) {
                            console.log("You are on a laptop/desktop screen.");
                            box1Range.push(2, 3);
                            box2Range.push(2, 3);
                            input.attr({
                                text: "Enter Dimensions Of An Array between  ? \n  " + box1Range[0] + "X" + box1Range[1] + " | " + box2Range[0] + "X" + box2Range[1]
                            });

                        } else {
                            console.log("Screen size not recognized.");
                        }


                        const rowRect = new Rect({
                            "canvasHandler": canvasHandler, "xposition" : canvasHandler.canvasWidth / 2 - canvasHandler.rectWidth , "yposition" : canvasHandler.canvasHeight*0.4 + canvasHandler.rectHeight,
                            "color": color
                       } );

                        const Row = await rowRect.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "Range" :box1Range });

                        if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                        if (canvasHandler.abort )return;

                        const colRect = new Rect({
                            "canvasHandler": canvasHandler, "xposition": canvasHandler.canvasWidth / 2 + canvasHandler.rectWidth * 0.2,"yposition": canvasHandler.canvasHeight*0.4 + canvasHandler.rectHeight ,
                            "color":  color
                        });

                        const Col = await colRect.inputRect({ "rect": true, "cont": true, "ind": false, "popover": false, "Range":  box2Range });

                        await canvasHandler.delay({ "time": 1000 });

                        input.remove();
                        rowRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false }); 
                        colRect.clearRect({ "rect": true, "cont": true, "ind": false, "dfba": false });
 
          
                        if (canvasHandler.abort) return;

                        array = Array(Row).fill().map(() => Array(Col).fill(0));

                        title.attr({
                            text: "Enter  " + Row + " X " + Col + " Matrix "
                        });

                      if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                      if (canvasHandler.abort )return;

                    }
                }

                if (range[2] == 1) {

                    canvasHandler.drawXPos = (canvasHandler.canvasWidth / 2 - canvasHandler.nextPos * array[0].length) / 2;

                } else if (range[2] == 2) {

                    canvasHandler.drawXPos = canvasHandler.canvasWidth / 2 + (canvasHandler.canvasWidth / 2 - canvasHandler.nextPos * array[0].length) / 2;

                } else if (range[2] == 3) {
                    canvasHandler.drawXPos = (canvasHandler.canvasWidth - canvasHandler.nextPos * array[0].length) / 2;

                }

                Rect.boxes2D = [];
                let vGLeft = [];

                vGLeft.push({ x: canvasHandler.drawXPos + canvasHandler.nextPos * 0.2 , y: canvasHandler.drawYPos - canvasHandler.rectHeight * 0.35 });
                vGLeft.push({  x: vGLeft[0].x - canvasHandler.nextPos * 0.4,  y: vGLeft[0].y  });
                vGLeft.push({  x: vGLeft[1].x,  y: vGLeft[1].y + (array.length * canvasHandler.rectHeight * 1.5) });
                vGLeft.push({  x: vGLeft[2].x + canvasHandler.nextPos * 0.4, y: vGLeft[2].y });
                vGLeft.push({   x: vGLeft[3].x - canvasHandler.nextPos * 0.4, y: vGLeft[3].y });
                vGLeft.push({  x: vGLeft[4].x,  y: vGLeft[4].y - (array.length * canvasHandler.rectHeight * 1.5)   });
                vGLeft.push({ x: vGLeft[5].x + canvasHandler.nextPos * 0.4, y: vGLeft[5].y   });
            
                const letfFig = canvasHandler.paper.path(vGLeft.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');
                letfFig.attr({
                    fill: "black",
                    "stroke-width": 2

                });

                await canvasHandler.delay({ "time" : 150 });

                let vGRight = [];

                vGRight.push({  x: canvasHandler.drawXPos + (canvasHandler.nextPos * array[0].length) - canvasHandler.nextPos * 0.25,  y: canvasHandler.drawYPos - canvasHandler.rectHeight * 0.35 });
                vGRight.push({  x: vGRight[0].x + canvasHandler.nextPos * 0.4,  y: vGRight[0].y  });
                vGRight.push({   x: vGRight[1].x, y: vGRight[1].y + (array.length * canvasHandler.rectHeight * 1.5)  });
                vGRight.push({  x: vGRight[2].x - canvasHandler.nextPos * 0.4,  y: vGRight[2].y  });
                vGRight.push({ x: vGRight[3].x + canvasHandler.nextPos * 0.4,y: vGRight[3].y  });
                vGRight.push({  x: vGRight[4].x ,  y: vGRight[4].y - (array.length * canvasHandler.rectHeight * 1.5)  });
                vGRight.push({  x: vGRight[5].x - canvasHandler.nextPos * 0.4, y: vGRight[5].y   });
                const rightFig = canvasHandler.paper.path(vGRight.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`) + 'Z');
                rightFig.attr({
                    fill: "black",
                    "stroke-width": 2

                });

                 const g = rightFig.getBBox() ;

                 const dim =  canvasHandler.paper.text( g.x + g.width + 5 , g.y + g.height + 10 , array.length +" X "+ array[0].length );
                 dim.attr({ 
                    "font-size": canvasHandler.cfontSize,
                    "text-anchor": "middle",
                    "alignment-baseline": "middle" 
                });

                if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                if (canvasHandler.abort )return;

                await canvasHandler.delay({ "time": 900 });
                const ifont = canvasHandler.ifontSize ;
                canvasHandler.ifontSize = ifont*0.65 ;
                for (let i = 0; i < array.length; i++) {

                    let tempA = [];
                    let data = [];


                    for (let j = 0; j < array[i].length; j++) {

                      if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                      if (canvasHandler.abort )return;


                      const xx = canvasHandler.drawXPos + canvasHandler.nextPos * j;

                        
                      const rectDrawer = new Rect({
                            "canvasHandler" : canvasHandler, "xposition" : xx, "yposition" : canvasHandler.drawYPos, 
                            "content" : array[i][j],
                            "index" : `(${i},${j})`,
                            "color" : color
                       } );

                      
                        if (purpose == "print") {
                            await canvasHandler.delay({ "time": 100 });
                    
                            rectDrawer.drawRect({ "rect": true, "cont": cont, "ind": indexs, "popover": true });

                          if (hideR) {
                              rectDrawer.textElement.hide();
                          }
                        }

                        if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                        if (canvasHandler.abort )return;

                        if (purpose == "input") {

                            const Data = await rectDrawer.inputRect({ "rect": true, "cont": cont , "ind": indexs , "popover": true ,  "Range":  range });
                            data.push(Data);
                        }

                        tempA.push(rectDrawer); // Push the created Rect instance to the temporary array
                        if (canvasHandler.isPaused ) await canvasHandler.pauseCanvas() ;
                        if (canvasHandler.abort )return;

                    }
                    Rect.boxes2D.push(tempA);
                    arr.push(data);

                    canvasHandler.drawYPos += canvasHandler.rectHeight * 1.5;
                }

                canvasHandler.drawYPos -= (canvasHandler.rectHeight * 1.5) * (array.length);

                title.remove();
                canvasHandler.ifontSize = ifont ;
                return [ arr  , letfFig , rightFig , dim ];

            }

        } catch (e) {

            console.log(e);

        }

    }




/*
 * static function to calculate duration required for animate based on points and frame rate
 *
 * @param {number} initialX - The original x-coordinate of the rectangle .
 * @param {number} initialY - The original y-coordinate of the rectangle .
 * @param {number} newX - The new x-coordinate to move the rectangle .
 * @param {number} newY - The new y-coordinate to move the rectangle .
 * @param {number} fps - The Frame per second or (speed) of animation.
 * @returns { number} duration - Duration required for animation.
 * @example
 * Rect.calcDuration(100, 200 , 10 , 20 , 90 );
*/

    static calcDuration(initialX , initialY , newX , newY , fps ) {

        // Calculate the differences
        const xDelta = Math.abs(newX - initialX);
        const yDelta = Math.abs(newY - initialY);

        // Calculate the distance using Pythagorean theorem
        const distance = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));

        const frameDuration = 1000 / fps; // Duration of each frame in milliseconds
        const numberOfFrames = Math.ceil(distance); // Number of frames
        return numberOfFrames * frameDuration; // Total duration in milliseconds
    }

/**
 * Asynchronously moves the rectangle and its associated text elements to a new position.
 *
 * @param {number} newX - The new x-coordinate to move the rectangle to.
 * @param {number} newY - The new y-coordinate to move the rectangle to.
 * @param {boolean} [ind=false] - Whether to move the index text element.
 * @returns {Promise<void>} - A promise that resolves when the move is complete.
 *
 * @example
 * await rectInstance.moveTo(100, 200);
 */

    async moveTo({ newX, newY, ind = false }) {

        try {

            const initialX = this.rectElement.attr("x");
            const initialY = this.rectElement.attr("y");

            if(this.rectElement)this.rectElement.toFront();
            if(this.textElement)this.textElement.toFront();
            if(this.indexTextElement)this.indexTextElement.toFront();

            const duration = calcDuration(initialX , initialY , newX , newY , this.canvasHandler.fps );
           if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
           if (this.canvasHandler.abort )return;

            // Array to store promises for animations
            let animations = [];
           // Animate the movement on existing elements
            if (this.rectElement != null) {
                animations.push(new Promise((resolve) => {
                    this.rectElement.animate({
                        x: newX,
                        y: newY
                    }, duration , "linear", resolve);
                }));
            }

            if (this.textElement != null) {
                animations.push(new Promise((resolve) => {
                    this.textElement.animate({
                        x: newX + this.canvasHandler.rectWidth / 2,
                        y: newY + this.canvasHandler.rectHeight / 2
                    }, duration , "linear", resolve);
                }));
            }

            if (this.indexTextElement != null && ind) {
                animations.push(new Promise((resolve) => {
                    this.indexTextElement.animate({
                        x: newX + this.canvasHandler.rectWidth * 0.1,
                        y: newY - this.canvasHandler.rectHeight * 0.15
                    }, duration , "linear", resolve);
                }));
            }
            // Wait for all animations to complete
            await Promise.allSettled(animations);
           if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
           if (this.canvasHandler.abort )return;

        } catch (e) {
            console.log(e);
        }
    }


/**
 * Asynchronously performs the swapping animation between two rectangle elements.
 *
 * @param {Rect} rect1 - The first rectangle element to swap.
 * @param {Rect} rect2 - The second rectangle element to swap.
 * @param {number} [distance=rect1.canvasHandler.rectHeight * 1.2] - The distance to move during the swapping animation.
 * @returns {Promise<void>} - A promise that resolves when the swapping animation is complete.
 *
 * @example
 * await Rect.swapping(rect1, rect2);
 */


static async swapping({ rect1, rect2, distance = rect1.canvasHandler.rectHeight * 1.2 }) {
    try {

        if (!(rect1 instanceof Rect) || !(rect2 instanceof Rect)) {
            return;
        }

        if (rect1.canvasHandler.abort) return;

        const index1 = Rect.boxes.indexOf(rect1);
        const index2 = Rect.boxes.indexOf(rect2);

        const animatePromise = (element, properties, duration) => {
            return new Promise(resolve => {
                element.animate(properties, duration, resolve);
            });
        };

        if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
        if (rect1.canvasHandler.abort )return;

        const r1 = rect1.rectElement.getBBox();
        const r2 = rect2.rectElement.getBBox();

        const durationUpDown =  Rect.calcDuration( r1.x , r1.y , r1.x , r1.y - distance , rect1.canvasHandler.fps );
        const durationLeftRight =  Rect.calcDuration(r1.x , r1.y , r2.x , r2.y , rect1.canvasHandler.fps );

        // First set of animations
        await Promise.allSettled([
            animatePromise(rect1.rectElement, { y: rect1.rectElement.attr("y") - distance }, durationUpDown),
            animatePromise(rect2.rectElement, { y: rect2.rectElement.attr("y") - distance }, durationUpDown),
            animatePromise(rect1.textElement, { y: rect1.textElement.attr("y") - distance }, durationUpDown),
            animatePromise(rect2.textElement, { y: rect2.textElement.attr("y") - distance }, durationUpDown),
            animatePromise(rect1.indexTextElement, { y: rect1.indexTextElement.attr("y") - distance }, durationUpDown),
            animatePromise(rect2.indexTextElement, { y: rect2.indexTextElement.attr("y") - distance }, durationUpDown)
        ]);

        if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
        if (rect1.canvasHandler.abort )return;

        // Second set of animations
        if (!rect1.canvasHandler.abort) {
            await Promise.allSettled([
                animatePromise(rect1.rectElement, { x: rect2.rectElement.attr("x") }, durationLeftRight),
                animatePromise(rect2.rectElement, { x: rect1.rectElement.attr("x") }, durationLeftRight),
                animatePromise(rect1.textElement, { x: rect2.textElement.attr("x") }, durationLeftRight),
                animatePromise(rect2.textElement, { x: rect1.textElement.attr("x") }, durationLeftRight),
                animatePromise(rect1.indexTextElement, { x: rect2.indexTextElement.attr("x") }, durationLeftRight),
                animatePromise(rect2.indexTextElement, { x: rect1.indexTextElement.attr("x") }, durationLeftRight)
            ]);
        }

        if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
        if (rect1.canvasHandler.abort )return;

        // Third set of animations
        if (!rect1.canvasHandler.abort) {
            await Promise.allSettled([
                animatePromise(rect1.rectElement, { y: rect1.rectElement.attr("y") + distance }, durationUpDown),
                animatePromise(rect2.rectElement, { y: rect2.rectElement.attr("y") + distance }, durationUpDown),
                animatePromise(rect1.textElement, { y: rect1.textElement.attr("y") + distance }, durationUpDown),
                animatePromise(rect2.textElement, { y: rect2.textElement.attr("y") + distance }, durationUpDown),
                animatePromise(rect1.indexTextElement, { y: rect1.indexTextElement.attr("y") + distance }, durationUpDown),
                animatePromise(rect2.indexTextElement, { y: rect2.indexTextElement.attr("y") + distance }, durationUpDown)
            ]);
        }

        if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
        if (rect1.canvasHandler.abort )return;

        // Update indices and attributes in one Promise
        await new Promise(resolve => {
            [Rect.boxes[index1], Rect.boxes[index2]] = [Rect.boxes[index2], Rect.boxes[index1]];
            [rect1.index, rect2.index] = [rect2.index, rect1.index];
            rect1.indexTextElement.attr({ text: index2 });
            rect2.indexTextElement.attr({ text: index1 });
            rect1.popoverIndex[3].attr({ text: "My Index = " + index2 });
            rect2.popoverIndex[3].attr({ text: "My Index = " + index1 });
            rect1.popoverRect[3].attr({ text: "Index = " + index2 + " , Value = " + rect1.textElement.attr("text") });
            rect2.popoverRect[3].attr({ text: "Index = " + index1 + " , Value = " + rect2.textElement.attr("text") });
            resolve();
        });

       if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
       if (rect1.canvasHandler.abort )return;

    } catch (e) {
        console.error(e);
    }
}


    /**
 * Asynchronously performs the shifting animation between two rectangle elements.
 *
 * @param {Rect} rect1 - The first rectangle element.
 * @param {Rect} rect2 - The second rectangle element.
 * @param {string} where - The direction of shifting ("right" or "left").
 * @param {number} [distance=rect1.canvasHandler.rectHeight * 1.2] - The distance to move during the shifting animation.
 * @returns {Promise<void>} - A promise that resolves when the shifting animation is complete.
 *
 * @example
 * await Rect.Shifter(rect1, rect2, "right");
 */




static async Shifter({ rect1, rect2, where, distance = rect1.canvasHandler.rectHeight * 1.2 }) {
    try {
        const animatePromise = (element, properties, duration) => new Promise(resolve => {
            element.animate(properties, duration, resolve);
        });

        let shiftPromise;

        const r1 = rect1.rectElement.getBBox();
        const r2 = rect2.rectElement.getBBox();

        const durationUpDown =  Rect.calcDuration( r1.x , r1.y , r1.x , r1.y - distance , rect1.canvasHandler.fps );
        const durationLeftRight =  Rect.calcDuration(r1.x , r1.y , r2.x , r2.y , rect1.canvasHandler.fps );

      
        if (where === "right") {
            if (rect1.canvasHandler.abort) return;

            const index = Rect.boxes.indexOf(rect1);
            const replace = new Rect({ "canvasHandler": rect1.canvasHandler, "xposition": rect1.rectElement.attr("x"), "yposition": rect1.rectElement.attr("y"), "index": rect1.index, "color":rect1.rectElement.attr("fill") });

            try {

                if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
                if (rect1.canvasHandler.abort )return;

                await Promise.allSettled([
                    animatePromise(rect1.rectElement, { y: rect1.rectElement.attr("y") - distance }, durationUpDown),
                    animatePromise(rect1.textElement, { y: rect1.textElement.attr("y") - distance }, durationUpDown),
                    animatePromise(rect1.indexTextElement, { y: rect1.indexTextElement.attr("y") - distance }, durationUpDown)
                ]);

               if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
               if (rect1.canvasHandler.abort )return;

                await Promise.allSettled([
                    animatePromise(rect1.rectElement, { x: rect2.rectElement.attr("x") }, durationLeftRight),
                    animatePromise(rect1.textElement, { x: rect2.textElement.attr("x") }, durationLeftRight),
                    animatePromise(rect1.indexTextElement, { x: rect2.indexTextElement.attr("x") }, durationLeftRight)
                ]);

                if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
                if (rect1.canvasHandler.abort )return;

                rect1.rectElement.toFront();
                rect1.textElement.toFront();

                await Promise.allSettled([
                    animatePromise(rect1.rectElement, { y: rect1.rectElement.attr("y") + distance }, durationUpDown),
                    animatePromise(rect1.textElement, { y: rect1.textElement.attr("y") + distance }, durationUpDown),
                    animatePromise(rect1.indexTextElement, { y: rect1.indexTextElement.attr("y") + distance }, durationUpDown)
                ]);

                if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
                if (rect1.canvasHandler.abort )return;

                await new Promise(resolve => {

                
                const index2 = Rect.boxes.indexOf(rect2);
                rect1.index = rect2.index;

                rect2.clearRect({ "rect": true, "cont": true, "ind": true });
                Rect.boxes[index2] = rect1;

                rect1.indexTextElement.attr({ text: rect1.index });
                rect1.popoverIndex[3].attr({ text: "My Index = " + rect1.index });
                rect1.popoverRect[3].attr({ text: "Index = " + rect1.index + " , Value = " + rect1.textElement.attr("text") });

                replace.drawRect({ "rect": true, "cont": true, "ind": true ,  "popover": true });
                Rect.boxes[index] = replace;
                
                resolve();
              });

              if (rect1.canvasHandler.isPaused ) await rect1.canvasHandler.pauseCanvas() ;
              if (rect1.canvasHandler.abort )return;

              
      
           } catch (error) {
                console.error(error);
           }

        } else if (where === "left") {

            if (rect1.canvasHandler.abort) return;

            const index = Rect.boxes.indexOf(rect2);
            const replace = new Rect({ "canvasHandler": rect2.canvasHandler, "xposition": rect2.rectElement.attr("x"), "yposition": rect2.rectElement.attr("y"), "index": rect2.index, "color": rect2.rectElement.attr("fill") });
                
            Rect.boxes[index] = replace;

            try {

                if (rect2.canvasHandler.isPaused ) await rect2.canvasHandler.pauseCanvas() ;
                if (rect2.canvasHandler.abort )return;

                await Promise.allSettled([
                    animatePromise(rect2.rectElement, { y: rect2.rectElement.attr("y") - distance }, durationUpDown),
                    animatePromise(rect2.textElement, { y: rect2.textElement.attr("y") - distance }, durationUpDown),
                    animatePromise(rect2.indexTextElement, { y: rect2.indexTextElement.attr("y") - distance }, durationUpDown)
                ]);

                if (rect2.canvasHandler.isPaused ) await rect2.canvasHandler.pauseCanvas() ;
                if (rect2.canvasHandler.abort )return;

                await Promise.allSettled([
                    animatePromise(rect2.rectElement, { x: rect1.rectElement.attr("x") }, durationLeftRight),
                    animatePromise(rect2.textElement, { x: rect1.textElement.attr("x") }, durationLeftRight),
                    animatePromise(rect2.indexTextElement, { x: rect1.indexTextElement.attr("x") }, durationLeftRight)
                ]);

                if (rect2.canvasHandler.isPaused ) await rect2.canvasHandler.pauseCanvas() ;
                if (rect2.canvasHandler.abort )return;
                rect2.rectElement.toFront();
                rect2.textElement.toFront();

                await Promise.allSettled([
                    animatePromise(rect2.rectElement, { y: rect2.rectElement.attr("y") + distance }, durationUpDown),
                    animatePromise(rect2.textElement, { y: rect2.textElement.attr("y") + distance }, durationUpDown),
                    animatePromise(rect2.indexTextElement, { y: rect2.indexTextElement.attr("y") + distance }, durationUpDown)
                ]);

                if (rect2.canvasHandler.isPaused ) await rect2.canvasHandler.pauseCanvas() ;
                if (rect2.canvasHandler.abort )return;


                await new Promise(resolve => {

                const index2 = Rect.boxes.indexOf(rect1);
                rect2.index = rect1.index;

                rect1.clearRect({ "rect": true, "cont": true, "ind": true });
                Rect.boxes[index2] = rect2;

                rect2.indexTextElement.attr({ text: rect2.index });
                rect2.popoverIndex[3].attr({ text: "My Index = " + rect2.index });
                rect2.popoverRect[3].attr({ text: "Index = " + rect2.index + " , Value = " + rect2.textElement.attr("text") });

                replace.drawRect({ "rect": true, "cont": true, "ind":  true , "popover": true});
                
                resolve();
                });
 
               if (rect2.canvasHandler.isPaused ) await rect2.canvasHandler.pauseCanvas() ;
               if (rect2.canvasHandler.abort )return;
               
            } catch (error) {
                console.error(error);
            }
        }

   
    } catch (e) {
        console.error(e);
    }
}





} //class rect end there

export const createPopover = Rect.createPopover;
export const calcDuration = Rect.calcDuration;