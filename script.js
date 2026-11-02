// Find the parts of the page once, and keep them in variables.
const billInput = document.getElementById('bill');
const tipInput = document.getElementById('tip');
const peopleInput = document.getElementById('people');
const presetsBox = document.getElementById('presets');
const tipOut = document.getElementById('tipAmount');
const totalOut = document.getElementById('total');
const perPersonOut = document.getElementById('perPerson');
const message = document.getElementById('message');

console.log('Tip calculator loaded');

// The math: small functions that take numbers and return numbers.
function tipAmount(bill, percent) {
  return (bill * percent) / 100;
}

function perPerson(total, people) {
  return total / people;
}

// Turns 9 into "$9.00".
function money(amount) {
  return `$${amount.toFixed(2)}`;
}

// Read the inputs, check them, do the math, and show the answers.
function update() {
  const bill = Number(billInput.value);
  const percent = Number(tipInput.value);
  const people = Number(peopleInput.value);

  if (bill < 0 || percent < 0) {
    message.textContent = 'The bill and tip can\'t be negative.';
    return;
  }
  if (people < 1 || !Number.isInteger(people)) {
    message.textContent = 'People must be a whole number, 1 or more.';
    return;
  }
  message.textContent = '';

  const tip = tipAmount(bill, percent);
  const total = bill + tip;

  tipOut.textContent = money(tip);
  totalOut.textContent = money(total);
  perPersonOut.textContent = money(perPerson(total, people));
}

// Recalculate whenever any input changes, and once now so the results aren't blank.
billInput.addEventListener('input', update);
tipInput.addEventListener('input', update);
peopleInput.addEventListener('input', update);

update();

// One button per tip choice, built from data.
const PRESETS = [10, 15, 18, 20];

for (const percent of PRESETS) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = `${percent}%`;
  button.addEventListener('click', () => {
    tipInput.value = percent;
    update();
    highlight();
  });
  presetsBox.append(button);
}

// Mark the button that matches the tip box.
function highlight() {
  for (const button of presetsBox.children) {
    button.classList.toggle('active', button.textContent === `${tipInput.value}%`);
  }
}

tipInput.addEventListener('input', highlight);
highlight();
