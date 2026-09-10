// 1. Select our elements
const item = document.getElementById("draggable-item");
const boxes = document.querySelectorAll(".box");

// 2. Handle the start of the drag
item.addEventListener("dragstart", (e) => {
  // Store the ID of the element we are dragging so the drop zone can read it later
  e.dataTransfer.setData("text/plain", e.target.id);
});

// 3. Set up the drop zones
boxes.forEach((box) => {
  // CRITICAL: Browsers block dropping by default. You MUST prevent default behavior!
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // Handle the actual drop
  box.addEventListener("drop", (e) => {
    e.preventDefault(); // Stop default browser reactions

    // Retrieve the ID we saved during dragstart
    const id = e.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(id);

    // Append the item into the new box
    box.appendChild(draggableElement);
  });
});
