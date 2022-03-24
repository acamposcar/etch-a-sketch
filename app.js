/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
// ts-check

// Global variable, initial values
let mode = 'color';
let clicked = false;
let sketchColor = '#f1f1f1';
let darkEnabled = false;

function clear() {
  document.querySelectorAll('.item').forEach((item) => {
    item.style.backgroundColor = sketchColor;
  });
}

function darkMode() {
  darkEnabled = !darkEnabled;
  sketchColor = darkEnabled ? '#141616' : '#f1f1f1';
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('#sketch').classList.toggle('dark');
  document.querySelector('#moon').classList.toggle('dark');
  document.querySelector('.item').classList.toggle('dark');
  document.querySelector('input[type="color"]').classList.toggle('dark');
  document.querySelector('input[type="range"]').classList.toggle('dark');
  document.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('dark');
  });

  clear();
}

function getColor() {
  switch (mode) {
    case 'color':
      /* Users selects color in the color picker */
      return document.querySelector('#color-picker').value;
    case 'rainbow': {
      /* Generates a random color in HSL */
      const hue = Math.floor(Math.random() * 360);
      return `hsl(${hue}, 100%, 50%)`;
    }
    case 'erase':
      /* Same color as background */
      return sketchColor;
    default:
      return document.querySelector('#color-picker').value;
  }
}

function getGridSize() {
  const gridOptions = [10, 16, 32, 64, 96];
  const gridSliderValue = document.querySelector('#grid-slider').value;
  const gridSize = gridOptions[gridSliderValue];
  document.querySelector('#grid-size').textContent = `${gridSize} x ${gridSize}`;
  return gridSize;
}

function createGrid() {
  const size = getGridSize();
  const sketch = document.querySelector('#sketch');
  sketch.innerHTML = '';
  sketch.style.cssText = `grid-template-columns: repeat(${size}, 1fr); `;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('item');
    sketch.appendChild(square);
    square.addEventListener('mouseenter', () => {
      if (clicked) {
        square.style.backgroundColor = getColor();
      }
    });
  }
  clear();
}

function buttonListeners() {
  const colorButton = document.querySelector('#color-mode');
  const rainbowButton = document.querySelector('#rainbow-mode');
  const eraseButton = document.querySelector('#erase-mode');
  const clearButton = document.querySelector('#clear');
  const gridSlider = document.querySelector('#grid-slider');
  const colorPicker = document.querySelector('#color-picker');
  const darkButton = document.querySelector('#dark');
  // Add active class in selected mode
  colorButton.addEventListener('click', () => {
    mode = 'color';
    colorButton.classList.add('active');
    rainbowButton.classList.remove('active');
    eraseButton.classList.remove('active');
    // Simulate click in the input color picker
    colorPicker.click();
  });

  rainbowButton.addEventListener('click', () => {
    mode = 'rainbow';
    colorButton.classList.remove('active');
    rainbowButton.classList.add('active');
    eraseButton.classList.remove('active');
  });

  eraseButton.addEventListener('click', () => {
    mode = 'erase';
    colorButton.classList.remove('active');
    rainbowButton.classList.remove('active');
    eraseButton.classList.add('active');
  });

  clearButton.addEventListener('click', clear);
  gridSlider.addEventListener('input', createGrid);
  darkButton.addEventListener('click', darkMode);

  document.addEventListener('mousedown', () => {
    clicked = true;
  });

  document.addEventListener('mouseup', () => {
    clicked = false;
  });
}

// Initiate all
buttonListeners();
createGrid();
