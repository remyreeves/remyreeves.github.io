/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//move every value down along the line until it's in order
async function bubbleSort(array){
    //loop through every value
    for(var i = 0; i <= array.length - 1; i++){
        for(var j = array.length - 1; j >= i + 1; j--){
            if(array[j].value < array[j - 1].value){
                //move values to where they need to go, eventually
                swap(array,j,(j-1));
                updateCounter(bubbleCounter); //update the bubblesort move counter
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort
//call partition, wait for partition to give the sorted section, then call quicksort again to sort the right or left side again.
async function quickSort(array,left,right){
/*    FUNCTION quicksort(array, left, right):
  IF (right - left) > 0:
    index = partition(array, left, right)
    IF left < (index - 1):
      quickSort(array, left, index - 1)
    IF index < right:
      quicksort(array, index, right)
*/
    if((right - left) > 0){
        var index = await partition(array,left,right);
        if(left < (index - 1)){
            await quickSort(array,left,index - 1);
        }
        if(index < right){
            await quickSort(array,index,right);
        }
    }
    return;
}

// TODOs 4 & 5: Implement partition
//selects a pivot, then increase given left value and decreases given right value while swapping those values until left is no longer less than right
//then updates quicksort move counter
async function partition(array,left,right){
/* FUNCTION partition (array, left, right):
  pivot = select a pivot
  WHILE left < right:
    WHILE array[left] < pivot { left++ }
    WHILE array[right] > pivot { right-- }
    IF left < right:
      swap array[left] and array[right]

  RETURN left + 1
*/
    var pivot = array[Math.floor((right + left) / 2)].value;
    while(left < right){
        while(array[left].value < pivot) { left++};
        while(array[right].value > pivot) { right--};
        if(left < right){
            swap(array,left,right);
            updateCounter(quickCounter); //update the quicksort move counter
            await sleep();
        }
    };
    return left + 1; //close the recursive loop
}

// TODO 1: Implement swap
function swap(array,i,j){
    var temp = array[i]; //temp variable
    array[i]=array[j]; //swap the first variable with the second
    array[j]=temp; //swap the second variable with the copy of the first
    drawSwap(array, i, j); //call drawSwap (premade)
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}