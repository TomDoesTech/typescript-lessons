function add(numOne: number, numTwo: number): number;
function add(numOne: string, numTwo: string): number;
function add(numOne: string, numTwo: number): number;
function add(numOne: number, numTwo: string): number;

function add(numOne: unknown, numTwo: unknown) {
  let first = numOne as number;
  let second = numTwo as number;
  if (typeof numOne === "string") {
    first = parseInt(numOne, 10);
  }
  if (typeof numTwo === "string") {
    second = parseInt(numTwo, 10);
  }

  return first + second;
}

console.log(add(1, 1));
console.log(add("1", "1"));
console.log(add("1", 1));
console.log(add(1, "1"));
