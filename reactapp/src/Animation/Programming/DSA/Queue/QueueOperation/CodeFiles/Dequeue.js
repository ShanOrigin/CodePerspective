import { Rect, Arrow } from '../../../Source/Main.js'

import { Queue } from '../../../Source/stack_queue_main.js'

export async function DeQueue(canvas) {
  try {
    let centerX = canvas.canvasWidth / 2
    let centerY = canvas.drawYPos //  - canvas.drawYPos* 0.7;

    canvas.paper.text(centerX, centerY / 2, ' Dequeue Operation  ').attr({
      'font-size': canvas.cfontSize * 1.7,
      fill: '#46099c',
    })

    const tempArray = []
    canvas.drawYPos += canvas.rectHeight * 2

    let array

    array = await Rect.drawArray(canvas, array, true, true, 'array', 'input')

    if (canvas.abort) {
      return
    }
    await canvas.delay((array.length + 1) * 300)

    const queue = new Queue(canvas)

    const fig = await queue.drawQueue(array)

    const indication = new Arrow(canvas, ' ', 'green', 'left')
    const Ele = new Arrow(canvas, 'Element', 'red', 'up')

    const textP = canvas.canvasWidth * 0.3

    const cap = canvas.paper.text(
      textP,
      canvas.canvasHeight * 0.75,
      'Capacity =  ' + array.length
    )
    cap.attr({
      fill: 'green',
      'font-size': canvas.cfontSize * 1.2,
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
    })

    const queueSize = canvas.paper.text(
      textP,
      canvas.canvasHeight * 0.75 + canvas.rectHeight / 2,
      'Queue Size = 0 '
    )
    queueSize.attr({
      fill: 'blue',
      'font-size': canvas.cfontSize * 1.2,
      'text-anchor': 'middle',
      'alignment-baseline': 'vertical',
    })

    const rear = canvas.paper.text(
      textP + canvas.canvasWidth * 0.4,
      canvas.canvasHeight * 0.75,
      'rear = -1 '
    )
    rear.attr({
      fill: 'red',
      'font-size': canvas.cfontSize * 1.2,
      'text-anchor': 'middle',
      'alignment-baseline': 'vertical',
    })

    const front = canvas.paper.text(
      textP + canvas.canvasWidth * 0.4,
      canvas.canvasHeight * 0.75 + canvas.rectHeight / 2,
      'front = -1 '
    )
    front.attr({
      fill: 'green',
      'font-size': canvas.cfontSize * 1.2,
      'text-anchor': 'middle',
      'alignment-baseline': 'vertical',
    })

    const notice = canvas.paper.text(
      canvas.canvasWidth * 0.5,
      canvas.canvasHeight * 0.75 + canvas.rectHeight * 2,
      ' '
    )
    front.attr({
      fill: 'red',
      'font-size': canvas.cfontSize,
      'text-anchor': 'middle',
      'alignment-baseline': 'vertical',
    })

    console.log(queue)
    console.log(fig)

    //push loop

    for (let i = 0; i < array.length; i++) {
      Ele.drawArrow(Rect.boxes[i])

      const tempRect = new Rect(
        canvas,
        Rect.boxes[i].rectElement.attr('x'),
        Rect.boxes[i].rectElement.attr('y'),
        Rect.boxes[i].content,
        Rect.boxes[i].index,
        '#3498db'
      )
      tempRect.drawRect(true, true, false)

      tempArray.push(tempRect)

      Rect.boxes[i].moveTo(
        Rect.boxes[i].rectElement.attr('x'),
        Rect.boxes[i].rectElement.attr('y') + canvas.rectHeight * 1.5
      )

      await canvas.delay(600)
      Rect.boxes[i].moveTo(
        canvas.canvasWidth * 0.2 - canvas.rectWidth * 1.5,
        Rect.boxes[i].rectElement.attr('y')
      )

      await canvas.delay(600)
      Rect.boxes[i].moveTo(
        Rect.boxes[i].rectElement.attr('x'),
        fig[i][0].rectElement.attr('y')
      )

      console.log(
        Rect.boxes[i].rectElement.attr('x'),
        Rect.boxes[i].rectElement.attr('y')
      )
      await canvas.delay(600)
      indication.drawArrow(fig[fig.length - 4][0])
      await canvas.delay(500)
      // fig[i][1].show();

      if (i == 0) {
        notice.attr({
          fill: 'red',
          'font-size': canvas.cfontSize * 1.25,
          text: ' Increase front && rear by 1 \n front++ && rear++ ',
        })
        await fig[fig.length - 1].drawArrow(fig[i][0])
        await canvas.delay(300)
        await fig[fig.length - 2].drawArrow(fig[i][0])

        await canvas.delay(600)

        front.attr({
          fill: 'green',
          text: 'front = ' + 0,
        })
      } else {
        notice.attr({
          fill: 'red',
          'font-size': canvas.cfontSize * 1.25,
          text: ' Increase rear by 1 \n rear++ ',
        })

        await canvas.delay(600)

        await fig[fig.length - 1].ShiftArrow(0.5, 'up')
        await fig[fig.length - 1].ShiftArrow(1, 'left')

        await fig[fig.length - 1].clearArrow()
        await fig[fig.length - 1].drawArrow(fig[i][0])

        await canvas.delay(600)
      }

      rear.attr({
        text: 'rear = ' + i,
      })

      // fig[i][2].show();

      await canvas.delay(1000)

      Rect.boxes[i].moveTo(
        fig[i][0].rectElement.attr('x'),
        fig[i][0].rectElement.attr('y')
      )
      indication.clearArrow()
      await canvas.delay(600)

      queueSize.attr({
        text: 'Queue Size = ' + (i + 1),
      })

      notice.attr({
        text: '  ',
      })

      if (i < array.length - 1) {
        await Ele.ShiftArrow(0.5, 'up')
        await Ele.ShiftArrow(1, 'right')

        if (canvas.abort) {
          console.log('pop end')
          return
        }

        await Ele.clearArrow()
      }
    }
    // fig[array.length][1].show();
    await Ele.clearArrow()
    notice.attr({
      fill: 'red',
      'font-size': canvas.cfontSize * 1.3,

      text: ' Queue is Full \n Cannot Enqueue Elements  ',
    })
    await canvas.delay(600)

    notice.attr({
      text: '',
    })
    //pop loop

    for (let i = 0; i < array.length; i++) {
      Ele.drawArrow(tempArray[i])

      //fig[i][1].hide();

      await canvas.delay(600)
      Rect.boxes[i].moveTo(
        canvas.canvasWidth * 0.8 + canvas.rectWidth * 1,
        Rect.boxes[i].rectElement.attr('y')
      )

      await canvas.delay(600)
      Rect.boxes[i].moveTo(
        Rect.boxes[i].rectElement.attr('x'),
        tempArray[i].rectElement.attr('y') + canvas.rectHeight * 1.5
      )

      await canvas.delay(600)
      Rect.boxes[i].moveTo(
        tempArray[i].rectElement.attr('x'),
        Rect.boxes[i].rectElement.attr('y')
      )
      await canvas.delay(1000)

      Rect.boxes[i].moveTo(
        tempArray[i].rectElement.attr('x'),
        tempArray[i].rectElement.attr('y')
      )

      //   indication.drawArrow(fig[fig.length - 3][0]);
      await canvas.delay(500)
      //   fig[i][1].show();
      tempArray[i].clearRect()

      if (i < array.length - 1) {
        notice.attr({
          fill: 'red',
          'font-size': canvas.cfontSize * 1.25,
          text: ' Increase front by 1 \n front++ ',
        })

        await fig[fig.length - 2].ShiftArrow(0.5, 'up')
        await fig[fig.length - 2].ShiftArrow(1, 'left')

        await fig[fig.length - 2].clearArrow()
        await fig[fig.length - 2].drawArrow(fig[i + 1][0])

        front.attr({
          text: 'front = ' + (i + 1),
        })

        await canvas.delay(600)
      }

      queueSize.attr({
        text: 'Queue Size = ' + (array.length - (i + 1)),
      })

      notice.attr({
        text: ' ',
      })

      if (i < array.length - 1) {
        await Ele.ShiftArrow(0.5, 'up')
        await Ele.ShiftArrow(1, 'right')

        if (canvas.abort) {
          console.log('pop end')
          return
        }

        await Ele.clearArrow()
      }
    }
    //fig[array.length][1].hide();
    await Ele.clearArrow()

    notice.attr({
      fill: 'red',
      'font-size': canvas.cfontSize * 1.3,

      text: ' Queue is Empty \n Cannot Dequeue Elements  ',
    })
  } catch (e) {
    console.log(e)
  }
}
