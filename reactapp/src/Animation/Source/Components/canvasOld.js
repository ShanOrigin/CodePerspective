

/*
async fetchConfigData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('Failed to fetch config file');
        }
        const configText = await response.text();
        const configData = JSON.parse(configText);
        return configData;
    } catch (error) {
        console.error('Error fetching or parsing config file:', error);
        throw error;
    }
}

        
    async applyConfigurations({ fileName, structureType } ) {
        try {



            console.log("applying configuration for current animation");
            let configData = null ;

            if (!configData){
               try{
                 const path = `../Configurations/${fileName}.json`;              
                 //const { default: configData  } = await import(path ,  { assert: {  type: 'json'}   });
                 configData   = await import(path ,  { assert: {  type: 'json'}   });
                 console.log("configuration applied through json file ")
              }catch(e){
                console.log(e)
              }
            }
         
            if (!configData){
              try{
                  const path = `../Configurations/${fileName}.txt`;
                  configData = await this.fetchConfigData(path);
                  console.log("configuration applied through text file ")

              }catch(e){
                console.log(e)
              }               
            }

     
   
            console.log(configData)
            const width = window.innerWidth;
            console.log("window width " + width);

            this.currentDevice.min = configData.canvas.ScreenConfig.minSize;
            this.currentDevice.max = configData.canvas.ScreenConfig.maxSize;


            this.canvasWidth = width * configData.canvas.defaultWidth;
            this.drawXPos = 0;
            this.drawYPos = this.canvasWidth * configData.canvas.drawYPosFactor;
            this.rectRadius = configData.canvas.rectRadius;

            this.cfontSize = configData.canvas.fontSize.cfontSize;
            this.ifontSize = configData.canvas.fontSize.ifontSize;
            this.comfontSize = configData.canvas.fontSize.comfontSize;
            this.afontSize = configData.canvas.fontSize.afontSize;

            const typeConfig = configData.types[structureType] || configData.default;

            this.rectWidth = typeConfig.rectWidth;
            this.rectHeight = typeConfig.rectHeight;
            this.nextPos = typeConfig.nextPos;

            console.log("configuration applied successfully");
        } catch (error) {
            console.log("apply configuration")
            console.error(error);
            throw error; // Rethrow the error for further handling
        }
    }



async fetchConfigData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            console.log(`Failed to fetch config file: ${response.status} ${response.statusText}`);
            return null; // Early return if fetch fails
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.log(`Expected JSON response but got ${contentType}`);
            return null; // Early return if content is not JSON
        }
        const configText = await response.text();
        const configData = JSON.parse(configText);
        return configData;
    } catch (error) {
        console.log('Error fetching or parsing config file:', error);
        return null; // Return null if parsing fails
    }
}
*/

export class CanvasHandler {

    constructor() {
        this.currentDevice = {
            "min": 0,
            "max": 0,
            "UserLength": 0
        };
        this.canvasID = "";
        this.paper = null;
        this.canvasExists = false;
        this.backgroundColor = "#e0e0e0"; //"#f0f0f0";
        this.abort = false;
        this.isPaused = false ;

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
            console.log(`Failed to fetch config file: ${response.status} ${response.statusText}`);
            return null; // Early return if fetch fails
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.log(`Expected JSON response but got ${contentType}`);
            return null; // Early return if content is not JSON
        }
        const configText = await response.text();
        const configData = JSON.parse(configText);
        return configData;
    } catch (error) {
        console.log('Error fetching or parsing config file:', error);
        return null; // Return null if parsing fails
    }
}

async applyConfigurations({ fileName, structureType }) {
    try {
        console.log("Applying configuration for current animation");

        let configData = null;

        // Try importing JSON file
        try {
            const pathToJson = `../Configurations/${fileName}.json`;
            configData = await import(pathToJson);
            
            console.log("Configuration applied through JSON file");
        } catch (error) {
            console.log("faild through json file")
            console.log( error);
        }

        // If JSON import fails, try fetching text file
        if (!configData) {
            try {
                const pathToTxt = `../Configurations/${fileName}.txt`;
                configData = await this.fetchConfigData(pathToTxt);
                console.log("data : " , configData)
                if(configData)console.log("Configuration applied through text file");
            } catch (error) {
                console.log("fialed through txt file ")
                console.log(error);
                
            }
        }

 if (!configData){
    
const  MobileconfigData = {
    "default": {
        "rectWidth": 30,
        "rectHeight": 30,
        "nextPos": 33
    },
    "types": {
        "array": {
            "rectWidth": 36,
            "rectHeight": 36,
            "nextPos": 39
        },
        "array2D": {
            "rectWidth": 36,
            "rectHeight": 36,
            "nextPos": 39
        },
        "sorts": {
            "rectWidth": 36,
            "rectHeight": 36,
            "nextPos": 39
        },
        "LL": {
            "rectWidth": 25,
            "rectHeight": 25,
            "nextPos": 28
        },
        "stack": {
            "rectWidth": 40,
            "rectHeight": 40,
            "nextPos": 43
        },
        "queue": {
            "rectWidth": 40,
            "rectHeight": 40,
            "nextPos": 43
        },
        "HT": {
            "rectWidth": 40,
            "rectHeight": 40,
            "nextPos": 43
        }
    },
    "canvas": {
        "defaultWidth": 0.95,
        "drawYPosFactor": 0.1,
        "rectRadius": 5,
        "fontSize": {
            "cfontSize": 12,
            "ifontSize": 8,
            "comfontSize": 11,
            "afontSize": 10
        },
        "ScreenConfig": {
            "minSize": 250,
            "maxSize": 767
        }
    }
};


const  TabletconfigData = {
    default: {
        rectWidth: 30,
        rectHeight: 30,
        nextPos: 33
    },
    types: {
        array: {
            rectWidth: 45,
            rectHeight: 45,
            nextPos: 48
        },
        array2D: {
            rectWidth: 45,
            rectHeight: 45,
            nextPos: 48
        },
        sorts: {
            rectWidth: 45,
            rectHeight: 45,
            nextPos: 48
        },
        LL: {
            rectWidth: 42,
            rectHeight: 42,
            nextPos: 45
        },
        stack: {
            rectWidth: 55,
            rectHeight: 55,
            nextPos: 58
        },
        queue: {
            rectWidth: 55,
            rectHeight: 55,
            nextPos: 58
        },
        HT: {
            rectWidth: 55,
            rectHeight: 55,
            nextPos: 58
        }
    },
    canvas: {
        defaultWidth: 0.6,
        drawYPosFactor: 0.1,
        rectRadius: 5,
        fontSize: {
            cfontSize: 13,
            ifontSize: 10,
            comfontSize: 11,
            afontSize: 13
        },
        ScreenConfig: {
            minSize: 768,
            maxSize: 1023
        }
    }
};



  const  LaptopAndGreaterconfigData = {
    default: {
        rectWidth: 30,
        rectHeight: 30,
        nextPos: 33
    },
    types: {
        array: {
            rectWidth: 50,
            rectHeight: 50,
            nextPos: 53
        },
        array2D: {
            rectWidth: 50,
            rectHeight: 50,
            nextPos: 53
        },
        sorts: {
            rectWidth: 50,
            rectHeight: 50,
            nextPos: 53
        },
        LL: {
            rectWidth: 45,
            rectHeight: 45,
            nextPos: 48
        },
        stack: {
            rectWidth: 60,
            rectHeight: 60,
            nextPos: 63
        },
        queue: {
            rectWidth: 60,
            rectHeight: 60,
            nextPos: 63
        },
        HT: {
            rectWidth: 60,
            rectHeight: 60,
            nextPos: 63
        }
    },
    canvas: {
        defaultWidth: 0.6,
        drawYPosFactor: 0.1,
        rectRadius: 5,
        fontSize: {
            cfontSize: 16,
            ifontSize: 13,
            comfontSize: 14,
            afontSize: 16
        },
        ScreenConfig: {
            minSize: 768,
            maxSize: 1023
        }
    }
};



switch (fileName){

  case "mobileScreenConfig":
    configData = MobileconfigData ;
  break;

case "tabletScreenConfig":
   configData = TabletconfigData ;
  break;

case "laptop_GreaterScreenConfig":
   configData = LaptopAndGreaterconfigData ;
  break;
    
}


console.log(" configuration applied through self data")

}
        console.log("Config data:", configData);

        const width = window.innerWidth;
        console.log("Window width: " + width);

        this.currentDevice.min = configData.canvas.ScreenConfig.minSize;
        this.currentDevice.max = configData.canvas.ScreenConfig.maxSize;

        this.canvasWidth = width * configData.canvas.defaultWidth;
        this.drawXPos = 0;
        this.drawYPos = this.canvasWidth * configData.canvas.drawYPosFactor;
        this.rectRadius = configData.canvas.rectRadius;

        this.cfontSize = configData.canvas.fontSize.cfontSize;
        this.ifontSize = configData.canvas.fontSize.ifontSize;
        this.comfontSize = configData.canvas.fontSize.comfontSize;
        this.afontSize = configData.canvas.fontSize.afontSize;

        const typeConfig = configData.types[structureType] || configData.default;

        this.rectWidth = typeConfig.rectWidth;
        this.rectHeight = typeConfig.rectHeight;
        this.nextPos = typeConfig.nextPos;

        console.log("Configuration applied successfully");
    } catch (error) {
        console.error("Failed to apply configuration:", error);
        throw error;
    }
}



    async selectConfiguration({ structureType } ) {
        try {
            const width = window.innerWidth;
            console.log("windows width " + width)

            if (window.innerWidth < 370) {

                console.log("requested configuration is mobile");

                await this.applyConfigurations({"fileName": 'mobileScreenConfig', "structureType": structureType } );
            } else if (width > 380 && width < 768) {

                console.log("requested configuration is for tablet  device");
                await this.applyConfigurations({"fileName": 'tabletScreenConfig',"structureType": structureType } );
            } else if (width > 780 && width < 1090) {
                console.log("requested configuration is for laptop or greater than device");
                await this.applyConfigurations({"fileName": 'laptop_GreaterScreenConfig', "structureType": structureType } );

            }

            console.log("selected configuration applied successful");
        } catch (error) {
            console.error( error);
            throw error; // Rethrow the error for further handling
        }
    }

    async setCanvasHeight({ ArrayLength, functorName } ) {
        try {

            console.log("setting Canvas height start");
            const heightMultipliers = {
                "CreationArray": 5.5,
                "LinearSearch": 5.5,
                "BinarySearch": 5.5,
                "InsertionArray": 5.5,
                "DeletionArray": 5.5,

                "MergeArrays": 5,
                "ConcatenateArrays": 5,
                "SplitArray": 5,
                "ReverseArray": 5,

                "TransposeOf2D": 6,
                "CreateArray2D": 6,
                "SearchIn2D": 6,

                "AdditionOf2D": 7,
                "SubtractionOf2D": 7,
                "MultiplicationOf2D": 7,

                "CreateSLL": 6,
                "TraverseInSLL": 6,
                "InsetAtHead": 6,
                "InsertAtTail": 6,
                "InsertInBetween": 6,
                "DeteleAtHead": 6,
                "DeleteInBetween": 6,
                "DeleteAtTail": 6,
                "ReverseSLL": 6,

                "CreateDLL" :6,
                "TraverseInDLL":6,
                "DInsertAtHead":6,
                "DInsertInBetween":6,
                "DInsertAtTail":6,
                "DDeteleAtHead":6,
                "DDeleteInBetween":6,
                "DDeleteAtTail":6,


                "StackPush": 6,
                "StackPop": 6,
                "CustomPushPop": 6,

                "EnQueue": 6,
                "DeQueue": 6,
                "Custom": 6,

                "OpenAddressingHT": 7,
                "ClosedAddressingHT": 9
            };

            if (functorName in heightMultipliers) {
                console.log("Canvas height is being set by height multipliers");
                this.canvasHeight = (this.rectHeight * 3) * heightMultipliers[functorName];
            } 
            else if ( ArrayLength > 0 ){
                console.log("Canvas height is being saved by array length");
                this.canvasHeight = (this.rectHeight * 3) * ArrayLength;
      

            }else {
             console.log("something going wrong while setting Canvas height")
          }

            console.log("Canvas height is set successfully");
            console.log("canvas height" + this.canvasHeight)

        } catch (error) {
            console.error( error);
            throw error; // Rethrow the error for further handling
        }
    }

async createCanvas({ canvasID, structureType, functorName, ArrayLength }) {
    try {
        console.log("\n++++++++++++++++++ Canvas Start ++++++++++++++++++++++");
        console.log("Creating Canvas");
        console.log("Initializing necessary configuration");

        await this.selectConfiguration({ "structureType": structureType });

        this.currentDevice.UserLength = ArrayLength;

        await this.setCanvasHeight({ "ArrayLength": ArrayLength, "functorName": functorName });

        this.canvasID = canvasID;
        this.abort = false;
        this.paper = Raphael(canvasID, this.canvasWidth, this.canvasHeight);

        // Drawing a rectangle as the background
        const rect = this.paper.rect(0, 0, this.canvasWidth, this.canvasHeight);
        rect.attr({
            fill: this.backgroundColor,
            stroke: 0
        });

        // Accessing the parent element of canvasID element
        const Element = document.getElementById(canvasID);
        Element.appendChild(this.paper.canvas);

        // Creating and styling buttons
        const playButton = document.createElement('button');
        playButton.id = 'play';
        playButton.textContent = 'Resume';

        const pauseButton = document.createElement('button');
        pauseButton.id = 'pause';
        pauseButton.textContent = 'Pause';

        // Apply styles to the buttons to position them at the top right corner
        playButton.style.position = 'absolute';
        playButton.style.top = '5px';
        playButton.style.right = '5px';
        playButton.style.height = `${this.rectHeight * 0.75}px`;
        playButton.style.width = '50px';
        playButton.style.fontSize = '10px';

        pauseButton.style.position = 'absolute';
        pauseButton.style.top = `${this.rectHeight * 0.75 + 10}px`;
        pauseButton.style.right = '5px';
        pauseButton.style.height = `${this.rectHeight * 0.75}px`;
        pauseButton.style.width = '50px';
        pauseButton.style.fontSize = '10px';

        playButton.classList.add('px-1', 'm-btn');
        pauseButton.classList.add('px-2', 'm-btn');
            Element.appendChild(playButton);
            Element.appendChild(pauseButton);
        setTimeout(() => {
            playButton.addEventListener('click', () => {
                this.isPaused = false;
                console.log("Resume Button Clicked", this.isPaused);
            });

            pauseButton.addEventListener('click', () => {
                this.isPaused = true;
                console.log("Pause Button Clicked", this.isPaused);
            });


        },1000);

        this.canvasExists = true;
        Element.style.display = "block";
        console.log("Canvas created successfully and returning paper");
        console.log("++++++++++++++++++Canvas End++++++++++++++++++++++\n");
        return this.paper;

    } catch (error) {
        console.error("Error while creating canvas:", error);
        throw error;
    }
}

destroyCanvas({ canvasID, paper }) {
    try {
        console.log("Accessing paper to destroy Canvas");
        const canvas = document.getElementById(canvasID);
        const canvasplaybtn = document.getElementById('play');
        const canvaspausebtn = document.getElementById('pause');

        // Hide the canvas immediately
        if (canvasplaybtn) canvasplaybtn.remove();
        if (canvaspausebtn) canvaspausebtn.remove();
        if (canvas) canvas.style.display = "none";

        console.log("Canvas identified for removal");

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

        // Function to clear all elements from the canvas
        const clearCanvas = (paper) => {
            console.log("Clearing canvas elements");
            const elements = getAllElements(paper);
            elements.forEach(element => element.remove());
        };

        setTimeout(() => {
            clearCanvas(paper);

            if (paper) {
                console.log("Clearing paper");
                paper.clear();
                this.paper = null;
                this.drawXPos = 0;
                this.drawYPos = this.canvasWidth * 0.1;
                this.canvasExists = false;

                console.log("Paper cleared", this.paper, this.canvasExists);
            }

            if (canvas) {
                console.log("Removing all child elements from canvas");
                while (canvas.firstChild) {
                    canvas.firstChild.remove();
                }
            }
        }, 4000);

        console.log("Canvas will be destroyed after 4 seconds");

    } catch (error) {
        console.error("Error while destroying canvas:", error);
        throw error;
    }
}




    static async Delay({ time } ) {
        try {
            // Returning a promise for the time delay in the execution of code.
            return new Promise(resolve => setTimeout(resolve, time ));
        } catch (error) {
            console.error("Error in delay:", error);
            throw error; // Rethrow the error for further handling
        }
    }

    async delay({ time = 500 } ={} ) {
        try {
            console.log("starting delay for", time );
            // Returning a promise for the time delay in the execution of code.
            return new Promise(resolve => setTimeout(resolve, time ));

            console.log("delay end ");
        } catch (error) {
            console.error("Error in delay:", error);
            throw error; // Rethrow the error for further handling
        }
    }

 
  async  pauseCanvas() {
            
            while (this.isPaused) {
                await this.delay({ "time": 300  });
            }
           
        }


} //class CanvasHandler end here