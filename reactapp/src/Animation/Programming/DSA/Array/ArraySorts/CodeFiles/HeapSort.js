// heapSort working on heap sort 
/*
import {
    Rect,
    Arrow,
    Comparator
} from '../../../Source/Main.js'


export async function heapSort(canvas, arr) {

    try {
        const n = arr.length;
canvas.drawYPos += canvas.rectHeight;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            try {
                await heapify(canvas, arr, n, i);
            } catch (error) {
                console.log(error)
                return
            }


        }

        // Extract elements one by one from heap
        for (let i = n - 1; i > 0; i--) {



            canvas.drawYPos += canvas.rectHeight*3;

            Rect.drawArray(canvas, arr, true, true, "array");

            if (canvas.abort) {
                console.log("heap sort end")
                return;
            }
            await canvas.delay((arr.length + 1) * 200);

            const arrow1 = new Arrow(canvas, "LeftChild", "red");
            const arrow2 = new Arrow(canvas, "RightChild", "green");

            const compT = `Shift Largest Element to Last place\nSwap (${arr[0]}) With (${arr[i]})`;


            const CMP = new Comparator(Rect.boxes[0], Rect.boxes[i], "green", compT);


            // Arrow(paper, 0, "LC");
            // Arrow(paper, i, "RC");

            await arrow1.drawArrow(Rect.boxes[0]);
            await arrow2.drawArrow(Rect.boxes[i]);
            await canvas.delay(100);
            CMP.drawComp(true, true);



            //   Comparator(paper, 0, i, color = "red", sort = "heap4", array = AP);


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(1000);



            // Swap the root (maximum element) with the last element
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;


            Rect.swapping(Rect.boxes[0], Rect.boxes[i]);



            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay((i) * 850);


            arrow1.clearArrow();
            arrow2.clearArrow();
            CMP.clearComp();

            // Call max heapify on the reduced heap


            canvas.drawYPos += canvas.rectHeight * 3;


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }
            try {
                await heapify(canvas, arr, i, 0);
            } catch (error) {
                console.log(error)
            }

            if (canvas.abort) {

                console.log("heap sort end")

                return
            }

        }




        console.log("heap sort end successfully ")
    } catch (error) {
        console.log(error);

        console.log("heap sort end");

        return;
    }


    return arr;
}


// Helping  Function for Heap Sort 

async function heapify(canvas, arr, n, i) {


    try {

 // canvas.drawYPos += canvas.rectHeight;
        let leftC = null,
            rightC = null,
            lrg = null;
        Rect.drawArray(canvas, arr, true, true, "array");

        if (canvas.abort) {
            console.log("heap sort end")
            return;
        }
        await canvas.delay((arr.length + 1) * 200);


        let largest = i;
        let Left = 2 * i + 1;
        let Right = 2 * i + 2;

   //     Arrow(paper, largest, "lrg", "green");
        lrg = new Arrow(canvas, "largest", "red");
        await canvas.delay(100);
        await lrg.drawArrow(Rect.boxes[largest]);


       if (Left < n) {
            leftC = new Arrow(canvas, "LeftC", "red");
            await canvas.delay(100);
            await leftC.drawArrow(Rect.boxes[Left]);


        }

     if (Right < n) {

            rightC = new Arrow(canvas, "RightC", "green");
            await canvas.delay(100);
            await rightC.drawArrow(Rect.boxes[Right]);
       }


        await canvas.delay(1000);


        // If left child is larger than root
        if (Left < n && arr[Left] > arr[largest]) {

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            const compT = `${arr[Left]} > ${ arr[largest]}\nShift largest (${largest}) to left (${Left}) place`;

            const CMP = new Comparator(Rect.boxes[largest], Rect.boxes[Left], "green", compT);

            CMP.drawComp(true, true);

            //      Comparator(paper, largest, Left, color = "red", sort = "heap1", array = AP);



            await canvas.delay(500);
            lrg.ShiftArrow(0.5, "up")
            lrg.ShiftArrow(Left - largest, "right")

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(1000);
            leftC.clearArrow();
            rightC.clearArrow();

            CMP.clearComp();




            largest = Left;


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(500);
            lrg.clearArrow();

            await lrg.drawArrow(Rect.boxes[largest]);

        } else {

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(500);
            lrg.clearArrow();

        }





        // If right child is larger than the largest so far
        if (Right < n && arr[Right] > arr[largest]) {

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            const compT = `${arr[Right]} < ${arr[largest]}\nShift largest (${largest}) to right (${Right }) place`;


            const CMP = new Comparator(Rect.boxes[largest], Rect.boxes[Left], "green", compT);

            CMP.drawComp(true, true);


            //   Comparator(paper, largest, Right, color = "red", sort = "heap2", array = AP);

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }


            await canvas.delay(500);


            lrg.ShiftArrow(0.5, "up")
            lrg.ShiftArrow(Right - largest, "right")

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(1000);
            leftC.clearArrow();
            rightC.clearArrow();

            CMP.clearComp();



            largest = Right;


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }



            await canvas.delay(500);
            lrg.clearArrow();

            await lrg.drawArrow(Rect.boxes[largest]);

        } else {

            if (canvas.abort) {
                console.log("heap sort end")
                return
            }


            await canvas.delay(500);
            lrg.clearArrow();

        }



        //lrg.clearArrow();


        // If largest is not the root
        if (largest != i) {

            //   Arrow(paper, i, "prevLrg");
            arrow1.Atext = "";
            arrow1.Atext = "prevLrg";

            await arrow1.drawArrow(Rect.boxes[i]);


            const compT = `(i)=${i} != (largest)=${largest}\nSwap ${arr[i]} With ${arr[largest]}`;



            const CMP = new Comparator(Rect.boxes[i], Rect.boxes[largest], "green", compT);

            CMP.drawComp(true, true);


            //   Comparator(paper, i, largest, color = "red", sort = "heap3", array = AP);


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay(1000);
            CMP.clearComp();


            // Swap the root with the largest element



            let temp = arr[i];

            arr[i] = arr[largest];

            arr[largest] = temp;

            Rect.swapping(Rect.boxes[i], Rect.boxes[largest]);


            if (canvas.abort) {
                console.log("heap sort end")
                return
            }

            await canvas.delay((i + largest) * 500);


            arrow1.clearArrow();
            lrg.clearArrow();



            if (canvas.abort) {
                console.log("heap sort end")
                return
            }


            await canvas.delay(1000);
         Rect.cRect.cleanup();
     //       Rect.boxes = [];
      //      Rect.AllBox = [];

//canvas.drawYPos += canvas.rectHeight*3;
            if (canvas.abort) {

                console.log("heap sort end")

                return
            }

            // Recursively heapify the affected sub-tree
            try {
                await heapify(canvas, arr, n, largest);
            } catch (error) {
                console.log(error)
            }

            if (canvas.abort) {

                console.log("heap sort end")

                return
            }

        } else {

            if (canvas.abort) {

                console.log("heap sort end")

                return
            }

            await canvas.delay(500);
            arrow1.clearArrow();
            leftC.clearArrow();
            rightC.clearArrow();
            lrg.clearArrow();

        }
    } catch (error) {
        console.log(error);

        console.log("heap sort end");

        return;
    }

}

*/


import {
    Rect,
    Arrow,
    Comparator
} from '../../../Source/Main.js';

export async function heapSort(canvas, arr) {
    try {

    let arr = [ 7 ,6 ,8 ,3 , 1 ]
        canvas.drawYPos += canvas.rectHeight;

        const n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (canvas.abort) {
                console.log("heap sort end");
                return;
            }
       Rect.cleanup();
            Rect.boxes = [];
            Rect.AllBox = [];
            await heapify(canvas, arr, n, i);
        }

        // Extract elements one by one from heap
        for (let i = n - 1; i > 0; i--) {
            canvas.drawYPos += canvas.rectHeight * 3;
            await Rect.drawArray(canvas, arr, true, true, "array");
            if (canvas.abort) {
                console.log("heap sort end");
                return;
            }
            await canvas.delay((arr.length + 1) * 200);

            const arrow1 = new Arrow(canvas, "LeftChild", "red");
            const arrow2 = new Arrow(canvas, "RightChild", "green");

            const compT = `Shift Largest Element to Last place\nSwap (${arr[0]}) With (${arr[i]})`;
            const CMP = new Comparator(Rect.boxes[0], Rect.boxes[i], "green", compT);

            await arrow1.drawArrow(Rect.boxes[0]);
            await arrow2.drawArrow(Rect.boxes[i]);
            await canvas.delay(100);
            CMP.drawComp(true, true);

            if (canvas.abort) {
                console.log("heap sort end");
                return;
            }
            await canvas.delay(1000);

       await Rect.swapping(Rect.boxes[0], Rect.boxes[i]);

            if (canvas.abort) {
                console.log("heap sort end");
                return;
            }
            await canvas.delay((i) * 850);

            // Swap the root (maximum element) with the last element
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            
            arrow1.clearArrow();
            arrow2.clearArrow();
            CMP.clearComp();

            // Call max heapify on the reduced heap
            canvas.drawYPos += canvas.rectHeight * 3;
    
          //   Rect.cleanup();
            Rect.boxes = [];
            Rect.AllBox = [];

            await heapify(canvas, arr, i, 0);

            if (canvas.abort) {
                console.log("heap sort end");
                return;
            }
        }

        console.log("heap sort end successfully");
    } catch (error) {
        console.log(error);
        console.log("heap sort end");
        return;
    }
    return arr;
}

async function heapify(canvas, arr, n, i) {
    try {
        let leftC = null;
        let rightC = null;
        let lrg = null;
        Rect.drawArray(canvas, arr, true, true, "array");
        await canvas.delay((arr.length + 1) * 200);

        let largest = i;
        let Left = 2 * i + 1;
        let Right = 2 * i + 2;
        lrg = new Arrow(canvas, "largest", "red");
        await canvas.delay(100);
        await lrg.drawArrow(Rect.boxes[largest]);

        if (Left < n) {
            leftC = new Arrow(canvas, "LeftC", "red");
            await canvas.delay(100);
            await leftC.drawArrow(Rect.boxes[Left]);
        }

        if (Right < n) {
            rightC = new Arrow(canvas, "RightC", "green");
            await canvas.delay(100);
            await rightC.drawArrow(Rect.boxes[Right]);
        }

        await canvas.delay(1000);

        // If left child is larger than root
        if (Left < n && arr[Left] > arr[largest]) {


            const compT = `${arr[Left]} > ${arr[largest]}\nShift largest (${largest}) to left (${Left}) place`;
            const CMP = new Comparator(Rect.boxes[largest], Rect.boxes[Left], "green", compT);
            CMP.drawComp(true, true);

            await canvas.delay(500);
            lrg.ShiftArrow(0.5, "up");
            await canvas.delay(200);
            lrg.ShiftArrow(Left - largest, "right");

            await canvas.delay(1000);
            largest = Left;
            await canvas.delay(500);
            leftC.clearArrow();
        rightC.clearArrow();
            lrg.clearArrow();
            CMP.clearComp();
            await lrg.drawArrow(Rect.boxes[largest]);
        } else {
            await canvas.delay(500);
            lrg.clearArrow();
        }

        // If right child is larger than the largest so far
        if (Right < n && arr[Right] > arr[largest]) {

            const compT = `${arr[Right]} < ${arr[largest]}\nShift largest (${largest}) to right (${Right}) place`;
            const CMP = new Comparator(Rect.boxes[largest], Rect.boxes[Right], "green", compT);
            CMP.drawComp(true, true);

            await canvas.delay(500);
            lrg.ShiftArrow(0.5, "up");
            lrg.ShiftArrow(Right - largest, "right");

            await canvas.delay(1000);
            largest = Right;
            await canvas.delay(500);
            leftC.clearArrow();
        rightC.clearArrow();
            lrg.clearArrow();
            CMP.clearComp();
            await lrg.drawArrow(Rect.boxes[largest]);
        } else {
            await canvas.delay(500);
            lrg.clearArrow();
        }

        // If largest is not the root
        if (largest != i) {
            const arrow1 = new Arrow(canvas, "prevLrg", "red");
            await arrow1.drawArrow(Rect.boxes[i]);

            const compT = `(i)=${i} != (largest)=${largest}\nSwap ${arr[i]} With ${arr[largest]}`;
            const CMP = new Comparator(Rect.boxes[i], Rect.boxes[largest], "green", compT);

            await canvas.delay(1000);
            CMP.drawComp(true, true);

          Rect.swapping(Rect.boxes[i], Rect.boxes[largest]);

            await canvas.delay((i + largest) * 500);

            let temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            
            arrow1.clearArrow();
            lrg.clearArrow();
            leftC.clearArrow();
            rightC.clearArrow();
            CMP.clearComp();
            await canvas.delay(1000);
           // Rect.cleanup();
      //    Rect.boxes = [];
     //     Rect.AllBox = [];

            // Recursively heapify the affected sub-tree
            try {
                await heapify(canvas, arr, n, largest);
            } catch (error) {
                console.log(error)
            }

       await Rect.drawArray(canvas, arr, true, true, "array");
            if (canvas.abort) {
                console.log("shellsort sort end");
                return;
            }
            await canvas.delay((arr.length + 1) * 200);

            Rect.boxes = [];
            Rect.AllBoxe = [];
        } else {
            await canvas.delay(500);
            lrg.clearArrow();
        }

        
    } catch (error) {
        console.log(error);
        console.log("heap sort end");
        return;
    }
}