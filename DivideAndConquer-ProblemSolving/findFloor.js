// findFloor
// Write a function called findFloor which accepts a sorted array and a value x, and returns the floor of x in the array. The floor of x in an array is the largest element in the array which is smaller than or equal to x. If the floor does not exist, return -1.
// Examples:
// findFloor([1,2,8,10,10,12,19], 9) // 8
// findFloor([1,2,8,10,10,12,19], 20) // 19
// findFloor([1,2,8,10,10,12,19], 0) // -1


function findFloor(arr, x){
  let low = 0;
  let high= arr.length -1;
  let floor = -1;
    while (low <= high) {
      let mid = Math.floor((low+high)/2);
      if (arr[mid] === x) {
        return arr[mid]; //possible to just set it floor = arr[mid]? if not why ?
      }else if(arr[mid] < x) {
        floor = arr[mid];
        low = mid + 1;
      }else {
        high = mid - 1;
      }
    }
  
  return floor;
}

