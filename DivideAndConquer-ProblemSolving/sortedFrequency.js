// sortedFrequency

// Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array

// Constraints:
// Time Complexity: O(log N)

// Examples:
// sortedFrequency([1,1,2,2,2,2,3],2) // 4
// sortedFrequency([1,1,2,2,2,2,3],3) // 1
// sortedFrequency([1,1,2,2,2,2,3],1) // 2 >>1
// sortedFrequency([1,1,2,2,2,2,3],4) // -1

function sortedFrequency(arr,num){
  let firstIdx = findFirst(arr, num); // find first occurrences

  if (firstIdx === - 1){           
    return -1;     // default value just incase target is not found 
  }
  let lastIdx = findLast(arr,num); 
  let freq = lastIdx - firstIdx + 1;
  return freq;
}






// findFirst([1,1,2,2,2,2,3],2) >> 0
// findFirst([1,1,2,2,2,2,3],3) >> 6
// findFirst([1,1,2,2,2,2,3],1) >> 0
// findFirst([1,1,2,2,2,2,3],4) >> -1

function findFirst(arr, num){
  let low = 0;
  let high = arr.length - 1;
  let result = -1;
  while(low <= high){
    let mid = Math.floor((low+high)/2);
  
    if (arr[mid]===num){ 
        result = mid;
        high = mid - 1;
      }else if ( arr[mid] < num){
        low = mid + 1;
      }else {
        high = mid - 1;
      };
    };
    return result;
  };




// findLast([1,1,2,2,2,2,3],2) >> 2
// findLast([1,1,2,2,2,2,3],3) >> 6
// findLast([1,1,2,2,2,2,3],1)  >>0
// findLast([1,1,2,2,2,2,3],4) >> -1

function findLast(arr, num){
  let low = 0;
  let high = arr.length - 1;
  let result = -1;

    while (low <= high){
      let mid = Math.floor((low+high)/2)
    
      if (arr[mid] === num){
        result = mid; //update
        low = mid + 1; //search for more occurrences
      }else if (arr[mid] < num){
        low = mid + 1;
      }else {
        high = mid - 1;
      };
    };

    return result;
  };


