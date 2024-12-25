import {
    Rect,
    Arrow
} from '../../../Source/Main.js' ;

import {
    stack
} from '../../../Source/stack_queue_main.js' ;



export async function StackPop(canvas) {

    try {

        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        const tempArray = [];
        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY, "Pop Operation In Stack").attr({
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

        const fig = await Stackfig.drawStack(array, false);

        const ff = Stackfig.stack.getBBox();
        const textP = (ff.x + ff.width) + (canvas.canvasWidth * 0.7 - ff.width) / 2;
        const bP = ff.y - canvas.rectHeight * 1.5;


        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        const cap = canvas.paper.text(textP, canvas.canvasHeight * 0.75, "Capacity =  " + array.length);
        cap.attr({
            "fill": "green",
            "font-size": canvas.cfontSize * 1.2,
            "text-anchor": "middle",
            "alignment-baseline": "middle"
        });


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
            console.log("pop end");
            return;
        }

        Top.drawArrow(fig[0][0]);

        Top.arrowFig.hide();
        Top.arrowContent.hide();


        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        const notice = canvas.paper.text(textP, canvas.canvasHeight * 0.55, " Push Operation Is starting... ");
        notice.attr({
            "fill": "black",
            "font-size": canvas.cfontSize * 0.9,
            "alignment-baseline": "middle"
        });

        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        await canvas.delay(1500);

        notice.attr({
            text: "Push Operation Is going on..."
        });




        for (let i = 0; i < array.length; i++) {

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            Ele.drawArrow(Rect.boxes[i]);

            if (i == 0) {

                // await canvas.delay(800);

                Top.arrowFig.show();
                Top.arrowContent.show();

                top.attr({
                    text: "Top = " + i
                });
                stackSize.attr({
                    text: "stack Size = " + (i + 1)
                });

                if (canvas.abort) {
                    console.log("pop end");
                    return;
                }

            } else {

                Top = new Arrow(canvas, "top", "green", "left");

                Top.drawArrow(fig[i][0]);

                // await canvas.delay(400);
                top.attr({
                    text: "Top = " + i
                });
                stackSize.attr({
                    text: "stack Size = " + (i + 1)
                });


                if (canvas.abort) {
                    console.log("pop end");
                    return;
                }

            }

            //  await canvas.delay(800);
            const tempRect = new Rect(canvas, Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y"), Rect.boxes[i].content, Rect.boxes[i].index, "#3498db")
            tempRect.drawRect(true, true, false);

            tempArray.push(tempRect);

            await Rect.boxes[i].moveTo(Rect.boxes[i].rectElement.attr("x"), bP);

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(500);
            await Rect.boxes[i].moveTo(fig[i][0].rectElement.attr("x"), bP);

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(600);
            await Rect.boxes[i].moveTo(fig[i][0].rectElement.attr("x"), fig[i][0].rectElement.attr("y"));

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(600);
            //   fig[i][0].clearRect();
            fig[i][1].show();

            if (i < array.length - 1) {

                await Ele.ShiftArrow(0.5, "up");
                await Ele.ShiftArrow(1, "right");

                if (canvas.abort) {
                    console.log("pop end");
                    return;
                }

                await Top.ShiftArrow(1.3, "up");
                await Top.clearArrow();
                await Ele.clearArrow();

                if (canvas.abort) {
                    console.log("pop end");
                    return;
                }

            }


        }


        fig[fig.length - 1][1].show();
        console.log("tempArray")

        console.log(tempArray)

        console.log("stackArray")

        console.log(fig)


        Top.color = "red";


        notice.attr({
            text: "Pop Operation Is Staring..."
        });

        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        await canvas.delay(1500);

        notice.attr({
            text: "Pop Operation Is going on..."
        });

        fig[fig.length - 1][1].hide();
        await Ele.clearArrow();
        for (let i = array.length - 1; i >= 0; i--) {


            Ele.drawArrow(tempArray[i]);

            fig[i][1].hide();

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(500);



            await Rect.boxes[i].moveTo(Rect.boxes[i].rectElement.attr("x"), bP);

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(800);

            await Rect.boxes[i].moveTo(tempArray[i].rectElement.attr("x"), bP);

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(600);

            await Rect.boxes[i].moveTo(tempArray[i].rectElement.attr("x"), tempArray[i].rectElement.attr("y"));

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(600);
            tempArray[i].clearRect();


            if (i > 0) {

                await Ele.ShiftArrow(0.5, "up");
                await Ele.ShiftArrow(1, "left");

                if (canvas.abort) {
                    console.log("pop end");
                    return;
                }

                await Top.ShiftArrow(1.3, "down");
                await Top.clearArrow();
                await Top.drawArrow(fig[i - 1][0]);
                await Ele.clearArrow();
            }

            if (canvas.abort) {
                console.log("pop end");
                return;
            }

            await canvas.delay(400);
            top.attr({
                text: "Top = " + (i - 1)
            });
            stackSize.attr({
                text: "stack Size = " + (i - 1)
            });

        }

        if (canvas.abort) {
            console.log("pop end");
            return;
        }

        await Top.clearArrow();

        notice.attr({
            text: "Stack is Empty \n Can not Pop Element from Stack "
        });



    } catch (e) {

        console.log(e);

    }



}