export function all_permutation(nums:number[]):number[][]{
  nums.sort((a, b) => a - b);
  let result:number[][] = [];

  if(nums.length <= 1){
    result.push(nums);
    return result;
  }
  
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let a:number = nums[i]!;
    let b = nums.slice(0, i).concat(nums.slice(i + 1));
    let c = all_permutation(b);
    
    for (let p of c) {
      result.push([a, ...p]);
    }
  }

  return result;
}