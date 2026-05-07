const sym = document.querySelectorAll('.symbol');

const start = document.getElementById('start-make')!as HTMLInputElement;
const op_pa = document.getElementById('parentheses')!as HTMLInputElement;
const op_so = document.getElementById('sort')!as HTMLInputElement;

const make_num = document.getElementById('make-num')!as HTMLInputElement;

const add_num = document.getElementById('add-num')!as HTMLInputElement;
const remove_num = document.getElementById('remove-num')!as HTMLInputElement;

const ans_area = document.getElementById('answer')!;

import { solve_make } from './solver';

add_num.addEventListener('click', () => {
  const container = document.querySelector(".num-area")!;
  const input = document.createElement("input");
  input.type = "number";
  input.className = "target-nums";
  input.step = "1";
  input.value = "0";
  container.appendChild(input);
});

remove_num.addEventListener('click', () => {
  const container = document.querySelector(".num-area")!;
  const inputs = container.querySelectorAll(".target-nums");
  if (inputs.length > 1) {
    container.removeChild(inputs[inputs.length - 1]!);
  }
});

start.addEventListener('click', () => {
  const input_num = document.querySelectorAll('.target-nums');
  ans_area.innerHTML = "計算中...";
  setTimeout(() => {
    const numbers: number[] = Array.from(input_num).map((input) => {
      return Number((input as HTMLInputElement).value);
    });

    const syms: boolean[] = Array.from(sym).map((input) => {
      return ((input as HTMLInputElement).checked);
    });

    if(numbers.some(n => isNaN(n))) {
      alert("整数を正しく入力してください");
      ans_area.innerHTML = "";
      return;
    }

    const results:string[] = Array.from(solve_make(numbers,syms,[false,op_pa.checked,op_so.checked],Number(make_num.value)));
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
  }, 10);
});