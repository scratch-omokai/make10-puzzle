import { all_permutation } from './perm';

export function solve_make(nums:number[], syms:boolean[], op:boolean[], make_num:number):Set<string>{
  let q:[number[],[number,number][]][] = [];
  let fir:number[][] = [];
  if(op[2]){
    let a = all_permutation(nums);
    for(let i = 0; i < a.length; i++){
      q.push([a[i]!,[]]);
      fir.push(a[i]!);
    }
  }else{
    q.push([nums,[]]);
    fir.push(nums);
  }

  let ans_i:[number,number][][] = [];
  let ans_c:number[][] = [];
  while(q.length > 0){
    const a:[number[],[number,number][]] = q.pop()!;
    const c = fir.pop()!;
    if(a[0].length === 1){
      if(a[0][0] === make_num){
        ans_i.push(a[1]);
        ans_c.push(c);
      }
      continue;
    }
    for(let i = 0; i < a[0].length-1; i++){
      for(let sy_i = 0; sy_i < 4; sy_i++){
        if(!syms[sy_i]) continue;
        if(!(op[1] || a[1].length === 0)){
          if(a[1].slice(-1)[0]![1] <= 2 && sy_i > 2){
            continue;
          }else if(a[1].slice(-1)[0]![0] > i && (!(a[1].slice(-1)[0]![1] <= 2 && sy_i > 2))){
            continue;
          }
        }

        let b = structuredClone(a);
        if(sy_i === 0) b[0][i] = b[0][i]! + b[0][i+1]!;
        else if(sy_i === 1) b[0][i] = b[0][i]! - b[0][i+1]!;
        else if(sy_i === 2) b[0][i] = b[0][i]! * b[0][i+1]!;
        else if(sy_i === 3){
          if(b[0][i+1] === 0) continue;
          b[0][i] = b[0][i]! / b[0][i+1]!;
        }
        b[0].splice(i+1,1);
        b[1].push([i,sy_i]);
        q.push(b);
        fir.push(c);
      }
    }
  }

  let ans:Set<string> = new Set();
  for(let i = 0; i < ans_i.length; i++){
    let tmp_ans:string[] = [];
    for(let j of ans_c[i]!){
      tmp_ans.push(String(j));
    }

    for(let j of ans_i[i]!){
      if(j[1] === 0) tmp_ans[j[0]] = tmp_ans[j[0]] + "+" + tmp_ans[j[0]+1];
      else if(j[1] === 1) tmp_ans[j[0]] = tmp_ans[j[0]] + "-" + tmp_ans[j[0]+1];
      else if(j[1] === 2) tmp_ans[j[0]] = tmp_ans[j[0]] + "*" + tmp_ans[j[0]+1];
      else if(j[1] === 3) tmp_ans[j[0]] = tmp_ans[j[0]] + "/" + tmp_ans[j[0]+1];

      tmp_ans.splice(j[0]+1,1);
      if(op[1] && tmp_ans.length !== 1) tmp_ans[j[0]] = "(" + tmp_ans[j[0]] + ")";
    }

    ans.add(tmp_ans[0]!);
  }
  return ans;
}