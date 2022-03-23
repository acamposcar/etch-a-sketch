/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
// ts-check

// Global variable
let mode = 'color';
// const sketchColor = 'rgb(226, 226, 226)';
let sketchColor = '#f1f1f1';
let darkEnabled = false;

function darkMode() {
  darkEnabled = !darkEnabled;
  sketchColor = darkEnabled ? '#141616' : '#f1f1f1';
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('#sketch').classList.toggle('dark');
  document.querySelector('#moon').classList.toggle('dark');
  document.querySelector('.item').classList.toggle('dark');
  document.querySelector('input[type="color"]').classList.toggle('dark');
  document.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('dark');
  });

  clear();
}

function colorMode() {
  /* Users selects color in the color picker */
  const color = document.querySelector('#color-picker').value;
  return color;
}

function rainbowMode() {
  /* Generates a random color in HSL */
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue}, 100%, 50%)`;
  return color;
}

function erase() {
  /* Same color as background */
  return sketchColor;
}

function clear() {
  document.querySelectorAll('.item').forEach((item) => {
    item.style.backgroundColor = sketchColor;
  });
}

function selectMode() {
  switch (mode) {
    case 'color':
      return colorMode();
    case 'rainbow':
      return rainbowMode();
    case 'erase':
      return erase();
    default:
      return colorMode();
  }
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
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = selectMode();
    });
    square.addEventListener('mousedown', () => {
      square.style.backgroundColor = selectMode();
    });
  }
  clear();
}

// Initiate all
buttonListeners();
createGrid();
