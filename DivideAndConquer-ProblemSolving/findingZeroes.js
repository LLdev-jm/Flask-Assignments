// countZeroes
// Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

// Constraints:
// Time Complexity: O(log N)

// Examples:
// countZeroes([1,1,1,1,0,0]) // 2
// countZeroes([1,0,0,0,0]) // 4
// countZeroes([0,0,0]) // 3
// countZeroes([1,1,1,1]) // 0


function countZeroes(arr) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low+high) / 2);
    console.log(`low: ${low}, high: ${high}, mid: ${mid}`);

    if (arr[mid] === 1) {
      low = mid + 1; 
      console.log(`new Low: ${low}`)
    } else {
      high = mid - 1; 
      console.log(`new high: ${high}`)
    }
  }
// calculate anything remaining after low was not === 1
  console.log(`low: ${low}, high: ${high}`);
  return arr.length - low;
}