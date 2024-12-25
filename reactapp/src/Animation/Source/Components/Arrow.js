import {
    createPopover , calcDuration
} from './Rect.js'




export class Arrow {

    static ArrowArray = [];

    constructor({ canvasHandler, cont   , color, direction = "up" }) {
        this.canvasHandler = canvasHandler;
        this.arrowFig = null;
        this.popoverArrow = null;
        this.arrowContent = null;
        this.popoverContent = null;
        this.Atext = cont;
        this.color = color;
        this.direction = direction;
    }

/**
 * Draws an arrow figure based on the given rectangle object.
 * 
 * @param {object} rectObj - The rectangle object to base the arrow on.
 * @param {boolean} [fig=true] - Indicates whether to draw the arrow figure. Defaults to true.
 * @param {boolean} [cont=true] - Indicates whether to include the arrow content. Defaults to true.
 * @param {boolean} [popover=false] - Indicates whether to create a popover. Defaults to false.
 * @description This function draws an arrow figure based on the provided rectangle object. It allows for customization of whether to include the arrow figure, the arrow content, and whether to create a popover.
 * @purpose The purpose of this function is to visually represent an arrow pointing to or from a rectangle on a canvas, with options for additional content and popover creation.
 */


async drawFig({ rectObj, fig = true, cont = true, popover = true }) {
    try {
        if (this.canvasHandler.abort) return;
        const { rectWidth: w, rectHeight: h, paper: p } = this.canvasHandler;
        const a = [];

        const u = (a, r) => {
           
            const y = typeof r.index === 'number' ? h * 0.15 : h * 0.28;
            a.push({ x: r.rectElement.attr("x") + w / 2, y: r.rectElement.attr("y") - y });
            a.push({ x: a[0].x - w * 0.4, y: a[0].y - h * 0.4 });
            a.push({ x: a[1].x + w * 0.3, y: a[1].y });
            a.push({ x: a[2].x, y: a[2].y - h * 0.25 });
            a.push({ x: a[3].x + w * 0.2, y: a[3].y });
            a.push({ x: a[4].x, y: a[4].y + h * 0.25 });
            a.push({ x: a[5].x + w * 0.3, y: a[5].y });
         
        };

        const d = (a, r) => {
            
            a.push({ x: r.rectElement.attr("x") + w / 2, y: r.rectElement.attr("y") + h * 1.1 });
            a.push({ x: a[0].x - w * 0.4, y: a[0].y + h * 0.4 });
            a.push({ x: a[1].x + w * 0.3, y: a[1].y });
            a.push({ x: a[2].x, y: a[2].y + h * 0.25 });
            a.push({ x: a[3].x + w * 0.2, y: a[3].y });
            a.push({ x: a[4].x, y: a[4].y - h * 0.25 });
            a.push({ x: a[5].x + w * 0.3, y: a[5].y });
          
        };

        const l = (a, r) => {
            
            a.push({ x: r.rectElement.attr("x") - w * 0.25, y: r.rectElement.attr("y") + h / 2 });
            a.push({ x: a[0].x - w * 0.4, y: a[0].y + h * 0.4 });
            a.push({ x: a[1].x, y: a[1].y - w * 0.3 });
            a.push({ x: a[2].x - h * 0.25, y: a[2].y });
            a.push({ x: a[3].x, y: a[3].y - w * 0.2 });
            a.push({ x: a[4].x + h * 0.25, y: a[4].y });
            a.push({ x: a[5].x, y: a[5].y - h * 0.3 });
        };

        const r = (a, r) => {
            a.push({ x: r.rectElement.attr("x") + w * 1.25, y: r.rectElement.attr("y") + h / 2 });
            a.push({ x: a[0].x + w * 0.4, y: a[0].y + h * 0.4 });
            a.push({ x: a[1].x, y: a[1].y - w * 0.3 });
            a.push({ x: a[2].x + h * 0.25, y: a[2].y });
            a.push({ x: a[3].x, y: a[3].y - w * 0.2 });
            a.push({ x: a[4].x - h * 0.25, y: a[4].y });
            a.push({ x: a[5].x, y: a[5].y - h * 0.3 });
        };

        if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
        if (this.canvasHandler.abort )return;

        if (this.direction === "up") u(a, rectObj);
        else if (this.direction === "down") d(a, rectObj);
        else if (this.direction === "left") l(a, rectObj);
        else if (this.direction === "right") r(a, rectObj);

        if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
        if (this.canvasHandler.abort )return;

        if (fig) {
            this.arrowFig = p.path(a.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`) + 'Z').attr({ fill: this.color, stroke: 0 });
            if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
            if (this.canvasHandler.abort )return;

            if (cont) {
                const f = this.arrowFig.getBBox();
                const x = (this.direction === "up" || this.direction === "down") ? f.x + f.width * 0.5 : this.direction === "left" ? f.x - f.width * 0.35: f.x + f.width*1.3 ;
              
                const y = this.direction === "up" ? f.y - f.height * 0.3 : this.direction === "down" ? f.y + f.height * 1.26 : f.y + f.height * 0.5;
                this.arrowContent = p.text(x, y, this.Atext).attr({ 'font-size': rectObj.canvasHandler.afontSize, fill: this.color, stroke: 0, "text-anchor": "middle", "alignment-baseline": "middle" });
                if (rectObj.canvasHandler.abort) return;
            }

            if (popover) {
                 let pos ;
                 if (this.direction === "up") pos = "Below" ;
                 else if (this.direction === "down") pos = "Above" ;
                 else if (this.direction === "left") pos = "Right" ;
                 else if (this.direction === "right") pos = "Left" ;

                 const arrowText = ["👋Hi, I am Arrow , I am Pointing ", "To " + pos + " Box", "My Value = " + this.arrowContent.attr("text")];             
                 if (fig) this.popoverArrow = await createPopover({ "canvasHandler":this.canvasHandler, "element":this.arrowFig, "lines":arrowText });
        
            }
        }

      if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
      if (this.canvasHandler.abort )return;
      return this ;

    } catch (e) { console.log(e); }
}

/**
 * Draws an arrow based on the given rectangle object.
 * 
 * @param {object} rectObj - The rectangle object to base the arrow on.
 * @param {boolean} [fig=true] - Indicates whether to draw the arrow. Defaults to true.
 * @param {boolean} [cont=true] - Indicates whether to include the arrow content. Defaults to true.
 * @param {boolean} [popover=false] - Indicates whether to create a popover. Defaults to false.
 * @description This function draws an arrow based on the provided rectangle object. It allows for customization of whether to include the arrow figure, the arrow content, and whether to create a popover.
 */

    async drawArrow({ rectObj, fig = true, cont = true, popover = true }) {

        try {

            if (rectObj.canvasHandler.abort)  return;
           
            const a = this.drawFig({"rectObj": rectObj,"fig": fig,"cont": cont,"popover": popover});
            Arrow.ArrowArray.push(this);

           if (rectObj.canvasHandler.isPaused ) await rectObj.canvasHandler.pauseCanvas() ;
           if (rectObj.canvasHandler.abort )return;
           return a ; 
        } catch (e) {

            console.log(e);

        }
    }

/**
 * Clears the arrow components.
 * 
 * @param {boolean} [fig=true] - Indicates whether to remove the arrow figure. Defaults to true.
 * @param {boolean} [cont=true] - Indicates whether to remove the arrow content. Defaults to true.
 * @param {boolean} [dfba=false] - Indicates whether to remove the arrow from the ArrowArray. Defaults to false.
 * @description This function clears the arrow components based on the provided parameters.
 */
    async clearArrow({ fig = true, cont = true, dfba = false } = {} ) {

        try {

            if (this.arrowFig && fig) {
                this.arrowFig.remove();
                this.arrowFig = null;
            }
            if (this.arrowContent && cont) {
                this.arrowContent.remove();
                this.arrowContent = null;
            }

            if (this.popoverArrow &&fig) {
                this.popoverArrow.forEach((ele) => ele.remove());
                this.popoverRect = null;
            }

            if (this.popoverContent) {
                this.popoverContent.forEach((ele) =>  ele.remove());
                this.popoverRect = null;
            }

           if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
           if (this.canvasHandler.abort )return;

            const index = Arrow.ArrowArray.indexOf(this);
            if (index !== -1 && dfba) {
                Arrow.ArrowArray.splice(index, 1);
            }

        } catch (e) {
            console.log(e);
        }
    }

/**
 * Cleans up the Arrow class by removing all arrows and associated components.
 * 
 * @description This function removes all arrows and associated components from the Arrow class.
 */

static async cleanup() {
    try {
        for (let i = Arrow.ArrowArray.length - 1; i >= 0; i--) {
            const a = Arrow.ArrowArray[i];
            a.clearArrow(1);
            a.Atext = a.color = "";
            a.direction = "up";
            a.canvasHandler = null;
            Rect.AllBoxe.splice(i, 1);
        }
        Arrow.ArrowArray = [];
        console.log("Arrow class cleaned successfully");
    } catch (e) {
        console.log(e);
    }
}

/**
 * Shifts the arrow based on the provided steps and direction.
 * 
 * @param {number} steps - The number of steps to shift the arrow.
 * @param {string} direction - The direction in which to shift the arrow (up, down, right, left).
 * @returns {Promise} - A promise that resolves when the arrow has been shifted.
 * @description This function shifts the arrow based on the provided steps and direction.
 */
async ShiftArrow({ steps, direction }) {
    try {
        return new Promise(async (resolve) => {
            if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
            if (this.canvasHandler.abort )return;

            const { rectHeight: height, rectWidth: width, nextPos: next } = this.canvasHandler;
            const dist = next * steps * (direction === "left" ? -1 : 1);
            const transformMap = {
                "up": `t0, -${height * steps}`,
                "down": `t0, ${height * steps}`,
                "right": `t${dist}, 0`,
                "left": `t${dist}, 0`
            };
            const g = this.arrowFig.getBBox();

           // const duration = calcDuration(g.x , g.y , g.x + (direction == "left" || direction =="right" )? transformMap[direction] : 0 , g.y +( direction=="up" || direction=="down")? transformMap[direction] : 0 );
            const dx = (direction === "left" || direction === "right") ? dist : 0;
            const dy = (direction === "up" || direction === "down") ? height * steps : 0;

            const duration = calcDuration(g.x, g.y, g.x + dx, g.y + dy , this.canvasHandler.fps);

            if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
            if (this.canvasHandler.abort )return;

            this.clearArrow({"fig": false,"cont": true,"dfba": false });

            await this.arrowFig.animate({ transform: transformMap[direction] }, duration  ,  async () => {

                if (["right", "left"].includes(direction)) {

                    if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                    if (this.canvasHandler.abort )return;

                    const fig = this.arrowFig.getBBox();
                    const x = fig.x + width * 0.4;
                    const y = this.direction === "up" ? fig.y - height * 0.20 : fig.y + fig.height * 1.2;
                    this.arrowContent = this.canvasHandler.paper.text(x, y, this.Atext).attr({
                        'font-size': this.canvasHandler.afontSize,
                        fill: this.arrowFig.attr('fill')
                    });

                  this.popoverArrow[4].attr({ text: "My Value = " + this.Atext});               
                 
                  if (this.canvasHandler.isPaused ) await this.canvasHandler.pauseCanvas() ;
                  if (this.canvasHandler.abort )return;

                }
                if (!this.canvasHandler.abort) resolve();
             
            });
        });
    } catch (e) {
        console.log(e);
    }
}



} // Arrow class end here 