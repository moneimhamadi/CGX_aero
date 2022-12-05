import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
})
export class FibonacciComponent implements OnInit {
  my_numbers = '0, 1, 1, 2, 3, 5, 8, 13, 21, 34,55 ,89, 144';

  constructor() {}
  fib = this.trampoline(this._fib);
  ngOnInit(): void {
    let input = (<HTMLInputElement>(
      document.getElementById('n')
    )) as HTMLInputElement;
    let result = (<HTMLInputElement>(
      document.getElementById('result')
    )) as HTMLInputElement;

    document.getElementById('compute').addEventListener('click', () => {
      const fn: number = this.fibonacci(input.valueAsNumber);
      result.value = fn.toString();
    });
  }
  fibonacci(n: number, memo: Map<number, number> = new Map()): number {
    if (n === 0) return 0;
    if (n === 1) return 1;

    if (memo.has(n)) return memo.get(n);
    const fn = this.fibonacci(n - 1, memo) + this.fibonacci(n - 2, memo);
    memo.set(n, fn);
    return fn;
  }
  _fib(n: number, sum = 0, prev = 1): Function {
    return () => (n === 0 ? sum : this.fib(n - 1, prev + sum, sum));
  }
  trampoline(fn: Function): Function {
    return (...args: any[]) => {
      let result = fn(...args);
      while (result && result instanceof Function) {
        result = result();
      }
      return result;
    };
  }
}
