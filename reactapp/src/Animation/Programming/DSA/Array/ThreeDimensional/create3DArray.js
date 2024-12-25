let D3 = [
    [
        [1, 2 , 3 ],
        [4, 5 , 6 ],
        [7, 8 , 9 ]
    ],
    [
        [10, 11 , 12 ],
        [13, 14 , 15 ],
        [16, 17 , 18 ]
    ],
    [
        [19, 20 , 21 ],
        [22, 23 , 24 ],
        [25, 26 , 27 ]
    ]
];

//let D3 = [ [[2 , 3 ]] , [[5,6]] , [[7 ,8]]]

async function createArray3D(array3D) {


    try {
        let ABoxesArray = [],
            ABoxesTextArray = [],
            ABoxesIndTextArray = [],
            createdArrayAP = [],
            inputAP = [];


        const array1D = array3D.flat();


        let centerX = canvasWidth / 2;
        let centerY = yPos - yPos * 0.7;

        paper.text(centerX, centerY, "User Data").attr({
            "font-size": cfontSize * 2,
            fill: "#46099c"
        });

        yPos += rectHeight * 0.5;

        //ArrayC(paper, array1D, pass = -1, text = false, color = "#0fb1d1", sort = true);


        await delay((array1D.length + 1) * 200);


        yPos += rectHeight * 4;


        paper.text(centerX, yPos * 0.75, "Let's Create Two Dimensional Array ").attr({
            "font-size": cfontSize * 1.6,
            fill: "blue"
        });
        await delay(700);

        yPos += rectHeight * 1.5;

       // Array2D(paper, array2D, index = true, text = false, sort = true, color = "#0fb1d1",setPos = true ,  BA = ABoxesArray, BTA = ABoxesTextArray, BITA = ABoxesIndTextArray, arrayAP = inputAP);
       Array3D(paper, array3D, index = true, text = true, sort = true, color = "#0fb1d1", setPos = true );

        await delay((array3D.length + array3D[0].length) * 250);

/*

        const numRows = array2D.length;
        const numCols = array2D[0].length;



        yPos -= (rectHeight * 1.5) * numRows;


        for (let i = 0; i < numRows; i++) {


            Arrow2D(paper, i, 0, Atext = "i", color = "blue", array = inputAP, rotate = true, degree = 90, direction = "ACW");

            for (let j = 0; j < numCols; j++) {

                const index = i * numCols + j;



                Box(paper, index, empty = false, color = "#0fb1d1", array = array1D, arrayAP = AP, BA = BoxesArray, BTA = BoxesTextArray);

                Arrow(paper, index, Atext = "Element", color = "blue", array = AP);





                Arrow2D(paper, i, j, "j", "red", array = inputAP);

                await delay(500);

                console.log(" 2D arrow")
                console.log("AA")
                console.log(ArrowArray)
                console.log("ATA")
                console.log(ArrowTextArray)


                if (ABoxesArray[i][j]) {

                    ABoxesArray[i][j].remove();

                }
                moveBox(BoxesArray[index], BoxesTextArray[index], xPos + j * nextPos, yPos, rectWidth, rectHeight);


                BoxesTextArray[index].toFront();


                await delay(1000);


                if (abort) {
                    cleanup();
                    console.log("count sort end")
                    //abort = false;
                    return
                }


                await ShiftArrow(1, index, 0.5, "up", Atext = " ");
                await ShiftArrow(1, index, 1, "right", Atext = "Element");


                if (abort) {
                    cleanup();
                    console.log("count sort end")
                    //abort = false;
                    return
                }

                if (j < numCols - 1) {

                    await ShiftArrow(2, j, 0.5, "up", Atext = " ");
                    await ShiftArrow(2, j, 1, "right", Atext = "j");
                }

                if (abort) {
                    cleanup();
                    console.log("count sort end")
                    //abort = false;
                    return
                }


                await delay(500);
                clearArrow(1);
                clearArrow(1);
                clearArrow(1);


            }
            clearArrow(0);
            const rect = paper.rect(xPos - nextPos * 1.20, yPos, rectWidth, rectHeight, cornerRadius);
            rect.attr({
                fill: backgroundColor,
                stroke: 0
            });
            yPos += rectHeight * 1.5;

            ArrowTextArray = [];
            ArrowArray = [];

}
*/

        

    } catch (e) {
        console.log(e)
    }

}