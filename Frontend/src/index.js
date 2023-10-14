// document.addEventListener("DOMContentLoaded", function () {
//   const editorContainer = document.getElementById("editor-container");
//   const resizeHandle = document.getElementById("resize-handle");
//   let isResizing = false;

//   resizeHandle.addEventListener("mousedown", (e) => {
//     isResizing = true;
//     const initialX = e.clientX;
//     const initialWidth = editorContainer.offsetWidth;

//     document.addEventListener("mousemove", (e) => {
//       if (isResizing) {
//         const width = initialWidth + e.clientX - initialX;
//         editorContainer.style.width = `${width}px`;
//       }
//     });

//     document.addEventListener("mouseup", () => {
//       isResizing = false;
//     });
//   });
// });
