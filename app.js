/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
// ts-check

// Global variable
let mode = 'color';

function colorMode() {
  const color = document.querySelector('#color-mode').value;
  return color;
}

function rainbowMode() {
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue}, 100%, 50%)`;
  return color;
}

function erase() {
  return 'white';
}

function clear() {
  document.querySelectorAll('.item').forEach((item) => {
    item.style.backgroundColor = 'white';
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

  colorButton.addEventListener('click', () => {
    mode = 'color';
    colorButton.classList.add('active');
    rainbowButton.classList.remove('active');
    eraseButton.classList.remove('active');
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

  clearButton.addEventListener('click', () => {
    clear();
  });

  gridSlider.addEventListener('input', () => createGrid());
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

  clear();
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('item');
    sketch.appendChild(square);
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = selectMode();
    });
  }
}

// Initiate all
buttonListeners();
createGrid();
