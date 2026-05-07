import { all_permutation } from './perm';

export function solve_make(nums:number[], syms:boolean[], op:boolean[]):string[]{
  let q:[number[],[number,number][]][] = [];
  if(op[2]){
    let a = all_permutation(nums);
    for(let i = 0; i < a.length; i++){
      q.push([a[i]!,[]]);
    }
  }else{
    q.push([nums,[]]);
  }

  
  return [];
}