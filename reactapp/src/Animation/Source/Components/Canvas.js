
export const grids = [] ;

export class CanvasHandler {
    constructor() {
        this.resetButton = null ; 
        this.playButton = null ;
        this.pauseButton = null ; 
        this.bg = null ;
        this.currentDevice = { min: 0, max: 0, UserLength: 0 , device:null };
        this.canvasID = "";
        this.paper = null;
        this.canvasExists = false;
        this.backgroundColor = "#e0e0e0";
        this.abort = false;
        this.isPaused = false;
        this.fps = 90 ;

        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.drawXPos = 0;
        this.drawYPos = 0;

        this.rectWidth = 0;
        this.rectHeight = 0;
        this.nextPos = 0;
        this.rectRadius = 0;
        this.cfontSize = 0;
        this.ifontSize = 0;
        this.comfontSize = 0;
        this.afontSize = 0;
    }

    async fetchConfigData(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                //;//console.log(`Failed to fetch config file: ${response.status} ${response.statusText}`);
                return null;
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                //;//console.log(`Expected JSON response but got ${contentType}`);
                return null;
            }
            const configText = await response.text();
            return JSON.parse(configText);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async applyConfigurations({ fileName, structureType }) {
        try {
            ;//console.log("Applying configuration for current animation");

            let configData = await this.tryLoadConfig(fileName);
            if (!configData) {
                configData = this.getFallbackConfig(fileName);
                ;//console.log("Configuration applied through default data");

            }

            this.setCanvasProperties(configData, structureType);

            ;//console.log("Configuration applied successfully");
        } catch (error) {
            ;//console.log(error);

        }
    }

    async tryLoadConfig(fileName) {
        try {
            const pathToJson = `../Configurations/${fileName}.json`;
            const config = await
            import (/*@vite-ignore*/pathToJson);
            if (config) ;//console.log("Configuration applied through json file");
            return config
        } catch (error) {
            ;//console.log("Failed to load JSON config file:", error);
        }
/*
        try {
            const pathToTxt = `../Configurations/${fileName}.txt`;
            const config = await this.fetchConfigData(pathToTxt);
            if (config)console.log("Configuration applied through txt file ");
            return config
        } catch (error) {
            console.log( error);
        }
*/
        return null;
    }

    getFallbackConfig(fileName) {
        const configs = {
            mobileScreenConfig: {
                default: { rectWidth: 30, rectHeight: 30, nextPos: 33 },
                types: {
                    array: { rectWidth: 33, rectHeight: 33, nextPos: 36 , min:3  , max:5 },
                    array2D: { rectWidth: 33, rectHeight: 33, nextPos: 36  , min:1  , max:8 },
                    sorts: { rectWidth: 33, rectHeight: 33 ,  nextPos: 36  , min:3  , max:5 },
                    SLL: { rectWidth: 25, rectHeight: 25, nextPos: 28 , min:1  , max:5  },
                    DLL: { rectWidth: 25, rectHeight: 25, nextPos: 28 , min:1  , max:5  },
                    stack: { rectWidth: 40, rectHeight: 40, nextPos: 43 , min:3  , max:5 },
                    queue: { rectWidth: 35, rectHeight: 35 ,  nextPos: 38 },
                    HT: { rectWidth: 33, rectHeight: 33 ,  nextPos: 36 , min:5 , max:10},

                    BitOperator: { rectWidth: 28, rectHeight: 28, nextPos: 31 , min:3  , max:5 },
                },
                canvas: {
                    defaultWidth: 0.99,
                    device : "mobile",
                    drawYPosFactor: 0.1,
                    rectRadius: 5,
                    fontSize: { cfontSize: 12, ifontSize: 8, comfontSize: 11, afontSize: 10 },
                    ScreenConfig: { minSize: 250, maxSize: 767 }
                }
            },
            tabletScreenConfig: {
                
                types: {
                    array: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:3  , max:7 },
                    array2D: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:1 , max:9 },
                    sorts: { rectWidth: 45, rectHeight: 45, nextPos: 48  , min:3  , max:7},
                    SLL: { rectWidth: 42, rectHeight: 42, nextPos: 45 ,  min:1 , max:6},
                    DLL: { rectWidth: 42, rectHeight: 42, nextPos: 45 ,  min:1 , max:6},
                    stack: { rectWidth: 55, rectHeight: 55, nextPos: 58 , min:3 , max:6 },
                    queue: { rectWidth: 55, rectHeight: 55, nextPos: 58 },
                    HT: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:5 , max:10 },

                    BitOperator: { rectWidth: 33, rectHeight: 33, nextPos: 36 , min:3  , max:5 },
                },
                canvas: {
                    defaultWidth: 0.6,
                    device: "tablet" , 
                    drawYPosFactor: 0.1,
                    rectRadius: 5,
                    fontSize: { cfontSize: 13, ifontSize: 10, comfontSize: 11, afontSize: 13 },
                    ScreenConfig: { minSize: 768, maxSize: 1023 }
                }
            },
            laptop_GreaterScreenConfig: {
                
                types: {
                    array: { rectWidth: 50, rectHeight: 50, nextPos: 53 , min:3  , max:8 },
                    array2D: { rectWidth: 50, rectHeight: 50, nextPos: 53 , min:1 , max:10},
                    sorts: { rectWidth: 50, rectHeight: 50, nextPos: 53 , min:3  , max:7},
                    SLL: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:1  , max:7 },
                    DLL: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:1  , max:7 },
                    stack: { rectWidth: 60, rectHeight: 60, nextPos: 63 , min:3 , max:7},
                    queue: { rectWidth: 60, rectHeight: 60, nextPos: 63 },
                    HT: { rectWidth: 50, rectHeight: 50, nextPos: 53 , min:5 , max:10 },

                    BitOperator: { rectWidth: 45, rectHeight: 45, nextPos: 48 , min:3  , max:5 },
                },
                canvas: {
                    defaultWidth: 0.6,
                    device : "laptop" ,
                    drawYPosFactor: 0.1,
                    rectRadius: 9,
                    fontSize: { cfontSize: 16, ifontSize: 13, comfontSize: 14, afontSize: 16 },
                    ScreenConfig: { minSize: 1024, maxSize: Infinity }
                }
            }
        };

        return configs[fileName] || {};
    }

    setCanvasProperties(configData, structureType) {
        const width = window.innerWidth;

        this.canvasWidth = width * configData.canvas.defaultWidth;
        this.drawXPos = 0;
        this.drawYPos = this.canvasWidth * configData.canvas.drawYPosFactor;
        this.rectRadius = configData.canvas.rectRadius;
        this.currentDevice.device = configData.canvas.device;
        const { cfontSize, ifontSize, comfontSize, afontSize } = configData.canvas.fontSize;
        this.cfontSize = cfontSize;
        this.ifontSize = ifontSize;
        this.comfontSize = comfontSize;
        this.afontSize = afontSize;

        const typeConfig = configData.types[structureType] || configData.default;
        this.rectWidth = typeConfig.rectWidth;
        this.rectHeight = typeConfig.rectHeight;
        this.nextPos = typeConfig.nextPos;
        this.currentDevice.min = typeConfig.min ;
        this.currentDevice.max = typeConfig.max ;
      
    }




    async selectConfiguration({ structureType }) {
        try {
            const width = window.innerWidth;
            
            if (width < 525) {

                ;//console.log("requested configuration is mobile");

                await this.applyConfigurations({ "fileName": 'mobileScreenConfig', "structureType": structureType });
            } else if (width > 525 && width < 800) {

                ;//console.log("requested configuration is for tablet  device");
                await this.applyConfigurations({ "fileName": 'tabletScreenConfig', "structureType": structureType });
            } else if (width > 800) {
                ;//console.log("requested configuration is for laptop or greater than device");
                await this.applyConfigurations({ "fileName": 'laptop_GreaterScreenConfig', "structureType": structureType });

            }

            ;//console.log("selected configuration applied successful");
        } catch (error) {
            ;//console.log(error);
      
        }
    }

    async setCanvasHeight({ ArrayLength, functorName }) {
        try {

            ;//console.log("setting Canvas height start");
            const heightMultipliers = {

                "CountSort":5.5,
                "RadixSort":5.5,
                "CreationArray": 5.5,
                "LinearSearch": 4.5,
                "BinarySearch": 5.5,
                "InsertionArray": 5.5,
                "DeletionArray": 5.5,

                "MergeArrays": 5,
                "ConcatenateArrays": 5,
                "SplitArray": 5,
                "ReverseArray": 5,

                "TransposeOf2DArray": 6,
                "CreateArray2D": 7,
                "SearchIn2D": 6,

                "AdditionOf2D": 7,
                "SubtractionOf2D": 7,
                "MultiplicationOf2D": 7,

                "CreateSLL": 7,
                "TraverseInSLL": 7,
                "InsetAtHead": 7,
                "InsertAtTail": 7,
                "InsertInBetween": 7,
                "DeteleAtHead": 7,
                "DeleteInBetween": 7,
                "DeleteAtTail": 7,
                "ReverseSLL": 7,

                "CreateDLL": 7,
                "TraverseInDLL": 7,
                "DInsertAtHead": 7,
                "DInsertInBetween": 7,
                "DInsertAtTail": 7,
                "DDeteleAtHead": 7,
                "DDeleteInBetween": 7,
                "DDeleteAtTail": 7,


                "StackPush": 6,
                "StackPop": 6,
                "CustomStack": 5,

                "EnQueue": 6,
                "DeQueue": 6,
                "Custom": 5 , 

                "OpenAddressingHT": 5 , 
                "ClosedAddressingHT": 7,

                "NumberToBinary" : 7,
                "BinaryToNumber": 7 ,

                "BinaryAND" : 7, 
                "BinaryOR" : 7 , 
                "BinaryNOT" : 7 , 
                "BinaryXOR" : 7  , 
                "BinaryLeftShit" : 7 , 
                "BinaryRightShift" : 7 , 
            };

            if (functorName in heightMultipliers) {
                ;//console.log("Canvas height is being set by height multipliers");
                this.canvasHeight = (this.rectHeight * 3) * heightMultipliers[functorName];
            } else  {
                ;//console.log("Canvas height is being saved by array length");
                this.canvasHeight = (this.rectHeight * 3) * 5 ;

            } 
/*
  else if (ArrayLength > 0) {
                ;//console.log("Canvas height is being saved by array length");
                this.canvasHeight = (this.rectHeight * 3) * (ArrayLength + 0.5 );


            } else {
                ;//console.log("something going wrong while setting Canvas height")
            }
*/
            ;//console.log("Canvas height is set successfully");
            
        } catch (error) {
            ;//console.log(error);
       
        }
    }


async createCanvas({ canvasID, structureType, functorName, ArrayLength }) {
    try {
        await this.selectConfiguration({ structureType });
        this.currentDevice.UserLength = ArrayLength;
        await this.setCanvasHeight({ ArrayLength, functorName });

        this.canvasID = canvasID;
        this.abort = false;
        this.paper = Raphael(canvasID, this.canvasWidth, this.canvasHeight);

        this.bg = this.paper.rect(0, 0, this.canvasWidth, this.canvasHeight).attr({
            fill: this.backgroundColor,
            stroke: 0,
        });


        this.bg.id = "background";
        const Element = document.getElementById(canvasID);
        Element.appendChild(this.paper.canvas);

        

/*
        const createButton = (id, x, y, color, text) => {
            const button = this.paper.rect(x, y, this.rectWidth*1.5, this.rectHeight * 0.75 , 5).attr({
                
                fill: color,
                stroke: '#000',
                'stroke-width': 0,
                cursor: 'pointer'
            });
            button.id= `${id}`;
            const buttonText = this.paper.text(x + (this.rectWidth*1.5)/2, y + (this.rectHeight * 0.75) / 2, text).attr({
                id: `${id}Text`,
                'font-size': 10,
                'font-family': 'Arial, Helvetica, sans-serif',
                'text-anchor': 'middle',
                'alignment-baseline': 'middle',
                cursor: 'pointer'
            });
            buttonText.id= `${id}`;
            return { button, buttonText };
        };

        const { button: playButton, buttonText: playText } = createButton('play', this.canvasWidth - this.rectWidth *1.7, 5 , '#00FF00', 'Resume');
        const { button: pauseButton, buttonText: pauseText } = createButton('pause', this.canvasWidth - this.rectWidth *1.7 , this.rectHeight*1.02, '#FF0000', 'Pause');

        playButton.click(() => { this.isPaused = false; ;//console.log("Resume Button Clicked", this.isPaused); });
        playText.click(() => { this.isPaused = false; ;//console.log("Resume Button Clicked", this.isPaused); });
        pauseButton.click(() => { this.isPaused = true; ;//console.log("Pause Button Clicked", this.isPaused); });
        pauseText.click(() => { this.isPaused = true; ;//console.log("Pause Button Clicked", this.isPaused); });
*/
        this.canvasExists = true;
        Element.style.display = "block";
        ;//console.log("Canvas created successfully and returning paper");
        return this.paper;
    } catch (error) {
        ;//console.log("Error while creating canvas:", error);
    
    }
}





    destroyCanvas({ canvasID, paper }) {
        try {
            ;//console.log("Accessing paper to destroy Canvas");
            const canvas = document.getElementById(canvasID);
            const canvasplaybtn = document.getElementById('play');
            const canvaspausebtn = document.getElementById('pause');

            // Hide the canvas immediately
            if (canvasplaybtn) canvasplaybtn.remove();
            if (canvaspausebtn) canvaspausebtn.remove();
            if (canvas) canvas.style.display = "none";

            ;//console.log("Canvas identified for removal");

            // Function to get all elements from the canvas
            const getAllElements = (paper) => {
                const elements = [];
                let element = paper.bottom; // Start from the bottom-most element

                while (element) {
                    elements.push(element);
                    element = element.next; // Move to the next element in the linked list
                }

                ;//console.log("Canvas elements:", elements);
                return elements;
            };

            // Function to clear all elements from the canvas
            const clearCanvas = (paper) => {
                ;//console.log("Clearing canvas elements");
                const elements = getAllElements(paper);
                elements.forEach(element => element.remove());
            };

            setTimeout(() => {
                clearCanvas(paper);

                if (paper) {
                    ;//console.log("Clearing paper");
                    paper.clear();
                    this.paper = null;
                    this.drawXPos = 0;
                    this.drawYPos = this.canvasWidth * 0.1;
                    this.canvasExists = false;

                }

                if (canvas) {

                    while (canvas.firstChild) {
                        canvas.firstChild.remove();
                    }
                }
            }, 4000);

            ;//console.log("Canvas will be destroyed after 4 seconds");

        } catch (error) {
            ;//console.log("Error while destroying canvas:", error);
         
        }
    }




    static async Delay({ time }) {
        try {
            // Returning a promise for the time delay in the execution of code.
            return new Promise(resolve => setTimeout(resolve, time));
        } catch (error) {
            ;//console.log("Error in delay:", error);
       
        }
    }

    async delay({ time = 500 } = {}) {
        try {

            // Returning a promise for the time delay in the execution of code.
            return new Promise(resolve => setTimeout(resolve, time));

        } catch (error) {
            ;//console.log("Error in delay:", error);
          
        }
    }


    async pauseCanvas() {

        while (this.isPaused) {
            await this.delay({ "time": 300 });
        }

    }


} //class CanvasHandler end here
