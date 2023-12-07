// findRotatedIndex

// Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. The function should return the index of num in the array. If the value is not found, return -1.


// Constraints:
// Time Complexity: O(log N)
// Examples:
// findRotatedIndex([3,4,1,2],4) // 1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
// findRotatedIndex([37,44,66,102,10,22],14) // -1
// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1



// [ 3 , 4 , 1 , 2 ] , 4         >> 1

function findRotatedIndex(array, int) {
  let low = 0;
  let high = array.length - 1;
    while(low <= high){
      let mid = Math.floor((low+high)/2);
      if(array[mid] === int){
        return mid;
    };

      if (array[low] <= array[mid]){ //     3 <= 4              //check left half of array is sorted
        if (array[low] <= int && int < array[mid]) {          //check if int is in left side
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      // check target is in right side 
      if (array[mid] < int && int <= array[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
}
 