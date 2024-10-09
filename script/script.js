const convertBtn = document.querySelector('#convert');
const toBaseInput = document.getElementById('toBaseInput');
const fromBaseInput = document.getElementById('fromBaseInput');
let numberInput = document.getElementById('numberInput');
const errorMessage = document.getElementById('errorMessage');
let resultHtml = document.getElementById('result');

// Add event listener for the convert button
convertBtn.addEventListener('click', () => {
 // First, validate the number
 const isValid = checkValidation();

 // If validation passes, perform the conversion
 if (isValid) {
  const baseValues = getBaseValue();
  if (baseValues) {
   const [fromBase, toBase] = baseValues;
   convert(fromBase, toBase);
  }
 }
});

// Add event listener for the fromBaseInput to revalidate the number
fromBaseInput.addEventListener('input', checkValidation);

function convert(fromBase, toBase) {
 const input = numberInput.value;

 // Convert the number from the "fromBase" to decimal 
 let decimalNumber = parseInt(input, fromBase);

 // Check if the decimal conversion failed
 if (isNaN(decimalNumber)) {
  errorMessage.innerText = "Invalid number for the selected base!";
  return;
 }

 // Convert the decimal number to the "toBase" 
 const result = decimalNumber.toString(toBase);

 resultHtml.innerHTML = `Result: ${result}`;
}

function checkValidation() {
 // Extract numeric part of the base
 const choice = fromBaseInput.value.match(/\d+/)[0];
 const value = numberInput.value;
 let isValid = false;
 let theBase;

 // Validate the number based on the selected base (fromBase)
 switch (choice) {
  case '10':
   isValid = /^[0-9]+$/.test(value);
   theBase = 'decimal';
   break;
  case '2':
   isValid = /^[01]+$/.test(value);
   theBase = 'binary';
   break;
  case '8':
   isValid = /^[0-7]+$/.test(value);
   theBase = 'octal';
   break;
  case '16':
   isValid = /^[0-9A-Fa-f]+$/.test(value);
   theBase = 'hexadecimal';
   break;
  default:
   isValid = false;
 }

 // If validation fails, show the error message
 if (!isValid && value !== '') {
  errorMessage.innerText = `Invalid ${theBase} value`;
  convertBtn.disabled = true;
  return false;  // Return false if validation fails
 } else {
  errorMessage.innerText = '';
  convertBtn.disabled = false;
  return true;  // Return true if validation passes
 }
}

function getBaseValue() {
 // Extract only the numeric part using regular expressions
 const from = fromBaseInput.value.match(/\d+/);
 const to = toBaseInput.value.match(/\d+/);

 if (from && to) {
  const numericValue = [from[0], to[0]];
  return numericValue;
 } else {
  return null;
 }
}
