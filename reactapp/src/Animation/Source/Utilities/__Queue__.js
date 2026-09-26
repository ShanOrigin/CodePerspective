import { Rect, Arrow } from '../Components/Component.js'

export class Queue {
  static queueBox = []

  constructor({ canvasHandler, color = '#82f5ff' }) {
    Object.assign(this, { canvasHandler, color })
    this.queueUpLine = null
    this.queueDownLine = null
  }

  static Line(canvas, x1, x2, y, H) {
    const line = canvas.paper.path(
      'M' + x1 + ',' + (y + canvas.rectHeight * H) + 'H' + x2
    )
    line.attr({
      stroke: 'purple',
      'stroke-width': 3,
    })
    return line
  }

  async drawQueue(array) {
    try {
      this.canvasHandler.drawYPos += this.canvasHandler.canvasHeight * 0.25

      this.canvasHandler.drawXPos =
        (this.canvasHandler.canvasWidth -
          array.length * (this.canvasHandler.nextPos + 3)) /
        2

      const ln = this.canvasHandler.paper.path(
        'M' +
          (this.canvasHandler.drawXPos - 3) +
          ',' +
          (this.canvasHandler.drawYPos - this.canvasHandler.rectWidth * 0.1) +
          'V' +
          (this.canvasHandler.drawYPos -
            this.canvasHandler.rectWidth * 0.1 +
            this.canvasHandler.rectHeight * 1.2)
      )
      ln.attr({ 'stroke-width': 2, stroke: 'red' })
      Queue.queueBox.push({ rect: null, line: ln })

      for (let i = 0; i < array.length; i++) {
        const xx =
          this.canvasHandler.drawXPos + (this.canvasHandler.nextPos + 3) * i

        const commonParams = {
          canvasHandler: this.canvasHandler,
          xposition: xx,
          yposition: this.canvasHandler.drawYPos,
          index: i,
          color: 'red',
        }
        const drawRectparam = {
          rect: true,
          cont: false,
          ind: false,
          popover: false,
          Range: [0, 1],
          popoverTextArray: null,
        }

        const rectDrawer = new Rect({ ...commonParams, content: '' })
        rectDrawer.drawRect(drawRectparam)
        Rect.boxes.push(rectDrawer)
        rectDrawer.rectElement.hide()

        const ln = this.canvasHandler.paper.path(
          'M' +
            (rectDrawer.rectElement.attr('x') + this.canvasHandler.nextPos) +
            ',' +
            (rectDrawer.rectElement.attr('y') -
              this.canvasHandler.rectWidth * 0.1) +
            'V' +
            (rectDrawer.rectElement.attr('y') -
              this.canvasHandler.rectWidth * 0.1 +
              this.canvasHandler.rectHeight * 1.2)
        )
        ln.attr({ 'stroke-width': 2, stroke: 'red' })

        this.canvasHandler.paper.text(
          rectDrawer.rectElement.attr('x') + this.canvasHandler.rectWidth * 0.5,
          rectDrawer.rectElement.attr('y') +
            this.canvasHandler.rectHeight * 1.4,
          array.length - 1 - i
        )

        Queue.queueBox.push({ rect: rectDrawer, line: ln })
      }

      const [x1, y1] = [
        Rect.boxes[0].rectElement.attr('x') -
          this.canvasHandler.rectWidth * 0.3,
        Rect.boxes[0].rectElement.attr('y') -
          this.canvasHandler.rectHeight * 0.1,
      ]
      const [x2, y2] = [
        Rect.boxes[array.length - 1].rectElement.attr('x') +
          this.canvasHandler.rectWidth * 1.3,
        Rect.boxes[array.length - 1].rectElement.attr('y') -
          this.canvasHandler.rectHeight * 0.1,
      ]

      this.queueUpLine = Queue.Line(this.canvasHandler, x1, x2, y1, 0)
      this.queueDownLine = Queue.Line(this.canvasHandler, x1, x2, y2, 1.2)

      const g = this.queueDownLine.getBBox()
      const gradient = '45deg-#ff0000-#0000ff'

      const title = this.canvasHandler.paper.text(
        g.x + g.width / 2,
        g.y + g.height * 1 + this.canvasHandler.cfontSize * 2.5,
        'Queue'
      )
      title.attr({
        'stroke-width': 0,
        fill: gradient,
        'font-size': this.canvasHandler.cfontSize * 2,
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      })

      Queue.queueBox.reverse()

      return Queue.queueBox
    } catch (e) {
      console.log(e)
    }
  } //function end

  /*

static async cleanup() {
    try {
        if (this.queueUpLine) this.queueUpLine.remove();
        if (this.queueDownLine) this.queueDownLine.remove();

        for (let j = 0; j < Queue.queueBox.length; j++) {
            if(Queue.boxP[j][0])Queue.boxP[j][0].clearRect();
            if (Queue.boxP[j][1]) Queue.boxP[j][1].remove();
            if (Queue.boxP[j][2]) Queue.boxP[j][2].remove();
        }

        Queue.boxP = [];
       this.canvasHandler = null;
            this.queueUpLine = null;
            this.queueDownLine = null;
            this.color = null;
        console.log("Queue boxP length: " + Queue.boxP.length);
        console.log("Queue cleaned up successfully");
    } catch (e) {
        console.log(e);
    }
}
*/
}
