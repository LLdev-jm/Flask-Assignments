// findRotationCount

// Write a function called findRotationCount which accepts an array of distinct numbers sorted in increasing order. The array has been rotated counter-clockwise n number of times. Given such an array, find the value of n.

// Constraints:
// Time Complexity: O(log N)

// Examples:
// findRotationCount([15, 18, 2, 3, 6, 12]) // 2
// findRotationCount([7, 9, 11, 12, 5]) // 4
// findRotationCount([7, 9, 11, 12, 15]) // 0

//        [15, 18, 2, 3, 6, 12] 15 <= 12 ? X 
//        [7 ,9 ,11 ,12 ,15]     7 <= 15 
// array not rotated. first element <= last element 

function findRotationCount(arr) {
  let low = 0;
  let high = arr.length - 1;

  // first element <= last element: array not rotated 
  while (low <= high) {
    if (arr[low] <= arr[high]) {
      return low;
    }

    let mid = Math.floor((low + high) / 2);
    let next = (mid + 1) % arr.length; // Calculate the next element after mid

    // check for minimum element
    if (arr[mid] <= arr[next] && arr[mid] <= arr[mid - 1]) {
      return mid;
    }

    // check to see which side is sorted
    if (arr[mid] <= arr[high]) { //right side is sorted
      high = mid - 1;
    } else if (arr[mid] >= arr[low]) { //left side is sorted
      low = mid + 1;
    }
  }

  return -1; // Shouldn't reach here for a valid rotated array
}
