const calculator = document.querySelector(".calculator");
const displayContainer = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const numberButtons = document.querySelectorAll(".number");

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstOperand = "";
let secondOperand = "";
let choosenOperator = "";
let displayValue = "";
let allowChooseOperation = false;

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let clickedNumberValue = e.target.getAttribute("value");
    assignNumberToOperand(clickedNumberValue);
  });
});

const assignNumberToOperand = (numberValue) => {
  if (choosenOperator === "") {
    firstOperand = firstOperand.toString() + numberValue.toString();
    console.log(firstOperand);
    displayValue = firstOperand;
    displayContainer.textContent = displayValue;
  } else if (firstOperand && choosenOperator) {
    secondOperand = secondOperand.toString() + numberValue.toString();
    console.log(secondOperand);
    displayValue = displayValue + secondOperand.slice(-1);
    displayContainer.textContent = displayValue;
  }
};

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let clickedOperatorName = e.target.getAttribute("data-operator-name");
    selectOperator(clickedOperatorName);
  });
});

const clearCalculator = () => {
  result = "";
  displayContainer.textContent = "";
  choosenOperator = "";
  firstOperand = "";
  secondOperand = "";
};

const selectOperator = (operatorName) => {
  if (firstOperand && choosenOperator && secondOperand === "") return;
  if (firstOperand && choosenOperator && secondOperand) {
    firstOperand = operate(choosenOperator, firstOperand, secondOperand);
    secondOperand = "";
    displayValue = firstOperand + getOperatorSymbol(operatorName);
    displayContainer.textContent = displayValue;
    choosenOperator = operatorName;
    console.log("condition run", firstOperand);
    return;
  }
  console.log("still running");
  if (choosenOperator) {
    firstOperand = operate(
      choosenOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    choosenOperator = operatorName;
    secondOperand = "";
    console.log(firstOperand);
    console.log(choosenOperator);
  }
  choosenOperator = operatorName;
  displayValue = displayValue + " " + getOperatorSymbol(operatorName) + " ";
  displayContainer.textContent = displayValue;
  console.log("selectOperatorCodeBlock", displayValue);
};

const evaluate = () => {
  result = operate(
    choosenOperator,
    Number(firstOperand),
    Number(secondOperand)
  ).toString();
  console.log(result);

  firstOperand = result;
  secondOperand = 0;
  displayValue = result;
  displayContainer.textContent = displayValue;
};

clearButton.addEventListener("click", clearCalculator);
equalButton.addEventListener("click", evaluate);

const operate = (operatorName, a, b) => {
  a = Number(firstOperand);
  b = Number(secondOperand);

  switch (operatorName) {
    case "sum":
      return sum(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
};

const getOperatorSymbol = (operatorName) => {
  switch (operatorName) {
    case "sum":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "*";
    case "divide":
      return "/";
  }
};
