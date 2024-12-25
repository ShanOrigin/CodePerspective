import {
    Rect,
    Arrow,
    Comparator
} from '../../../Source/Main.js'

// Function To Visualization Create Array Process

export async function creatArray(canvas) {


    let tempArray, tempArray1;

    try {


        /*      

        const rectDrawer = new Rect(
            canvas, centerX - canvas.rectWidth / 2, canvas.canvasHeight * 0.6,
            0,
            0,
            "#eb6f09"
        );

        const len = await rectDrawer.inputRect(true, true, false, "number", range);       

*/

        if (canvas.abort) {
            return;
        }

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos; //  - canvas.drawYPos* 0.7;


        canvas.paper.text(centerX, centerY / 2, " Create Array  ").attr({
            "font-size": canvas.cfontSize * 1.7,
            fill: "#46099c"
        });


        canvas.drawYPos += canvas.rectHeight * 2;


        let array;

        array = await Rect.drawArray(canvas, array, true, false, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 300);


        console.log(array)


        tempArray = Rect.boxes;


        canvas.drawYPos += canvas.rectHeight * 3.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.75, "Let's Create Array ").attr({
            "font-size": canvas.cfontSize * 1.6,
            fill: "blue"
        });

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        canvas.paper.text(centerX, canvas.drawYPos * 1, "We assign an index to each \n element for proper referencing").attr({
            "font-size": canvas.cfontSize,
            fill: "green"
        });
        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        canvas.paper.text(centerX, canvas.drawYPos * 1.2, "Generally, indexing starts from 0 and \n goes up to Total Elements - 1").attr({
            "font-size": canvas.cfontSize,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 3.5;

        Rect.boxes = [];

        Rect.drawArray(canvas, array, false, true, "array");
        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 200);

        tempArray1 = Rect.boxes;

        if (canvas.abort) {
            return;
        }
        const arrow1 = new Arrow(canvas, "Element", "red");
        const arrow2 = new Arrow(canvas, "Place", "green");


        // Drawing the array boxes through a loop

        for (let i = 0; i < array.length; i++) {

            if (canvas.abort) {
                return;
            }

            arrow2.Atext = "";
            arrow2.Atext = "Place(" + i + ")";

            await arrow1.drawArrow(tempArray[i]);
            await arrow2.drawArrow(tempArray1[i]);


            const tempRect = new Rect(canvas, tempArray[i].rectElement.attr("x"), tempArray[i].rectElement.attr("y"), tempArray[i].content, tempArray.index, "#3498db")
            tempRect.drawRect(true, true, false);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(700);

            tempArray[i].moveTo(tempArray1[i].rectElement.attr("x"), tempArray1[i].rectElement.attr("y"));

            tempArray1[i].clearRect(true, true, false);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(700);

            if (i < array.length - 1) {
                if (canvas.abort) {
                    return;
                }

                arrow1.ShiftArrow(0.5, "up")
                arrow2.ShiftArrow(0.5, "up")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);

                arrow1.ShiftArrow(1, "right")
                arrow2.ShiftArrow(1, "right")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(900);
            }

            arrow1.clearArrow(true, true)
            arrow2.clearArrow(true, true)
            if (canvas.abort) {
                return;
            }

        }




    } catch (error) {
        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")
        /*
                tempArray = [];
                tempArray1 = [];

            //Rect.cleanup();
                    //Arrow.cleanup();
        */
        //   //Comparator.cleanup();

    }
}







export async function linearSearch(canvas) {


    try {

        if (canvas.abort) {
            return;
        }


        let tempArray = [];

        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, "Linear Search ").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 1.5;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 300);



        console.log("array")
        console.log(array)
        canvas.drawYPos += canvas.rectHeight * 2;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(t1x, t1y, "Search Element -> ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });

        //   Rect(canvas.paper, centerX, canvas.drawYPos  * 0.875, searchElement, -1, color = "red", BA = SBoxesArray, BTA = SBoxesTextArray);

        const tempRect = new Rect(canvas, centerX + canvas.rectWidth, canvas.drawYPos * 0.875, "", -1, "#3498db")
        //tempRect.drawRect(true, true, false);

        const searchElement = await tempRect.inputRect(true, true, false);


        if (canvas.abort) {
            return;
        }

        await canvas.delay(700);

        canvas.paper.text(centerX, canvas.drawYPos * 1.3, "Let's Search " + searchElement + " In Array.").attr({
            "font-size": canvas.cfontSize * 1.25,
            fill: "red"
        });


        canvas.drawYPos += canvas.rectHeight * 4;

        Rect.boxes = [];
        Rect.drawArray(canvas, array, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 200);




        canvas.drawYPos += canvas.rectHeight * 1.5;

        // moveBox(SBoxesArray[0], SBoxesTextArray[0], xPos - nextPos, canvas.drawYPos, rectWidth, canvas.rectHeight);

        tempRect.moveTo(canvas.drawXPos - canvas.nextPos, canvas.drawYPos);

        const arrow1 = new Arrow(canvas, "Element", "red");

        for (let i = 0; i < array.length; i++) {

            if (canvas.abort) {
                return;
            }

            if (i < array.length) {

                console.log(array[i], searchElement)

                arrow1.Atext = "";
                arrow1.Atext = "Array[" + i + "] = " + array[i];


                await arrow1.drawArrow(Rect.boxes[i]);

                //  Arrow(canvas.paper, i, Atext = "Element", color = "blue", array = inputAP);

                if (canvas.abort) {
                    return;
                }

                await canvas.delay(700);

                //   moveBox(iBoxesArray[i], iBoxesTextArray[i], xPos + nextPos * i, canvas.drawYPos , rectWidth, canvas.rectHeight);
                tempRect.moveTo(canvas.drawXPos + canvas.nextPos * i, canvas.drawYPos);


                if (array[i] == searchElement) {



                    if (canvas.abort) {
                        return;
                    }

                    await canvas.delay(700);

                    tempRect.rectElement.attr({
                        fill: "green"
                    });

                    Rect.boxes[i].rectElement.attr({
                        fill: "green"
                    });

                    arrow1.clearArrow();
                    t1.remove();
                    t1 = canvas.paper.text(centerX, t1y, "Search Element Found At " + i + " Index").attr({
                        "font-size": canvas.cfontSize * 1.2,
                        fill: "blue"
                    });
                    return;

                }

                if (canvas.abort) {
                    return;
                }

                await canvas.delay(1000);
                //   moveBox(iBoxesArray[i], iBoxesTextArray[i], xPos + nextPos * i, canvas.drawYPos  - canvas.rectHeight * 1.5, rectWidth, canvas.rectHeight);
                Rect.boxes[i].moveTo(Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y") + canvas.rectHeight * 1.5);


                if (canvas.abort) {
                    return;
                }


                await canvas.delay(1000);

                //     moveBox(SBoxesArray[0], SBoxesTextArray[0], xPos + nextPos * i, canvas.drawYPos , rectWidth, canvas.rectHeight);
                Rect.boxes[i].moveTo(Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y") - canvas.rectHeight * 1.5);

                // await canvas.delay(1000);


                if (i < array.length - 1) {

                    await arrow1.ShiftArrow(0.5, "up")
                    await arrow1.ShiftArrow(1, "right")

                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(900);
                    arrow1.clearArrow();
                }


            }


        }


        t1.remove();
        t1 = canvas.paper.text(t1x + canvas.nextPos, t1y, "Search Element Is Not Present In Given Array I.e  " + searchElement).attr({
            "font-size": canvas.cfontSize * 1,
            fill: "blue"
        });
        return;


    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }


}






export async function binarySearch(canvas) {



    try {


        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, "Binary Search ").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 1.5;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 250);


        console.log("array")
        console.log(array)
        canvas.drawYPos += canvas.rectHeight * 2;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(t1x, t1y, "Search Element -> ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });

        //   Rect(canvas.paper, centerX, canvas.drawYPos  * 0.875, searchElement, -1, color = "red", BA = SBoxesArray, BTA = SBoxesTextArray);

        const tempRect = new Rect(canvas, centerX + canvas.rectWidth, canvas.drawYPos * 0.875, "", -1, "#3498db")
        //tempRect.drawRect(true, true, false);

        const searchElement = await tempRect.inputRect(true, true, false);







        let start = 0,
            end = array.length - 1,
            mid;


        let tempArray;

        const sorted = array.every((element, index) => {

            if (index === 0) {

                return true; // First element is always considered sorted
            } else {

                return element >= array[index - 1]; // Check if current element is greater than or equal to the previous element

            }
            if (canvas.abort) {
                return;
            }
        });

        if (!sorted) {

            const notice = " Your Given Array Is Not Sorted  \n Remember: In Binary Search Array Must be sorted \n Please Wait Sorting Going On.....";
            let t = canvas.paper.text(canvas.canvasWidth / 2, canvas.canvasHeight * 0.7, notice).attr({
                "font-size": canvas.cfontSize,
                fill: "#46099c"
            });


            array.sort((a, b) => a - b);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(4000);
            t.remove();

        }






        canvas.drawYPos += canvas.rectHeight;

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        canvas.paper.text(centerX, canvas.drawYPos * 1.25, "Let's Search " + searchElement + " In Array.").attr({
            "font-size": canvas.cfontSize * 1.25,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 3;


        Rect.boxes = [];
        Rect.drawArray(canvas, array, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 200);


        canvas.drawYPos += canvas.rectHeight * 1.5;

        tempRect.moveTo(canvas.drawXPos - canvas.nextPos, canvas.drawYPos);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(500);


        const low = new Arrow(canvas, "Low", "red");

        const high = new Arrow(canvas, "High", "blue");
        const Mid = new Arrow(canvas, "Mid", "green");

        // Iterate while start not meets end
        if (canvas.abort) {
            return;
        }
        while (start <= end) {


            // Find the mid index

            mid = Math.floor((start + end) / 2);


            //    Arrow(canvas.paper, start, Atext = "Low", color = "red", array = inputAP);
            await low.drawArrow(Rect.boxes[start]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(700);

            //Arrow(canvas.paper, end, Atext = "High", color = "blue", array = inputAP);
            await high.drawArrow(Rect.boxes[end]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(800);

            const compT = " mid = [start( " + start + ") + end( " + end + ")]/2 = " + (start + end) + " / 2  = " + mid;
            const CMP = new Comparator(Rect.boxes[start], Rect.boxes[end], "green", compT);

            CMP.drawComp(true, true);


            await canvas.delay(800);


            //    Arrow(canvas.paper, mid, Atext = "Mid", color = "green", array = inputAP);
            await Mid.drawArrow(Rect.boxes[mid]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(800);

            CMP.clearComp(true, true);
            tempRect.moveTo(canvas.drawXPos + canvas.nextPos * mid - 1, canvas.drawYPos);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(600);

            Rect.boxes[mid].moveTo(Rect.boxes[mid].rectElement.attr("x"), Rect.boxes[mid].rectElement.attr("y") + canvas.rectHeight * 1.5);


            if (canvas.abort) {
                return;
            }

            await canvas.delay(1500);

            // If element is present at 

            // mid, return True

            if (array[mid] === searchElement) {


                if (canvas.abort) {
                    return;
                }

                await canvas.delay(700);

                tempRect.rectElement.attr({
                    fill: "green"
                });

                Rect.boxes[mid].rectElement.attr({
                    fill: "green"
                });


                low.clearArrow();
                high.clearArrow();
                Mid.clearArrow();

                if (canvas.abort) {
                    return;
                }
                Rect.boxes[mid].moveTo(Rect.boxes[mid].rectElement.attr("x"), Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.5);


                t1.remove();
                t1 = canvas.paper.text(centerX, t1y, "Search Element Found At " + mid + " Index").attr({
                    "font-size": canvas.cfontSize * 1.2,
                    fill: "blue"
                });

                console.log("element found at = " + mid);

                return;

            }

            // Else look in left or 

            // right half accordingly
            else if (array[mid] < searchElement) {


                //       moveBox(iBoxesArray[mid], iBoxesTextArray[mid], canvas.drawXPos + canvas.nextPos * mid, canvas.drawYPos - canvas.rectHeight * 1.5, rectWidth, canvas.rectHeight);
                Rect.boxes[mid].moveTo(Rect.boxes[mid].rectElement.attr("x"), Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.5);

                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1000);

                console.log(mid)

                if (mid + 1 < array.length - 1) {

                    await low.ShiftArrow(0.5, "up")
                    await low.ShiftArrow(start + mid + 1, "right")

                }
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(2500);

                tempRect.moveTo(canvas.drawXPos - canvas.nextPos, canvas.drawYPos);

                //     moveBox(SBoxesArray[0], SBoxesTextArray[0], canvas.drawXPos - canvas.nextPos, canvas.drawYPos, rectWidth, canvas.rectHeight);


                low.clearArrow();

                Mid.clearArrow();
                high.clearArrow();

                start = mid + 1;


            } else {

                Rect.boxes[mid].moveTo(Rect.boxes[mid].rectElement.attr("x"), Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.5);


                //    moveBox(iBoxesArray[mid], iBoxesTextArray[mid], canvas.drawXPos + canvas.nextPos * mid, canvas.drawYPos - canvas.rectHeight * 1.5, rectWidth, canvas.rectHeight);

                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1000);

                if (mid - 1 >= 0) {

                    await high.ShiftArrow(0.5, "up")
                    await high.ShiftArrow(end - mid + 1, "left")

                }

                if (canvas.abort) {
                    return;
                }
                await canvas.delay(2500);

                tempRect.moveTo(canvas.drawXPos - canvas.nextPos, canvas.drawYPos);

                //   moveBox(SBoxesArray[0], SBoxesTextArray[0], canvas.drawXPos - canvas.nextPos, canvas.drawYPos, rectWidth, canvas.rectHeight);

                low.clearArrow();
                high.clearArrow();
                Mid.clearArrow();


                end = mid - 1;

            }

        }

        if (start > end) {
            //    moveBox(iBoxesArray[mid], iBoxesTextArray[mid], canvas.drawXPos + canvas.nextPos * mid, canvas.drawYPos - canvas.rectHeight * 1.5, rectWidth, canvas.rectHeight);
            Rect.boxes[mid].moveTo(Rect.boxes[mid].rectElement.attr("x"), Rect.boxes[mid].rectElement.attr("y") - canvas.rectHeight * 1.5);

            if (canvas.abort) {
                return;
            }

            t1.remove();
            t1 = canvas.paper.text(t1x + canvas.nextPos, t1y, "Search Element Is Not Present In Given Array I.e  " + searchElement).attr({
                "font-size": canvas.cfontSize * 1,
                fill: "blue"
            });

            low.clearArrow();
            high.clearArrow();
            Mid.clearArrow();

            return;
        }

        return;


    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //Comparator.cleanup();
    }

}






export async function insertionArray(canvas) {

    try {
        let tempArray = [];



        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, " Insertion In Array").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 1.5;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 250);

        tempArray = Rect.boxes;


        canvas.drawYPos += canvas.rectHeight * 3;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(t1x, t1y, "Index -> Element ").attr({
            "font-size": canvas.cfontSize * 1.2,
            fill: "blue"
        });


        let index;
        //   let element;
        let isIndexValid = false;

        while (!isIndexValid) {
            t1.attr({
                text: ""
            });
            t1.attr({
                text: "Index -> Element :  "
            });
            const Rectind = new Rect(canvas, centerX + canvas.nextPos * 0.3, canvas.drawYPos * 0.9, index, -1, "#3498db");
            index = await Rectind.inputRect(true, true, false);


            if (index >= 0 && index < array.length) {
                isIndexValid = true;
            } else {

                const t2 = canvas.paper.text(canvas.canvasWidth / 2, canvas.canvasHeight * 0.7, "Index is Out of Boundary of Array ie Index = " + index + "\n Please Enter Again ").attr({
                    "font-size": canvas.cfontSize * 0.95,
                    fill: "blue"
                });

                await canvas.delay(1000);

                t2.remove();
                // Wait for 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }


        const Rectcont = new Rect(canvas, centerX + canvas.nextPos * 1.5, canvas.drawYPos * 0.9, "", -1, "#3498db")
        const element = await Rectcont.inputRect(true, true, false);



        let arr = new Array(array.length + 1);

        arr = [...array, null];

        let range;

        for (let j = 0; j < arr.length; j++) {

            if (canvas.abort) {
                return;
            }

            if (arr[j] === null) {

                range = j;

                break; // Use break instead of return to continue the loop
            }

        }



        if (canvas.abort) {
            return;
        }

        await canvas.delay(700);



        canvas.paper.text(centerX, canvas.drawYPos * 1.3, "Let's Insertion In Array  " + element + " In Array.").attr({
            "font-size": canvas.cfontSize * 1.25,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 4;

        Rect.boxes = [];

        Rect.drawArray(canvas, arr, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr.length + 1) * 200);


        const insertIndex = new Arrow(canvas, "insert index", "red", "down");
        const currentIndex = new Arrow(canvas, "i", "green");
        const place = new Arrow(canvas, "place", "blue");

        await insertIndex.drawArrow(Rect.boxes[index]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(900);

        for (let i = range - 1; i >= index; i--) {

            if (canvas.abort) {
                return;
            }

            await currentIndex.drawArrow(Rect.boxes[i]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(500);


            place.Atext = "";
            place.Atext = "place " + arr[i] + " here";


            await place.drawArrow(Rect.boxes[i + 1]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);

            Rect.Shifter(Rect.boxes[i], Rect.boxes[i + 1], "right");

            if (canvas.abort) {
                return;
            }
            await canvas.delay(2500);

            arr[i + 1] = arr[i];

            if (i > index) {

                if (canvas.abort) {
                    return;
                }

                await currentIndex.ShiftArrow(0.5, "up")
                await currentIndex.ShiftArrow(1, "left")

                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1500);

                await place.ShiftArrow(0.5, "up")
                await place.ShiftArrow(1, "left")

                if (canvas.abort) {
                    return;
                }
            }

            await canvas.delay(500);

            currentIndex.clearArrow();
            place.clearArrow();

            if (canvas.abort) {
                return;
            }
        }
        if (canvas.abort) {
            return;
        }
        await canvas.delay(300);
        Rect.boxes[index].clearRect(true, true, true);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        Rectcont.moveTo(canvas.drawXPos + canvas.nextPos * index, canvas.drawYPos);

        arr[index] = element;

        if (canvas.abort) {
            return;
        }
    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }


}






export async function deletionArray(canvas) {

    try {
        let tempArray = [];



        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, " Insertion In Array").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 1.5;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 250);

        tempArray = Rect.boxes;


        canvas.drawYPos += canvas.rectHeight * 3;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(t1x, t1y, "Index -> Element ").attr({
            "font-size": canvas.cfontSize * 1.2,
            fill: "blue"
        });


        let index, Rectind = null;
        //   let element;
        let isIndexValid = false;

        while (!isIndexValid) {
            t1.attr({
                text: ""
            });
            t1.attr({
                text: "Index -> Element :  "
            });
            Rectind = new Rect(canvas, centerX + canvas.nextPos * 0.3, canvas.drawYPos * 0.9, index, -1, "#3498db");
            index = await Rectind.inputRect(true, true, false);


            if (index >= 0 && index < array.length) {
                isIndexValid = true;
            } else {

                const t2 = canvas.paper.text(canvas.canvasWidth / 2, canvas.canvasHeight * 0.7, "Index is Out of Boundary of Array ie Index = " + index + "\n Please Enter Again ").attr({
                    "font-size": canvas.cfontSize * 0.95,
                    fill: "blue"
                });

                await canvas.delay(1000);

                t2.remove();
                Rectind.clearRect();
                // Wait for 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }





        if (canvas.abort) {
            return;
        }

        await canvas.delay(700);

        canvas.paper.text(centerX, canvas.drawYPos * 1.3, "Let's Delete In Array At  " + index + " Element .").attr({
            "font-size": canvas.cfontSize * 1.25,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 4;

        Rect.boxes = [];

        Rect.drawArray(canvas, array, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 200);


        const deleteIndex = new Arrow(canvas, "delete index", "red", "down");
        const currentIndex = new Arrow(canvas, "i", "green");
        const place = new Arrow(canvas, "place", "blue");

        await deleteIndex.drawArrow(Rect.boxes[index]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(900);

        const Rectempty = new Rect(canvas, Rect.boxes[index].rectElement.attr("x"), Rect.boxes[index].rectElement.attr("y"), "", -1, canvas.backgroundColor)

        Rect.boxes[index].moveTo(Rectind.rectElement.attr("x") + canvas.nextPos, Rectind.rectElement.attr("y"));

        await canvas.delay(50);
        Rectempty.drawRect(true, true, false);
        Rect.boxes[index] = Rectempty;

        for (let i = index; i < array.length - 1; i++) {

            if (canvas.abort) {
                return;
            }

            await currentIndex.drawArrow(Rect.boxes[i]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(500);


            place.Atext = "";
            place.Atext = array[i + 1] + "shift left";


            await place.drawArrow(Rect.boxes[i + 1]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);

            Rect.Shifter(Rect.boxes[i], Rect.boxes[i + 1], "left");

            if (canvas.abort) {
                return;
            }
            await canvas.delay(2500);

            array[i] = array[i + 1];

            if (i < array.length - 2) {

                if (canvas.abort) {
                    return;
                }

                await currentIndex.ShiftArrow(0.5, "up")
                await currentIndex.ShiftArrow(1, "right")

                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1500);

                await place.ShiftArrow(0.5, "up")
                await place.ShiftArrow(1, "right")

                if (canvas.abort) {
                    return;
                }
            }

            await canvas.delay(500);

            currentIndex.clearArrow();
            place.clearArrow();

            if (canvas.abort) {
                return;
            }
        }
        const Rectnull = new Rect(canvas, Rect.boxes[Rect.boxes.length - 1].rectElement.attr("x"), Rect.boxes[Rect.boxes.length - 1].rectElement.attr("y"), "null", -1, "#3498db")

        Rectnull.drawRect(true, true, false);
        Rect.boxes[Rect.boxes.length - 1] = Rectnull;
        if (canvas.abort) {
            return;
        }
        await canvas.delay(300);

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        if (canvas.abort) {
            return;
        }
    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }


}






export async function mergeArrays(canvas) {

    try {
        let tempArray1 = [];
        let tempArray2 = [];

        let arr1, arr2;


        if (canvas.abort) {
            return;
        }

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos; //  - canvas.drawYPos* 0.7;


        canvas.paper.text(centerX, centerY / 2, " Merging Of An Arrays  ").attr({
            "font-size": canvas.cfontSize * 1.7,
            fill: "#46099c"
        });


        canvas.drawYPos += canvas.rectHeight * 2;




        arr1 = await Rect.drawArray(canvas, arr1, true, true, "array", "input", [-1000, 1000, 4]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr1.length + 1) * 300);


        console.log(arr1)


        tempArray1 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 2.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.8, " Array 1 ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        await canvas.delay(700);
        canvas.drawYPos -= canvas.rectHeight * 2.5;

        canvas.drawYPos += canvas.rectHeight * 4;


        arr2 = await Rect.drawArray(canvas, arr2, true, true, "array", "input", [-1000, 1000, 4]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr2.length + 1) * 300);




        tempArray2 = Rect.boxes;

        Rect.boxes = [];
        canvas.drawYPos += canvas.rectHeight * 3.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.8, " Array 2 ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        await canvas.delay(700);
        canvas.drawYPos -= canvas.rectHeight * 3.5;

        canvas.drawYPos += canvas.rectHeight * 2.3;




        const len = Array.from(new Set([...arr1, ...arr2])).length;

        const mergedArray = new Array(len).fill(0);

        let index = 0;







        let t1 = canvas.paper.text(centerX, canvas.drawYPos, "Let's Merge , Generally in Merging Duplicate Not Allowed .").attr({
            "font-size": canvas.cfontSize * 0.9,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        Rect.boxes = [];
        Rect.drawArray(canvas, mergedArray, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((mergedArray.length + 1) * 200);

        //canvas.drawYPos += canvas.rectHeight * 2.5;

        canvas.paper.text(centerX, canvas.drawYPos + canvas.rectHeight * 1.5, " Merged Array  ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        // canvas.drawYPos -= canvas.rectHeight * 2.5;

        // Copy elements from the first array

        const arrow1 = new Arrow(canvas, "Element Place in MA", "red");
        const arrow2 = new Arrow(canvas, "Place", "green");


        for (let i = 0; i < arr1.length; i++) {

            arrow2.Atext = "";
            arrow2.Atext = "Element At(" + i + ")Place ";

            await arrow1.drawArrow(Rect.boxes[index]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);
            await arrow2.drawArrow(tempArray1[i]);

            if (canvas.abort) {
                return;
            }
            await canvas.delay(1000);

            if (!mergedArray.includes(arr1[i])) {

                const tempRect = new Rect(canvas, tempArray1[i].rectElement.attr("x"), tempArray1[i].rectElement.attr("y"), tempArray1[i].content, -1, "#3498db")
                tempRect.drawRect(true, true, false);

                tempArray1[i].moveTo(Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y"));
                Rect.boxes[i].clearRect(true, true);
                mergedArray[index] = arr1[i];
                index++;


                if (canvas.abort) {
                    return
                }

                if (i < arr1.length - 1) {

                    await arrow2.ShiftArrow(0.5, "up")
                    await arrow1.ShiftArrow(0.5, "up")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(700);

                    await arrow2.ShiftArrow(1, "right")
                    await arrow1.ShiftArrow(1, "right")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(900);
                }
                if (canvas.abort) {
                    return
                }

                await arrow1.clearArrow();
                await arrow2.clearArrow();

            } else {

                if (canvas.abort) {
                    return
                }
                t1.remove();
                t1 = canvas.paper.text(centerX, canvas.drawYPos - canvas.rectHeight * 2.6, arr1[i] + " Is Already Present In merged Array , go for Next").attr({
                    "font-size": canvas.cfontSize,
                    fill: "blue"
                });
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);
                console.log("already exists")
                if (i < arr1.length - 1) {
                    await arrow2.ShiftArrow(0.5, "up")
                    await arrow2.ShiftArrow(1, "right")
                }
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1000);
                t1.remove();

                await arrow1.clearArrow();
                await arrow2.clearArrow();

            }
        }

        // Copy elements from the second array
        for (let j = 0; j < arr2.length; j++) {

            arrow2.Atext = "";
            arrow2.Atext = "Element At(" + j + ")Place ";

            if (j < arr2.length - 1) {

                await arrow1.drawArrow(Rect.boxes[index]);
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(100);
                await arrow2.drawArrow(tempArray2[j]);
                if (canvas.abort) {
                    return;
                }
            }
            await canvas.delay(1000);

            if (!mergedArray.includes(arr2[j])) {

                const tempRect = new Rect(canvas, tempArray2[j].rectElement.attr("x"), tempArray2[j].rectElement.attr("y"), tempArray2[j].content, -1, "#3498db")
                tempRect.drawRect(true, true, false);


                tempArray2[j].moveTo(Rect.boxes[index].rectElement.attr("x"), Rect.boxes[index].rectElement.attr("y"));
                Rect.boxes[index].clearRect(true, true);

                mergedArray[index] = arr2[j];
                index++;

                if (canvas.abort) {
                    return
                }

                if (j < arr2.length - 1) {

                    await arrow2.ShiftArrow(0.5, "up")
                    await arrow1.ShiftArrow(0.5, "up")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(700);

                    await arrow2.ShiftArrow(1, "right")
                    await arrow1.ShiftArrow(1, "right")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(900);
                }
                if (canvas.abort) {
                    return
                }

                await arrow2.clearArrow();
                await arrow1.clearArrow();

            } else {

                if (canvas.abort) {
                    return
                }
                t1.remove();
                t1 = canvas.paper.text(centerX, canvas.drawYPos - canvas.rectHeight * 2.6, arr2[j] + " Is Already Present In merged Array , go for Next").attr({
                    "font-size": canvas.cfontSize,
                    fill: "blue"
                });
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);
                console.log("already exists")
                if (j < arr2.length - 1) {
                    await arrow2.ShiftArrow(0.5, "up")
                    await arrow2.ShiftArrow(1, "right")
                }
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(1000);
                t1.remove();

                await arrow2.clearArrow();
                await arrow1.clearArrow();

            }
        }
        if (canvas.abort) {
            return;
        }

    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }



}






export async function concatenateArrays(canvas) {

    try {
        let tempArray1 = [];
        let tempArray2 = [];


        let arr1, arr2;


        if (canvas.abort) {
            return;
        }

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos; //  - canvas.drawYPos* 0.7;


        canvas.paper.text(centerX, centerY / 2, " Concatination Of An Arrays ").attr({
            "font-size": canvas.cfontSize * 1.7,
            fill: "#46099c"
        });


        canvas.drawYPos += canvas.rectHeight * 2;




        arr1 = await Rect.drawArray(canvas, arr1, true, true, "array", "input", [-1000, 1000, 4]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr1.length + 1) * 300);


        console.log(arr1)


        tempArray1 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 2.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.8, " Array 1 ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        await canvas.delay(700);
        canvas.drawYPos -= canvas.rectHeight * 2.5;

        canvas.drawYPos += canvas.rectHeight * 4;


        arr2 = await Rect.drawArray(canvas, arr2, true, true, "array", "input", [-1000, 1000, 4]);

        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr2.length + 1) * 300);




        tempArray2 = Rect.boxes;

        Rect.boxes = [];
        canvas.drawYPos += canvas.rectHeight * 3.5;

        canvas.paper.text(centerX, canvas.drawYPos * 0.8, " Array 2 ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });
        await canvas.delay(700);
        canvas.drawYPos -= canvas.rectHeight * 3.5;



        const mergedArray = new Array(arr1.length + arr2.length).fill(0)


        let index = 0;





        canvas.drawYPos += canvas.rectHeight * 2.3;

        let t1 = canvas.paper.text(centerX, canvas.drawYPos, "Let's Concatenate Arrays \n Generally in Concatination Duplicate Are Allowed .").attr({
            "font-size": canvas.cfontSize * 0.9,
            fill: "red"
        });

        canvas.drawYPos += canvas.rectHeight * 2.5;

        Rect.boxes = [];
        Rect.drawArray(canvas, mergedArray, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((mergedArray.length + 1) * 200);

        //canvas.drawYPos += canvas.rectHeight * 2.5;

        canvas.paper.text(centerX, canvas.drawYPos + canvas.rectHeight * 1.5, " Merged Array  ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });

        if (canvas.abort) {
            return;
        }
        await canvas.delay(700);

        // canvas.drawYPos -= canvas.rectHeight * 2.5;

        // Copy elements from the first array

        const arrow1 = new Arrow(canvas, "Element Place in MA", "red");
        const arrow2 = new Arrow(canvas, "Place", "green");


        for (let i = 0; i < arr1.length; i++) {

            arrow2.Atext = "";
            arrow2.Atext = "Element At(" + i + ")Place ";

            await arrow1.drawArrow(Rect.boxes[i]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);
            await arrow2.drawArrow(tempArray1[i]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(1000);



            const tempRect = new Rect(canvas, tempArray1[i].rectElement.attr("x"), tempArray1[i].rectElement.attr("y"), tempArray1[i].content, -1, "#3498db")
            tempRect.drawRect(true, true, false);

            tempArray1[i].moveTo(Rect.boxes[i].rectElement.attr("x"), Rect.boxes[i].rectElement.attr("y"));
            Rect.boxes[i].clearRect(true, true);
            mergedArray[index] = arr1[i];
            index++;


            if (canvas.abort) {
                return
            }

            if (i < arr1.length - 1) {

                await arrow2.ShiftArrow(0.5, "up")
                await arrow1.ShiftArrow(0.5, "up")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);

                await arrow2.ShiftArrow(1, "right")
                await arrow1.ShiftArrow(1, "right")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(900);
            }
            if (canvas.abort) {
                return
            }

            await arrow1.clearArrow();
            await arrow2.clearArrow();


        }

        // Copy elements from the second array
        for (let j = 0; j < arr2.length; j++) {

            arrow2.Atext = "";
            arrow2.Atext = "Element At(" + j + ")Place ";

            await arrow1.drawArrow(Rect.boxes[index]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);
            await arrow2.drawArrow(tempArray2[j]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(1000);


            const tempRect = new Rect(canvas, tempArray2[j].rectElement.attr("x"), tempArray2[j].rectElement.attr("y"), tempArray2[j].content, -1, "#3498db")
            tempRect.drawRect(true, true, false);


            tempArray2[j].moveTo(Rect.boxes[index].rectElement.attr("x"), Rect.boxes[index].rectElement.attr("y"));
            Rect.boxes[index].clearRect(true, true);

            mergedArray[index] = arr2[j];
            index++;

            if (canvas.abort) {
                return
            }

            if (j < arr1.length - 1) {

                await arrow2.ShiftArrow(0.5, "up")
                await arrow1.ShiftArrow(0.5, "up")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);

                await arrow2.ShiftArrow(1, "right")
                await arrow1.ShiftArrow(1, "right")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(900);
            }
            if (canvas.abort) {
                return
            }

            await arrow2.clearArrow();
            await arrow1.clearArrow();


        }
        if (canvas.abort) {
            return;
        }
    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }



}






export async function splitArray(canvas) {


    try {
        let tempArray1 = [],
            tempArray2 = [];


        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, " Split Of An Array").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 1.5;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 250);

        tempArray1 = Rect.boxes;
        Rect.boxes = [];

        canvas.drawYPos += canvas.rectHeight * 3;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(t1x, t1y, "Index : ").attr({
            "font-size": canvas.cfontSize * 1.2,
            fill: "blue"
        });


        let index;
        //   let element;
        let isIndexValid = false;

        while (!isIndexValid) {
            t1.attr({
                text: ""
            });
            t1.attr({
                text: "Splite Index :  "
            });
            const Rectind = new Rect(canvas, centerX, canvas.drawYPos * 0.9, index, -1, "#3498db");
            index = await Rectind.inputRect(true, true, false);


            if (index >= 0 && index < array.length) {
                isIndexValid = true;
            } else {

                const t2 = canvas.paper.text(canvas.canvasWidth / 2, canvas.canvasHeight * 0.7, "Index is Out of Boundary of Array ie Index = " + index + "\n Please Enter Again ").attr({
                    "font-size": canvas.cfontSize * 0.95,
                    fill: "blue"
                });

                await canvas.delay(1000);

                t2.remove();
                Rectind.clearRect();
                // Wait for 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }


        const len = array.length;
        let arr1 = new Array(index).fill(0);

        let arr2 = new Array(len - index).fill(0);


        canvas.drawYPos += canvas.rectHeight * 2;

        //  Rect.boxes = [];
        Rect.drawArray(canvas, arr1, true, true, "array");
        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr1.length + 1) * 200);

        tempArray2 = Rect.boxes;

        canvas.paper.text(centerX, canvas.drawYPos + canvas.rectHeight * 1.5, " Array 1").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });



        canvas.drawYPos += canvas.rectHeight * 3;

        Rect.boxes = [];

        Rect.drawArray(canvas, arr2, true, true, "array");
        if (canvas.abort) {
            return;
        }
        await canvas.delay((arr2.length + 1) * 200);

        canvas.paper.text(centerX, canvas.drawYPos + canvas.rectHeight * 1.5, " Array 2 ").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });


        arr1 = [];
        arr2 = [];

        const arrow1 = new Arrow(canvas, "place", "red");
        const arrow2 = new Arrow(canvas, "", "green");



        for (let i = 0; i < array.length; i++) {



            arrow1.Atext = "";
            arrow1.Atext = "Element At(" + i + ")Place ";

            arrow1.drawArrow(tempArray1[i]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(100);



            if (i < index) {

                arrow2.Atext = "";
                arrow2.Atext = "Element Place ";

                arrow2.drawArrow(tempArray2[i]);
                if (canvas.abort) {
                    return;
                }




                const tempRect = new Rect(canvas, tempArray1[i].rectElement.attr("x"), tempArray1[i].rectElement.attr("y"), tempArray1[i].content, -1, "#3498db")
                tempRect.drawRect(true, true, false);

                tempArray1[i].moveTo(tempArray2[arr1.length].rectElement.attr("x"), tempArray2[arr1.length].rectElement.attr("y"));
                tempArray2[arr1.length].clearRect(true, true);
                await canvas.delay(1000);

                arr1[arr1.length] = array[i];

                if (canvas.abort) {
                    return
                }

                if (i < arr1.length - 1) {


                    arrow2.ShiftArrow(0.5, "up")

                    arrow1.ShiftArrow(0.5, "up")


                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(800);
                    arrow2.ShiftArrow(1, "right")
                    arrow1.ShiftArrow(1, "right")



                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(1000);
                }
                if (canvas.abort) {
                    return
                }

                await canvas.delay(500);

                arrow1.clearArrow();
                arrow2.clearArrow();





            } else {


                arrow2.Atext = "";
                arrow2.Atext = "Element Place ";

                arrow2.drawArrow(Rect.boxes[arr2.length]);
                if (canvas.abort) {
                    return;
                }




                const tempRect = new Rect(canvas, tempArray1[i].rectElement.attr("x"), tempArray1[i].rectElement.attr("y"), tempArray1[i].content, -1, "#3498db")
                tempRect.drawRect(true, true, false);

                tempArray1[i].moveTo(Rect.boxes[arr2.length].rectElement.attr("x"), Rect.boxes[arr2.length].rectElement.attr("y"));
                Rect.boxes[arr2.length].clearRect(true, true);

                await canvas.delay(1000);
                arr2[arr2.length] = array[i];


                if (canvas.abort) {
                    return
                }

                if (i < arr1.length - 1) {


                    arrow2.ShiftArrow(0.5, "up")
                    arrow1.ShiftArrow(0.5, "up")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(800);

                    arrow2.ShiftArrow(1, "right")
                    arrow1.ShiftArrow(1, "right")
                    if (canvas.abort) {
                        return;
                    }
                    await canvas.delay(1000);

                }
                if (canvas.abort) {
                    return
                }

                await canvas.delay(1500);

                arrow1.clearArrow();
                arrow2.clearArrow();







            }

        }
    } catch (e) {
        console.log(e)
    } finally {

        console.log("hi am I finally")

        //Rect.cleanup();
        //Arrow.cleanup();
        //   //Comparator.cleanup();

    }
}






export async function reverseArray(canvas) {

    try {
        let tempArray1 = [];


        let array;

        let centerX = canvas.canvasWidth / 2;
        let centerY = canvas.drawYPos;

        canvas.paper.text(centerX, centerY / 2, " Split Of An Array").attr({
            "font-size": canvas.cfontSize * 2,
            fill: "#46099c"
        });

        canvas.drawYPos += canvas.rectHeight * 2;



        array = await Rect.drawArray(canvas, array, true, true, "array", "input");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 250);

        tempArray1 = Rect.boxes;

        let start = 0,
            end = array.length - 1;


        canvas.drawYPos += canvas.rectHeight * 3;

        const t1x = centerX * 0.70;
        const t1y = canvas.drawYPos;

        let t1 = canvas.paper.text(centerX, t1y, "Reversing Array...").attr({
            "font-size": canvas.cfontSize * 1.4,
            fill: "blue"
        });


        canvas.drawYPos += canvas.rectHeight * 3;

        Rect.boxes = [];
        Rect.drawArray(canvas, array, true, true, "array");

        if (canvas.abort) {
            return;
        }
        await canvas.delay((array.length + 1) * 200);

        const arrow1 = new Arrow(canvas, "start", "red");
        const arrow2 = new Arrow(canvas, "end", "green");



        while (start < end) {

            await arrow1.drawArrow(Rect.boxes[start]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(200);
            await arrow2.drawArrow(Rect.boxes[end]);
            if (canvas.abort) {
                return;
            }
            await canvas.delay(1000);

            //    Comparator(canvas.paper, start, end);

            const compT = "Swap star = " + array[start] + " With end = " + array[end] + "\n while start < end ; ";

            const CMP = new Comparator(Rect.boxes[start], Rect.boxes[end], "green", compT);

            CMP.drawComp();



            if (start < end) {


                arrow1.ShiftArrow(0.5, "up")
                arrow2.ShiftArrow(0.5, "up")
                if (canvas.abort) {
                    return;
                }
                await canvas.delay(700);

                Rect.swapping(Rect.boxes[start], Rect.boxes[end]);


                let temp = array[start];
                array[start] = array[end];
                array[end] = temp;


                if (canvas.abort) {
                    return;
                }
                await canvas.delay((end - start + 1) * 450);


                arrow1.ShiftArrow(1, "right")
                arrow2.ShiftArrow(1, "left")
                if (canvas.abort) {
                    return;
                }



                await canvas.delay(1000);

                arrow1.clearArrow();
                arrow2.clearArrow();
                CMP.clearComp(true, true);

                start++;
                end--;

            }

        }


    } catch (error) {

        console.log(error);
        return;
    } finally {

        console.log("hi am I finally")
    }


}