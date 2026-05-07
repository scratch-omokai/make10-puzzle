const arithmetic_symbols_checkboxes = document.querySelectorAll<HTMLInputElement>(".symbol");
// use querySelector instead of getElementById for better Typings
const start_button = document.querySelector<HTMLButtonElement>("#start-make")!;
const allow_pa = document.querySelector<HTMLInputElement>("#parentheses")!;
const allow_so = document.querySelector<HTMLInputElement>("#sort")!;

const make_num = document.querySelector<HTMLInputElement>("#make-num")!;

const add_num = document.querySelector<HTMLButtonElement>("#add-num")!;
const remove_num = document.querySelector<HTMLButtonElement>("#remove-num")!;

const ans_area = document.querySelector("#answer")!;

import { solve_make } from "./solver";

add_num.addEventListener("click", () => {
  const container = document.querySelector(".num-area")!;
  const input = document.createElement("input");
  input.type = "number";
  input.className = "target-nums";
  input.step = "1";
  input.value = "0";
  container.appendChild(input);
});

remove_num.addEventListener("click", () => {
  const container = document.querySelector(".num-area")!;
  const inputs = container.querySelectorAll(".target-nums");
  if (inputs.length > 1) {
    container.removeChild(inputs[inputs.length - 1]!);
  }
});

start_button.addEventListener("click", () => {
  const input_num = document.querySelectorAll<HTMLInputElement>(".target-nums");
  ans_area.innerHTML = "計算中...";
  setTimeout(() => {
    const seed_numbers: number[] = Array.from(input_num).map(input => {
      return Number(input.value);
    });

    const arithmetic_symbol_flags: boolean[] = Array.from(arithmetic_symbols_checkboxes).map(input => input.checked);

    if (seed_numbers.some(Number.isNaN)) {
      alert("整数を正しく入力してください");
      ans_area.innerHTML = "";
      return;
    }

    const results: string[] = Array.from(
      solve_make(
        seed_numbers,
        arithmetic_symbol_flags,
        [false, allow_pa.checked, allow_so.checked],
        Number(make_num.value),
      ),
    );
    ans_area.innerHTML = "";
    if (results.length === 0) {
      results.push("[見つかりませんでした]");
    } else {
      results.unshift(`[${results.length}件見つかりました]`);
    }

    for (let i = 0; i < results.length; i++) {
      const p = document.createElement("p");
      p.textContent = results[i]!;
      p.className = "answer-item";

      ans_area.appendChild(p);
    }
  }, 10);
});
