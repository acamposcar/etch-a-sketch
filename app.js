/* eslint-disable no-plusplus */
// @ts-check

const size = 16;
const container = document.querySelector('#sketch');
container.style.cssText = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`;

for (let i = 0; i < size * size; i++) {
  const content = document.createElement('div');
  content.classList.add('item');
  container.appendChild(content);
}
