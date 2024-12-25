import {
    Rect,
    Arrow
} from '../../../Source/Main.js'


import {
    Node,
    Link
} from '../../../Source/LL_main.js'


export async function reverseSLL(canvas, ll) {



    try {
        let spl = 900;


        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY, "Linked List Data").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        const L1 = await Node.Linked_List(canvas, ll);

        canvas.drawYPos += canvas.rectHeight * 3.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.75, "Let's Reverse  Single linked List ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        canvas.drawYPos += canvas.rectHeight * 1;

        centerX = canvas.canvasWidth / 2;
        centerY = canvas.drawYPos + canvas.rectHeight * 2.5;

        let t = canvas.paper.text(centerX, centerY, "Starting....").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });

        Node.NodeArray = [];

        const L2 = await Node.Linked_List(canvas, ll);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);
        t.remove();
        t = canvas.paper.text(centerX, centerY, "let's Go....").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });

        const TempArray = Node.NodeArray;
        Node.NodeArray = [];

        const nextP = canvas.rectWidth + canvas.rectWidth * 0.87;

        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl / 2);

        const Null = new Node(canvas, TempArray[0][0].rectElement.attr("x") - nextP, TempArray[0][0].rectElement.attr("y"), "null", -1, "purple");
        Null.drawNode(true, true);


        t.remove();
        t = canvas.paper.text(centerX, centerY, "Create three pointer prev , current , next \n Assign prev = null & current = next = head  ").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });


        const current = new Arrow(canvas, "Current", "black");
        const prev = new Arrow(canvas, "Prev", "green");
        const Next = new Arrow(canvas, "Next", "blue", "down");


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl / 2);

        prev.drawArrow(Node.NodeArray[0][0]);
        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl / 10);

        current.drawArrow(TempArray[0][0]);
        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl / 10);

        Next.drawArrow(TempArray[0][0]);



        for (let i = 0; i < ll.length; i++) {

            if (i > 0) {


                prev.drawArrow(TempArray[i - 1][0]);
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(50);

                current.drawArrow(TempArray[i][0]);
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(50);

                Next.drawArrow(TempArray[i][0]);


            }

            t.remove();
            t = canvas.paper.text(centerX, centerY, "Assign next pointer to current next  \n next = current -> next ").attr({
                "font-size": canvas.cfontSize,
                fill: "#46099c"
            });

            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);


            await Next.ShiftArrow(0.5, "down");

            await Next.ShiftArrow(1.79, "right")


            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);

            t.remove();
            t = canvas.paper.text(centerX, centerY, "Assign current next to  prev  \n current -> next = prev").attr({
                "font-size": canvas.cfontSize,
                fill: "#46099c"
            });



            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);
            TempArray[i][1].moveTo(TempArray[i][0].rectElement.attr("x") - canvas.rectWidth * 0.4, TempArray[i][0].rectElement.attr("y"));


            const fig = Link.LinkArray[i].arrowFig.getBBox();

            // Link.LinkArray[i].arrowFig.animate({
            Link.LinkArray[(ll.length) + i].arrowFig.animate({

                transform: `...t-${canvas.rectWidth*1.4 +fig.width}, 0`,

            }, 500, function() {

                // Link.LinkArray[i].arrowFig.animate({
                Link.LinkArray[(ll.length) + i].arrowFig.animate({
                    transform: '...r-180'

                }, 500);
            });

            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);


            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);

            t.remove();
            t = canvas.paper.text(centerX, centerY, "Assign prev to current \n prev = current ").attr({
                "font-size": canvas.cfontSize,
                fill: "#46099c"
            });

            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);


            await prev.ShiftArrow(0.5, "up");

            await prev.ShiftArrow(1.79, "right")


            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);

            t.remove();
            t = canvas.paper.text(centerX, centerY, "Assign current to  next \n current = next ").attr({
                "font-size": canvas.cfontSize,
                fill: "#46099c"
            });

            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);


            await current.ShiftArrow(0.5, "up");

            await current.ShiftArrow(1.79, "right")


            if (canvas.abort) {
                return;
            }
            await canvas.delay(spl);

            prev.clearArrow();
            current.clearArrow();
            Next.clearArrow();

        }



        prev.drawArrow(TempArray[ll.length - 1][0]);



        t.remove();
        t = canvas.paper.text(centerX, centerY, "Assign tail to head \n tail = head ").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);


        await L2[1].ShiftArrow(0.5, "up");

        await L2[1].ShiftArrow(1.79 * (ll.length - 1), "left")

        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        t.remove();
        t = canvas.paper.text(centerX, centerY, "Assign  head to prev \n head = prev  ").attr({
            "font-size": canvas.cfontSize,
            fill: "#46099c"
        });


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl);

        t.remove();


        await L2[0].ShiftArrow(0.5, "up");

        await L2[0].ShiftArrow(1.79 * (ll.length - 1), "right")


        if (canvas.abort) {
            return;
        }
        await canvas.delay(spl / 10);

        prev.clearArrow();


        ll.reverse();
        canvas.drawYPos += canvas.rectHeight * 6.5;

        t = canvas.paper.text(canvas.canvasWidth / 2, canvas.drawYPos - canvas.rectHeight * 2, "Liked List After Reverse Take Place .").attr({
            "font-size": canvas.cfontSize * 1.5,
            fill: "#46099c"
        });

        Node.NodeArray = [];
        await Node.Linked_List(canvas, ll);

    } catch (e) {

        console.log(e);
    }


}