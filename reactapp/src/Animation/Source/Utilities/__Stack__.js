import { Rect }  from '../Components/Component.js';


export class Stack {

    static stackBox = [];
    constructor({ canvasHandler, color = "#82f5ff" } ) {

       Object.assign(this, { canvasHandler ,  color });
        this.stack = null;
       
    }



async drawStack({ array, ex = false }) {
    try {
       // if (ex) array.push(" ");

        const ch = this.canvasHandler;
        const H = ch.rectHeight, W = ch.rectWidth, N = ch.nextPos;
        const baseY = ch.canvasHeight - ((array.length + 1) * H * 1.25);
        let vGLeft = [];

        vGLeft.push({ x: ch.canvasWidth * 0.18, y: ch.canvasHeight - ((array.length + 2) * H * 1.3) });
        vGLeft.push({ x: vGLeft[0].x + N * 0.3, y: vGLeft[0].y });
        vGLeft.push({ x: vGLeft[1].x, y: vGLeft[1].y + ((array.length + 0.5) * H * 1.3) });
        vGLeft.push({ x: vGLeft[2].x + W * 1.2, y: vGLeft[2].y });
        vGLeft.push({ x: vGLeft[3].x, y: vGLeft[3].y - ((array.length + 0.5) * H * 1.3) });
        vGLeft.push({ x: vGLeft[4].x + N * 0.3, y: vGLeft[4].y });
        vGLeft.push({ x: vGLeft[5].x, y: vGLeft[5].y + W * 0.2 });
        vGLeft.push({ x: vGLeft[6].x - W * 0.2, y: vGLeft[6].y });
        vGLeft.push({ x: vGLeft[7].x, y: vGLeft[7].y + ((array.length + 0.5) * H * 1.3) });
        vGLeft.push({ x: vGLeft[8].x - W * 1.45, y: vGLeft[8].y });
        vGLeft.push({ x: vGLeft[9].x, y: vGLeft[9].y - ((array.length + 0.5) * H * 1.3) });
        vGLeft.push({ x: vGLeft[10].x - W * 0.2, y: vGLeft[10].y });

        this.stack = ch.paper.path(vGLeft.map((point, idx) => `${idx === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + 'Z');
        this.stack.attr({ fill: "purple", "stroke-width": 0 });

        const { x, y, width, height } = this.stack.getBBox();
        const title = ch.paper.text(x + width / 2, y + height + ch.cfontSize * 1.5, "Stack");
        title.attr({ fill: "purple", "font-size": ch.cfontSize * 2, "text-anchor": "middle", "alignment-baseline": "middle" });
        const discription = [`👋 Hi , I Am Stack Data Structure `,`I Can Hold ${array.length} Elements `,`Intial Top Is Pointing At -1` ] ;
        Rect.createPopover({canvasHandler : ch , element : title , lines : discription , type : "up"});

        let linePx = vGLeft[2].x;
        let linePy = vGLeft[2].y;

      
        for (let j = 0; j < array.length; j++) {
            linePy -= H * 1.25;
            
            const ln = ch.paper.path(`M${linePx},${linePy}H${linePx + W * 1.2}`);
            ln.attr({ stroke : "red" , "stroke-width" : 2 });
            //ln.hide();
            ch.paper.text(linePx - W * 0.25 , linePy , j );
            const tempData = new Rect({ "canvasHandler": ch  , "xposition": linePx + W * 0.1 , "yposition": linePy + H * 0.125  , "content": "" , "index": null , "color": "#F4C430" });
            tempData.drawRect({ "rect": true, "cont": false, "ind": false, "popover": false,  "popoverTextArray": null });
            tempData.rectElement.hide(); 
            Stack.stackBox.push({ rect : tempData , line : ln });
        }

        //if (ex) array.pop();
        return Stack.stackBox;

    } catch (e) {
        console.log(e);
    }
}

 static async cleanup() {
       try {
            if (this.stack)this.stack.remove();
          
            Stack.stackBox.forEach( e => e.line.remove());
   
            Stack.stackBox = [];
            this.canvasHandler = null;
            this.stack = null;
            this.color = null;
        } catch (e) {
            console.log(e)
        }
    }


} //class end 