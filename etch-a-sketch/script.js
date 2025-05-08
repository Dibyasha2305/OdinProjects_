const container = document.querySelector(".container");
const resizeButton = document.getElementById("resize-button");

// Default grid
createGrid(16);

resizeButton.addEventListener("click", () => {
  let size = parseInt(prompt("Enter grid size (max 100):"));
  if (size && size > 0 && size <= 100) {
    resetGrid();
    createGrid(size);
  } else {
    alert("Please enter a number between 1 and 100.");
  }
});

function createGrid(size) {
  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Hover color change
    square.addEventListener("mouseenter", () => {
      // Random color mode
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // Darken progressively
      let currentOpacity = parseFloat(square.style.opacity) || 0;
      if (currentOpacity < 1) {
        currentOpacity += 0.1;
      }

      square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      square.style.opacity = currentOpacity;
    });

    container.appendChild(square);
  }
}

function resetGrid() {
  container.innerHTML = "";
}
