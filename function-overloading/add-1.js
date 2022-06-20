function addJS(numOne, numTwo) {
  let first = numOne;
  let second = numTwo;
  if (typeof numOne === "string") {
    first = parseInt(numOne, 10);
  }
  if (typeof numTwo === "string") {
    second = parseInt(numTwo, 10);
  }

  return first + second;
}

console.log(addJS(1, 1));
console.log(addJS("1", "1"));
console.log(addJS(1, "1"));
console.log(addJS("1", 1));
