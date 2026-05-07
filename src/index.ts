const input_num = document.querySelectorAll('.target-num');
const sym = document.querySelectorAll('.symbol');

const start = document.getElementById('start-make')!as HTMLInputElement;
const op_st = document.getElementById('strplus')!as HTMLInputElement;
const op_pa = document.getElementById('parentheses')!as HTMLInputElement;
const op_so = document.getElementById('sort')!as HTMLInputElement;

const ans_area = document.getElementById('answer')!;

import { solve_make } from './solver';

start.addEventListener('click', () => {
  ans_area.innerHTML = "計算中...";

  const numbers: number[] = Array.from(input_num).map((input) => {
    return Number((input as HTMLInputElement).value);
  });

  const syms: boolean[] = Array.from(sym).map((input) => {
    return ((input as HTMLInputElement).checked);
  });

  if(numbers.some(n => isNaN(n))) {
    alert("整数を正しく入力してください");
    return;
  }

  const results:string[] = solve_make(numbers,syms,[op_st.checked,op_pa.checked,op_so.checked]);
  ans_area.innerHTML = "";
  if(results.length === 0){
    results.push("[見つかりませんでした]");
  }

  for(let i = 0; i < results.length; i++){
    const p = document.createElement('p');
    p.textContent = results[i]!;
    p.className = "answer-item";
    
    ans_area.appendChild(p);
  }
});