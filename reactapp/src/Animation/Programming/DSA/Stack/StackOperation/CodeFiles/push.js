import {
    Rect,
    Arrow
} from '../../../Source/Main.js' ;

import {
    stack
} from '../../../Source/stack_queue_main.js' ;



export async function StackPush(canvas) {


    try {

        if (canvas.abort) {
            console.log("push end");
            return;
        }

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY, "Push Operation In Stack ").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 2;


        let array;

        array = await Rect.drawArray(canvas, array, true, true, "array", "input", [-1000, 1000, 2, 4]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 300);


        canvas.drawYPos = canvas.canvasHeight * 0.5
        const Stackfig = new stack(canvas);

        const fig = await Stackfig.drawStack(array);

        const ff = Stackfig.stack.getBBox();
        const textP = (ff.x + ff.width) + (canvas.canvasWidth * 0.7 - ff.width) / 2;
        const bP = ff.y - canvas.rectHeight * 1.5;

        const cap = canvas.paper.text(textP, canvas.canvasHeight * 0.75, "Capacity =  " + array.length);
        cap.attr({
            "fill": "green",
            "font-size": canvas.cfontSize * 1.2,
            "text-anchor": "middle",
            "alignment-baseline": "middle"
        });

        if (canvas.abort) {
            console.log("push end");
            return;
        }

        const stackSize = canvas.paper.text(textP, canvas.canvasHeight * 0.75 + canvas.rectHeight / 2, "Stack Size = 0 ");
        stackSize.attr({
            "fill": "purple",
            "font-size": canvas.cfontSize * 1.2,
            "text-anchor": "middle",
            "alignment-baseline": "vertical"
        });

        const top = canvas.paper.text(textP, canvas.canvasHeight * 0.75 + canvas.rectHeight, "Top = -1 ");
        top.attr({
            "fill": "purple",
            "font-size": canvas.cfontSize * 1.2,
            "text-anchor": "middle",
            "alignment-baseline": "vertical"
        });

        console.log(fig);

        let Top = new Arrow(canvas, "top", "green", "left");
        const Ele = new Arrow(canvas, "Element", "red", "up");

        if (canvas.abort) {
            console.log("push end");
            return;
        }

        Top.drawArrow(fig[0][0]);

        Top.arrowFig.hide();
        Top.arrowContent.hide();

        if (canvas.abort) {
            console.log("push end");
            return;
        }

        const notice = canvas.paper.text(textP, canvas.canvasHeight * 0.6, " Push Operation Is starting ");
        notice.attr({
            "fill": "black",
            "font-size": canvas.cfontSize * 0.85,
            "text-anchor": "middle",
            "alignment-baseline": "middle"
        });

        if (canvas.abort) {
            console.log("push end");
            return;
        }

        await canvas.delay(1000);

        notice.attr({
            text: "Push Operation Is going on"
        });


        console.log("rect array ")
        console.log(Rect.boxes)
        for (let i = 0; i < array.length; i++) {

            if (canvas.abort) {
                console.log("push end");
                return;
            }

            Ele.drawArrow(Rect.boxes[i]);


            if (i == 0) {


                if (canvas.abort) {
                    console.log("push end");
                    return;
                }

                await canvas.delay(800);

                Top.arrowFig.show();
                Top.arrowContent.show();

                top.attr({
                    text: "Top = " + i
                });
                stackSize.attr({
                    text: "stack Size = " + (i + 1)
                });


                if (canvas.abort) {
                    console.log("push end");
                    return;
                }


            } else {

                if (canvas.abort) {
                    console.log("push end");
                    return;
                }

                Top = new Arrow(canvas, "top", "green", "left");

                Top.drawArrow(fig[i][0]);

                top.attr({
                    text: "Top = " + i
                });


                if (canvas.abort) {
                    console.log("push end");
                    return;
                }

            }


            if (canvas.abort) {
                console.log("push end");
                return;
            }

            await canvas.delay(800);
            const tempRect = new Rect(canvas, Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y"), Rect.boxes[i].content, Rect.boxes[i].index, "#3498db")
            tempRect.drawRect(true, true, false);

            console.log("bP = " + bP)
            await Rect.boxes[i].moveTo(Rect.boxes[i].rectElement.attr("x"), bP);


            if (canvas.abort) {
                console.log("push end");
                return;
            }
            await canvas.delay(800);
            await Rect.boxes[i].moveTo(fig[i][0].rectElement.attr("x"), bP);

            if (canvas.abort) {
                console.log("push end");
                return;
            }
            await canvas.delay(800);
            await Rect.boxes[i].moveTo(fig[i][0].rectElement.attr("x"), fig[i][0].rectElement.attr("y"));

            if (canvas.abort) {
                console.log("push end");
                return;
            }
            await canvas.delay(700);
            // fig[i][0].clearRect();
            fig[i][1].show();


            if (canvas.abort) {
                console.log("push end");
                return;
            }
            await canvas.delay(400);

            stackSize.attr({
                text: "stack Size = " + (i + 1)
            });



            if (i < array.length - 1) {

                if (canvas.abort) {
                    console.log("push end");
                    return;
                }

                await Ele.ShiftArrow(0.5, "up");
                await Ele.ShiftArrow(1, "right");
                await Top.ShiftArrow(1.3, "up");

                if (canvas.abort) {
                    console.log("push end");
                    return;
                }
                await Top.clearArrow();
                await Ele.clearArrow();
            }


        }

        if (canvas.abort) {

            console.log("push end");
            return;
        }
        await Ele.clearArrow();
        notice.attr({
            text: "Stack is Full \n Can not Push Element In Stack"
        });

    } catch (e) {
        console.log(e)
    }
}