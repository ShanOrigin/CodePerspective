import {
  createPopover , calcDuration
} from './Rect.js'

import { drawText } from '../Utilities/utilities.js';



export class Comparator {


    static CompArray = [];

    constructor({ rectObj1, rectObj2, color = "green", CompText = null }) {

        this.rectObj1 = rectObj1;
        this.rectObj2 = rectObj2;

        this.Csx = rectObj1.rectElement.attr("x") + rectObj1.canvasHandler.rectWidth / 2;
        this.Cex = rectObj2.rectElement.attr("x") + rectObj2.canvasHandler.rectWidth / 2;
        this.Cy = rectObj1.rectElement.attr("y") + rectObj1.canvasHandler.rectHeight * 1.2;

        this.comparatorFig = null;
        this.popoverComp = null ;
        this.compText = null;

        this.color = color;

        this.CompText = CompText;

    }

/**
 * Draws a comparator figure.
 * 
 * @param {boolean} fig - Determines whether to draw the figure.
 * @param {boolean} cont - Determines whether to draw the comparator text.
 * @param {boolean} popover - Determines whether to create a popover.
 */


async drawFig({ fig = true, cont = true , popover = true } = {}) {
    try {

        if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
        if (this.rectObj1.canvasHandler.abort )return;

        const w = this.rectObj1.canvasHandler.rectWidth;
        const h = this.rectObj1.canvasHandler.rectHeight;
        const len = (this.Cex - this.Csx) + w * 0.2;

        const calculatePoints = (w, h, len) => {
            const points = [];
            points.push({ x: this.Csx, y: this.Cy });
            points.push({ x: points[0].x - w / 2, y: points[0].y + h / 2 });
            points.push({ x: points[1].x + w * 0.4, y: points[1].y });
            points.push({ x: points[2].x, y: points[2].y + h * 0.4 });
            points.push({ x: points[3].x + len * 0.45, y: points[3].y });
            points.push({ x: points[4].x, y: points[4].y + h * 0.2 });
            points.push({ x: points[5].x + len * 0.1, y: points[5].y });
            points.push({ x: points[6].x, y: points[6].y - h * 0.2 });
            points.push({ x: points[7].x + len * 0.45, y: points[7].y });
            points.push({ x: points[8].x, y: points[8].y - h * 0.4 });
            points.push({ x: points[9].x + w * 0.4, y: points[9].y });
            points.push({ x: points[10].x - w / 2, y: points[10].y - h / 2 });
            points.push({ x: points[11].x - w / 2, y: points[11].y + h / 2 });
            points.push({ x: points[12].x + w * 0.4, y: points[12].y });
            points.push({ x: points[13].x, y: points[13].y + h * 0.2 });
            points.push({ x: points[1].x + w * 0.6, y: points[14].y });
            points.push({ x: points[15].x, y: points[15].y - h * 0.2 });
            points.push({ x: points[16].x + w * 0.4, y: points[16].y });
            return points;
        };

        const points = calculatePoints(w, h, len);

       if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
       if (this.rectObj1.canvasHandler.abort )return;


        if (fig) {
            this.comparatorFig = this.rectObj1.canvasHandler.paper.path(points.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
            this.comparatorFig.attr({ fill: this.color, stroke: 0 });
            const fig = this.comparatorFig.getBBox();

            if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
            if (this.rectObj1.canvasHandler.abort )return;

            if (cont && this.CompText != null) {
                this.compText = drawText({ canvas : this.rectObj1.canvasHandler ,  text: this.CompText ,  x: fig.x + fig.width / 2  , y: fig.y + fig.height * 1.38 , Return: true, fontSize: 0.98 , padding: 6 ,  color: "white" });
                this.compText.rect.attr( { fill : "#0a0a0a" });
/*
                this.compText = this.rectObj1.canvasHandler.paper.text(fig.x + fig.width / 2, fig.y + fig.height * 1.3, this.CompText);
                this.compText.attr({ 'font-size': this.rectObj1.canvasHandler.comfontSize, fill: this.color, "text-anchor": "middle", "alignment-baseline": "middle" });
*/
            }
            if (popover) {
                const compText = ["👋Hi, I am Comparator , I am ", "Comparing " + this.rectObj1.textElement.attr("text") + " With " + this.rectObj2.textElement.attr("text"), " based on Comparison Operators"];
                if (fig) this.popoverComp = await createPopover({ "canvasHandler": this.rectObj1.canvasHandler, "element": this.comparatorFig, "lines": compText, "type": "down" });
            }
        }

        if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
        if (this.rectObj1.canvasHandler.abort )return;

    } catch (e) {
        console.log(e);
    }
}



/**
 * Draws a comparator with optional figure, text, and popover.
 * 
 * @param {boolean} fig - Determines whether to draw the figure.
 * @param {boolean} cont - Determines whether to draw the comparator text.
 * @param {boolean} popover - Determines whether to create a popover.
 */


    async drawComp({ fig = true, cont = true , popover=false } ={} ) {

        try {

            this.drawFig({ "fig": fig, "cont": cont , "popover": popover });
            Comparator.CompArray.push(this);

            if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
            if (this.rectObj1.canvasHandler.abort )return;
          
        } catch (e) {
            console.log(e);
        }
    }

/**
 * Moves the comparator by the specified number of steps.
 * 
 * @param {number} steps - The number of steps to move the comparator.
 */

async moveTo({ steps }) {
    try {

        if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
        if (this.rectObj1.canvasHandler.abort )return;
        const disX = steps * this.rectObj1.canvasHandler.nextPos;
        const g = this.comparatorFig.getBBox();
        const duration = calcDuration(g.x, g.y, g.x + disX, g.y  , this.rectObj1.canvasHandler.fps);

        await Promise.allSettled([
            this.comparatorFig && new Promise((resolve) => {
                this.comparatorFig.animate({
                    transform: `t${disX},0`
                }, duration, "linear", resolve);
            }),
            this.compText && new Promise((resolve) => {
                this.compText.rect.animate({
                    x: this.compText.rect.attr("x") + disX
                }, duration, "linear" , resolve);
            }),

            this.compText && new Promise((resolve) => {
                this.compText.text.animate({
                    x: this.compText.text.attr("x") + disX
 
                }, duration, "linear", resolve)
            })

        ]);

        if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
        if (this.rectObj1.canvasHandler.abort )return;

    } catch (e) {
        console.log(e);
    }
}

/**
 * Clears the comparator by removing its figure and text.
 * 
 * @param {boolean} fig - Whether to remove the figure of the comparator. Default is true.
 * @param {boolean} cont - Whether to remove the text of the comparator. Default is true.
 * @param {boolean} dfba - Whether to remove the comparator from the Comparator.CompArray. Default is false.
 */


    async clearComp({ fig = true, cont = true, dfba = false } = {} ) {

        try {

            if (this.comparatorFig && fig) {
                this.comparatorFig.remove();
                this.comparatorFig = null;
            }
            if (this.compText && cont) {
                this.compText.text.remove();
                this.compText.rect.remove();
                this.compText = null;
            }
            if (this.popoverComp && fig){
             this.popoverComp.forEach((ele) => ele.remove());
            }

            if (this.rectObj1.canvasHandler.isPaused ) await this.rectObj1.canvasHandler.pauseCanvas() ;
            if (this.rectObj1.canvasHandler.abort )return;

            if (dfba) {
                const index = Comparator.CompArray.indexOf(this);
                if(index >=0 ) Comparator.CompArray.splice(index, 1);
            }
        } catch (e) {
            console.log(e);
        }

    }


/**
 * Cleans up all comparator instances by resetting their properties and clearing them.
 */

static async cleanup() {
    try {
        console.log("comparator all cleared successfully")
        for (let comp of Comparator.CompArray) {
            Object.assign(comp, { rectObj1: null, rectObj2: null, Csx: 0, Cex: 0, Cy: 0, color: "", sort: "" });
            comp.clearComp({ "fig": true, "cont": true  });
        }
        Comparator.CompArray = [];
    } catch (e) {
        console.log(e);
    }
}


} // class end 